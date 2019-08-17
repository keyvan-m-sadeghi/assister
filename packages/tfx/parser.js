import {registry} from './registry.js';
import {fetchFile} from './utils.js'

function spread(jsonLD, child) {
  const childSpreadMap = {
    object: () => ({
      ...jsonLD,
      ...{
        [child.jsonLDKey]: {
          ...(jsonLD[child.jsonLDKey] || {}),
          ...{
            [child.jsonLDId]: child.toJsonLD()
          }
        }
      }
    }),
    array: () => ({
      ...jsonLD,
      ...{
        [child.jsonLDKey]: [
          ...(jsonLD[child.jsonLDKey] || []),
          {
            '@id': child.jsonLDId,
            ...child.toJsonLD()
          }
        ]
      }
    }),
    none: () => ({
      ...jsonLD,
      ...{
        [child.jsonLDKey]: {
          '@id': child.jsonLDId,
          ...child.toJsonLD()
        }
      }
    })
  };
  return childSpreadMap[child.jsonLDSpreadType]();
}

const elementTFXAssignmentMap = {};

function parseChild(element) {
  return elementTFXAssignmentMap[element.localName](element);
}

function parseChildren(element) {
  return [...element.children]
    .map(parseChild)
    .reduce((jsonLD, child) => spread(jsonLD, child), {});
}

function specifyTFXElementParseArguments({
  htmlTag,
  jsonLDType,
  required = ['name'],
  optionals = [],
  jsonLDSpreadType = 'none',
  jsonLDKey,
  children = true,
  conversions = {},
}) {
  optionals = [...optionals, 'description', 'more'];
  const assignTFXProperties = element => Object.defineProperties(element, {
    name: {get: () => element.getAttribute('name')},
    jsonLDId: {
      get: () => {
        const name = element.name ||
            [...element.parentElement.children].indexOf(element);
        const parentJsonLDId = element.parentElement.jsonLDId;
        const id = `${
          parentJsonLDId === '' ? '' : `${parentJsonLDId}/`
        }${element.jsonLDKey}/${name}`;
        registry.registerId(element.name, id);
        return id;
      }
    },
    jsonLDKey: {value: jsonLDKey},
    jsonLDType: {value: jsonLDType},
    jsonLDSpreadType: {value: jsonLDSpreadType},
    toJsonLD: {
      value: () => {
        const assign = keys => keys.reduce((jsonLD, key) => {
          const convert = conversions[key] || (value => value);          
          return {
            ...jsonLD,
            ...(
              element.hasAttribute(key) ?
                {[key]: convert(element.getAttribute(key))} : {}
            )
          };
        }, {});
        required.map(key => {
          if (!element.hasAttribute(key)) {
            throw new TypeError(
              `<${element.localName}> "${
                element.jsonLDId
              }" must have "${key}" attribute.`
            );
          }
        });
        return {
          "@type": jsonLDType,
          ...assign(required),
          ...assign(optionals),
          ...(children ? parseChildren(element) : {})
        };
      }
    }
  });
  elementTFXAssignmentMap[htmlTag] = assignTFXProperties;
}

function parse(tfxDefinitionElement) {
  Object.defineProperty(tfxDefinitionElement, 'jsonLDId', {value: ''});
  return import('./definitions.js')
    .then(({definitions}) => definitions.map(specifyTFXElementParseArguments))
    .then(() => fetchFile('./context.json'))
    .then(jsonLD => ({
      ...jsonLD,
      ...{
        '@context': [
          ...jsonLD['@context'],
          {'@base': tfxDefinitionElement.baseURI}
        ]
      },
      '@type': 'schema:DefinedTermSet',
      '@id': '',
      ...parseChildren(tfxDefinitionElement)
    }));
}

export {parse};
