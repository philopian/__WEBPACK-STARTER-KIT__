const path = require('path');
const config = require('./config');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractSASS = new ExtractTextPlugin('code/app.css');

module.exports = {
  mode: "production",

  // IN/OUT files
  entry: [
    require.resolve('babel-polyfill'),
    path.resolve(__dirname, 'www')
  ],
  output: {
    path: path.resolve(__dirname, config.distFileName),
    filename: 'bundle.js'
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
      inject: false
    }),
    extractSASS,
    // new webpack.optimize.UglifyJsPlugin(),
  ],

  // LOADERS
  module: {
    rules: [
      { test: /\.css$/, use: [{ loader: "style-loader" }, { loader: "css-loader" }] },
      { test: /\.scss$/, use: [{ loader: "style-loader" }, { loader: "css-loader" }, { loader: "sass-loader" }] },
      { test: /\.js$/, exclude: /(node_modules|bower_components)/, use: { loader: 'babel-loader', options: { presets: ['env'] } } },
      { test: /\.jsx$/, include: path.join(__dirname, 'src'), loader: 'babel-loader' },
      { test: /\.(jpg|jpeg|png|svg|gif)$/, loader: 'file-loader?name=images/[name].[ext]' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, use: [{ loader: 'file-loader' }] },
      { test: /\.(woff|woff2)$/, use: [{ loader: 'url-loader?prefix=font/&limit=5000' }] },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, use: [{ loader: 'url-loader?limit=10000&mimetype=application/octet-stream' }] },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, use: [{ loader: 'url-loader?limit=10000&mimetype=image/svg+xml' }] },
    ]
  }


}