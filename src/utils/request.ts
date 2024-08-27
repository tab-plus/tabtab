/*
 * @Author: panrunjun
 * @Date: 2024-08-02 19:39:09
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-08-27 19:25:12
 * @Description: 封装的请求
 * @FilePath: \ytab-master\src\utils\request.ts
 */
import axios from "axios";
import { message } from 'ant-design-vue';
const baseUrl = import.meta.env.VITE_BASE_URL;
//创建axios实例
const service = axios.create({
	// baseURL: "http://127.0.0.1:3034",
	baseURL: "http://8.138.112.139:3034",
	timeout: 5000,//超时时间
	headers: {//编译语言
		"Content-type": "application/json;charset=utf-8"
	}
})
//请求拦截
//就是你请求接口的时候，我会先拦截下来，对你的数据做一个判断，或者携带个token给你
service.interceptors.request.use((config) => {//请求的数据
	config.headers = config.headers || {}  // 没有数据的话就设置为空设置为数据
	if (localStorage.getItem("token")) {//先确保登录
		config.headers.token = localStorage.getItem("token") || ""
	}
	return config//必须返回出去，不然请求发不出去
}, error => {
	//处理错误请求
	return Promise.reject(error)
})
//响应拦截：后端返回来的结果
service.interceptors.response.use((res) => {
	const code: number = res.data.code//code是后端的状态码
	if (code == 200) {
		return Promise.resolve(res.data)
		// if(code === 0){
		//     return Promise.reject(res)
		// }
		//请求失败（包括token失效，302，404...根据和后端约定好的状态码做出不同的处理）
		// return Promise.reject(res)
	}else if(code== 401){
		//请求失败
		message.error('请先登录');
	} 
	else {
		//请求失败
		message.error(res.data.message);

	}
}, (err) => {
	console.log(err, '错误信息的处理')//错误信息的处理
	//处理错误响应
	return Promise.reject(err)
})
//因为别的地方要用，所以就把实例暴露出去，导出
export default service