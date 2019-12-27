export function fetchFile(path) {
  return fetch(path)
    .then(result => result.json());
}

export function fetchVersion() {
  return fetchFile('./package.json')
    .then(file => file.version);
}
