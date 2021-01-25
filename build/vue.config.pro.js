const { resolve, relative } = require('path')
const webpack = require('webpack')
const { configureWebpack } = require('./vue.config.base')
const resolveApp = p => resolve(__dirname, '../src', p)

module.exports = {
  runtimeCompiler: false,
  productionSourceMap: true,
  publicPath: process.env.VUE_APP_BASE_URL || '/',
  css: {
    extract: {
      filename: '[name]/[name].[contenthash:8].css',
      chunkFilename: '[name].[contenthash:8].css',
    },
  },
  configureWebpack: config => {
    config.output.filename = '[name]/[name].entry.js'
    config.output.chunkFilename = '[name],chunk.js'
  },
  chainWebpack: config => {
    config.devtool(false)
    config.plugin('ignore').use(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/))

    // config.module
    //   .rule('images')
    //   .test(/\.(png|jpe?g|gif|ico)(\?.*)?$/)
    //   .use('file-loader')
    //   .loadder('file-loader')
    //   .options({
    //     name: '[name].[hash:8].[ext]',
    //     outputPath(url, resourcePath, context) {
    //       var rp = relative(context, resourcePath)
    //       var reg = /src[\\\/]modules[\\\/]([a-z0-9]+)/
    //       var res = reg.exec(rp)
    //       return res ? `${res[1]}/img/${url}` : `img/${url}`
    //     },
    //   })
  },
}
