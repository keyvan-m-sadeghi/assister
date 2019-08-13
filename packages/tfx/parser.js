import {registry} from './registry.js';

function assign(jsonLD, child) {
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
        [child.jsonLDKey]: child.toJsonLD()
      }
    })
  };
  return childSpreadMap[child.jsonLDSpreadType]();
}

const elementTFXAssignmentMap = {};

function parseChild(element) {
  return elementTFXAssignmentMap[element.localName](element);
}

function parseChildren(element, initialJsonLD = {}) {
  return [...element.children]
    .map(parseChild)
    .reduce((jsonLD, child) => assign(jsonLD, child), initialJsonLD);
}

function specifyTFXElementParseArguments({
  htmlTag,
  jsonLDType,
  jsonLDKey,
  jsonLDSpreadType = 'none',
  required = ['name'],
  optionals = [],
  conversions = {},
  children = true
}) {
  const assignTFXProperties = element => Object.defineProperties(element, {
    name: {get: () => element.getAttribute('name')},
    jsonLDId: {
      get: () => {
        const name = element.name ||
          `${element.jsonLDKey}/${
            [...element.parentElement.children].indexOf(element)
          }`;
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
        const spread = keys => keys.reduce((jsonLD, key) => {
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
              `<${element.localName}> must have "${key}" attribute.`
            );
          }
        });
        return {
          "@type": jsonLDType,
          ...spread(required),
          ...spread(optionals),
          ...(children ? parseChildren(element) : {})
        };
      }
    }
  });
  elementTFXAssignmentMap[htmlTag] = assignTFXProperties;
}

function fetchFile(path) {
  return fetch(path)
    .then(result => result.json());
}

function parse(tfxDefinitionElement) {
  Object.defineProperty(tfxDefinitionElement, 'jsonLDId', {value: ''});
  return import('./definitions.js')
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

export {parse, specifyTFXElementParseArguments};
