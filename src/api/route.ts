/*
 * @Author: panrunjun
 * @Date: 2024-08-02 19:47:01
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-08-13 20:52:35
 * @Description: route的接口
 * @FilePath: \ytab-master\src\api\route.ts
 */
//我要用到的一些接口
import service from "@/utils/request";
// 获取用户route接口
export function get_route_list(){
    return service({
        url: "/route/get_route_list",
        method: "GET"
    })
}

export function add_route(data:any){
    return service({
        url: "/route/add_route",
        method: "POST",
        data
    })
}

export function delete_route(name:string){
    return service({
        url: "/route/delete_route?name="+name,
        method: "delete",
    })
}

// export function update_route_ByUserId(data:any){
//     return service({
//         url: "/route/update_route_ByUserId",
//         method: "post",
//         data
//     })
// }