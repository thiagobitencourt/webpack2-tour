'use strict';

const webpack = require('webpack');
const path = require('path');

let config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'output.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/, //files ending with .js
        exclude: /node_modules/, // exclude the node_modules directory
        loader: 'babel-loader', // use this (babel-loader) loader 
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.scss$/, //files wnding with .scss
        loader: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  }
}

module.exports = config;