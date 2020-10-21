const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { AppPath, IndexPath, OutputPath, HtmlPath } = require('../utils/path')
const postcssNormalize = require('postcss-normalize')

const cssRegex = /\.css$/
const cssModuleRegex = /\.module\.css$/
const sassRegex = /\.(scss|sass)$/
const sassModuleRegex = /\.module\.(scss|sass)$/
const lessRegex = /\.less$/
const lessModuleRegex = /\.module\.less$/

const webpackConfig = (webpackDev) => {
  const isDevelopment = webpackDev === 'development'
  const isProduction = webpackDev === 'production'

  const getStyleLoaders = (cssOptions, preProcessor) => {
    const loaders = [
      isProduction ? MiniCssExtractPlugin.loader : isDevelopment && 'style-loader',
      {
        loader: 'css-loader',
        options: cssOptions,
      },
      {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: () => [
              require('postcss-flexbugs-fixes'),
              require('postcss-preset-env')({
                autoprefixer: {
                  flexbox: 'no-2009',
                },
                stage: 3,
              }),
              postcssNormalize(),
            ],
          },
          sourceMap: isDevelopment && true,
        },
      },
    ].filter(Boolean)

    if (preProcessor) {
      loaders.push({
        loader: require.resolve(preProcessor.loader),
        options: preProcessor.options,
      })
    }

    return loaders
  }

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
              isDevelopment && require.resolve('react-refresh/babel'),
            ].filter(Boolean),
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
            ].filter(Boolean),
          },
        },
        {
          test: cssRegex,
          exclude: [cssModuleRegex],
          use: getStyleLoaders({
            sourceMap: isDevelopment && true,
            importLoaders: 1,
          }),
          sideEffects: true,
        },
        {
          test: cssModuleRegex,
          use: getStyleLoaders({
            sourceMap: isDevelopment && true,
            importLoaders: 1,
          }),
        },
        {
          test: sassRegex,
          exclude: sassModuleRegex,
          use: getStyleLoaders(
            {
              sourceMap: isDevelopment && true,
              importLoaders: 3,
            },
            {
              loader: 'sass-loader',
            }
          ),
          sideEffects: true,
        },
        {
          test: sassModuleRegex,
          use: getStyleLoaders(
            {
              importLoaders: 3,
              sourceMap: isDevelopment && true,
            },
            {
              loader: 'sass-loader',
            }
          ),
        },
        {
          test: lessRegex,
          exclude: lessModuleRegex,
          use: getStyleLoaders(
            {
              sourceMap: isDevelopment && true,
              importLoaders: 3,
            },
            {
              loader: 'less-loader',
              options: {
                lessOptions: {
                  javascriptEnabled: true,
                },
              },
            }
          ),
          sideEffects: true,
        },
        {
          test: lessModuleRegex,
          use: getStyleLoaders(
            {
              sourceMap: isDevelopment && true,
              importLoaders: 3,
            },
            {
              loader: 'less-loader',
              options: {
                lessOptions: {
                  javascriptEnabled: true,
                },
              },
            }
          ),
        },
        {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
          loader: 'url-loader',
          options: {
            limit: 10000,
            esModule: false,
            name: 'static/img/[name].[hash:8].[ext]',
          },
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            esModule: false,
            name: 'static/media/[name].[hash:8].[ext]',
          },
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            esModule: false,
            name: 'static/fonts/[name].[hash:8].[ext]',
          },
        },
      ].filter(Boolean),
    },
    resolve: {
      extensions: ['.mjs', '.js', '.jsx'],
    },
    plugins: [new HtmlWebpackPlugin({ template: HtmlPath })].filter(Boolean),
  }
}
module.exports = webpackConfig
