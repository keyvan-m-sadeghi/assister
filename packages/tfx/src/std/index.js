import * as string from './string.js';
import * as number from './number.js';

const stdMembers = {
  terms: [
    string,
    number
  ],
  macros: []
}

function getJsonLDForSTD() {
  const stdTerms =  stdMembers.terms.map(({name, match, resolve}) => ({
    terms: {
      [`terms/${name}`]: {
        cases: [{
          match,
          ...(resolve ? {resolve} : {})
        }]
      }
    }
  }));

  const stdMacros = [];

  return {
    ...stdTerms.reduce((jsonLD, termJsonLD) => ({
      ...jsonLD,
      ...termJsonLD
    }), {}),
    ...stdMacros.reduce((jsonLD, macroJsonLD) => ({
      ...jsonLD,
      ...macroJsonLD
    }), {}),
  };
}

export const std = getJsonLDForSTD();
