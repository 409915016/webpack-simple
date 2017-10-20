/**
 * Created by Administrator on 2017-03-11.
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');


const isProd = process.env.NODE_ENV === 'production';
const cssDev = ['style-loader','css-loader?sourceMap', 'postcss-loader','less-loader'];
const cssProd = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  use: ['css-loader',  'postcss-loader', 'less-loader'],
  publicPath: '.'
});
const cssConfig = isProd ? cssProd : cssDev;


module.exports = {
  entry: {
    main: './src/main.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    //publicPath: "./"
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: cssConfig
      },
      // {
      //     test: /\.scss$/,
      //     use: cssConfig
      // },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.pug$/,
        use: ['pug-loader', 'pug-html-loader']
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'file-loader?name=./images/[name].[ext]',
          //"file-loader?name=[name].[ext]&outputPath=images/&publicPath=images/",
          {
            loader: 'image-webpack-loader',
            options: {}
          }]
      },
      {test: /\.(woff2?|svg)$/, loader: 'url-loader?limit=10000&name=fonts/[name].[ext]'},
      {test: /\.(ttf|eot)$/, loader: 'file-loader?name=fonts/[name].[ext]'},
      // Bootstrap 3
      {test: /bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/, loader: 'imports-loader?jQuery=jquery'},

    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    hot: true,
    port: 9001,
    stats: 'errors-only',
    open: true
  },
  plugins: [
    // new CopyWebpackPlugin([
    //   { from: 'src/resource' ,to: 'resource' },
    // ]),
    new HtmlWebpackPlugin({
      title: 'Project Demo',
      // minify: {
      //     collapseWhitespace: true
      // },
      hash: true,
      excludeChunks: ['contact'],
      // filename: './../index.html',
      template: './src/index.html'
    }),
    new ExtractTextPlugin({
      filename: 'css/[name].css',
      disable: !isProd,
      allChunks: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally
    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates
  ]

};