module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugin: [['import', { libraryName: 'ant-design-vue', libraryDirectory: 'es', style: true }, 'antd']],
}
