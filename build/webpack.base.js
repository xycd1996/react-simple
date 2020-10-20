const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
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
      publicPath: './',
    },
    module: {
      rules: [
        {
          test: /\.(jsx|js)$/,
          include: AppPath,
          loader: 'babel-loader',
          options: {
            plugins: [
              // [
              //   '@babel/plugin-transform-runtime',
              //   {
              //     corejs: 3,
              //     helper: true,
              //     useESModules: true,
              //   },
              // ],
              // @babel/plugin-transform-runtime 更多使用在开发工具库，把公共的helps提取，真实开发使用会增加打包体积，真实开发推荐 @babel/preset-env 配置 useBuiltIns 指定 corejs 版本同样能起到的作用
              '@babel/plugin-proposal-class-properties',
            ],
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'usage', // 会根据配置的浏览器兼容，以及你代码中用到的 API 来进行 polyfill，按需加载
                  targets: {
                    browsers: '> 0.25%, last 2 versions, not dead, not ie <= 8',
                  },
                  corejs: {
                    version: 3,
                    proposals: true, // 提案
                  },
                },
              ],
              '@babel/preset-react',
            ],
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
      new FriendlyErrorsWebpackPlugin({
        compilationSuccessInfo: {
          messages: ['You application is running here http://localhost:3000'],
        },
        clearConsole: true,
        onErrors: function (server, errors) {
          console.log(errors)
        },
      }),
    ],
  }
}
module.exports = webpackConfig
