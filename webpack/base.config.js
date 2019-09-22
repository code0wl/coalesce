const path = require('path');
const webpack = require('webpack');

const config = {
  entry: path.resolve(__dirname, '../lib/src'),
  optimization: {
    minimize: false
  },
  output: {
    path: path.resolve(__dirname, '../lib'),
    filename: 'index.js'
  },
  resolve: {
    extensions: ['.ts', '.js'] // note if using webpack 1 you'd also need a '' in the array as well
  },
  plugins: [new webpack.SourceMapDevToolPlugin({})],
  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true
        }
      }
    ]
  }
};

module.exports = config;
