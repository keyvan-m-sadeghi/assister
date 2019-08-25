// Tests in Node.js are not possible until dynamic imports are implemented in jsdom:
// https://github.com/jsdom/jsdom/issues/2651

const fs = require('fs');
// const test = require('ava');
const {JSDOM, VirtualConsole, ResourceLoader} = require('jsdom');

const virtualConsole = new VirtualConsole();
virtualConsole.sendTo(console);

class FileResourceLoader extends ResourceLoader {
  fetch(urlString, options) {
    urlString = 'file:///home/user/assister/packages/tfx/elements.js';
    return super.fetch(urlString, options);
  }
}

const resources = new FileResourceLoader({
  proxy: 'http://localhost:8080',
  strictSSL: false
});

const {window: {document}} = new JSDOM(
  fs.readFileSync('./test/index.html', {encoding: 'utf8'}),
  {
    virtualConsole,
    resources,
    runScripts: 'dangerously'
  }
);

console.log(document.querySelector('tfx-definition'));

// jsonld.toRDF(jsonLD, {format: 'application/n-quads'}).then(console.log);

// test('e2', async t => {
//   setTimeout(t.pass, 5000);
//   document.addEventListener('TFxJsonLDAdded', () => t.pass());
// });

setTimeout(console.log, 5000);
