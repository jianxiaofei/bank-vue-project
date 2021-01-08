const proxyMap = require('./proxy.config')

module.exports = {
  lintOnSave: true,
  devServer: {
    hot: true,
    hotOnly: false,
    open: false,
    host: 'localhost',
    port: 8080,
  },
  chainWebpack: config => {
    config.devtool('source-map')
    config.devServer.set('proxy', proxyMap)
  },
}
