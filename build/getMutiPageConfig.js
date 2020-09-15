const glob = require('glob')
const pages = {}
const pagesConfig = require('../config/module.config');
module.exports = function getPages() {
  const useConfig = process.env.USE_MODULE_CONFIG === 'true'
  if(useConfig){
    Object.keys(pagesConfig).forEach(key => {
      pages[`${key}/${key}`] = {
        entry: `src/modules/${key}/${key}.js`,
        template: 'build/module.index.html',
        filename: `${key}/${key}.html`,
      }
    })
  }else{
    glob.sync('./src/modules/*/*.js').forEach(filePath => {
      const fileList = filePath.split('/')
      const fileName = fileList[fileList.length-2]
      pages[`${fileName}/${fileName}`] = {
        entry: `src/modules/${fileName}/${fileName}.js`,
        template: 'build/module.index.html',
        filename:`${fileName}/${fileName}.html`
      }
    })
  }
  return pages;
}