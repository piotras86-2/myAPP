const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const HtmlWebPackPlugin = require("html-webpack-plugin")

module.exports = {
  entry: {
    index: './front/src/index.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js'
  },
  target: 'web',
  node: {
    // Need this when working with express, otherwise the build fails
    __dirname: false,   // if you don't put this is, __dirname
    __filename: false,  // and __filename return blank or /
  },
  externals: [nodeExternals()], // Need this to avoid error when working with Express
  module: {
    rules: [
      {
        // Transpiles ES6-8 into ES5
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
            {
                loader: "html-loader",
                options: {minimize: true}
            }]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader' ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./front/public/index.html",
      filename: "./index.html",
      excludeChunks: [ 'server' ]
    })
  ]
}