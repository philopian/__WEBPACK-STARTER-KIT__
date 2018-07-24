const path = require('path');
const config = require('./appseed.config');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "production",

  // IN/OUT files
  entry: [
    // require.resolve('babel-polyfill'),
    path.resolve(__dirname, 'www')
  ],
  output: {
    path: path.join(config.deployRoot, "www"),
    filename: 'code/bundle.js'
  },

  // GENERAL STUFF
  resolve: {
    modules: ['node_modules', 'bower_components'],
    descriptionFiles: ['package.json', 'bower.json'],
  },
  devtool: 'source-map',
  target: 'web',

  // PLUGINS
  plugins: [
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new MiniCssExtractPlugin({
      filename: "/code/app.css"
    }),
    new HtmlWebpackPlugin({
      template: 'www/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true
      },
      inject: true
    }),
  ],

  // LOADERS
  module: {
    rules: [
      { test: /\.html$/, use: [{ loader: 'html-loader', options: { minimize: true }, }], },
      { test: /\.(css|scss)$/,use: [MiniCssExtractPlugin.loader,'css-loader','sass-loader']},
      { test: /\.(js|jsx)$/,include: config.webRoot,loader: "babel-loader",options: {babelrc: false,presets: ["babel-preset-env","babel-preset-stage-0","babel-preset-react"]}},
      { test: /\.(jpg|jpeg|png|svg|gif)$/, loader: 'file-loader?name=[name].[ext]' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, use: [{ loader: 'file-loader' }] },
      { test: /\.(woff|woff2)$/, use: [{ loader: 'url-loader?prefix=font/&limit=5000' }] },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, use: [{ loader: 'url-loader?limit=10000&mimetype=application/octet-stream' }] },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, use: [{ loader: 'url-loader?limit=10000&mimetype=image/svg+xml' }] }
    ]
  },


}