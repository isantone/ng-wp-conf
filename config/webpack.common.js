const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const helpers = require('./helpers');

const createLodashAliases = require('lodash-loader').createLodashAliases;

module.exports = {
  parallelism: 4,

  entry: {
    'polyfills': './src/polyfills.ts',
    'main': './src/main.ts',
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
        test: /\.js$/,
        exclude: /node_modules/,
        include: helpers.root('src', 'js'),
        loaders: [
          {
            loader: 'awesome-typescript-loader',
            options: { configFileName: helpers.root('src', 'tsconfig.app.json') }
          },
          {
            loader: 'lodash-loader',
            options: { importMode: 'es2015' }
          },
        ]
      },

      {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: 'html-loader'
      },

      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file-loader?name=assets/[name].[ext]'
      },
      // {
      //   test: /\.css$/,
      //   exclude: helpers.root('src', 'app'),
      //   loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader?sourceMap' })
      // },
      // {
      //   test: /\.css$/,
      //   include: helpers.root('src', 'app'),
      //   loader: 'raw-loader'
      // },
      {
        test: /\.scss$/,
        exclude: helpers.root('src', 'app'),
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: [
          'css-loader?sourceMap',
          {
            loader: 'sass-loader',
            options: {
              data: '@import "variables";',
              includePaths: [
                helpers.root('src')
              ]
            }
          }
        ] })
      },

      {
        test: /\.scss$/,
        include: helpers.root('src', 'app'),
        use: [
          'raw-loader',
          {
            loader: 'sass-loader',
            options: {
              data: '@import "variables";',
              includePaths: [
                helpers.root('src')
              ]
            }
          }
        ]
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

    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),

    new CopyWebpackPlugin([
      helpers.root('src', 'favicon.ico'),
      helpers.root('src', 'assets')
    ])
  ],

  optimization: {
    runtimeChunk: {
      name: 'runtime'
    },

    noEmitOnErrors: true,
  }
};