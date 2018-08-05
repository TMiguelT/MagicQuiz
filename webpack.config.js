var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'eval',
    entry: [
        './src/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            // Other aliases
            '_variables.sass': path.resolve(__dirname, 'relative/path/to/your/file/from/webpack/config/file'),
        },
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
                loader: 'style-loader!css-loader!sass-loader',
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader!sass-loader',
            }
        ]
    }
};
