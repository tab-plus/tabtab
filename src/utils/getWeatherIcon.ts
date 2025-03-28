/*
 * @Author: panrunjun
 * @Date: 2024-08-15 17:12:22
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-08-15 17:13:54
 * @Description: 获取天气图标
 * @FilePath: \ytab-master\src\utils\throttle.ts
 */

import douyun from "@/assets/images/pest/tianqi-duoyun.png"
import baoyu from "@/assets/images/pest/tianqi-baoyu.png"
import yin from "@/assets/images/pest/tianqi-yin.png"
import qing from "@/assets/images/pest/tianqi-qing.png"
import baoxue from "@/assets/images/pest/tianqi-baoxue.png"
import daxue from "@/assets/images/pest/tianqi-daxue.png"
import dayu from "@/assets/images/pest/tianqi-dayu.png"
import feng from "@/assets/images/pest/tianqi-feng.png"
import fuchen from "@/assets/images/pest/tianqi-fuchen.png"
import leizhenyu from "@/assets/images/pest/tianqi-leizhenyu.png"
import shachenbao from "@/assets/images/pest/tianqi-shachenbao.png"
import wu from "@/assets/images/pest/tianqi-wu.png"
import wumai from "@/assets/images/pest/tianqi-wumai.png"
import xiaoxue from "@/assets/images/pest/tianqi-xiaoxue.png"
import xiaoyu from "@/assets/images/pest/tianqi-xiaoyu.png"
import yangsha from "@/assets/images/pest/tianqi-yangsha.png"
import zhenxue from "@/assets/images/pest/tianqi-zhenxue.png"
import zhenyu from "@/assets/images/pest/tianqi-zhenyu.png"
import zhongxue from "@/assets/images/pest/tianqi-zhongxue.png"
import zhongyu from "@/assets/images/pest/tianqi-zhongyu.png"
export default function getIcon(weather: string): string {
    if (weather === "晴") {
        return qing
    } else if (weather === "多云") {
        return douyun
    } else if (weather === "阴") {
        return yin
    } else if (weather === "晴雨") {
        return zhenyu
    } else if (weather === "小雨") {
        return xiaoyu
    } else if (weather === "中雨") {
        return zhongyu
    } else if (weather === "大雨") {
        return dayu
    } else if (weather === "暴雨") {
        return baoyu
    } else if (weather === "雷阵雨") {
        return leizhenyu
    } else if (weather === "晴雪") {
        return zhenxue
    } else if (weather === "小雪") {
        return xiaoxue
    } else if (weather === "中雪") {
        return zhongxue
    } else if (weather === "大雪") {
        return daxue
    } else if (weather === "暴雪") {
        return baoxue
    } else if (weather === "雷电") {
        return dayu
    } else if (weather === "大风") {
        return feng
    } else if (weather === "雾") {
        return wu
    } else if (weather === "霾") {
        return wumai
    } else if (weather === "浮尘") {
        return fuchen;
    } else if (weather === "沙尘") {
        return yangsha
    } else if (weather === "沙尘暴") {
        return shachenbao
    } else {
        return zhenyu
    }
}
