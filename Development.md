### **开发说明**
#### 1.添加页码--`src\modules`目录

每添加一个模块在--`src\modules`目录下新建一个文件夹，模块**入口js文件名与模块名**相同。

#### 2.添加路由

#### 3.添加菜单

#### 4.获取模块配置，构建打包
 * 环境变量 `USE_MODULE_CONFIG` -- 配置文件 `.env.[env]`
  
  * `USE_MODULE_CONFIG=true`时，使用`config/module.config.js`的模块配置构建打包
  * `USE_MODULE_CONFIG=false`时，工具类自动获取`src/modules/`目录下的模块，构建打包

#### 5.mock模拟请求数据返回-- `mock/` 目录

在`mock/guipReq.js` 中添加路由配置，返回`json`格式的数据