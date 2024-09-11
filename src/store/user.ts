import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            isLoggedIn: false,//是否登录
            userInfo: null,
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