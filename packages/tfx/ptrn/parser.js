import 'https://unpkg.com/chevrotain@6.1.0/lib/chevrotain.js';
// const chevrotain = require('chevrotain');
const {createToken, Lexer, EmbeddedActionsParser, CstParser} = chevrotain;

// Tokens
const whitespace = createToken({
  name: 'whitespace',
  pattern: /\s+/,
  group: Lexer.SKIPPED
});
const variableStart = createToken({name: 'variableStart', pattern: /\${/});
const quote = createToken({name: 'quote', pattern: /'/});

// Token Categories
// See: https://sap.github.io/chevrotain/docs/features/token_categories.html
const variableEnd = createToken({name: 'variableEnd', pattern: Lexer.NA});
const literal = createToken({name: 'literal', pattern: Lexer.NA});
const callStart = createToken({name: 'callStart', pattern: Lexer.NA});
const callEnd = createToken({name: 'callEnd', pattern: Lexer.NA});

// Polymorphic tokens
const braceEnd = createToken({
  name: 'braceEnd',
  pattern: /}/,
  categories: [variableEnd]
});
const repetition = createToken({
  name: 'repetition',
  pattern: /\.\.\./,
  categories: [literal]
});
const dot = createToken({
  name: 'dot',
  pattern: /\./,
  categories: [literal],
  longer_alt: repetition
});
const braceStart = createToken({
  name: 'braceStart',
  pattern: /{/,
  categories: [literal]
});
const or = createToken({
  name: 'or',
  pattern: /\|/,
  categories: [literal]
});
const doubleQuote = createToken({
  name: 'doubleQuote',
  pattern: /&quot;|"/,
  categories: [literal]
});
const groupStart = createToken({
  name: 'groupStart',
  pattern: /\(/,
  categories: [literal, callStart]
});
const groupEnd = createToken({
  name: 'groupEnd',
  pattern: /\)/,
  categories: [literal, callEnd]
});
const identifier = createToken({
  name: 'identifier',
  pattern: /[^ '}\(\)\|(\.\.\.)]+/,
  categories: [literal]
});

const tokens = [
  whitespace,
  braceStart,
  braceEnd,
  variableStart,
  variableEnd,
  or,
  groupStart,
  groupEnd,
  callStart,
  callEnd,
  doubleQuote,
  identifier,
  quote,
  dot,
  repetition,
  literal
];

const lexer = new Lexer(tokens);

class PTRNParser extends CstParser {
  constructor() {
    super(tokens);
    const $ = this;

    $.RULE('string', () => {
      $.CONSUME(quote);
      $.MANY(() => $.CONSUME(literal));
      $.CONSUME2(quote);
    });

    $.RULE('callOptions', () => {
      $.CONSUME(braceStart);
      $.AT_LEAST_ONE(() => $.OR([
        {ALT: () => $.CONSUME(identifier)},
        {ALT: () => $.SUBRULE($.string)}
      ]));
      $.CONSUME(braceEnd);
    });

    $.RULE('call', () => {
      $.CONSUME(callStart);
      $.SUBRULE($.callOptions);
      $.CONSUME(callEnd);
    });

    $.RULE('term', () => {
      $.CONSUME(identifier);
      $.OPTION(() => $.SUBRULE($.call));
    });

    $.RULE('group', () => {
      $.CONSUME(groupStart);
      $.AT_LEAST_ONE(() => $.OR([
        {ALT: () => $.SUBRULE($.term)},
        {ALT: () => $.SUBRULE($.string)},
        {ALT: () => $.CONSUME(or)},
        {ALT: () => $.SUBRULE($.group)}
      ]));
      $.CONSUME(groupEnd);
    });

    $.RULE('repetitions', () => $.AT_LEAST_ONE(() => {
      $.OR([
        {ALT: () => $.SUBRULE($.term)},
        {ALT: () => $.SUBRULE($.group)}
      ]);
      $.OPTION(() => $.CONSUME(repetition));
    }));

    $.RULE('concatenations', () => $.AT_LEAST_ONE({
      DEF: () => {
        $.OR([
          {ALT: () => $.SUBRULE($.repetitions)},
          {ALT: () => $.SUBRULE($.string)}
        ]);
      }
    }));

    $.RULE('variables', () => {
      $.CONSUME(variableStart);
      $.AT_LEAST_ONE_SEP({
        SEP: or,
        DEF: () => $.SUBRULE($.concatenations)
      });
      $.CONSUME(variableEnd);
    });

    $.RULE('literals', () => $.AT_LEAST_ONE(() => $.OR([
        {ALT: () => $.CONSUME(quote)},
        {ALT: () => $.CONSUME(braceEnd)},
        {ALT: () => $.CONSUME(literal)}
      ])
    ));

    $.RULE('pattern', () => $.AT_LEAST_ONE(() => $.OR([
        {ALT: () => $.SUBRULE($.variables)},
        {ALT: () => $.SUBRULE($.literals)}
      ])
    ));

    this.performSelfAnalysis();
  }
}

export function parse(text) {
  const lexed = lexer.tokenize(text);
  const parser = new PTRNParser();
  parser.input = lexed.tokens;
  const abstractSyntaxTree = parser.pattern();
  if (parser.errors.length > 0) {
    console.error(parser.errors);
    throw parser.errors[0];
  }
  return abstractSyntaxTree;
}

// console.log(parse("   ' } ... . foo | \${bar ...}"));
