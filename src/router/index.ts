/*
 * @Author: panrunjun
 * @Date: 2024-07-22 21:46:02
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-08-30 11:34:15
 * @Description: 
 * @FilePath: \ytab-master\src\router\index.ts
 */
import { createRouter, createWebHashHistory, Router } from 'vue-router'
import Layout from '@/layout'
import { RouterTy } from '~/router'

export const constantRoutes: RouterTy = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    name: 'father',
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: { title: '主页', icon: 'HomeOutlined' },
      },
      // {
      //   path: 'coder',
      //   name: 'coder',
      //   component: () => import('@/views/coder/index.vue'),
      //   meta: { title: '程序员', icon: 'CodeSandboxOutlined' },
      // },
      // {
      //   path: 'designer',
      //   name: 'designer',
      //   component: () => import('@/views/designer/index.vue'),
      //   meta: { title: '产品设计', icon: 'LikeOutlined' },
      // },
      {
        path: 'test',
        name: 'test',
        component: () => import('@/views/test.vue'),
        meta: { title: '测试', icon: 'CoffeeOutlined' },
      },
    
    ]
  }
]

const router: Router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { top: 0 }
  },
  routes: constantRoutes
})


export default router

