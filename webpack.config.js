/**
 * Created by Administrator on 2017-03-11.
 */

var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');
var path = require("path");
module.exports = {
    entry: {
        app: './src/app.js',
        contact: './src/contact.js',
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
                // use: ExtractTextPlugin.extract({
                //     fallback: "style-loader",
                //     use: ["css-loader", "less-loader"],
                //     publicPath: "/dist"
                // })
                //use: ExtractTextPlugin.extract(['style-loader', 'css-loader', 'less-loader'])
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: "babel-loader"
            },
            {
                test: /\.pug$/,
                use: ["pug-loader", "pug-html-loader"]
            }

        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        hot: true,
        port: 9000,
        stats: "errors-only",
        open: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Project Demo',
            // minify: {
            //     collapseWhitespace: true
            // },
            hash: true,
            excludeChunks: ['contact'],
            // filename: './../index.html',
            template: './src/index.pug', // Load a custom template (ejs by default see the FAQ for details)

        }),
        new HtmlWebpackPlugin({
            title: 'Contact Page',
            hash: true,
            chunks: ['contact'],
            filename: 'contact.html',
            template: './src/contact.html',
        }),
        new ExtractTextPlugin({
            filename: 'app.css',
            disable: true,
            allChunks: true
        }),
        new webpack.HotModuleReplacementPlugin(),
        // enable HMR globally
        new webpack.NamedModulesPlugin(),
        // prints more readable module names in the browser console on HMR updates
    ]

};
