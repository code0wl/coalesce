const path = require('path');
const webpack = require('webpack');

const config = {
  entry: path.resolve(__dirname, '../demo/game.ts'),
  watch: true,
  optimization: {
    minimize: false
  },
  output: {
    path: path.resolve(__dirname, '../demo/dist'),
    filename: './bundle.js'
  },
  plugins: [new webpack.SourceMapDevToolPlugin({})],
  resolve: {
    extensions: ['.ts']
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
