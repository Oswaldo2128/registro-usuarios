'use strict';
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const SentryCliPlugin = require('@sentry/webpack-plugin');

const { styleLoaders } = require('./vue.utils');
const config = require('./config');

const webpackConfig = {
  module: {
    rules: styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true,
    }),
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    filename: 'app/[name].[contenthash].bundle.js',
    chunkFilename: 'app/[id].[chunkhash].chunk.js',
  },
  optimization: {
    moduleIds: 'deterministic',
    minimizer: [
      '...',
      new CssMinimizerPlugin({
        parallel: true,
      }),
    ],
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  plugins: [
    new TerserPlugin({
      terserOptions: {
        compress: {
          arrows: false,
          collapse_vars: false,
          comparisons: false,
          computed_props: false,
          hoist_funs: false,
          hoist_props: false,
          hoist_vars: false,
          inline: false,
          loops: false,
          negate_iife: false,
          properties: false,
          reduce_funcs: false,
          reduce_vars: false,
          switches: false,
          toplevel: false,
          typeofs: false,
          booleans: true,
          if_return: true,
          sequences: true,
          unused: true,
          conditionals: true,
          dead_code: true,
          evaluate: true,
        },
        mangle: {
          safari10: true,
        },
      },
      parallel: true,
      extractComments: false,
    }),
    // extract css into its own file
    new MiniCssExtractPlugin({
      filename: 'content/[name].[contenthash].css',
      chunkFilename: 'content/[id].css',
    }),
    // keep module.id stable when vendor modules does not change
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        vue: {
          enabled: true,
          compiler: 'vue-template-compiler',
        },
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
      },
      formatter: 'codeframe',
    }),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      exclude: [/swagger-ui/],
    }),
  ],
};

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin');

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp('\\.(' + config.build.productionGzipExtensions.join('|') + ')$'),
      threshold: 10240,
      minRatio: 0.8,
    })
  );
}

if (process.env.SENTRY_AUTH_TOKEN && process.env.SENTRY_ENVIRONMENT && process.env.SENTRY_URL) {
  webpackConfig.plugins.push(
    new SentryCliPlugin({
      org: process.env.hasOwnProperty('SENTRY_ORG') ? process.env.SENTRY_ORG : 'crip',
      project: process.env.hasOwnProperty('SENTRY_PROJECT') ? process.env.SENTRY_PROJECT : 'snp-front',
      release: config.version,
      debug: true,
      dist: config.appDistribution,
      deploy: {
        env: process.env.SENTRY_ENVIRONMENT,
      },
    })
  );
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = async () => webpackConfig;