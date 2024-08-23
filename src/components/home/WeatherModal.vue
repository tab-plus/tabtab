<template>
    <a-card hoverable>
        <div v-if="isModalVisible" class="echarts_main" ref="weatherMain"></div>
    </a-card>
</template>
  
<script lang="ts">
import { defineComponent, ref, onMounted, nextTick } from 'vue';
import * as echarts from 'echarts';
import axios from 'axios';
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
import { getCity } from '@/utils/getLocation';
import { loadavg } from 'os';
export default defineComponent({
    setup(props, { emit }) {
        // 定义一个 ref 用于绑定到 DOM 元素
        const weatherMain = ref<HTMLElement | null>(null);
        const weatherOptions = ref(<Array<any>>[]);
        // 控制 modal 的显示状态
        const isModalVisible = ref(true);

        function getWeather() {
            let city = localStorage.getItem("city")
            let longitude = localStorage.getItem("longitude")
            let latitude = localStorage.getItem("latitude")
            let url = `https://devapi.qweather.com/v7/weather/7d?key=ac95821472f94d9fbb3f50e93075e1b8&location=${longitude},${latitude}`
            axios(url).then((resp: any) => {
                console.log(resp.data, "resp");
                weatherOptions.value = resp.data.daily;
                weatherOptions.value.map(rr => {
                    rr.windScaleDay = rr.windScaleDay + '级';//风力等级数据处理
                    rr.fxDate = rr.fxDate.substr(5, 11);//日期处理
                })
                leftBottomEchart(weatherOptions.value);
            })
        }


        function leftBottomEchart(data, type?) {

            const extractField = (field, array) => {
                return array.map(item => item[field]);
            };

            const dayOp = extractField('fxDate', data);//日期
            const tempMaxOp = extractField('tempMax', data);//最高温度
            const tempMinOp = extractField('tempMin', data);//最低温度
            const textDayOp = extractField('textDay', data);//白天天气文字描述
            const textNightOp = extractField('textNight', data);//夜间天气文字描述
            const windDirDayOp = extractField('windDirDay', data);//风向
            const windScaleDayOp = extractField('windScaleDay', data);//风力等级

            // var weatherMain = echarts.init(this.$refs.weatherMain);
            // 确保 DOM 元素已挂载
            console.log(weatherMain.value);

            if (weatherMain.value) {
                // 初始化 ECharts 实例
                const chart = echarts.init(weatherMain.value);
                var containerWidth = chart.getWidth();//获取容器宽度
                var containerHeight = chart.getHeight();//获取容器高度

                const constoption = {
                    grid: {
                        show: true,
                        backgroundColor: "transparent",
                        opacity: 0.3,
                        borderWidth: "0",
                        top: "40%",
                        bottom: "25%",
                        left: '3%',
                        right: '3%',
                    },
                    tooltip: {
                        trigger: "axis",
                        axisPointer: {
                            lineStyle: {
                                color: "transparent",
                            },
                        },
                    },
                    legend: {
                        show: false,
                    },
                    xAxis: [
                        // 日期
                        {
                            type: "category",
                            boundaryGap: false,
                            position: "top",
                            offset: containerHeight * 0.24,//偏移量，根据高度百分比偏移
                            zlevel: 100,
                            axisLine: {
                                show: false,
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLabel: {
                                interval: 0,
                                formatter: ["{a|{value}}"].join("\n"),
                                rich: {
                                    a: {
                                        // color: 'white',
                                        fontSize: 12,
                                    },
                                },
                            },
                            nameTextStyle: {},
                            data: dayOp,
                        },
                        // 最高气温
                        {
                            type: "category",
                            boundaryGap: false,
                            position: "top",
                            offset: 0,//偏移量，根据高度百分比偏移
                            zlevel: 100,
                            axisLine: {
                                show: false,
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLabel: {
                                interval: 0,
                                formatter: ["{a|{value}}°"].join("\n"),
                                rich: {
                                    a: {
                                        // color: 'white',
                                        fontSize: 12,
                                    },
                                },
                            },
                            nameTextStyle: {},
                            data: tempMaxOp,
                        },
                        // 最低气温
                        {
                            type: "category",
                            boundaryGap: false,
                            position: "top",
                            offset: -containerHeight * 0.28,//偏移量，根据高度百分比偏移
                            zlevel: 100,
                            axisLine: {
                                show: false,
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLabel: {
                                interval: 0,
                                formatter: ["{a|{value}}°"].join("\n"),
                                rich: {
                                    a: {
                                        // color: 'white',
                                        fontSize: 12,
                                    },
                                },
                            },
                            nameTextStyle: {},
                            data: tempMinOp,
                        },
                        // 天气图标
                        {
                            type: "category",
                            boundaryGap: false,
                            position: "top",
                            offset: containerHeight * 0.03,//偏移量，根据高度百分比偏移
                            zlevel: 100,
                            axisLine: {
                                show: false,
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLabel: {
                                interval: 0,
                                formatter: function (value, index) {
                                    return "{" + index + "| }\n{b|" + value + "}";
                                },
                                rich: {
                                    0: {
                                        backgroundColor: {
                                            image: (() => {
                                                const index = 0; // 图片序号
                                                const weather = textDayOp[index]; // 根据图片序号获取对应的天气数据
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
                                            })(),
                                        },
                                        height: 24,
                                        width: 24,
                                    },
                                    1: {
                                        backgroundColor: {
                                            image: (() => {
                                                const index = 1; // 图片序号
                                                const weather = textDayOp[index]; // 根据图片序号获取对应的天气数据
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
                                            })(),
                                        },
                                        height: 24,
                                        width: 24,
                                    },
                                    2: {
                                        backgroundColor: {
                                            image: (() => {
                                                const index = 2; // 图片序号
                                                const weather = textDayOp[index]; // 根据图片序号获取对应的天气数据
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
                                            })(),
                                        },
                                        height: 24,
                                        width: 24,
                                    },
                                    3: {
                                        backgroundColor: {
                                            image: (() => {
                                                const index = 3; // 图片序号
                                                const weather = textDayOp[index]; // 根据图片序号获取对应的天气数据
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
                                            })(),
                                        },
                                        height: 24,
                                        width: 24,
                                    },
                                    4: {
                                        backgroundColor: {
                                            image: (() => {
                                                const index = 4; // 图片序号
                                                const weather = textDayOp[index]; // 根据图片序号获取对应的天气数据
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
                                            })(),
                                        },
                                        height: 24,
                                        width: 24,
                                    },
                                    5: {
                                        backgroundColor: {
                                            image: (() => {
                                                const index = 5; // 图片序号
                                                const weather = textDayOp[index]; // 根据图片序号获取对应的天气数据
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
                                            })(),
                                        },
                                        height: 24,
                                        width: 24,
                                    },
                                    6: {
                                        backgroundColor: {
                                            image: (() => {
                                                const index = 6; // 图片序号
                                                const weather = textDayOp[index]; // 根据图片序号获取对应的天气数据
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
                                            })(),
                                        },
                                        height: 24,
                                        width: 24,
                                    },
                                    b: {
                                        // color: 'white',
                                        fontSize: 12,
                                        lineHeight: 30,
                                        height: 20,
                                    },
                                },
                            },
                            nameTextStyle: {
                                fontWeight: "bold",
                                fontSize: 19,
                            },
                            data: textDayOp,
                            // data: ["小雨", "小雨", "阴", "小雨", "多云", "小雨", "小雨"],
                        },
                        // 底部天气图标
                        {
                            type: "category",
                            boundaryGap: false,
                            zlevel: 100,
                            position: "top", // 轴线位置为底部
                            offset: -containerHeight * 0.5,//偏移量，根据高度百分比偏移
                            axisLine: {
                                show: false, // 不显示轴线
                            },
                            axisTick: {
                                show: false, // 不显示刻度线
                            },
                            axisLabel: {
                                interval: 0,
                                formatter: function (value, index) {
                                    return "{" + index + "| }\n{b|" + value + "}";
                                },
                                rich: {
                                    0: {
                                        backgroundColor: {
                                            image: (() => {
                                                const index = 0; // 图片序号
                                                const weather = textNightOp[index]; // 根据图片序号获取对应的天气数据
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
                                            })(),
                                        },
                                        height: 24,
                                        width: 24,
                                    },
                                    1: {
                                        backgroundColor: {
                                            image: (() => {
                                                const index = 1; // 图片序号
                                                const weather = textNightOp[index]; // 根据图片序号获取对应的天气数据
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
                                            })(),
                                        },
                                        height: 24,
                                        width: 24,
                                    },
                                    2: {
                                        backgroundColor: {
                                            image: (() => {
                                                const index = 2; // 图片序号
                                                const weather = textNightOp[index]; // 根据图片序号获取对应的天气数据
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
                                            })(),
                                        },
                                        height: 24,
                                        width: 24,
                                    },
                                    3: {
                                        backgroundColor: {
                                            image: (() => {
                                                const index = 3; // 图片序号
                                                const weather = textNightOp[index]; // 根据图片序号获取对应的天气数据
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
                                            })(),
                                        },
                                        height: 24,
                                        width: 24,
                                    },
                                    4: {
                                        backgroundColor: {
                                            image: (() => {
                                                const index = 4; // 图片序号
                                                const weather = textNightOp[index]; // 根据图片序号获取对应的天气数据
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
                                            })(),
                                        },
                                        height: 24,
                                        width: 24,
                                    },
                                    5: {
                                        backgroundColor: {
                                            image: (() => {
                                                const index = 5; // 图片序号
                                                const weather = textNightOp[index]; // 根据图片序号获取对应的天气数据
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
                                            })(),
                                        },
                                        height: 24,
                                        width: 24,
                                    },
                                    6: {
                                        backgroundColor: {
                                            image: (() => {
                                                const index = 6; // 图片序号
                                                const weather = textNightOp[index]; // 根据图片序号获取对应的天气数据
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
                                            })(),
                                        },
                                        height: 24,
                                        width: 24,
                                    },
                                    b: {
                                        // color: 'white',
                                        fontSize: 12,
                                        lineHeight: 30,
                                        height: 20,
                                    },
                                },
                            },
                            nameTextStyle: {
                                fontWeight: "bold",
                                fontSize: 19,
                            },
                            //data: weatherdata,
                            data: textNightOp,
                        },
                        // 风向
                        {
                            type: "category",
                            boundaryGap: false,
                            position: "top",
                            offset: -containerHeight * 0.52,//偏移量，根据高度百分比偏移
                            zlevel: 100,
                            axisLine: {
                                show: false,
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLabel: {
                                interval: 0,
                                formatter: ["{a|{value}}"].join("\n"),
                                rich: {
                                    a: {
                                        // color: 'white',
                                        fontSize: 12,
                                    },
                                },
                            },
                            nameTextStyle: {},
                            data: windDirDayOp,
                        },
                        // 风力
                        {
                            type: "category",
                            boundaryGap: false,
                            position: "top",
                            offset: -containerHeight * 0.57,//偏移量，根据高度百分比偏移
                            zlevel: 100,
                            axisLine: {
                                show: false,
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLabel: {
                                interval: 0,
                                formatter: ["{a|{value}}"].join("\n"),
                                rich: {
                                    a: {
                                        // color: 'white',
                                        fontSize: 12,
                                    },
                                },
                            },
                            nameTextStyle: {},
                            data: windScaleDayOp,
                        },
                    ],
                    yAxis: {
                        type: "value",
                        show: false,
                        axisLabel: {
                            formatter: "{value} °C",
                            color: "white",
                        },
                    },
                    series: [
                        // 最高气温
                        {
                            name: "最高气温",
                            type: "line",
                            data: tempMaxOp,
                            symbol: "none",
                            symbolSize: 1,
                            showSymbol: true,
                            smooth: true,
                            itemStyle: {
                                normal: {
                                    color: "#FFA033",
                                },
                            },
                            label: {
                                show: true,
                                position: "top",
                                // offset: 10, // 设置标签相对于数据点的偏移量
                                // color: 'white',
                                formatter: "{c} °C",
                            },
                            lineStyle: {
                                width: 3,
                                color: "#FFA033",
                                // normal: {
                                //   color: "#4c9bfd",

                                //   shadowBlur: 10, // 阴影模糊度
                                //   shadowColor: "rgba(76, 155, 253, 0.3)", // 阴影颜色
                                // },
                            },
                            areaStyle: {
                                opacity: 1,
                                color: "transparent",
                            },
                        },
                        // 最低气温
                        {
                            name: "最低气温",
                            type: "line",
                            data: tempMinOp,
                            symbol: "none",
                            symbolSize: 1,
                            showSymbol: true,
                            smooth: true,
                            itemStyle: {
                                normal: {
                                    color: "#5CADFF",
                                },
                            },
                            label: {
                                show: true,
                                position: "bottom",
                                // color: 'white',
                                formatter: "{c} °C",
                            },
                            lineStyle: {
                                width: 3,
                                color: "#5CADFF",
                            },
                            areaStyle: {
                                opacity: 1,
                                color: "transparent",
                            },
                        },
                    ],
                };
                if (type == 'redraw') {
                    setTimeout(() => {
                        chart.setOption(constoption, true);
                        chart.resize();
                    }, 1);
                } else {
                    setTimeout(() => {
                        chart.setOption(constoption);
                        chart.resize();
                    }, 1)
                }

            } else {
            }
        }

        // 在组件挂载后执行
        onMounted(async () => {
            await nextTick(); // 确保 DOM 已经更新
            getWeather();
        });
        return {
            weatherMain,
            isModalVisible,
        };
    }
});
</script>
  
<style>
/* 添加样式 */
.echarts_main {
    margin: 0px 10px;
    width: 100%;
    height: 400px;
}
</style>
  