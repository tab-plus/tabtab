/*
 * @Author: panrunjun
 * @Date: 2024-08-18 16:04:26
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-08-27 19:58:34
 * @Description: 获取位置
 * @FilePath: \ytab-master\src\utils\getLocation.ts
 */
import axios from "axios";
import { string } from "vue-types";
const API_KEY = import.meta.env.VITE_GAUD_KEY; // 替换为你的 API 密钥
const BASE_URL = import.meta.env.VITE_GAUD_BASE_API;

interface Location {
    latitude:number, //纬度
    longitude:number, //经度
}
/**
 * @description: 异步获取经纬度
 * @return {Location} 经纬度
 * @author: panrunjun
 */
export async function getLocation(): Promise<Location> {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude; // 获取纬度
                    const longitude = position.coords.longitude; // 获取经度
                    console.log("当前位置的经纬度是：" + latitude + ", " + longitude);

                    // localStorage.setItem("latitude", String(latitude));
                    // localStorage.setItem("longitude", String(longitude));

                    // 完成位置获取，解析 Promise
                    resolve({ latitude, longitude });
                },
                (error) => {
                    console.log("获取位置信息失败：" + error.message);
                    // 位置获取失败，拒绝 Promise
                    reject(error);
                }
            );
        } else {
          
            console.log("浏览器不支持获取位置信息");
            // 浏览器不支持位置服务，拒绝 Promise
           
            reject(new Error("浏览器不支持获取位置信息"));
        }
        resolve({ latitude:23.121854, longitude:113.401317});
    });
}


/**
 * @description: 异步函数，返回城市信息
 * @param {string} latitude
 * @param {string} longitude
 * @return {string} city
 * @author: panrunjun
 */
export async function getCity(latitude,longitude) {
    if (latitude && longitude) {
        try {
            const response = await axios.get(`${BASE_URL}/geocode/regeo`, {
                params: {
                    output: 'xml',
                    location: `${longitude},${latitude}`,
                    key: API_KEY,
                    radius: 1000,
                    extensions: 'all'
                }
            });

            // 解析 XML 字符串
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(response.data, 'text/xml');
            const addressComponent = xmlDoc.querySelector('addressComponent');
            const district = addressComponent ? addressComponent.querySelector('district')?.textContent : '未知';
            // 返回城市信息
            return district || "北京";
        } catch (error) {
            console.error("获取城市信息失败:", error);
            return "北京";
        }
    } else {
        return "北京";
    }
}
