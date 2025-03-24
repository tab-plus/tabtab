/*
 * @Author: panrunjun
 * @Date: 2024-09-06 16:52:38
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-03-24 19:59:12
 * @Description: mainIcon store
 * @FilePath: \ytab-master\src\store\mainIcon.ts
 */
import { defineStore } from 'pinia'
import addImage from "@/assets/images/add.png";

export const useMainIconStore = defineStore('mainIcon', {
    state: () => {
        return {
            iconList: [],// 图标列表

        }
    },
    getters: {
        getList: (state) => state.iconList,
    },
    actions: {
        LOGIN(token) {
            this.isLoggedIn = true
            // this.userInfo = user
            localStorage.setItem('token', token)
            // localStorage.setItem('auth', JSON.stringify({ isLoggedIn: true, user }))
        },
        ADD_ICON(data: any) {
            // store
            this.iconList.unshift(data);
            // 本地
            let garids = JSON.parse(localStorage.getItem("mainIcon")) || [];
            garids.unshift(data);
            localStorage.setItem("mainIcon", JSON.stringify(garids));
        },
        DELETE_ICON(idToRemove: string) {
            // 找到 id 对应元素的索引
            let index = this.iconList.findIndex(item => item.id === idToRemove);

            // 如果找到了该元素，使用 splice 删除
            if (index !== -1) {
                this.iconList.splice(index, 1);
            }

            localStorage.setItem("mainIcon", JSON.stringify(this.iconList));


        },
        LOGOUT() {
            this.isLoggedIn = false
            localStorage.removeItem('token')
        },
        INIT_LIST() {
            let list = JSON.parse(localStorage.getItem("mainIcon")) || [];
            if (list.length === 0) {
                list.push({
                    url: "",
                    type: "add",
                    name: "add",
                    src: addImage,
                    disabled: true,
                    id:"add"
                });
            }
            localStorage.setItem("mainIcon", JSON.stringify(list));
            this.iconList = list;
        }
    }
})