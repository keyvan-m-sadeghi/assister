import {definitions} from './definitions.js';
import {Registry} from './registry.js';

const registry = new Registry();

const jsonLDElementWatchSet = new Set();
let execute;

const grab = (parent, childKey) => {
  const spreadTypeMap = {};
  definitions.map(({jsonLDKey, jsonLDSpreadType}) => {
    spreadTypeMap[jsonLDKey] = jsonLDSpreadType;
  });
  const grabMap = {
    object: (parent, childKey) => Object.entries(parent[childKey])
      .map(([id, child]) => ({
        '@id': id,
        ...child
      })),
    array: (parent, childKey) => [...parent[childKey]],
    none: (parent, childKey) => [parent[childKey]]
  };
  return grabMap[spreadTypeMap[childKey]](parent, childKey);
};

function getAbsolutePath(baseURI, relativeURI) {
  if (!relativeURI.startsWith('./')) {
    return relativeURI;
  }
  baseURI = baseURI.slice(-1) != '/' ? `${baseURI}/` : baseURI;
  return `${baseURI}${relativeURI.slice(2)}`;
}

function transpileExecutionFunction(jsonLD) {
  const baseURI = jsonLD['@context'].slice(-1)[0]['@base'];
  // const modules =
  const functionText =`
  // return Promise.all([
  //   // import('./module1.js').then(({function1, variable1}) => {function1, variable1}),
  //   // import('./module2.js').then(({function2, variable2}) => {function2, variable2}),
  // ])
  //   .then(modules => modules.reduce((aggregated, names) => ({
  //     ...aggregated,
  //     ...names
  //   }), {}))
  //   // .then(({function1, variable1, function2, variable2}) => {
  //   .then(({}) => {
  //     terms
  //     return 42;
  //   })
  `;
  const globalScope = {};
  const importName = (child, parent) =>
    import(getAbsolutePath(baseURI, parent.src))
      .then(module => {
        globalScope[child.name] = module[child.name];
      })
      .then(() => registry.register(child.name, child['@id']));
  return Promise.all([
    ...grab(jsonLD, 'modules')
      .map(moduleJsonLD => Promise.all([
        ...grab(moduleJsonLD, 'functions')
          .map(functionJsonLD => importName(functionJsonLD, moduleJsonLD)),
        ...grab(moduleJsonLD, 'variables')
          .map(variableJsonLD => importName(variableJsonLD, moduleJsonLD))
      ]))
  ])
    // .then(
    //   () => grab(jsonLD, 'intents')
    //     .map(intentJsonLD => {
    //       const intentScope = {...globalScope};
    //       grab(intentJsonLD, 'variables')
    //         .map(variableJsonLD => {
    //           Object.defineProperty(intentScope, variableJsonLD.name, {
    //             get: () => new Function(
    //               `{${Object.keys(intentScope).join(',')}}`,
    //               `return ${variableJsonLD.map || 'value => value'}`
    //               )
    //                 .call(null, intentScope)
    //                 .call(
    //                   null,
    //                   intentScope['@global']['@terms'][variableJsonLD.term]
    //                 )
    //           });
    //         })
    //       execution[intentJsonLD.name] = intentScope;
    //     })
    // )
    .then(() => globalScope.setCurrentSelection('foo'))
    .then(() => console.log(globalScope))
    .then(() => {
      console.log(registry.scopes)
      const bar = new Function(`{${Object.keys(globalScope).join(',')}}`, 'return currentSelection');
      window.bar = () => bar(globalScope);
    });
  // Object.entries(jsonLD.intents).map((id, intent) => {
  // });
}

function watch(jsonLDElement) {
  if (jsonLDElementWatchSet.has(jsonLDElement)) {
    return;
  }
  const observer = new MutationObserver(() => {
    const jsonLD = JSON.parse(jsonLDElement.innerHTML);
    jsonLDElementWatchSet.add(jsonLDElement);
    console.log(jsonLDElementWatchSet)
    transpileExecutionFunction(jsonLD, jsonLDElement.baseURI)
    console.log(jsonLD)
    window.foo = () => transpileExecutionFunction(jsonLD)
  });
  observer.observe(jsonLDElement, {childList:true, subtree: true});
  jsonLDElement.observer = observer;
}

function interpret(command) {
  return command;
}

export {interpret, watch};
