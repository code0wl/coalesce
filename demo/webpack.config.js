const path = require('path');

const config = {
    entry: './game.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.js']
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