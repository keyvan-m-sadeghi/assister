import {registry} from './registry.js';

export const definitions = [
  {
    htmlTag: 'tfx-term',
    jsonLDType: 'tfx:term',
    jsonLDSpreadType: 'object',
    jsonLDKey: 'terms',
    optionals: ['extends'],
    conversions: {extends: name => registry.getId(name)}
  },
  {
    htmlTag: 'tfx-case',
    jsonLDType: 'tfx:case',
    required: ['pattern'],
    jsonLDSpreadType: 'array',
    jsonLDKey: 'cases'
  },
  {
    htmlTag: 'tfx-module',
    jsonLDType: 'tfx:module',
    required: ['name', 'src'],
    jsonLDSpreadType: 'object',
    jsonLDKey: 'modules'
  },
  {
    htmlTag: 'tfx-function',
    jsonLDType: 'tfx:function',
    jsonLDSpreadType: 'object',
    jsonLDKey: 'functions'
  },
  {
    htmlTag: 'tfx-variable',
    jsonLDType: 'tfx:variable',
    jsonLDSpreadType: 'object',
    jsonLDKey: 'variables'
  },
  {
    htmlTag: 'tfx-intent',
    jsonLDType: 'tfx:intent',
    jsonLDSpreadType: 'object',
    jsonLDKey: 'intents'
  },
  {
    htmlTag: 'tfx-effect',
    jsonLDType: 'tfx:effect',
    required: [],
    jsonLDSpreadType: 'array',
    jsonLDKey: 'effects'
  }
];
