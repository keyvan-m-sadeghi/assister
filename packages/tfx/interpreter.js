import {definitions} from './definitions.js';
import {Registry} from './registry.js';

const grab = (parent, childKey) => {
  const spreadTypeMap = {};
  definitions.map(({jsonLDKey, jsonLDContainerType}) => {
    spreadTypeMap[jsonLDKey] = jsonLDContainerType;
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

const execution = new Map();

function transpile(jsonLD, executionKey) {
  const baseURI = jsonLD['@context'].slice(-1)[0]['@base'];
  const pathMembersMap = grab(jsonLD, 'modules')
    .reduce((aggregated, moduleJsonLD) => ({
      ...aggregated,
      [getAbsolutePath(baseURI, moduleJsonLD.src)]: [
        ...grab(moduleJsonLD, 'functions')
          .map(functionJsonLD => functionJsonLD.name),
        ...grab(moduleJsonLD, 'variables')
          .map(variableJsonLD => variableJsonLD.name),
      ].join(', ')
    }), {});
  const executionFunctionBody = `
  return Promise.all([${
    Object.entries(pathMembersMap).map(([path, members]) =>  `
      // import('./module1.js')
      //  .then(({function1, variable1}) => {function1, variable1}),
      // import('./module2.js')
      //  .then(({function2, variable2}) => {function2, variable2})
      import('${path}')
        .then((${`{${members}}`}) => ${`({${members}})`})
    `).join(',\n')
  }])
    .then(modules => modules.reduce((aggregated, members) => ({
      ...aggregated,
      ...members
    }), {}))
    // .then(({function1, variable1, function2, variable2}) => {
    .then((${`{${Object.values(pathMembersMap).join(', ')}}`}) => {
      // Input from term parsing example: [{term: 'term1', value: 'value1'}, ...]      
      return {
        ${grab(jsonLD, 'terms')
          .reduce((concatenated, termJsonLD) => concatenated +
            grab(termJsonLD, 'cases')
              .map(caseJsonLD => `'${caseJsonLD['@id']}': termValuePairs => {
                const convert = () => Promise.resolve()
                  .then(() =>  Promise.all(
                    termValuePairs
                    .map(({term, value}) => Promise.resolve(value)
                      .then(${
                        caseJsonLD.convert &&
                        `${caseJsonLD.convert}[term] || (value => value)` ||
                        'value => value'
                      })
                    )
                  ));
                const resolve = ${caseJsonLD.resolve || 'value => value'};
                const then = ${caseJsonLD.then || '_ => {}'};

                let currentStage = 'convert';
                const throwError = error => {
                  throw new Error(
                    'Error in "' +
                    currentStage +
                    '" of "${caseJsonLD['@id']}" execution: ' +
                    error.message
                  );
                };
                const changeStage = stage => value => {
                  currentStage = stage;
                  return value;
                };
                const result = convert()
                  .then(changeStage('resolve'))
                  .then(resolve);
                return result
                  .then(changeStage('then'))
                  .then(then)
                  .catch(throwError)
                  .then(() => result)
                  ;
                },
`
            ).join('')
          , '')
        }
      };
    })
  `;
  // console.log(executionFunctionBody)
  execution.set(executionKey, Function(executionFunctionBody));
}

function watch(jsonLDElement) {
  const observer = new MutationObserver(() => {
    const jsonLD = JSON.parse(jsonLDElement.innerHTML);
    transpile(jsonLD, jsonLDElement)
    execution.get(jsonLDElement)()
    .then(v => {console.log(v.toString()); return v;})
      .then(cases => cases['terms/selection/cases/0'])
      .then(v => {console.log(v.toString()); return v;})
      .then(invoke => invoke([
        {term: 'cell', value: 'foo'},
        {term: 'range', value: 'bar'},
        {term: 'range', value: 'baz'},
      ]))
      .then(console.log)
  });
  observer.observe(jsonLDElement, {childList:true, subtree: true});
  jsonLDElement.observer = observer;
}

function interpret(command) {
  return command;
}

export {interpret, watch};
