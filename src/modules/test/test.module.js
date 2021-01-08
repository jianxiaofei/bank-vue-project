import Vue from 'vue'
import moduleApp from './testApp.vue'
import router from './test.router'
import antd from 'ant-design-vue/es'
import 'ant-design-vue/dist/antd.css'
import moment from 'moment'
Vue.prototype.$moment = moment
moment.locale('zh-cn') //汉化
Vue.use(antd)
Vue.config.productionTip = false

console.log(router)
new Vue({
  router,
  render: h => h(moduleApp),
}).$mount('#module')
