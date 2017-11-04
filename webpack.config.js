const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const DIR_DIST = 'dist'
const DIR_SRC = 'src'

function resolve(dir) {
  return path.resolve(__dirname, dir)
}

module.exports = {
  entry: {
    app: `./${DIR_SRC}/index.js`
  },
  output: {
    path: resolve(DIR_DIST),
    filename: '[name][chunkhash].js',
    publicPath: '/'
  },
  resolve: {
    alias: {
      '@': resolve(DIR_SRC)
    }
  },
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(`./${DIR_SRC}/index.html`),
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
    })
  ]
}