'use strict';

const path = require('path');

module.exports = {
  serverApiUrl: '',
  // APP_VERSION is passed as an environment variable from the Gradle / Maven build tasks.
  version: process.env.hasOwnProperty('APP_VERSION') ? process.env.APP_VERSION : 'UNKNOWN',
  appDistribution: process.env.hasOwnProperty('CI_PIPELINE_IID')
    ? process.env.CI_PIPELINE_IID
    : process.env.hasOwnProperty('DRONE_BUILD_NUMBER')
    ? process.env.DRONE_BUILD_NUMBER
    : 'None',

  dev: {
    hotReload: true,

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true,
  },

  build: {
    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: 'source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report,
  },
};