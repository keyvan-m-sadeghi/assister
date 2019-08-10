function spread(jsonLD, child) {
  const childSpreadMap = {
    object: () => ({
      ...jsonLD,
      ...{
        [child.jsonLDKey]: {
          ...(jsonLD[child.jsonLDKey] || {}),
          ...{[child.jsonLDId]: child.toJsonLD()}
        }
      }
    }),
    array: () => ({
      ...jsonLD,
      ...{
        [child.jsonLDKey]: [
          ...(jsonLD[child.jsonLDKey] || []),
          child.toJsonLD()
        ]
      }
    }),
    none: () => ({
      ...jsonLD,
      ...{[child.jsonLDKey]: child.toJsonLD()}
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
    .reduce((jsonLD, child) => spread(jsonLD, child), initialJsonLD);
}

const nameRegistry = {};

function getId(name) {
  if (!nameRegistry[name]) {
    throw new RangeError(`name "${name}" is not defined.`);
  }

  return nameRegistry[name];
}

const attributeConversionMap = {
  extends: value => getId(value)
};

function specifyTFXElementParseArguments({
  htmlTag,
  jsonLDKey,
  jsonLDSpreadType,
  toJsonLD = element => parseChildren(element),
  optionals = [],
  required = ['name']
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
        nameRegistry[element.name] = id;
        return id;
      }
    },
    jsonLDKey: {value: jsonLDKey},
    jsonLDSpreadType: {value: jsonLDSpreadType},
    toJsonLD: {
      value: () => {
        const spread = keys => keys.reduce((jsonLD, key) => {
          const convert = attributeConversionMap[key] || (value => value);
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
        return {...toJsonLD(element), ...spread(required), ...spread(optionals)};
      }
    }
  });
  elementTFXAssignmentMap[htmlTag] = assignTFXProperties;
}

specifyTFXElementParseArguments({
  htmlTag: 'tfx-term',
  jsonLDKey: 'terms',
  jsonLDSpreadType: 'object',
  optionals: ['extends']
});

specifyTFXElementParseArguments({
  htmlTag: 'tfx-case',
  jsonLDKey: 'cases',
  jsonLDSpreadType: 'array',
  required: ['pattern']
});

specifyTFXElementParseArguments({
  htmlTag: 'tfx-module',
  jsonLDKey: 'modules',
  jsonLDSpreadType: 'object',
  required: ['name', 'src']
});

specifyTFXElementParseArguments({
  htmlTag: 'tfx-function',
  jsonLDKey: 'functions',
  jsonLDSpreadType: 'object'
});

specifyTFXElementParseArguments({
  htmlTag: 'tfx-variable',
  jsonLDKey: 'variables',
  jsonLDSpreadType: 'object'
});

specifyTFXElementParseArguments({
  htmlTag: 'tfx-intent',
  jsonLDKey: 'intents',
  jsonLDSpreadType: 'object'
});

specifyTFXElementParseArguments({
  htmlTag: 'tfx-effect',
  jsonLDKey: 'effects',
  jsonLDSpreadType: 'array',
  required: ['action']
});

function fetchFile(path) {
  return fetch(path)
    .then(result => result.json());
}

function parse(tfxDefinitionElement) {
  tfxDefinitionElement.jsonLDId = '';
  return fetchFile('./context.json')
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
    }))
    .then(jsonLD => JSON.stringify(jsonLD, null, 2));
}

export {parse};
