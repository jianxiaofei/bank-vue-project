// eslint-disable-next-line no-unused-vars
import { UserLayout, BasicLayout, RouteView, BlankView, PageView } from '@/layouts'

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    redirect: '/main/test-demo',
    children: [
      {
        path: '/main',
        name: '主系统',
        redirect: '/main/test-demo',
        component: RouteView,
        children: [
          {
            path: '/main/test-demo',
            exact: true,
            name: 'TestDemo',
            component: () => import('../views/demo/Demo'),
          },
        ],
      },
      {
        path: '/system',
        name: '外系统',
        component: RouteView,
        children: [
          {
            path: '/system/:id',
            exact: true,
            name: 'testHome',
            component: () => import('@/views/Home'),
          },
        ],
      },
      {
        path: '/exception',
        name: 'exception',
        component: RouteView,
        redirect: '/exception/403',
        children: [
          {
            path: '/exception/403',
            name: 'Exception403',
            component: () => import(/* webpackChunkNmae: "fail" */ '@/views/exception/403'),
          },
          {
            path: '/exception/404',
            name: 'Exception404',
            component: () => import(/* webpackChunkNmae: "fail" */ '@/views/exception/404'),
          },
          {
            path: '/exception/500',
            name: 'Exception500',
            component: () => import(/* webpackChunkNmae: "fail" */ '@/views/exception/500'),
          },
        ],
      },
    ],
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true,
  },
]

/**
 * 基础路由
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: 'user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/*webpackChunkName:"user" */ '@/views/user/Login'),
      },
      {
        path: '/404',
        component: () => import(/*webpackChunkName:"fail" */ '@/views/exception/404'),
      },
    ],
  },
]
