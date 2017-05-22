'use strict';

const webpack = require('webpack'); // webpack itself
const path = require('path'); // nodejs dependency when dealing with paths
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin'); // extract css into a dedicated file
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); // "uglify" our output js code
const OptimizeCSSAssets = require('optimize-css-assets-webpack-plugin'); // require webpack plugin

let config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'output.js'
  },
  resolve: { // This options change how modules are resolved
    extensions: ['.js', '.jsx', '.json', '.scss', '.css', '.jpeg', '.jpg', '.gif', '.png'], // Automatically resolve certain extensions
    alias: { // Create aliases
      images: path.resolve(__dirname, 'src/assets/images') // src/assets/images alias
    }
  },
  module: {
    rules: [
      {
        test: /\.(jsx?)$/, //files ending with .js or .jsx
        exclude: /node_modules/, // exclude the node_modules directory
        loader: 'babel-loader', // use this (babel-loader) loader 
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.scss$/, //files wnding with .scss
        use: ['css-hot-loader'].concat(ExtractTextWebpackPlugin.extract({ // call our plugin with extract method
          use: ['css-loader', 'sass-loader'], // use these loaders
          fallback: 'style-loader' // fallback for any CSS not extracted
        })) // end extract
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        loaders: ['file-loader?context=src/assets/images/&name=images/[path][name].[ext]', {
          loader: 'image-webpack-loader',
          query: {
            mozjpeg: {
              progressive: true
            },
            gifsicle: {
              interlaced: false
            },
            optipng: {
              optimizationLevel: 4
            },
            pngquant: {
              quality: '75-90',
              speed: 3
            }
          }
        }],
        exclude: /node_modules/,
        include: __dirname
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
  devtool: 'source-map' // enable devtool for better debuggin experience
}

module.exports = config;

if(process.env.NODE_ENV && process.env.NODE_ENV.trim() === 'production') {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin(), // call the uglify plugin
    new OptimizeCSSAssets() // call the css optimizer (minification)
  )
}