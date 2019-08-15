import {definitions} from './definitions.js';

const execution = new Map();

const grab = (parent, childKey) => {
  const spreadTypeMap = {};
  definitions.map(({jsonLDKey, jsonLDSpreadType}) => {
    spreadTypeMap[jsonLDKey] = jsonLDSpreadType;
  });
  const grabMap = {
    object: (parent, childKey) => Object.values(parent[childKey]),
    array: (parent, childKey) => [...parent[childKey]],
    none: (parent, childKey) => [parent[childKey]]
  };
  return grabMap[spreadTypeMap[childKey]](parent, childKey);
};

function getAbsolutePath(baseURI, relativeURI) {
  baseURI = baseURI.slice(-1) != '/' ? `${baseURI}/` : baseURI;
  return `${baseURI}${relativeURI.slice(2)}`;
}

function parse(jsonLD, baseURI) {
  const globalScope = {};
  const importName = (child, parent) =>
    import(getAbsolutePath(baseURI, parent.src))
      .then(module => {
        globalScope[child.name] = module[child.name];
      });      
  Promise.all([
    ...grab(jsonLD, 'modules')
      .map(moduleJsonLD => Promise.all([
        ...grab(moduleJsonLD, 'functions')
          .map(functionJsonLD => importName(functionJsonLD, moduleJsonLD)),
        ...grab(moduleJsonLD, 'variables')
          .map(variableJsonLD => importName(variableJsonLD, moduleJsonLD))
      ]))
  ])
    .then(() => globalScope.setCurrentSelection('foo'))
    .then(() => console.log(globalScope))
    .then(() => {
      const bar = new Function(`{${Object.keys(globalScope).join(',')}}`, 'return currentSelection');
      window.bar = () => bar(globalScope);
    });
  // Object.entries(jsonLD.intents).map((id, intent) => {
  // });
}

function watch(jsonLDElement) {
  if (execution.has(jsonLDElement)) {
    return;
  }
  const observer = new MutationObserver(() => {
    const jsonLD = JSON.parse(jsonLDElement.innerHTML);
    execution.set(jsonLDElement, parse(jsonLD, jsonLDElement.baseURI));
    console.log(jsonLD)
    window.foo = () => parse(jsonLD, jsonLDElement.baseURI)
  });
  observer.observe(jsonLDElement, {childList:true, subtree: true});
  jsonLDElement.observer = observer;
}

function interpret(command) {
  return command;
}

export {interpret, watch};
