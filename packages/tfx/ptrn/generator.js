import {parse} from './ast.js';
import {grab} from '../interpreter.js';
import 'https://unpkg.com/chevrotain@6.1.0/lib/chevrotain.js';
// const chevrotain = require('chevrotain');
const {createToken, Lexer, CstParser} = chevrotain;

export function generateParser(jsonLD) {
  grab(jsonLD, 'terms')
    .map(termJsonLD => grab(termJsonLD, 'cases')
      .map(caseJsonLD => {
        console.log(parse(caseJsonLD.pattern));
      })
    );
}
