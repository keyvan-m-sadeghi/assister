function fetchFile(relativePath) {
  return fetch(relativePath)
    .then(result => result.json());
}

function fetchVersion() {
  return fetchFile('./package.json')
    .then(packageJSON => packageJSON.version);
}

function parse(tfxDefinition) {
  // https://developer.mozilla.org/en-US/docs/Web/API/Element
  Array.from(tfxDefinition.children).map(child => console.log(child.localName))
  return 'empty';
  // return fetchFile('./context.json')
  //   .then(response => JSON.stringify(response, null, 2));
}

export {parse};
