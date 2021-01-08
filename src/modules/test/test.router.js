import Vue from 'vue'
import vueRouter from 'vue-router'

Vue.use(vueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    redirect: '/testModule',
  },
  {
    path: '/testModule',
    name: 'testModule',
    component: () => import(/* webpackChunkName: "test/index" */ './pages/testModule.vue'),
  },
]

const router = new vueRouter({
  routes,
  base: process.env.BASE_URL,
})

export default router
