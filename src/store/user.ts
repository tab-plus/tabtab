/*
 * @Author: panrunjun
 * @Date: 2024-09-06 16:52:38
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-09-11 15:40:03
 * @Description: 用户控制store
 * @FilePath: \ytab-master\src\store\user.ts
 */
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            isLoggedIn: false,//是否登录
            userInfo: null,
            setting: false, //setting 弹窗
            // calendarData: null,  //日历数据
        }
    },
    getters: {
        // getCurrentWallpaper: (state) => state.currentWallpaper,
        getLogin: (state) => state.isLoggedIn,
        // getCalendarData: (state) => state.calendarData,
    },
    actions: {
        LOGIN(token) {
            this.isLoggedIn = true
            // this.userInfo = user
            localStorage.setItem('token', token)
            // localStorage.setItem('auth', JSON.stringify({ isLoggedIn: true, user }))
        },
        OPEN_SETTING() {
            this.setting = true
        },
        CLOSE_SETTING() {
            this.setting = false
        },
        LOGOUT() {
            this.isLoggedIn = false
            localStorage.removeItem('token')
        },
        INIT_USER() {
            const token = (localStorage.getItem('token'))
            if (token) {
                this.isLoggedIn = true
            }

            // 获取日历数据
            // const calendarData = (localStorage.getItem('calendarData'))
            // if (calendarData) {
            //     this.calendarData = calendarData
            // } else {
            //     localStorage.setItem('calendarData', JSON.stringify({}))
            //     this.calendarData = {}
            // }
        }
    }
})