const commonConfig = require('./webpack.common.js');

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const helpers = require('./helpers');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

console.log('------------------------------------------');
console.log(`| STAFFING DESK BUILD IN ${ENV.toUpperCase()} MODE |`);
console.log('------------------------------------------');

module.exports = webpackMerge(commonConfig, {
  mode: 'production',

  output: {
    path: helpers.root('dist', 'wp-wpc'),
    publicPath: '',
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[hash].js'
  },

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        parallel: true,
        uglifyOptions: {
          output: {
            comments: false,
            beautify: false,
          },
        }
      })
    ]
  },

  stats: {
    assets: true,
    children: false,
    chunks: false,
    chunkModules: false,
    colors: true,
    entrypoints: false,
    hash: true,
    modules: false,
    timings: true,
    version: false,

    cached: false,
    cachedAssets: false,
    reasons: false,

    warningsFilter: /System.import/,
  },

  performance: {
    hints: false
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),

    new ExtractTextPlugin('styles-[hash].css'),

    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(ENV)
      }
    }),

    // new webpack.LoaderOptionsPlugin({
    //   htmlLoader: {
    //     minimize: false // workaround for ng2
    //   }
    // })
  ]
});
