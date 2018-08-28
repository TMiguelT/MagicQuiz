const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
    devServer: {
        historyApiFallback: true
    },
    entry: [
        './src/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CopyWebpackPlugin([
            {
                from: 'index.html',
                to: '..'
            },
            {
                from: 'dist/img',
            }
        ])
    ],
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            // Other aliases
            '_variables.sass': path.resolve(__dirname, 'relative/path/to/your/file/from/webpack/config/file')
        }
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: ['babel-loader'],
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.s(c|a)ss$/,
                loader: 'style-loader!css-loader!sass-loader'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader!sass-loader'
            }
        ]
    }
};
