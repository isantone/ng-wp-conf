const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const commonConfig = require('./webpack.common.js');
const helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
  // devtool: 'cheap-module-eval-source-map',
  devtool: 'source-map',

  cache: true,

  entry: {
    'vendor': './src/vendor.ts',
  },

  output: {
    path: helpers.root('dist'),
    // publicPath: '/',
    filename: '[name]-[contenthash].js',
    // chunkFilename: '[id].chunk.js'
    chunkFilename: '[name]-[contenthash].js'
  },

  plugins: [
    new ExtractTextPlugin('styles-[hash].css')
  ],

  devServer: {
    historyApiFallback: true,

    stats: {
      assets: false,
      children: false,
      chunks: true,
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
    }
  }
});
