/*
 * @Author: Cao_ming
 * @Date: 2020-10-20 14:50:30
 * @LastEditTime: 2020-10-20 18:33:43
 * @LastEditors: Cao_ming
 * @FilePath: \react-simple\build\webpack.dev.js
 */
const { merge } = require('webpack-merge')
const webpackConfig = require('./webpack.base.js')

const Development = 'development'

module.exports = merge(webpackConfig(Development), {
  mode: Development,
  devtool: 'eval-source-map', // map 源码输出方便调试
  watch: true,
  devServer: {
    host: 'localhost',
    port: 3000,
    open: true,
    progress: true,
    quiet: true,
    hot: true,
  },
})
