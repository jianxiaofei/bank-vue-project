const fs = require('fs')

fs.stat('public/vendor', err => {
  if(err){
    console.error('vendor.dll not exists, please execute "npm run dll" first.\n')
    process.exitCode = 1
  }
})