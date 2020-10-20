/*
 * @Author: Cao_ming
 * @Date: 2020-10-20 14:50:30
 * @LastEditTime: 2020-10-20 17:41:02
 * @LastEditors: Cao_ming
 * @FilePath: \react-simple\build\webpack.prod.js
 */
const { merge } = require('webpack-merge')
const webpackConfig = require('./webpack.base')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const Production = 'production'

module.exports = merge(webpackConfig(Production), {
  mode: Production,
  node: false,
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerWebpackPlugin(),
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
  plugins: [new CleanWebpackPlugin()],
})
