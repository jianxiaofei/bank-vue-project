const path = require('path')
const glob = require('glob')
const isDev = process.env.NODE_ENV === 'development'
const pages = {
  index: {
    entry: path.resolve(__dirname, '../src/main.js'),
    template: path.resolve(__dirname, '../template/index.html'),
  },
}

const ps = {}
const ms = glob.sync(path.resolve(__dirname, '../src/modules/*/*.module.js'))
const ts = ms.reduce(
  (all, p) => {
    let r = /src[\\\/]modules[\\\/]([\w]+)[\\\/]\w+\.module\.js/
    let m = r.exec(p)[1]
    all[m] = {
      entry: p,
      template: path.resolve(__dirname, '../template/module.index.html'),
      filename: `${m}/${m}.html`,
    }
    return all
  },
  isDev ? pages : {},
)

glob.sync(path.resolve(__dirname, '../src/modules/*/.private.package')).forEach(v => {
  let r = /src[\/]modules[\/]([\w]+)[\/]\.private\.package$/
  let m = r.exec(v)[1]
  ps[m] = ts[m]
})

const page = Object.keys(ps).length ? ps : ts

module.exports = { ...page }
