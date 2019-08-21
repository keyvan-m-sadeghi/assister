const types = {
  number: Number,
  date: Date
};

function format(selection, type) {
  console.log(`formated "${selection}" as "${type}"`);
}

let currentSelection = 'A1';

function setCurrentSelection(value) {
  currentSelection = value;
  console.log(`set currentSelection to "${value}"`);
}

export {types, format, currentSelection, setCurrentSelection};
