import {generateParser} from './ptrn/generator.js';

document.addEventListener('TFxJsonLDExecutionReady', ({detail: {jsonLD, cases}}) => {
  generateParser(jsonLD);  
}, true);
