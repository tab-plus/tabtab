/*
 * @Author: panrunjun
 * @Date: 2024-09-05 18:02:19
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-09-06 17:39:14
 * @Description: 背景接口
 * @FilePath: \ytab-master\src\api\background.ts
 */

//我要用到的一些接口
import { Background } from "@/types/background";
import service from "@/utils/request";
export function get_background_list() {
    return service({
        url: "/background/get_background_list",
        method: "GET"
    })
}

export function get_background_recommend() {
    return service({
        url: "/background/get_background_recommend",
        method: "GET"
    })
}

export function add_background(data: Background) {
    return service({
        url: "/background/add_background",
        method: "POST",
        data
    })
}

export function delete_background(name: string) {
    return service({
        url: "/background/delete_background?name=" + name,
        method: "delete",
    })
}

// export function update_background_ByUserId(data:any){
//     return service({
//         url: "/background/update_background_ByUserId",
//         method: "post",
//         data
//     })
// }