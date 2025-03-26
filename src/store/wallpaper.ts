/*
 * @Author: panrunjun
 * @Date: 2024-07-22 21:46:02
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-09-04 15:07:42
 * @Description: 设置背景
 * @FilePath: \ytab-master\src\store\wallpaper.ts
 */
import { defineStore } from 'pinia'
import { SwallPaperTy } from '~/wallpaper'

export const useWallpaperStore = defineStore('wallpaper', {
  state: () => {
    return {
      currentWallpaper: {} as SwallPaperTy
    }
  },
  getters: {
    getCurrentWallpaper: (state) => state.currentWallpaper,
    getAllPictureWallpaper: () => JSON.parse(localStorage.getItem('WALLPAPER-PICTURE') as string),
    getCurrentWallpaperThemeColor: (state) => state.currentWallpaper.themeColor
  },
  actions: {
    SET_CURRENTWALLPAPER(swallpaperObj: SwallPaperTy) :void{
      console.log(swallpaperObj,"swallpaperObj");
      
      this.$patch((state) => {
        state.currentWallpaper = swallpaperObj
        localStorage.setItem('CURRENTWALLPAPER', JSON.stringify(swallpaperObj))
      })
    }
  }
})
