// 导入compression-webpack-plugin
const webpack = require('webpack')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const AnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const path = require('path')
const getModules = require('./getMutiPageConfig')
const pages = getModules()
const isProuction = process.env.NODE_ENV === 'production'
const resolvePath = dir => path.join(__dirname, '../', dir)

const mainPage = {
  index: {
    entry: 'src/main.js',
    template: 'build/index.html',
    filename: 'index.html',
    tilte: 'main Page',
  },
}

const pagesConfig = isProuction ? pages : { ...mainPage, ...pages }
console.log(pages)

module.exports = {
  lintOnSave: true,
  publicPath: isProuction ? './' : '/',
  // muti-page
  pages: { ...pagesConfig },
  runtimeCompiler: false,
  transpileDependencies: [],
  productionSourceMap: false,
  configureWebpack: config => {
    config.output.filename = isProuction ? '[name].[contenthash:8].js' : '[name].js'
    config.output.chunkFilename = isProuction ? '[name].[contenthash:8].js' : '[name].js'
    config.resolve.extensions = ['.js', '.jsx', '.vue']
    config.plugins.push(
      new AddAssetHtmlPlugin({
        filepath: path.resolve(__dirname, '../public/vendor/vendor*.js'),
        publicPath: `${process.env.VUE_APP_BASE_URL}vendor/`,
        outputPath: './vendor',
      }),
    )
    if (isProuction) {
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: /\.(js|css|png|svg|jpg|jpeg|ico)$/,
          threshold: 10240,
          minRatio: 0.8,
        }),
      )
      config.optimization.minimizer[0].options.terserOptions.compress.warnings = false
      config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = false
      config.optimization.minimizer[0].options.terserOptions.compress.pure_funcs = ['console.log']
      config.optimization.splitChunks.cacheGroups.vendors = {}
      config.optimization.splitChunks.cacheGroups.common = {}
    }
  },
  chainWebpack: config => {
    config.resolve.alias.set('@', resolvePath('src'))
    config.resolve.symlinks(true)
    if (process.env.ANALYZ === 'true') {
      config.plugin('webpack-bundle-analyzer').use(AnalyzerPlugin)
    }
  },
  css: {
    extract: isProuction ? { filename: '[name].[contenthash:8].css' } : false,
    sourceMap: false,
    loaderOptions: {
      less: { javascriptEnabled: true },
    },
  },
  parallel: require('os').cpus().length - 1,
  devServer: {
    hot: true,
    hotOnly: false,
    open: true,
    host: 'localhost',
    port: 8080,
  },
}
