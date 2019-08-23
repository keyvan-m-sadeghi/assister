import {definitions} from './definitions.js';

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

function transpileModules(jsonLD) {
  const baseURI = jsonLD['@context'].slice(-1)[0]['@base'];
  const combinedNames = new Set();
  const addName = jsonLD => {
    combinedNames.add(jsonLD.name);
    return jsonLD.name;
  };

  const pathMembersMap = grab(jsonLD, 'modules')
    .reduce((aggregated, moduleJsonLD) => ({
      ...aggregated,
      [getAbsolutePath(baseURI, moduleJsonLD.src)]: [
        ...grab(moduleJsonLD, 'functions')
          .map(addName),
        ...grab(moduleJsonLD, 'variables')
          .map(addName)
      ].join(', ')
    }), {});
  const imports = Object.entries(pathMembersMap)
    .map(([path, members]) => `
        import('${path}')
          .then((${`{${members}}`}) => ${`({${members}})`}),
      `)
    .join('');
  const combined = `({${[...combinedNames].join(', ')}})`;

  // Below is the template for the final returned execution function
  const transpiled = () => Promise.all([
    IMPORTS
  ])
    .then(
      modules => modules.reduce((combinedMembers, members) => ({
        ...combinedMembers,
        ...members
      }), {})
    )
    .then(
      COMBINED => {
        EXECUTION;
      }
    );
  return transpiled
    .toString()
    .replace('IMPORTS', imports)
    .replace('COMBINED', combined);
}

function transpileExecution(jsonLD) {
  const transpiled = () => {
    const executeCase = ({
      caseID,
      conversions,
      resolve,
      then
    }) => nameValuePairs => {
      const convert = () => Promise.all(nameValuePairs
        // Input from term parsing: [{name: 'term1', value: 'value1'}, ...]
        .map(({name, value}) => Promise.resolve(
          // Default conversion is value => value
          (conversions[name] || (value => value))(value)
        ))
      );
      let currentStage = 'convert';
      const throwError = error => {
        console.warn(`Error in "${currentStage}" stage of "${
          caseID
        }" execution`);
        throw error;
      };

      const changeStage = stage => value => {
        currentStage = stage;
        return value;
      };

      const executionFunction = convert()
        .then(changeStage('resolve'))
        .then(resolve);
      return executionFunction
        .then(changeStage('then'))
        .then(then)
        .catch(throwError)
        .then(() => executionFunction);
    };

    const cases = {
      CASES
    };
    return Object.entries(cases)
      .reduce((caseExecuteMap, [caseID, {conversions, resolve, then}]) => ({
        ...caseExecuteMap,
        [caseID]: executeCase({caseID, conversions, resolve, then})
      })
      , {});
  };

  const transpileCaseKey = ({jsonLDKey, defaultFunction}) => caseJsonLD =>
    `${caseJsonLD[jsonLDKey] || defaultFunction.toString()}`;
  const transpileResolve = transpileCaseKey({
    jsonLDKey: 'resolve',
    defaultFunction: value => value
  });
  const transpileThen = transpileCaseKey({
    jsonLDKey: 'then',
    defaultFunction: () => {}
  });
  const transpileConvert = caseJsonLD => caseJsonLD.convert ||
    '{}'; // Default convert is an empty object

  const cases = grab(jsonLD, 'terms')
    .map(termJsonLD => grab(termJsonLD, 'cases')
      .map(caseJsonLD =>
        `'${caseJsonLD['@id']}': {
          conversions: ${transpileConvert(caseJsonLD)},
          resolve: ${transpileResolve(caseJsonLD)},
          then: ${transpileThen(caseJsonLD)}
        }`
      )
      .join(',\n')
    )
    .join(',\n');

  return transpiled.toString()
    .replace('CASES', cases);
}

function transpile(jsonLD, executionKey) {
  const executionFunctionBody = `return (${transpileModules(jsonLD)})();`
    .replace('EXECUTION', `return (${transpileExecution(jsonLD)})();`);
  console.log(executionFunctionBody);
  execution.set(executionKey, new Function(executionFunctionBody));
}

function watch(jsonLDElement) {
  const observer = new MutationObserver(() => {
    const jsonLD = JSON.parse(jsonLDElement.innerHTML);
    transpile(jsonLD, jsonLDElement);
    execution.get(jsonLDElement)()
      .then(v => {
        console.log(v); return v;
      })
      .then(cases => cases['terms/selection/cases/0'])
      .then(invoke => invoke([
        {name: 'cell', value: 'foo'},
        {name: 'range', value: 'bar'},
        {name: 'range', value: 'baz'}
      ]))
      .then(console.log);

    // execution.get(jsonLDElement)()
    //   .then(v => {
    //     console.log(v); return v;
    //   })
    //   .then(cases => cases['terms/format/cases/1'])
    //   .then(invoke => invoke([
    //     {name: 'cell', value: 'foo'},
    //     {name: 'range', value: 'bar'},
    //     {name: 'range', value: 'baz'}
    //   ]))
    //   .then(console.log);
  });
  observer.observe(jsonLDElement, {childList: true, subtree: true});
  jsonLDElement.observer = observer;
}

function interpret(command) {
  return command;
}

export {interpret, watch};
