/*
 * @Author: panrunjun
 * @Date: 2024-08-02 19:39:09
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-09-05 16:07:22
 * @Description: 封装的请求
 * @FilePath: \ytab-master\src\utils\request.ts
 */
import axios from "axios";
import { message } from 'ant-design-vue';
const baseUrl = import.meta.env.VITE_BASE_URL;

// 创建 axios 实例
const service = axios.create({
    baseURL: "http://127.0.0.1:3034",
    timeout: 5000, // 超时时间
    headers: {
        "Content-type": "application/json;charset=utf-8" // 默认设置为 JSON
    }
});

// 请求拦截
service.interceptors.request.use((config) => {
    config.headers = config.headers || {}; // 没有数据的话就设置为空对象
    if (localStorage.getItem("token")) { // 确保登录
        config.headers.token = localStorage.getItem("token") || "";
    }

    // 处理 `multipart/form-data` 类型的请求
    if (config.data instanceof FormData) {
        config.headers['Content-Type'] = 'multipart/form-data';
    }

    return config; // 必须返回出去，不然请求发不出去
}, error => {
    // 处理错误请求
    return Promise.reject(error);
});

// 响应拦截
service.interceptors.response.use((res) => {
    const code: number = res.data.code; // code 是后端的状态码
    if (code === 200) {
        return Promise.resolve(res.data);
    } else if (code === 401) {
        // 请求失败
        message.error('请先登录');
    } else {
        // 请求失败
        message.error(res.data.message);
    }
}, (err) => {
    console.log(err, '错误信息的处理'); // 错误信息的处理
    // 处理错误响应
    return Promise.reject(err);
});

// 导出实例
export default service;
