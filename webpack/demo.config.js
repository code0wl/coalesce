const path = require('path');

const config = {
  entry: path.resolve(__dirname, '../demo/game.ts'),
  watch: true,
  output: {
    path: path.resolve(__dirname, '../demo/dist'),
    filename: './bundle.js'
  },
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
