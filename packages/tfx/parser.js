function fetchFile(relativePath) {
  return fetch(relativePath)
    .then(result => result.json());
}

function fetchVersion() {
  return fetchFile('./package.json')
    .then(packageJSON => packageJSON.version);
}

function parse(tfxDefinition) {
  return fetchFile('./context.json')
    .then(response => JSON.stringify(response, null, 2));
}

export {parse};
