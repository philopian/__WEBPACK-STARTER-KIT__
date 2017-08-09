const path = require('path');
const webpack = require('webpack');
const PORT = 3000;

module.exports = {
  // IN/OUT files
  entry: [
    `webpack-dev-server/client?http://localhost:${PORT}`,
    path.resolve(__dirname, 'src/app.js')
  ],
  output: {
    path: path.resolve(__dirname, 'public'),
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
      { test: /\.scss$/, use: [{ loader: "style-loader" }, { loader: "css-loader" }, { loader: "sass-loader" }] },
      { test: /\.js$/, exclude: /(node_modules|bower_components)/, use: { loader: 'babel-loader', options: { presets: ['env'] } } }
    ]
  },

  // WEBPACK-DEV-SERVER
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    inline: true,
    port: PORT,
    historyApiFallback: {
      index: '/index.html'
    }
  }
}