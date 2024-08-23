/*
 * @Author: panrunjun
 * @Date: 2024-08-02 19:47:01
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-08-16 17:25:00
 * @Description: 用户的接口
 * @FilePath: \ytab-master\src\api\user.ts
 */
//我要用到的一些接口
import service from "@/utils/request";
// import {ILoginData} from "@/type/login";  //引入接口
 
// 登录接口
export function login(data:any) {//接口ILoginData接口的变量名
    return service({
        url: "/user/login",
        method: "POST",
        data
    })
}

// 注册
export function registerApi(data:any) {//接口ILoginData接口的变量名
    return service({
        url: "/user/register",
        method: "POST",
        data
    })
}
 
// 获取用户icon接口
export function getIconList(name:string = "home"){
    return service({
        url: "/icon/get_icon_list?routeName="+name,
        method: "GET"
    })
}
 
// 用户列表接口
export function getUserList(){
    return service({
        url: "/getUserList",
        method: "GET"
    })
}
 
// 角色列表接口
export function getRoleList(){
    return service({
        url: "/getRoleList",
        method: "GET"
    })
}
 
// 权限列表接口
export function getAuthorityList(){
    return service({
        url: "/getAuthorityList",
      method: "GET",
    })
}