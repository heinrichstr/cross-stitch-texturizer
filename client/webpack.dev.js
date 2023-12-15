const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const ImageminWebpWebpackPlugin= require("imagemin-webp-webpack-plugin");

module.exports = merge(common, {
    devtool: 'source-map',
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        historyApiFallback: true,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        }
    },
    plugins: [
        new ImageminWebpWebpackPlugin({
            overrideExtension: false,
            config: [{
                test: /\.(jpe?g|png|gif)/
            }],
        })
    ]
});