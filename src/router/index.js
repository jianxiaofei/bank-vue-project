import Vue from 'vue'
import Router from 'vue-router'
import { constantRouterMap, asyncRouterMap } from '@/config/router.config'

// hack router push callback
const originalPush = Router.prototype.push
Router.prototype.push = function(location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalPush.call(this, location, onResolve, onReject)
  }
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap.concat(asyncRouterMap),
})
router.beforeEach((to, from, next) => {
  const nextPaths = ['/404', '/401', '/500']
  if (nextPaths.some(v => to.path.includes(v))) {
    next()
  } else {
    to.query.token && sessionStorage.setItem('token', to.query.token)
  }
  next()
})
export default router
