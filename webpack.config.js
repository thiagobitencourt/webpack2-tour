'use strict';

const webpack = require('webpack');

let config = {
  entry: './index.js',
  output: {
    filename: 'output.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/, //files ending with .js
        exclude: /node_modules/, // exclude the node_modules directory
        loader: "babel-loader", // use this (babel-loader) loader 
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
}

module.exports = config;