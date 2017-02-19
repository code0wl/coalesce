var path = require('path');

module.exports = {
    entry: ['whatwg-fetch', './main'],
    output: {
        path: './dist',
        filename: "bundle.js"
    },
    resolve: {
        extensions: ['.js', '.ts', '.json', '']
    },
    context: path.resolve(__dirname, './src'),
    module: {
        loaders: [
            {
                test: /.ts$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.json$/,
                loader: 'json-loader',
                exclude: /node_modules/
            }
        ]
    }
};