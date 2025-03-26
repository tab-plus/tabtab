/*
 * @Author: panrunjun
 * @Date: 2024-09-06 16:52:38
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-03-26 12:01:27
 * @Description: memo store
 * @FilePath: \ytab-master\src\store\memoStore.ts
 */
import { defineStore } from 'pinia'
import {
    Memo,
} from "@/types/memo";

export const useMemoStore = defineStore('memoStore', {
    state: () => {
        return {
            memoList: <Array<Memo>>[],// 备忘录列表
        }
    },
    getters: {
        getList: (state) => state.memoList,
    },
    actions: {
        // 指定名称更新
        UPDATE_MEMO(id: string, name: "title" | "content", data: string) {
            // 找到 id 对应元素的索引
            let index = this.memoList.findIndex(item => item.id === id);

            // 如果找到了该元素，替换为 newData
            if (index !== -1) {
                this.memoList[index][name] = data;
            }

            localStorage.setItem("memoList", JSON.stringify(this.memoList));
        },
        // 添加备忘录
        ADD_MEMO(data: Memo) {
            console.log(data, 'data');

            // store
            this.memoList.unshift(data);
            // 本地
            let memo = JSON.parse(localStorage.getItem("memoList")) || [];
            if (memo.length <= 0) {
                memo.push(data)
            } else {
                memo.unshift(data);
            }
            localStorage.setItem("memoList", JSON.stringify(memo));
        },
        // 删除备忘录
        DELETE_MEMO(idToRemove: string) {
            console.log("删除的id:", idToRemove);

            // 找到 id 对应元素的索引
            let index = this.memoList.findIndex(item => item.id === idToRemove);

            // 如果找到了该元素，使用 splice 删除
            if (index !== -1) {
                this.memoList.splice(index, 1);
            }

            localStorage.setItem("memoList", JSON.stringify(this.memoList));
        },
        // 初始化
        INIT_LIST() {
            const list = JSON.parse(localStorage.getItem("memoList")) || [];
            this.memoList = list;
        }
    }
})