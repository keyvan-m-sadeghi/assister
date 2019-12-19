export const name = '#number';

export function match({
  range: {
    start,
    step = 1,
    end
  } = {}
}) {
  if (!start && !end) {
    throw new RangeError(
      `Broad ${name} invocation, either a "range" should be specified with a
      "start" and/or an "end", or a "format".`
    );
  }

  const numberPattern = /\d+(?:\.\d+)/;
  const matchNumber = (text, startOffset) => {
    const matched = text.slice(startOffset).match(numberPattern);
    if (!matched || matched.index > 0) {
      return null;
    }
    const number = parseFloat(matched[0]);
    if (start && number < start) {
      return null;
    }
    if (end && number > end) {
      return null;
    }
    return matched;
  }

  return {
    pattern: {exec: matchNumber},
    start_chars_hint: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  };
}

export function resolve([number]) {
  return parseFloat(number);
}
