const webpack = require("webpack");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;
const RobotstxtPlugin = require("robotstxt-webpack-plugin");
const SitemapPlugin = require('sitemap-webpack-plugin').default;
const ImageminWebpWebpackPlugin= require("imagemin-webp-webpack-plugin");

const paths = [
    '/',
    '/giving-critique-to-novice-artists',
    '/resources-for-self-teaching-art-fundamentals',
    '/visual-library-sharks',
    '/art-review-2022'
]

const options = {
    policy: [
        {
          userAgent: "Googlebot",
          allow: "/",
        },
        {
          userAgent: "OtherBot",
          allow: ["/"],
        },
        {
          userAgent: "*",
          allow: "/",
        },
      ],
      sitemap: "http://blog.tam-paints.com/sitemap.xml",
      host: "http://blog.tam-paints.com",
}

module.exports = merge(common, {
    module: {
        rules: [
            {
                test: /\.(jpg|png|gif)$/,
                loader: "image-webpack-loader",
                enforce: "pre",
                options: {
                    mozjpeg: {
                        progressive: true,
                        quality: 75
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new webpack.IgnorePlugin({resourceRegExp: /^\.\/locale$/, contextRegExp: /moment$/}),
        new CleanWebpackPlugin(),
        new SitemapPlugin({ 
            base:'https://blog.tam-paints.com', 
            paths: paths
        }),
        new RobotstxtPlugin(options),
        new ImageminWebpWebpackPlugin({
            overrideExtension: false,
            config: [{
                test: /\.(jpe?g|png|gif)/
            }],
        })
        //new BundleAnalyzerPlugin(),
    ],
    optimization: {
        minimizer: [new TerserPlugin()],
    }
});
