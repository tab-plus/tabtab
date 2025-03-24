/*
 * @Author: panrunjun
 * @Date: 2024-09-06 16:52:38
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-03-24 17:34:11
 * @Description: bottomIcon store
 * @FilePath: \ytab-master\src\store\bottomIcon.ts
 */
import { defineStore } from 'pinia'
import addImage from "@/assets/images/add.png";

export const useBottomIconStore = defineStore('bottomIcon', {
    state: () => {
        return {
            iconList: [],// 底部图标列表

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
            let garids = JSON.parse(localStorage.getItem("bottomIcon")) || [];
            garids.unshift(data);
            localStorage.setItem("bottomIcon", JSON.stringify(garids));
        },
        DELETE_ICON(idToRemove: string) {
            // 找到 id 对应元素的索引
            let index = this.iconList.findIndex(item => item.id === idToRemove);

            // 如果找到了该元素，使用 splice 删除
            if (index !== -1) {
                this.iconList.splice(index, 1);
            }

            localStorage.setItem("bottomIcon", JSON.stringify(this.iconList));


        },
        LOGOUT() {
            this.isLoggedIn = false
            localStorage.removeItem('token')
        },
        INIT_LIST() {
            let list = JSON.parse(localStorage.getItem("bottomIcon")) || [];
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
            localStorage.setItem("bottomIcon", JSON.stringify(list));
            this.iconList = list;
        }
    }
})