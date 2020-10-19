const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { AppPath, IndexPath, OutputPath, HtmlPath } = require('../utils/path')

const webpackConfig = (webpackDev) => {
  const isDevelopment = webpackDev === 'development'
  const isProduction = webpackDev === 'production'

  return {
    entry: IndexPath,
    output: {
      path: OutputPath,
      filename: isDevelopment ? '[name].js' : isProduction && 'static/js/[name].js',
      chunkFilename: isDevelopment ? '[name].js' : isProduction && 'static/js/[name].[chunkhash].js',
      pathinfo: true,
      publicPath: './',
    },
    module: {
      rules: [
        {
          test: /\.(jsx|js)$/,
          include: AppPath,
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
        {
          test: /\.(css|less|sass|scss)$/,
          oneOf: [
            {
              test: /\.(css|less)$/,
              use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                {
                  loader: 'less-loader',
                  options: {
                    lessOptions: { javascriptEnabled: true },
                  },
                },
              ],
            },
            {
              test: /\.(sass|scss)$/,
              use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
          ],
        },
        {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
          loader: 'url-loader',
          options: {
            limit: 10000,
            esModule: false,
            name: 'static/media/[name].[hash:8].[ext]',
          },
        },
      ],
    },
    resolve: {
      extensions: ['.mjs', '.js', '.jsx'],
    },
    plugins: [
      new HtmlWebpackPlugin({ template: HtmlPath }),
      new MiniCssExtractPlugin({
        filename: isDevelopment ? '[name].css' : isProduction && 'static/style/[name].css',
        chunkFilename: isDevelopment ? '[name].css' : isProduction && 'static/style/[name].[chunkhash].css',
      }),
    ],
  }
}
module.exports = webpackConfig
