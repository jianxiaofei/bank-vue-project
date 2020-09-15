const proxyMap = require('./config/proxy.config.js');
const guipReq = require('./mock/guipReq');
const vueConfig = require('./build/app.config');

const appConfigWebpack = vueConfig.configureWebpack;
const appChainWebpack = vueConfig.appChainWebpack;
module.exports = {
  ...vueConfig,
  publicPath: process.env.NODE_ENV === 'production' ? process.env.VUE_APP_BASE_URL : '/',
  assetsDir: './',
  configureWebpack: (config) => appConfigWebpack(config),
  chainWebpack: (config) => {
    appChainWebpack(config);
    if (process.env.MOCK !== 'true') {
      config.devServer.set('proxy', proxyMap);
    } else {
      config.devServer.set('before', (app) => guipReq(app));
    }
  },
  devServer: {
    hot: true,
    hotOnly: false,
    open: true,
    host: 'localhost',
    port: 8080,
  },
}
