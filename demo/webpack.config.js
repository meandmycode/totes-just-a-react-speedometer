const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const autoprefixer = require('autoprefixer');

const port = process.env.PORT || 9001;

var plugins = [
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: '_index.html'
  }),
  new ExtractTextWebpackPlugin('demo.css', {
    allChunks: true
  })
];

var loaders = [
  {
    test: /\.js$/,
    loader: 'babel'
  },
  {
    test: /\.scss$/,
    loader: ExtractTextWebpackPlugin.extract('style-loader', '!css!postcss!sass')
  }
];

module.exports = {
  debug: true,
  entry: './demo.js',

  devServer: {
    contentBase: 'src',
    host: '0.0.0.0',
    port
  },

  resolve: {
    alias: {
      'speedometer': path.resolve('../src/speedometer.js'),
      'speedometer.scss': path.resolve('../src/speedometer.scss')
    }
  },

  output: {
    publicPath: '/',
    filename: '[name].js'
  },

  module: {
    loaders
  },

  plugins,

  postcss() {
    return [autoprefixer];
  }

};
