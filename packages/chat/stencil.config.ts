import { Config } from '@stencil/core';

// https://stenciljs.com/docs/config

export const config: Config = {
  namespace: 'Chat',
  outputTargets: [
    {
      type: 'www',
      serviceWorker: null
    },
    {
      type: 'dist'
    },
    {
      type: 'docs-readme'
    }
  ],
  devServer: {
    openBrowser: false
  },
  globalScript: 'src/global/app.ts',
  globalStyle: 'src/global/app.css'
};
