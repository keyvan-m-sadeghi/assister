export const name = '#string';

export function match({
  letters = 'alphabetic', // | 'numeric' | 'alphanumeric' | 'any'
  length,
  // Rename 'case' due to being a JavaScript keyword
  case: caseOfLetters = 'any' // | 'upper' | 'lower'
}) {
  if (letters === 'any' && !length) {
    throw new RangeError(
      `Broad ${name} invocation, either a "length" should be specified
      or "characters" should not be "any".`
    );
  }

  const casePatternMap = {
    any: 'A-Za-z',
    upper: 'A-Z',
    lower: 'a-z'
  };
  const casePattern = casePatternMap[caseOfLetters];
  if (!casePattern) {
    throw new RangeError(
      `Invalid "case" in ${name} invocation: {case: "${caseOfLetters}"},
      allowed values are: "any", "upper" and "lower".`
    );
  }

  const lettersPatternMap = {
    any: '.',
    numeric : '[0-9]',
    alphanumeric: `[${casePattern}0-9]`,
    alphabetic: `[${casePattern}]`
  };
  const lettersPattern = lettersPatternMap[letters];
  if (!lettersPattern) {
    throw new RangeError(
      `Invalid "characters" in ${name} invocation: {characters: "${letters}"},
      allowed values are: "any", "alphabetic", "numeric" and "alphanumeric".`
    );
  }

  const lengthPattern = length ? `{${length}}` : '+';

  return {
    pattern: new RegExp(`${lettersPattern}${lengthPattern}`)
  };
}
