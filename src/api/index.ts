/*
 * @Author: panrunjun
 * @Date: 2024-08-17 20:21:49
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-08-18 11:38:55
 * @Description: 
 * @FilePath: \ytab-master\src\api\index.ts
 */
//我要用到的一些接口
import service from "@/utils/request";
// 统计访问量
export function add_visit(data?:any){
    return service({
        url: "/visit/add_visit",
        method: "POST",
        data,
    })
}
