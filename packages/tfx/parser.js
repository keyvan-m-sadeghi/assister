const nameRegistry = {};

function getId(name) {
  if (!nameRegistry[name]) {
    throw new RangeError(`name "${name}" is not defined.`);
  }
  return nameRegistry[name];
}

function spread(jsonLD, child) {
  const childSpreadMap = {
    object: () => {
      jsonLD[child.jsonLDKey] = jsonLD[child.jsonLDKey] || {};
      jsonLD[child.jsonLDKey] =
        {...jsonLD[child.jsonLDKey], ...{[child.jsonLDId]: child.toJsonLD()}};
      return jsonLD;
    },
    array: () => {
      jsonLD[child.jsonLDKey] = jsonLD[child.jsonLDKey] || [];
      jsonLD[child.jsonLDKey] =
        [...jsonLD[child.jsonLDKey], ...[child.toJsonLD()]];
      return jsonLD;
    },
    none: () => {
      jsonLD[child.jsonLDKey] = jsonLD[child.jsonLDKey] || {};
      jsonLD[child.jsonLDKey] =
        {...jsonLD[child.jsonLDKey], ...child.toJsonLD()};
      return jsonLD;
    }
  };
  return childSpreadMap[child.jsonLDSpreadType]();
}

function parseChildren(element, initialJsonLD = {}) {
  return Array.from(element.children)
  .reduce((jsonLD, child) => spread(jsonLD, child), initialJsonLD);
}

class AbstractTFXElement extends HTMLElement {
  get name() {
    return this.getAttribute('name');
  }
  get jsonLDId() {
    const name = this.name ||
      `${this.jsonLDKey}/${Array.from(this.parentElement.children).indexOf(this)}`;
    const id = `${this.parentElement.jsonLDId}/${this.jsonLDKey}/${name}`;
    nameRegistry[this.name] = id;
    return id;
  }
  get jsonLDKey() {
    throw new Error('Not Implemented');
  }
  get jsonLDSpreadType() {
    throw new Error('Not Implemented');
  }

}

const attributeConversionMap = {
  'extends': value => getId(value)
};

function defineTFXElement({
  tagName,
  jsonLDKey,
  jsonLDSpreadType,
  toJsonLD = element => parseChildren(element),
  optionals = [],
  required = ['name'],
  }) {
  const tfxElement = class extends AbstractTFXElement {
    get jsonLDKey() {
      return jsonLDKey;
    }
    get jsonLDSpreadType() {
      return jsonLDSpreadType;
    }
    toJsonLD() {      
      const spread = keys => keys.reduce((jsonLD, key) => {
        const convert = attributeConversionMap[key] || (value => value);
        return {
          ...jsonLD,
          ...(
            this.hasAttribute(key) ?
              {[key]: convert(this.getAttribute(key))} : {}
          )
        }
      }, {});
      required.map(key => {
        if (!this.hasAttribute(key)) {
          throw new TypeError(
            `<${this.localName}> must have a "${key}" attribute.`
          );
        }
      });
      return {...toJsonLD(this), ...spread(required), ...spread(optionals)};
    }
  };
  customElements.define(tagName, tfxElement);
}

defineTFXElement({
  tagName: 'tfx-term',
  jsonLDKey: 'terms',
  jsonLDSpreadType: 'object',
  optionals: ['extends']
});

defineTFXElement({
  tagName: 'tfx-case',
  jsonLDKey: 'cases',
  jsonLDSpreadType: 'array',
  required: ['pattern']
});

defineTFXElement({
  tagName: 'tfx-module',
  jsonLDKey: 'modules',
  jsonLDSpreadType: 'object',
  required: ['name', 'src']
});

defineTFXElement({
  tagName: 'tfx-function',
  jsonLDKey: 'functions',
  jsonLDSpreadType: 'object',
});

defineTFXElement({
  tagName: 'tfx-variable',
  jsonLDKey: 'variable',
  jsonLDSpreadType: 'object',
});

defineTFXElement({
  tagName: 'tfx-intent',
  jsonLDKey: 'intents',
  jsonLDSpreadType: 'object',
});

defineTFXElement({
  tagName: 'tfx-effect',
  jsonLDKey: 'effects',
  jsonLDSpreadType: 'array',
  required: ['action']
});

function fetchFile(relativePath) {
  return fetch(relativePath)
    .then(result => result.json());
}

function fetchVersion() {
  return fetchFile('./package.json')
    .then(packageJson => packageJson.version);
}

function parse(tfxDefinitionElement) {
  return Promise.all([fetchFile('./context.json'), fetchVersion()])
    .then(([jsonLD, tfxVersion]) => ({
      ...jsonLD,
      ...{
        '@context': [
          {
            ...jsonLD['@context'][0],
            ...{
              '@context': {
                '@base': jsonLD['@context'][0]['@context']['@base']
                  .replace('${version}', tfxVersion),
                'tfx': jsonLD['@context'][0]['@context']['tfx']
                  .replace('${version}', tfxVersion),
              }
            }
          }
        ]
      },
      '@id': tfxDefinitionElement.jsonLDId,
      ...parseChildren(tfxDefinitionElement)
    }))
    .then(jsonLD => JSON.stringify(jsonLD, null, 2));
}

export {parse};
