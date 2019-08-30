import '../node_modules/jsonld/dist/jsonld.js';

document.addEventListener('TFxJsonLDExecutionReady', async ({
  detail: {
    jsonLD,
    cases
  }
}) => {
  // jsonLD['@context'][0] = await fetchFile('./context.json');
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
