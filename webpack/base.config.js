const path = require('path');

const config = {
  entry: path.resolve(__dirname, '../lib/src/engine.core'),
  output: {
    path: path.resolve(__dirname, '../lib'),
    filename: 'main.js'
  },
  resolve: {
    extensions: ['.ts', '.js'] // note if using webpack 1 you'd also need a '' in the array as well
  },
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
