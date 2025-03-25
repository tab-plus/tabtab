/*
 * @Author: panrunjun
 * @Date: 2024-09-06 16:52:38
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-03-25 15:17:46
 * @Description: mainIcon store
 * @FilePath: \ytab-master\src\store\mainIcon.ts
 */
import { defineStore } from 'pinia'
import {
    Icon,
} from "@/types/icon";

export const useMainIconStore = defineStore('mainIcon', {
    state: () => {
        return {
            iconList: <Array<Icon>>[],// 图标列表
            routerName: '',// 路由名称
        }
    },
    getters: {
        getList: (state) => state.iconList,
    },
    actions: {
        // 更新 iconList
        UPDATE_ICON_LIST(newIconList: Array<Icon>) {
            this.iconList = newIconList;
            localStorage.setItem(this.routerName, JSON.stringify(this.iconList));
        },

        UPDATE_ICON_SIZE(iconId: string, size: number) {
            // 找到 id 对应元素的索引
            let index = this.iconList.findIndex(item => item.id === iconId);

            // 如果找到了该元素，替换为 newData
            if (index !== -1) {
                this.iconList[index].size = size;
            }

            localStorage.setItem(this.routerName, JSON.stringify(this.iconList));
        },
        // 添加图标
        ADD_ICON(data: Icon) {
            // store
            this.iconList.unshift(data);
            // 本地
            let garids = JSON.parse(localStorage.getItem(this.routerName)) || [];
            garids.unshift(data);
            localStorage.setItem(this.routerName, JSON.stringify(garids));
        },
        // 删除图标
        DELETE_ICON(idToRemove: string) {
            console.log("删除的id:", idToRemove);

            // 找到 id 对应元素的索引
            let index = this.iconList.findIndex(item => item.id === idToRemove);

            // 如果找到了该元素，使用 splice 删除
            if (index !== -1) {
                console.log("删除的下标：", index);

                this.iconList.splice(index, 1);
            }

            localStorage.setItem(this.routerName, JSON.stringify(this.iconList));
        },
        // 初始化
        INIT_LIST(name: string) {
            this.routerName = name;
            const list = JSON.parse(localStorage.getItem(name)) || [];
            this.iconList = list;
        }
    }
})