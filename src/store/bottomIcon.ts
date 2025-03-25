/*
 * @Author: panrunjun
 * @Date: 2024-09-06 16:52:38
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-03-25 11:08:04
 * @Description: bottomIcon store
 * @FilePath: \ytab-master\src\store\bottomIcon.ts
 */
import { defineStore } from 'pinia'
import addImage from "@/assets/images/add.png";
import {
    Icon,
} from "@/types/icon";
export const useBottomIconStore = defineStore('bottomIcon', {
    state: () => {
        return {
            iconList: <Array<Icon>>[],// 底部图标列表
        }
    },
    getters: {
        getList: (state) => state.iconList,
    },
    actions: {
        // 更新 iconList
        UPDATE_ICON_LIST(newIconList: Array<Icon>) {
            console.log(newIconList,"newIconList");
            
            this.iconList = newIconList;
            localStorage.setItem('bottomIcon', JSON.stringify(this.iconList));
        },
        ADD_ICON(data: Icon) {
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
        INIT_LIST() {
            let list = JSON.parse(localStorage.getItem("bottomIcon")) || [];
            if (list.length === 0) {
                list.push({
                    url: "",
                    type: "add",
                    name: "add",
                    src: addImage,
                    disabled: true,
                    id: "add"
                });
            }
            localStorage.setItem("bottomIcon", JSON.stringify(list));
            this.iconList = list;
        }
    }
})