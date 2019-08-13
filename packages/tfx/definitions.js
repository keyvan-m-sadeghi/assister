import {specifyTFXElementParseArguments} from './parser.js';
import {registry} from './registry.js';

specifyTFXElementParseArguments({
  htmlTag: 'tfx-term',
  jsonLDType: 'tfx:term',
  jsonLDSpreadType: 'object',
  jsonLDKey: 'terms',
  optionals: ['extends'],
  conversions: {extends: name => registry.getId(name)}
});

specifyTFXElementParseArguments({
  htmlTag: 'tfx-case',
  jsonLDType: 'tfx:case',
  required: ['pattern'],
  jsonLDSpreadType: 'array',
  jsonLDKey: 'cases'
});

specifyTFXElementParseArguments({
  htmlTag: 'tfx-module',
  jsonLDType: 'tfx:module',
  required: ['name', 'src'],
  jsonLDSpreadType: 'object',
  jsonLDKey: 'modules'
});

specifyTFXElementParseArguments({
  htmlTag: 'tfx-function',
  jsonLDType: 'tfx:function',
  jsonLDSpreadType: 'object',
  jsonLDKey: 'functions'
});

specifyTFXElementParseArguments({
  htmlTag: 'tfx-variable',
  jsonLDType: 'tfx:variable',
  jsonLDSpreadType: 'object',
  jsonLDKey: 'variables'
});

specifyTFXElementParseArguments({
  htmlTag: 'tfx-intent',
  jsonLDType: 'tfx:intent',
  jsonLDSpreadType: 'object',
  jsonLDKey: 'intents'
});

specifyTFXElementParseArguments({
  htmlTag: 'tfx-effect',
  jsonLDType: 'tfx:effect',
  required: ['action'],
  jsonLDSpreadType: 'array',
  jsonLDKey: 'effects'
});
