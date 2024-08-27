/*
 * @Author: panrunjun
 * @Date: 2024-08-21 21:26:02
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-08-27 19:33:56
 * @Description: 获取天气
 * @FilePath: \ytab-master\src\utils\getWeather.ts
 */

import axios from "axios";

// 假设你使用了一个天气 API，例如 OpenWeatherMap
const API_KEY = import.meta.env.VITE_WEATHER_KEY; // 替换为你的 API 密钥
const BASE_URL = import.meta.env.VITE_WEATHER_BASE_API;
/**
 * @description: 异步函数，通过调用和风天气的接口获取城市的天气
 * @param {*} latitude
 * @param {*} longitude
 * @return {*} data 返回天气信息
 * @author: panrunjun
 */
export async function getWeatherNow(latitude,longitude) {
    try {
        // 构建请求 URL
        const url = `${BASE_URL}/now?location=${longitude},${latitude}&key=${API_KEY}`;
        // 发起请求
        const response = await axios(url);
        // 检查响应是否成功
        // if (!response.ok) {
        //     throw new Error(`HTTP error! status: ${response.status}`);
        // }
        console.log(response.data.now);
        // 解析 JSON 数据
        // 处理和返回数据
        return {
            data: response.data.now,
        };
    } catch (error) {
        console.error('Failed to fetch weather data:', error);
        // 可以选择返回一个默认值或重新抛出错误
        throw error;
    }
}
