/*
 * @Author: Cao_ming
 * @Date: 2020-10-20 14:50:30
 * @LastEditTime: 2020-10-21 11:24:33
 * @LastEditors: Cao_ming
 * @FilePath: \react-simple\build\webpack.dev.js
 */
const { merge } = require('webpack-merge')
const webpackConfig = require('./webpack.base.js')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const webpack = require('webpack')
const portfinder = require('portfinder')

const Development = 'development'

const devWebpackConfig = merge(webpackConfig(Development), {
  mode: Development,
  devtool: 'eval-source-map', // map 源码输出方便调试
  watch: true,
  devServer: {
    host: 'localhost',
    port: 3000,
    open: true,
    progress: true,
    quiet: true,
    compress: true,
    hot: true,
  },
  plugins: [new webpack.HotModuleReplacementPlugin(), new ReactRefreshWebpackPlugin()].filter(Boolean),
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || 3000
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      process.env.PORT = port
      devWebpackConfig.devServer.port = port
      devWebpackConfig.plugins.push(
        new FriendlyErrorsWebpackPlugin({
          compilationSuccessInfo: {
            messages: [`You application is running here http://${devWebpackConfig.devServer.host}:${port}`],
          },
          clearConsole: true,
        })
      )
      resolve(devWebpackConfig)
    }
  })
})
