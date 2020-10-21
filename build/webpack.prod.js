/*
 * @Author: Cao_ming
 * @Date: 2020-10-20 14:50:30
 * @LastEditTime: 2020-10-21 15:33:53
 * @LastEditors: Cao_ming
 * @FilePath: \react-simple\build\webpack.prod.js
 */
const { merge } = require('webpack-merge')
const webpackConfig = require('./webpack.base')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const Production = 'production'

module.exports = merge(webpackConfig(Production), {
  mode: Production,
  node: false,
  stats: 'none',
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
    splitChunks: {
      automaticNameDelimiter: '.',
      chunks: 'all',
      name: 'vendors',
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'static/style/[name].css',
      chunkFilename: 'static/style/[name].[chunkhash].css',
    }),
  ].filter(Boolean),
})
