const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const cwd = process.cwd()
const mode = 'development'

/**
 * Config
 */
module.exports = {
  context: path.join(cwd, 'app'),
  devtool: 'inline-source-map',
  mode,
  devServer: {
    historyApiFallback: true,
    port: 8085
  },
  entry: {
    app: ["babel-polyfill", './js/index.jsx'],
    silentRenew: ["babel-polyfill", "./silent_renew/silent_renew.js"],
    react: [
      'react',
      'react-dom',
      'react-router-dom',
      'react-router',
      'redux',
      'react-redux',
      'react-router-redux',
      'history'
    ],
  },

  output: {
    path: path.resolve('dev-dist'),
    filename: 'bundle_dev_[name].js'
  },

  module: {
    rules: [{
      test: /\.jsx?$/,
      use: ['babel-loader'],
      exclude: /node_modules/
    },
    {
      test: /\.(json)$/,
      use: [
        'json-loader'
      ]
    },
    {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader'
      ]
    },
    {
      test: /\.less$/,
      use: [
        'style-loader',
        'css-loader',
        'less-loader'
      ]
    },
    {
      test: /\.(scss|sass)$/,
      use: [
        'style-loader',
        'css-loader',
        'scss-loader'
      ]
    },
    {
      test: /\.(png|jpg|jpeg|svg|gif)$/,
      use: [
        'file-loader'
      ]
    },
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: [
        'file-loader'
      ]
    }]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './index.ejs',
      chunks: ["app"],
      filename: "index.html"
    }),
    new HtmlWebpackPlugin({
      template: "./silent_renew/silent_renew.html",
      chunks: ["silentRenew"],
      filename: "silent_renew.html"
    }),
    new webpack.DefinePlugin({
      CONSTANTS: {
        PROD: false,
        TEST: false,
        DEV: true
      }
    }),
    new webpack.IgnorePlugin(/^(fs|ipc)$/)
  ]
}