const path = require('path')
const dll_dir = 'dll_vendor'
const dll_output_path = path.resolve(__dirname, `../public/${dll_dir}`)

module.exports ={
  dll_dir,
  dll_output_path
}
