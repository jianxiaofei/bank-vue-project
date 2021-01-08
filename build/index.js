const base = require('./vue.config.base')
const prod = require(`./vue.config.${process.env.NODE_ENV.slice(0, 3)}`)
const _chainWebpack = []
const _vueConfig = [base, prod].reduce((sum, item) => {
  item.chainWebpack && _chainWebpack.push(item.chainWebpack)
  return Object.assign(sum, item)
}, {})

_vueConfig.chainWebpack = config => {
  _chainWebpack.forEach(item => {
    item(config)
  })
}

module.exports = { ..._vueConfig }
