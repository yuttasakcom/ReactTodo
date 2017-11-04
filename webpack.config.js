const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const DIR_DIST = 'dist'
const DIR_SRC = 'src'

function resolve(dir) {
  return path.resolve(__dirname, dir)
}

module.exports = (env) => {
  const isProduction = env === 'production'
  const CSSExtract = new ExtractTextPlugin('styles.css')

  return {
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
    devtool: isProduction ? 'source-map' :'cheap-module-eval-source-map',
    module: {
      rules: [
        { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
        { 
          test: /\.s?css$/,
          use: CSSExtract.extract({
            use: [
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true
                }
              }
            ]
          })
        }
      ]
    },
    plugins: [
      CSSExtract,
      new HtmlWebpackPlugin({
        template: resolve(`./${DIR_SRC}/index.html`),
        inject: true,
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true
        },
      }),
      new CopyWebpackPlugin([
        {
          from: resolve('./src/statics'),
          to: 'statics',
          ignore: ['.*']
        }
      ]),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }
      }),
      new CleanWebpackPlugin([DIR_DIST], {
        _root: __dirname,
        verbose: true,
        dry: false
      })
    ]
  }
}