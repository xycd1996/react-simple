const { merge } = require('webpack-merge')
const webpackConfig = require('./webpack.base.js')

const Development = 'development'

module.exports = merge(webpackConfig(Development), {
  mode: Development,
  watch: true,
  devServer: {
    host: 'localhost',
    port: 3000,
    open: true,
    progress: true,
    hot: true,
  },
})
