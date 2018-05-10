const path = require('path');
const webpack = require('webpack');
const config = require("./config");

module.exports = {
  mode: "development",
  // IN/OUT files
  entry: [
    `webpack-dev-server/client?http://localhost:${config.port}`,
    path.resolve(__dirname, 'www')
  ],
  output: {
    // path: path.resolve(__dirname, 'www'),
    publicPath: '/',
    filename: 'bundle.js'
  },

  // GENERAL STUFF
  resolve: {
    modules: ['node_modules', 'bower_components'],
    descriptionFiles: ['package.json', 'bower.json'],
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],

  // LOADERS
  module: {
    rules: [
      { test: /\.html$/, use: [{ loader: 'html-loader', options: { minimize: true }, }], },
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'], },
      { test: /\.js$/, exclude: [/node_modules/, /bower_components/], use: [{ loader: 'babel-loader' }], },
      { test: /\.jsx$/, include: path.join(__dirname, 'src'), loader: 'babel-loader' },
      { test: /\.(jpg|jpeg|png|svg|gif)$/, loader: 'file-loader?name=[path][name].[ext]' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, use: [{ loader: 'file-loader' }] },
      { test: /\.(woff|woff2)$/, use: [{ loader: 'url-loader?prefix=font/&limit=5000' }] },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, use: [{ loader: 'url-loader?limit=10000&mimetype=application/octet-stream' }] },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, use: [{ loader: 'url-loader?limit=10000&mimetype=image/svg+xml' }] }
    ]
  },

  // WEBPACK-DEV-SERVER
  devServer: {
    contentBase: path.join(__dirname, 'www'),
    inline: true,
    port: config.port,
    historyApiFallback: {
      index: '/index.html'
    }
  }
}