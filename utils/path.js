const path = require('path')

module.exports = {
  AppPath: path.resolve(process.cwd(), 'src'),
  ModulePath: path.resolve(process.cwd(), 'mode_modules'),
  IndexPath: path.resolve(process.cwd(), 'src'),
  OutputPath: path.resolve(process.cwd(), 'dist'),
  HtmlPath: path.resolve(process.cwd(), 'public/index.html'),
}
