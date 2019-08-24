import {registry} from './registry.js';

export const definitions = [
  {
    htmlTag: 'tfx-term',
    jsonLDType: 'tfx:term',
    jsonLDContainerType: 'object',
    jsonLDKey: 'terms',
    optionals: ['extends'],
    conversions: {extends: name => registry.getId(name)}
  },
  {
    htmlTag: 'tfx-case',
    jsonLDType: 'tfx:case',
    required: ['pattern'],
    optionals: ['resolve', 'then', 'convert'],
    jsonLDContainerType: 'array',
    jsonLDKey: 'cases'
  },
  {
    htmlTag: 'tfx-module',
    jsonLDType: 'tfx:module',
    required: ['name', 'src'],
    jsonLDContainerType: 'object',
    jsonLDKey: 'modules'
  },
  {
    htmlTag: 'tfx-import',
    jsonLDType: 'tfx:import',
    jsonLDContainerType: 'object',
    jsonLDKey: 'imports'
  }
];
