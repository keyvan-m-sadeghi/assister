const types = {
  'number': Number,
  'date': Date
};

function format(selection) {
  return selection;
}

let currentSelection = 'A1';

function setCurrentSelection(value) {
  currentSelection = value;
}

export {types, format, currentSelection, setCurrentSelection};
