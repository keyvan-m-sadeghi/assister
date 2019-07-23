import { Config } from '@stencil/core';

// https://stenciljs.com/docs/config

export const config: Config = {
  // namespace: 'AssisterChat',
  outputTargets: [{
    type: 'www',
    serviceWorker: null
  }],
  devServer: {
    openBrowser: false
  },
  globalScript: 'src/global/app.ts',
  globalStyle: 'src/global/app.css'
};
