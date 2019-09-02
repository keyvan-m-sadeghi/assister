import {parseCST} from './parser.js';

export function parse(ptrnText) {
  const {concreteSyntaxTree, BasePTRNVisitor} = parseCST(ptrnText);
  return concreteSyntaxTree;
}