import '../node_modules/jsonld/dist/jsonld.js';
import {fetchFile} from '../utils.js';

document.addEventListener('TFxJsonLDExecutionReady', async ({
  detail: {
    jsonLD,
    cases
  }
}) => {
  const context = await fetchFile('./context.json');
  jsonLD['@context'][0] = context;
  console.log(await jsonld.toRDF(jsonLD, {format: 'application/n-quads'}));
  console.log(jsonLD);
  let scenario;

  scenario = await cases['terms/selection/cases/0']([
    {name: 'cell', value: 'foo'},
    {name: 'range', value: 'bar'},
    {name: 'range', value: 'baz'}
  ]);
  console.log(scenario);

  scenario = await cases['terms/format/cases/1']([
    {name: 'cell', value: 'foo'},
    {name: 'range', value: 'bar'},
    {name: 'range', value: 'baz'}
  ]);
  console.log(scenario);

}, true);
