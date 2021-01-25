const resolveApp = require('./resolveApp')
const pages = require('./module.config')
const path = require('path')
const webpack = require('webpack')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const { dll_dir, dll_output_path } = require('./build.config')
const { resolve, join } = path
const isDev = process.env.NODE_ENV === 'development'
console.log(pages)
module.exports = {
  pages,
  chainWebpack: config => {
    Object.keys(pages).forEach(v => {
      const dir = path.resolve(__dirname, `../src/modules/${v}/assets/vue-svg`)
      config.module
        .rule('svg-sprite')
        .test(/\.svg$/)
        .include.add(dir)
        .end()
        .use('vue-svg-loader')
        .loader('vue-svg-loader')
        .end()
      config.module
        .rule('svg')
        .exclude.add(dir)
        .end()
    })

    config.plugin('dllreference').use(webpack.DllReferencePlugin, [{ manifest: require(resolve(dll_output_path, 'dll.mainfest.json')) }])
    config.plugin('AddAssetHtmlPlugin').use(AddAssetHtmlPlugin, [
      ['css', 'js'].map(type => ({
        filepath: path.resolve(dll_output_path, `*.${type}`),
        outputPath: dll_dir,
        typeOfAsset: type,
        publicPath: isDev ? `/${dll_dir}` : join(process.env.VUE_APP_BASE_URL || '/', dll_dir),
      })),
    ])
  },
  configureWebpack: config => {
    config.output.filename = '[name]/[name].entry.js'
    config.output.chunkFilename = '[name],chunk.js'
    config.optimization = {
      splitChunks: {
        cacheGroups: {
          vendors: false,
          common: false,
          defalut: false,
          // base: {
          //   name: 'base',
          //   minChunks: 1,
          //   chunks: 'initial',
          //   test: module => /ant-design-vue/.test(module.context),
          //   priority: 8,
          //   enforce: true,
          // },
        },
      },
    }
  },
  pluginOptions: {},
}
