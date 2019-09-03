import 'https://unpkg.com/chevrotain@6.1.0/lib/chevrotain.js';
// const chevrotain = require('chevrotain');
const {createToken, Lexer} = chevrotain;

// Tokens
// http://sap.github.io/chevrotain/docs/tutorial/step1_lexing.html#our-first-token
const whitespace = createToken({
  name: 'whitespace',
  pattern: /\s+/,
  group: Lexer.SKIPPED
});

const literal = createToken({
  name: 'literal',
  pattern: /[^(\${)]+/
});

const templateStart = createToken({
  name: 'templateStart',
  pattern: /\${/,
  push_mode: 'template'
});

const templateEnd = createToken({
  name: 'templateEnd',
  pattern: /}/,
  push_mode: 'literal'
});

const stringStart = createToken({
  name: 'stringStart',
  pattern: /'/,
  push_mode: 'string'
});

const stringEnd = createToken({
  name: 'stringEnd',
  pattern: /'/,
  pop_mode: true
});

const stringContent = createToken({
  name: 'stringContent',
  pattern: /[^']+/
});

const star = createToken({
  name: 'star',
  pattern: /\.\.\./,
});

const groupStart = createToken({
  name: 'groupStart',
  pattern: /\[/
});

const groupEnd = createToken({
  name: 'groupEnd',  
  pattern: /\]/
});

const callStart = createToken({
  name: 'callStart',
  pattern: /\(/,
  push_mode: 'call'
});
const callEnd = createToken({
  name: 'callEnd',
  pattern: /\)/,
  pop_mode: true
});

const optionsStart = createToken({
  name: 'optionsStart',
  pattern: /{/,
  push_mode: 'options'
});

const optionsEnd = createToken({
  name: 'optionsEnd',
  pattern: /}/,
  pop_mode: true
});

const colon = createToken({
  name: 'colon',
  pattern: /:/
});

const comma = createToken({
  name: 'comma',
  pattern: /,/
});

const or = createToken({
  name: 'or',
  pattern: /\|/
});

const macroSign = createToken({
  name: 'macroSign',
  pattern: /!/,
});

const identifier = createToken({
  name: 'identifier',
  pattern: /[^ '{}\[\]\(\):,\|(\.\.\.)!]+/
});

// Define a Multi Mode Lexer
// https://sap.github.io/chevrotain/docs/features/lexer_modes.html
const multiModeLexerDefinition = {
  modes: {
    literal: [
      templateStart,
      literal
    ],
    template: [
      whitespace,
      stringStart,
      groupStart,
      groupEnd,
      identifier,
      callStart,
      optionsStart,
      or,
      star,
      macroSign,
      templateEnd
    ],
    string: [
      stringContent,
      stringEnd
    ],
    options: [
      whitespace,
      colon,
      stringStart,
      identifier,
      optionsStart,
      comma,
      optionsEnd
    ],
    call: [
      whitespace,
      identifier,
      macroSign,
      callStart,
      comma,
      optionsStart,
      callEnd
    ]
  },
  defaultMode: 'literal'
}

export const lexer = new Lexer(multiModeLexerDefinition);

export const tokens = {
  whitespace,
  literal,
  templateStart,
  templateEnd,
  stringStart,
  stringEnd,
  stringContent,
  star,
  groupStart,
  groupEnd,
  callStart,
  callEnd,
  optionsStart,
  optionsEnd,
  colon,
  comma,
  or,
  macroSign,
  identifier
};
