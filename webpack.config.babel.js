import path from 'path';
// eslint-disable-next-line import/no-extraneous-dependencies
import webpack from 'webpack';

const DEBUG = process.env.NODE_ENV !== 'production';

export default {
    cache: DEBUG,
    debug: DEBUG,
    devtool: '#source-map',
    entry: './src/browser/index.js',
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
        ],
    },
    output: {
        path: path.join(__dirname, 'dist/js'),
        filename: DEBUG ? 'browser.js' : 'browser.min.js',
    },
    plugins: DEBUG ? [] : [
        new webpack.optimize.UglifyJsPlugin(),
    ],
    resolve: {
        extensions: [
            '',
            '.js',
            '.jsx',
        ],
    },
};
