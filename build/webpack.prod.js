const { merge } = require('webpack-merge')
const webpackConfig = require('./webpack.base')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const Production = 'production'

module.exports = merge(webpackConfig(Production), {
  mode: Production,
  node: false,
  optimization: {
    minimize: true,
    minimizer: [`...`, new CssMinimizerWebpackPlugin()],
  },
  plugins: [new CleanWebpackPlugin()],
})
