
//我要用到的一些接口
import service from "@/utils/request";
export function get_background_list(){
    return service({
        url: "/background/get_background_list",
        method: "GET"
    })
}
interface AddBackground {
    name:string,
    url:string,
    attribute:string,
    themeColor:string,
}
export function add_background(data:AddBackground){
    return service({
        url: "/background/add_background",
        method: "POST",
        data
    })
}

export function delete_background(name:string){
    return service({
        url: "/background/delete_background?name="+name,
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