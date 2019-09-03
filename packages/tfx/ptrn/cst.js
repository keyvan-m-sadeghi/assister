import {lexer, tokens} from './lexer.js';
import 'https://unpkg.com/chevrotain@6.1.0/lib/chevrotain.js';
// const chevrotain = require('chevrotain');
const {CstParser} = chevrotain;

class PTRNParser extends CstParser {
  constructor() {
    super(Object.values(tokens), {
      nodeLocationTracking: 'onlyOffset'
    });
    const $ = this;

    $.RULE('string', () => {
      $.CONSUME(tokens.stringStart);
      $.CONSUME(tokens.stringContent);
      $.CONSUME(tokens.stringEnd);
    });

    $.RULE('keyValue', () => {
      $.CONSUME(tokens.identifier);
      $.CONSUME(tokens.colon);
      $.OR([
        {ALT: () => $.SUBRULE($.string)},
        {ALT: () => $.CONSUME2(tokens.identifier)},
        {ALT: () => $.SUBRULE($.options)},
      ]);
    });

    $.RULE('options', () => {
      $.CONSUME(tokens.optionsStart);
      $.AT_LEAST_ONE_SEP({
        SEP: tokens.comma,
        DEF: () => $.SUBRULE($.keyValue)
      });
      $.CONSUME(tokens.optionsEnd);
    });

    $.RULE('termCall', () => {
      $.CONSUME(tokens.callStart);
      $.SUBRULE($.options);
      $.CONSUME(tokens.callEnd);
    });

    $.RULE('macroCall', () => {
      $.CONSUME(tokens.macroSign);
      $.CONSUME(tokens.callStart);
      $.AT_LEAST_ONE_SEP({
        SEP: tokens.comma,
        DEF: () => $.OR([
          {ALT: () => $.SUBRULE($.termOrMacro)},
          {ALT: () => $.SUBRULE($.options)}
        ])
      });
      $.CONSUME(tokens.callEnd);
    });

    $.RULE('termOrMacro', () => {
      $.CONSUME(tokens.identifier);
      $.OPTION(() => $.OR([
        {ALT: () => $.SUBRULE($.termCall)},
        {ALT: () => $.SUBRULE($.macroCall)}
      ]));
    });

    $.RULE('unit', () => $.OR([
      {ALT: () => $.SUBRULE($.string)},
      {ALT: () => $.SUBRULE($.termOrMacro)},
      {ALT: () => $.SUBRULE($.group)}
    ]));

    $.RULE('repetition', () => {
      $.SUBRULE($.unit);
      $.OPTION(() => $.CONSUME(tokens.star));
    });

    $.RULE('concatenation', () => $.AT_LEAST_ONE(() => {
      $.SUBRULE($.repetition);
    }));

    $.RULE('alternation', () => {
      $.AT_LEAST_ONE_SEP({
        SEP: tokens.or,
        DEF: () => $.SUBRULE($.concatenation)
      });
    });

    $.RULE('group', () => {
      $.CONSUME(tokens.groupStart);
      $.AT_LEAST_ONE(() => $.SUBRULE($.alternation));
      $.CONSUME(tokens.groupEnd);
    });

    $.RULE('template', () => {
      $.CONSUME(tokens.templateStart);
      $.SUBRULE($.alternation);
      $.CONSUME(tokens.templateEnd);
    });

    $.RULE('pattern', () => $.AT_LEAST_ONE(() => $.OR([
      {ALT: () => $.CONSUME(tokens.literal)},
      {ALT: () => $.SUBRULE($.template)}
    ])));

    this.performSelfAnalysis();
  }
}

export function parse(ptrnText) {
  const lexResult = lexer.tokenize(ptrnText);
  let error = lexResult.errors[0];
  if (error) {
    error.allErrors = lexResult.errors;
    error.remainingText = ptrnText.slice(error.offset);
    throw error;
  }
  const parser = new PTRNParser();
  parser.input = lexResult.tokens;
  const concreteSyntaxTree = parser.pattern();
  error = parser.errors[0];
  if (error) {
    error.allErrors = parser.errors;
    error.remainingText = ptrnText.slice(error.token.startOffset);
    throw error;
  }
  return {
    concreteSyntaxTree,
    BasePTRNVisitor: parser.getBaseCstVisitorConstructorWithDefaults()
  };
}

// console.log(parse("   ' } ... . foo | \${bar ...}"));
