const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
require("@babel/polyfill");
//const pathToEntry = path.join(__dirname, './src/app.js')

module.exports = {
    entry: ["@babel/polyfill", './src/app.js'],
    output: {
        path: path.join(__dirname, 'public'),
        filename: '[name].js',
        chunkFilename: '[id].[chunkhash].js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            },
            {
                test: /\.s?css$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 0,
                    name: 'img/[hash][name].[ext]'
                }
            },
            {
                test: /\.svg$/,
                loader: 'svg-react-loader'
            },
            {
                test: /\.(pdf)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'pdf/'
                }
            },
            {
                test: /\.php$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'php/'
                }
            },
            {
                test: /\.htaccess$/,
                loader: 'file-loader',
                options: {
                    name: '.htaccess'
                }
            },
            {
                test: /\.md$/,
                use: 'raw-loader',
              },
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: path.join(__dirname, 'src/index.html')
        }),
        new FaviconsWebpackPlugin(path.join(__dirname, 'src/img/favicon.svg'))
    ],
    optimization: {
        minimizer: [new TerserPlugin()],
        splitChunks: {
            chunks: 'async',
            minSize: 20000,
        }
    }
};
