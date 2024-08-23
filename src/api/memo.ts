/*
 * @Author: panrunjun
 * @Date: 2024-08-02 19:47:01
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-08-04 20:55:19
 * @Description: 用户的接口
 * @FilePath: \ytab-master\src\api\memo.ts
 */
//我要用到的一些接口
import service from "@/utils/request";
import { MemoMenu } from "@/types/menu";
import { type } from "os";
// import {ILoginData} from "@/type/login";  //引入接口

// 删除接口
export function delete_memo(id: number) {//接口ILoginData接口的变量名
    return service({
        url: "/memo/delete_memo?id=" + id,
        method: "delete",
    })
}

// 增加接口
export type AddMemo = {
    title: string
    content: string
}
export function add_memo(data: AddMemo) {
    return service({
        url: "/memo/add_memo",
        method: "post",
        data
    })
}

// 获取列表接口
export function get_memo_list() {
    return service({
        url: "/memo/get_memo_list",
        method: "get",
    })
}

type UpdateMemo = {
    id: number
    title?: string
    content?: string
}
// 更新接口
export function update_memo(data: UpdateMemo) {
    return service({
        url: "/memo/update_memo",
        method: "post",
        data
    })
}
