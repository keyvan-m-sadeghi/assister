import {registry} from './registry.js';

export const definitions = [
  {
    htmlTag: 'tfx-term',
    jsonLDType: 'tfx:term',
    required: ['name'],
    optionals: ['description', 'more'],
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
    required: ['src'],
    jsonLDContainerType: 'object',
    jsonLDKey: 'modules'
  },
  {
    htmlTag: 'tfx-import',
    jsonLDType: 'tfx:import',
    required: ['name'],
    jsonLDContainerType: 'object',
    jsonLDKey: 'imports'
  }
];
