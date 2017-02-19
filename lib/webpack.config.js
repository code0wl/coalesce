module.exports = {
    entry: ['whatwg-fetch', './main'],
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    resolve: {
        extensions: ['.js', '.ts', '.json', '']
    },
    module: {
        loaders: [
            {
                test: /.ts$/,
                loader: 'ts-loader'
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    }
};