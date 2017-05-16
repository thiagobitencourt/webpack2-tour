'use strict';

const webpack = require('webpack');
const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

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
        use: ExtractTextWebpackPlugin.extract({ // call our plugin with extract method
          use: ['css-loader', 'sass-loader'], // use these loaders
          fallback: 'style-loader' // fallback for any CSS not extracted
        }) // end extract
      }
    ] // end rules
  },
  plugins: [
    new ExtractTextWebpackPlugin('styles.css') // call the ExtractTextWebpackPlugin and name ou css file
  ],
  devServer: {
    contentBase: path.resolve(__dirname, './public'), // A directory or URL to server HTML content from.
    historyApiFallback: true, // fallback to /index.html for Single Page Applications.
    inline: true, // inline mode (set to false to disable including client scripts (like livereload))
    open: true // open default browser while lauching
  },
  devtool: 'eval-source-map' // enable devtool for better debuggin experience
}

module.exports = config;