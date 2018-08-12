const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const helpers = require('./helpers');

const createLodashAliases = require('lodash-loader').createLodashAliases;

module.exports = {
  parallelism: 4,

  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'main': './src/main.ts',
    'styles': './src/styles.scss'
  },

  resolve: {
    extensions: ['.ts', '.js'],
    alias: createLodashAliases()
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        include: helpers.root('src'),
        loaders: [
          {
            loader: 'awesome-typescript-loader',
            options: { configFileName: helpers.root('src', 'tsconfig.app.json') }
          },
          {
            loader: 'lodash-loader',
            options: { importMode: 'es2015' }
          },
          'angular2-template-loader'
        ]
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: 'html-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file-loader?name=assets/[name].[hash].[ext]'
      },
      {
        test: /\.css$/,
        exclude: helpers.root('src', 'app'),
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader?sourceMap' })
      },
      {
        test: /\.css$/,
        include: helpers.root('src', 'app'),
        loader: 'raw-loader'
      },
      {
        test: /\.scss$/,
        exclude: helpers.root('src', 'app'),
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader?sourceMap', 'sass-loader'] })
      },
      {
        test: /\.scss$/,
        include: helpers.root('src', 'app'),
        use: ['raw-loader', 'sass-loader']
      }
    ]
  },

  plugins: [
    // Workaround for angular/angular#11580
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /@angular(\\|\/)core(\\|\/)fesm5/,
      helpers.root('./src'), // location of your src
      {} // a map of your routes
    ),

    // new config.optimization.splitChunks({
    //   name: ['app', 'vendor', 'polyfills']
    // }),

    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ],

  optimization: {
    runtimeChunk: {
      name: 'runtime'
    },

    noEmitOnErrors: true,
  }
};