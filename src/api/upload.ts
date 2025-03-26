/*
 * @Author: panrunjun
 * @Date: 2024-09-05 15:59:20
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-09-05 16:01:40
 * @Description: 上传图片接口
 * @FilePath: \ytab-master\src\api\upload.ts
 */

// 引入封装的请求方法
import service from "@/utils/request";

// 定义上传图片函数
export function uploadImage(file: File) {
    // 创建 FormData 对象
    const formData = new FormData();
    // 将文件添加到 FormData 对象中
    formData.append('file', file);

    // 返回一个 POST 请求
    return service({
        url: "/upload/img", // 替换为实际上传图片的接口路径
        method: "POST",
        data: formData, // 发送 FormData 对象
        headers: {
            'Content-Type': 'multipart/form-data' // 确保正确设置 Content-Type
        }
    });
}
