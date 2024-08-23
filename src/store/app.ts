/*
 * @Author: panrunjun
 * @Date: 2024-07-22 21:46:02
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-08-16 20:23:07
 * @Description: router操作
 * @FilePath: \ytab-master\src\store\app.ts
 */
import { defineStore } from 'pinia'
import { constantRoutes } from '@/router'
import { RouterRowTy } from '~/router'
import router from '@/router'

type LsRouteTy = Pick<RouterRowTy, 'name' | 'meta' | 'path'>


export const useAppStore = defineStore('app', {
  state: () => {
    return {
      cachedViews: [] as Array<string>,
      routes: constantRoutes, //静态路由和动态路由集合
      isInitAsyncRoutes: false as boolean
    }
  },
  getters: {
    getAsyncRoutes: () => JSON.parse(localStorage.getItem('ASYNC_ROUTES')!),
    getIsInitAsyncRoutes: (state) => state.isInitAsyncRoutes,
    getRouteIsExisted: () :Function => {
      return (routeName: string) :boolean => {
        let asyncRoutes = JSON.parse(localStorage.getItem('ASYNC_ROUTES')!)
        if(!asyncRoutes) return false
        const result = asyncRoutes.findIndex((v: LsRouteTy) => v.name === routeName)
        if(result > -1) {
          return true
        } else {
          return false
        }
      }
    }
  },
  actions: {
    ADD_ASYNC_ROUTES(routeObj: RouterRowTy) {
      this.$patch((state) => {
        state.routes[0].children?.push(routeObj)
      })
    },

    async REMOVE_ASYNC_ROUTE() {
      let prevRoute
      this.$patch(state => {
        state.routes[0].children?.pop()
        let prevRoutes = JSON.parse(localStorage.getItem('ASYNC_ROUTES')!)
        prevRoutes.pop()
        localStorage.setItem('ASYNC_ROUTES', JSON.stringify(prevRoutes))
        router.replace(`/${prevRoutes.at(-1).path}`)  //mark关键 替换历史堆栈中的当前 entry，以编程方式导航到一个新的 URL
        prevRoute = prevRoutes.at(-1).path
      })
      return prevRoute
    },

    MODIFY_ISINITASYNCROUTES(bool: boolean) {
      this.$patch(state => {
        state.isInitAsyncRoutes = bool
      })
    },

    /*keepAlive缓存操作*/  //缓存性能优化后面再搞，先放一下
    ADD_CACHED_VIEW(view: string) {
      this.$patch((state) => {
        if (state.cachedViews.includes(view)) return
        state.cachedViews.push(view)
      })
    },
    DEL_CACHED_VIEW(view: string) {
      this.$patch((state) => {
        const index = state.cachedViews.indexOf(view)
        index > -1 && state.cachedViews.splice(index, 1)
      })
    },
    RESET_CACHED_VIEW() {
      this.$patch((state) => {
        state.cachedViews = []
      })
    },
  }
})
