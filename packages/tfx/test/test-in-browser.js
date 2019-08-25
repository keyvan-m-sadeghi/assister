document.addEventListener('TFxJsonLDExecutionReady', ({detail: {cases}}) => {
  let execute = cases['terms/selection/cases/0'];
  execute([
    {name: 'cell', value: 'foo'},
    {name: 'range', value: 'bar'},
    {name: 'range', value: 'baz'}
  ])
    .then(console.log);

  execute = cases['terms/format/cases/1'];
  execute([
    {name: 'cell', value: 'foo'},
    {name: 'range', value: 'bar'},
    {name: 'range', value: 'baz'}
  ])
    .then(console.log);
}, true);
