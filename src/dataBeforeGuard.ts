/*
 * @Author: panrunjun
 * @Date: 2024-07-22 21:46:02
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-08-16 20:50:24
 * @Description: 
 * @FilePath: \ytab-master\src\dataBeforeGuard.ts
 */
//首次相关数据前置守卫
//服务端数据库中配置变量、本地json数据
import wallpaper from '@/json/wallpaper.json'
import searchEngine from '@/json/searchEngine.json'
import home from '@/json/home.json'
import { getIconList } from './api/user'


//抽象类是不允许被实例化
export default abstract class DataBeforeGuard {
  static initWp() {
    localStorage.setItem('WALLPAPER-PICTURE', JSON.stringify(wallpaper.img))
    localStorage.setItem('WALLPAPER-VIDEO', JSON.stringify(wallpaper.video))
  }

  static initSearchEngine() {
    localStorage.setItem('SEARCH-ENGINE', JSON.stringify(searchEngine.searchList))
    if (!localStorage.getItem('CURRENTSEARCH-ENGINE')) {
      localStorage.setItem('CURRENTSEARCH-ENGINE', JSON.stringify(searchEngine.searchList[0]))
    }
  }

  static async initHome() {
    if(!localStorage.getItem('home')) {
     console.log(home,"home")
    localStorage.setItem('home', JSON.stringify(home))
    }
  }
}
