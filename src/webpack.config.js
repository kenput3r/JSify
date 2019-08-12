const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        main: './index.js',
        swiperJS: './node_modules/swiper/dist/js/swiper.min.js',
        bundleCss: './index.scss',
    },
    devtool: 'source-map',
    mode: "development",
    output: {
        path: path.resolve(__dirname, '../assets'),
        filename: './[name].js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                        },
                    },
                    'sass-loader',
                ],
            }
        ]
    },
    optimization: {
        minimizer: [new UglifyJsPlugin()],
    },
    plugins: [
        new MiniCssExtractPlugin({
            sourceMap: true,
            filename: './[name].css',
        }),
    ]
};
