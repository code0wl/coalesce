module.exports = {
    entry: ['whatwg-fetch', './game'],
    output: { filename: 'bundle.js' },
    resolve: {
        extensions: ['.js', '.ts', '']
    },
    module: {
        loaders: [
            {
                test: /demo\/.ts$/,
                loader: 'ts-loader'
            }
        ]
    }
};