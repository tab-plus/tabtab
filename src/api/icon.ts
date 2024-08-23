/*
 * @Author: panrunjun
 * @Date: 2024-08-02 19:47:01
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-08-17 17:21:01
 * @Description: icon的接口
 * @FilePath: \ytab-master\src\api\icon.ts
 */
//我要用到的一些接口
import service from "@/utils/request";
// 获取用户icon接口
export function get_allicon_list(){
    return service({
        url: "/icon/get_allicon_list",
        method: "GET"
    })
}

export function add_icon_ByUserId(data:any){
    return service({
        url: "/icon/add_icon_ByUserId",
        method: "POST",
        data
    })
}

export function delete_icon_ByUserId(id:string){
    return service({
        url: "/icon/delete_icon_ByUserId?id="+id,
        method: "delete",
    })
}

export function update_icon_ByUserId(data:any){
    return service({
        url: "/icon/update_icon_ByUserId",
        method: "post",
        data
    })
}

export function export_icon(data:any){
    return service({
        url: "/icon/export_icon",
        method: "post",
        data
    })
}

export function import_icon(){
    return service({
        url: "/icon/import_icon",
        method: "get",
    })
}