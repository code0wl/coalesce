module.exports = {
  entry: ['whatwg-fetch', './main'],
  resolve: {
    extensions: ['.js', '.ts', '']
  },
  module: {
    loaders: [
      {
        test: /.ts$/,
        loader: 'ts-loader'
      }
    ]
  }
};