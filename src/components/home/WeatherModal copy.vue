
<template>
    <div class="echarts_main" ref="weatherMain">
        11
    </div>
</template>

<script lang="ts">
import { onMounted, ref } from "vue";
import axios from 'axios';
import * as echarts from 'echarts';
export default defineComponent({
    components: {
    },
    // emits: ['closeMemo'], // 声明子组件可以触发的事件
    setup(props, { emit }: { emit: Function }) {
        const weatherOptions = ref(<Array<any>>[]);
            const isModalVisible = ref(false);
        // 创建一个 ref 以引用 DOM 元素
        const weatherMain = ref(null);

        
        function getWeather() {
            let url = 'https://devapi.qweather.com/v7/weather/7d?key=ac95821472f94d9fbb3f50e93075e1b8&location=101010100'
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
                var containerWidth = weatherMain.value.getWidth();//获取容器宽度
                var containerHeight = weatherMain.value.getHeight();//获取容器高度

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
                                                    return require("@/assets/images/pest/weather/tianqi-qing.png");
                                                } else if (weather === "多云") {
                                                    return require("@/assets/images/pest/weather/tianqi-duoyun.png");
                                                } else if (weather === "阴") {
                                                    return require("@/assets/images/pest/weather/tianqi-yin.png");
                                                } else if (weather === "晴雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-zhenyu.png");
                                                } else if (weather === "小雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-xiaoyu.png");
                                                } else if (weather === "中雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-zhongyu.png");
                                                } else if (weather === "大雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-dayu.png");
                                                } else if (weather === "暴雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-baoyu.png");
                                                } else if (weather === "雷阵雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-leizhenyu.png");
                                                } else if (weather === "晴雪") {
                                                    return require("@/assets/images/pest/weather/tianqi-zhenxue.png");
                                                } else if (weather === "小雪") {
                                                    return require("@/assets/images/pest/weather/tianqi-xiaoxue.png");
                                                } else if (weather === "中雪") {
                                                    return require("@/assets/images/pest/weather/tianqi-zhongxue.png");
                                                } else if (weather === "大雪") {
                                                    return require("@/assets/images/pest/weather/tianqi-daxue.png");
                                                } else if (weather === "暴雪") {
                                                    return require("@/assets/images/pest/weather/tianqi-baoxue.png");
                                                } else if (weather === "雷电") {
                                                    return require("@/assets/images/pest/weather/tianqi-qing.png");
                                                } else if (weather === "大风") {
                                                    return require("@/assets/images/pest/weather/tianqi-feng.png");
                                                } else if (weather === "雾") {
                                                    return require("@/assets/images/pest/weather/tianqi-wu.png");
                                                } else if (weather === "霾") {
                                                    return require("@/assets/images/pest/weather/tianqi-wumai.png");
                                                } else if (weather === "浮尘") {
                                                    return require("@/assets/images/pest/weather/tianqi-fuchen.png");
                                                } else if (weather === "沙尘") {
                                                    return require("@/assets/images/pest/weather/tianqi-yangsha.png");
                                                } else if (weather === "沙尘暴") {
                                                    return require("@/assets/images/pest/weather/tianqi-shachenbao.png");
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
                                                    return require("@/assets/images/pest/weather/tianqi-qing.png");
                                                } else if (weather === "多云") {
                                                    return require("@/assets/images/pest/weather/tianqi-duoyun.png");
                                                } else if (weather === "阴") {
                                                    return require("@/assets/images/pest/weather/tianqi-yin.png");
                                                } else if (weather === "晴雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-zhenyu.png");
                                                } else if (weather === "小雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-xiaoyu.png");
                                                } else if (weather === "中雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-zhongyu.png");
                                                } else if (weather === "大雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-dayu.png");
                                                } else if (weather === "暴雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-baoyu.png");
                                                } else if (weather === "雷阵雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-leizhenyu.png");
                                                } else if (weather === "晴雪") {
                                                    return require("@/assets/images/pest/weather/tianqi-zhenxue.png");
                                                } else if (weather === "小雪") {
                                                    return require("@/assets/images/pest/weather/tianqi-xiaoxue.png");
                                                } else if (weather === "中雪") {
                                                    return require("@/assets/images/pest/weather/tianqi-zhongxue.png");
                                                } else if (weather === "大雪") {
                                                    return require("@/assets/images/pest/weather/tianqi-daxue.png");
                                                } else if (weather === "暴雪") {
                                                    return require("@/assets/images/pest/weather/tianqi-baoxue.png");
                                                } else if (weather === "雷电") {
                                                    return require("@/assets/images/pest/weather/tianqi-qing.png");
                                                } else if (weather === "大风") {
                                                    return require("@/assets/images/pest/weather/tianqi-feng.png");
                                                } else if (weather === "雾") {
                                                    return require("@/assets/images/pest/weather/tianqi-wu.png");
                                                } else if (weather === "霾") {
                                                    return require("@/assets/images/pest/weather/tianqi-wumai.png");
                                                } else if (weather === "浮尘") {
                                                    return require("@/assets/images/pest/weather/tianqi-fuchen.png");
                                                } else if (weather === "沙尘") {
                                                    return require("@/assets/images/pest/weather/tianqi-yangsha.png");
                                                } else if (weather === "沙尘暴") {
                                                    return require("@/assets/images/pest/weather/tianqi-shachenbao.png");
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
                                                    return require("@/assets/images/pest/weather/tianqi-qing.png");
                                                } else if (weather === "多云") {
                                                    return require("@/assets/images/pest/weather/tianqi-duoyun.png");
                                                } else if (weather === "阴") {
                                                    return require("@/assets/images/pest/weather/tianqi-yin.png");
                                                } else if (weather === "晴雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-zhenyu.png");
                                                } else if (weather === "小雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-xiaoyu.png");
                                                } else if (weather === "中雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-zhongyu.png");
                                                } else if (weather === "大雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-dayu.png");
                                                } else if (weather === "暴雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-baoyu.png");
                                                } else if (weather === "雷阵雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-leizhenyu.png");
                                                } else if (weather === "晴雪") {
                                                    return require("@/assets/images/pest/weather/tianqi-zhenxue.png");
                                                } else if (weather === "小雪") {
                                                    return require("@/assets/images/pest/weather/tianqi-xiaoxue.png");
                                                } else if (weather === "中雪") {
                                                    return require("@/assets/images/pest/weather/tianqi-zhongxue.png");
                                                } else if (weather === "大雪") {
                                                    return require("@/assets/images/pest/weather/tianqi-daxue.png");
                                                } else if (weather === "暴雪") {
                                                    return require("@/assets/images/pest/weather/tianqi-baoxue.png");
                                                } else if (weather === "雷电") {
                                                    return require("@/assets/images/pest/weather/tianqi-qing.png");
                                                } else if (weather === "大风") {
                                                    return require("@/assets/images/pest/weather/tianqi-feng.png");
                                                } else if (weather === "雾") {
                                                    return require("@/assets/images/pest/weather/tianqi-wu.png");
                                                } else if (weather === "霾") {
                                                    return require("@/assets/images/pest/weather/tianqi-wumai.png");
                                                } else if (weather === "浮尘") {
                                                    return require("@/assets/images/pest/weather/tianqi-fuchen.png");
                                                } else if (weather === "沙尘") {
                                                    return require("@/assets/images/pest/weather/tianqi-yangsha.png");
                                                } else if (weather === "沙尘暴") {
                                                    return require("@/assets/images/pest/weather/tianqi-shachenbao.png");
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
                                                    return require("@/assets/images/pest/weather/tianqi-qing.png");
                                                } else if (weather === "多云") {
                                                    return require("@/assets/images/pest/weather/tianqi-duoyun.png");
                                                } else if (weather === "阴") {
                                                    return require("@/assets/images/pest/weather/tianqi-yin.png");
                                                } else if (weather === "晴雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-zhenyu.png");
                                                } else if (weather === "小雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-xiaoyu.png");
                                                } else if (weather === "中雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-zhongyu.png");
                                                } else if (weather === "大雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-dayu.png");
                                                } else if (weather === "暴雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-baoyu.png");
                                                } else if (weather === "雷阵雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-leizhenyu.png");
                                                } else if (weather === "晴雪") {
                                                    return require("@/assets/images/pest/weather/tianqi-zhenxue.png");
                                                } else if (weather === "小雪") {
                                                    return require("@/assets/images/pest/weather/tianqi-xiaoxue.png");
                                                } else if (weather === "中雪") {
                                                    return require("@/assets/images/pest/weather/tianqi-zhongxue.png");
                                                } else if (weather === "大雪") {
                                                    return require("@/assets/images/pest/weather/tianqi-daxue.png");
                                                } else if (weather === "暴雪") {
                                                    return require("@/assets/images/pest/weather/tianqi-baoxue.png");
                                                } else if (weather === "雷电") {
                                                    return require("@/assets/images/pest/weather/tianqi-qing.png");
                                                } else if (weather === "大风") {
                                                    return require("@/assets/images/pest/weather/tianqi-feng.png");
                                                } else if (weather === "雾") {
                                                    return require("@/assets/images/pest/weather/tianqi-wu.png");
                                                } else if (weather === "霾") {
                                                    return require("@/assets/images/pest/weather/tianqi-wumai.png");
                                                } else if (weather === "浮尘") {
                                                    return require("@/assets/images/pest/weather/tianqi-fuchen.png");
                                                } else if (weather === "沙尘") {
                                                    return require("@/assets/images/pest/weather/tianqi-yangsha.png");
                                                } else if (weather === "沙尘暴") {
                                                    return require("@/assets/images/pest/weather/tianqi-shachenbao.png");
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
                                                    return require("@/assets/images/pest/weather/tianqi-qing.png");
                                                } else if (weather === "多云") {
                                                    return require("@/assets/images/pest/weather/tianqi-duoyun.png");
                                                } else if (weather === "阴") {
                                                    return require("@/assets/images/pest/weather/tianqi-yin.png");
                                                } else if (weather === "晴雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-zhenyu.png");
                                                } else if (weather === "小雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-xiaoyu.png");
                                                } else if (weather === "中雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-zhongyu.png");
                                                } else if (weather === "大雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-dayu.png");
                                                } else if (weather === "暴雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-baoyu.png");
                                                } else if (weather === "雷阵雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-leizhenyu.png");
                                                } else if (weather === "晴雪") {
                                                    return require("@/assets/images/pest/weather/tianqi-zhenxue.png");
                                                } else if (weather === "小雪") {
                                                    return require("@/assets/images/pest/weather/tianqi-xiaoxue.png");
                                                } else if (weather === "中雪") {
                                                    return require("@/assets/images/pest/weather/tianqi-zhongxue.png");
                                                } else if (weather === "大雪") {
                                                    return require("@/assets/images/pest/weather/tianqi-daxue.png");
                                                } else if (weather === "暴雪") {
                                                    return require("@/assets/images/pest/weather/tianqi-baoxue.png");
                                                } else if (weather === "雷电") {
                                                    return require("@/assets/images/pest/weather/tianqi-qing.png");
                                                } else if (weather === "大风") {
                                                    return require("@/assets/images/pest/weather/tianqi-feng.png");
                                                } else if (weather === "雾") {
                                                    return require("@/assets/images/pest/weather/tianqi-wu.png");
                                                } else if (weather === "霾") {
                                                    return require("@/assets/images/pest/weather/tianqi-wumai.png");
                                                } else if (weather === "浮尘") {
                                                    return require("@/assets/images/pest/weather/tianqi-fuchen.png");
                                                } else if (weather === "沙尘") {
                                                    return require("@/assets/images/pest/weather/tianqi-yangsha.png");
                                                } else if (weather === "沙尘暴") {
                                                    return require("@/assets/images/pest/weather/tianqi-shachenbao.png");
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
                                                    return require("@/assets/images/pest/weather/tianqi-qing.png");
                                                } else if (weather === "多云") {
                                                    return require("@/assets/images/pest/weather/tianqi-duoyun.png");
                                                } else if (weather === "阴") {
                                                    return require("@/assets/images/pest/weather/tianqi-yin.png");
                                                } else if (weather === "晴雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-zhenyu.png");
                                                } else if (weather === "小雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-xiaoyu.png");
                                                } else if (weather === "中雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-zhongyu.png");
                                                } else if (weather === "大雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-dayu.png");
                                                } else if (weather === "暴雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-baoyu.png");
                                                } else if (weather === "雷阵雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-leizhenyu.png");
                                                } else if (weather === "晴雪") {
                                                    return require("@/assets/images/pest/weather/tianqi-zhenxue.png");
                                                } else if (weather === "小雪") {
                                                    return require("@/assets/images/pest/weather/tianqi-xiaoxue.png");
                                                } else if (weather === "中雪") {
                                                    return require("@/assets/images/pest/weather/tianqi-zhongxue.png");
                                                } else if (weather === "大雪") {
                                                    return require("@/assets/images/pest/weather/tianqi-daxue.png");
                                                } else if (weather === "暴雪") {
                                                    return require("@/assets/images/pest/weather/tianqi-baoxue.png");
                                                } else if (weather === "雷电") {
                                                    return require("@/assets/images/pest/weather/tianqi-qing.png");
                                                } else if (weather === "大风") {
                                                    return require("@/assets/images/pest/weather/tianqi-feng.png");
                                                } else if (weather === "雾") {
                                                    return require("@/assets/images/pest/weather/tianqi-wu.png");
                                                } else if (weather === "霾") {
                                                    return require("@/assets/images/pest/weather/tianqi-wumai.png");
                                                } else if (weather === "浮尘") {
                                                    return require("@/assets/images/pest/weather/tianqi-fuchen.png");
                                                } else if (weather === "沙尘") {
                                                    return require("@/assets/images/pest/weather/tianqi-yangsha.png");
                                                } else if (weather === "沙尘暴") {
                                                    return require("@/assets/images/pest/weather/tianqi-shachenbao.png");
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
                                                    return require("@/assets/images/pest/weather/tianqi-qing.png");
                                                } else if (weather === "多云") {
                                                    return require("@/assets/images/pest/weather/tianqi-duoyun.png");
                                                } else if (weather === "阴") {
                                                    return require("@/assets/images/pest/weather/tianqi-yin.png");
                                                } else if (weather === "晴雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-zhenyu.png");
                                                } else if (weather === "小雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-xiaoyu.png");
                                                } else if (weather === "中雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-zhongyu.png");
                                                } else if (weather === "大雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-dayu.png");
                                                } else if (weather === "暴雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-baoyu.png");
                                                } else if (weather === "雷阵雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-leizhenyu.png");
                                                } else if (weather === "晴雪") {
                                                    return require("@/assets/images/pest/weather/tianqi-zhenxue.png");
                                                } else if (weather === "小雪") {
                                                    return require("@/assets/images/pest/weather/tianqi-xiaoxue.png");
                                                } else if (weather === "中雪") {
                                                    return require("@/assets/images/pest/weather/tianqi-zhongxue.png");
                                                } else if (weather === "大雪") {
                                                    return require("@/assets/images/pest/weather/tianqi-daxue.png");
                                                } else if (weather === "暴雪") {
                                                    return require("@/assets/images/pest/weather/tianqi-baoxue.png");
                                                } else if (weather === "雷电") {
                                                    return require("@/assets/images/pest/weather/tianqi-qing.png");
                                                } else if (weather === "大风") {
                                                    return require("@/assets/images/pest/weather/tianqi-feng.png");
                                                } else if (weather === "雾") {
                                                    return require("@/assets/images/pest/weather/tianqi-wu.png");
                                                } else if (weather === "霾") {
                                                    return require("@/assets/images/pest/weather/tianqi-wumai.png");
                                                } else if (weather === "浮尘") {
                                                    return require("@/assets/images/pest/weather/tianqi-fuchen.png");
                                                } else if (weather === "沙尘") {
                                                    return require("@/assets/images/pest/weather/tianqi-yangsha.png");
                                                } else if (weather === "沙尘暴") {
                                                    return require("@/assets/images/pest/weather/tianqi-shachenbao.png");
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
                                                    return require("@/assets/images/pest/weather/tianqi-qing.png");
                                                } else if (weather === "多云") {
                                                    return require("@/assets/images/pest/weather/tianqi-duoyun.png");
                                                } else if (weather === "阴") {
                                                    return require("@/assets/images/pest/weather/tianqi-yin.png");
                                                } else if (weather === "晴雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-zhenyu.png");
                                                } else if (weather === "小雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-xiaoyu.png");
                                                } else if (weather === "中雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-zhongyu.png");
                                                } else if (weather === "大雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-dayu.png");
                                                } else if (weather === "暴雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-baoyu.png");
                                                } else if (weather === "雷阵雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-leizhenyu.png");
                                                } else if (weather === "晴雪") {
                                                    return require("@/assets/images/pest/weather/tianqi-zhenxue.png");
                                                } else if (weather === "小雪") {
                                                    return require("@/assets/images/pest/weather/tianqi-xiaoxue.png");
                                                } else if (weather === "中雪") {
                                                    return require("@/assets/images/pest/weather/tianqi-zhongxue.png");
                                                } else if (weather === "大雪") {
                                                    return require("@/assets/images/pest/weather/tianqi-daxue.png");
                                                } else if (weather === "暴雪") {
                                                    return require("@/assets/images/pest/weather/tianqi-baoxue.png");
                                                } else if (weather === "雷电") {
                                                    return require("@/assets/images/pest/weather/tianqi-qing.png");
                                                } else if (weather === "大风") {
                                                    return require("@/assets/images/pest/weather/tianqi-feng.png");
                                                } else if (weather === "雾") {
                                                    return require("@/assets/images/pest/weather/tianqi-wu.png");
                                                } else if (weather === "霾") {
                                                    return require("@/assets/images/pest/weather/tianqi-wumai.png");
                                                } else if (weather === "浮尘") {
                                                    return require("@/assets/images/pest/weather/tianqi-fuchen.png");
                                                } else if (weather === "沙尘") {
                                                    return require("@/assets/images/pest/weather/tianqi-yangsha.png");
                                                } else if (weather === "沙尘暴") {
                                                    return require("@/assets/images/pest/weather/tianqi-shachenbao.png");
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
                                                    return require("@/assets/images/pest/weather/tianqi-qing.png");
                                                } else if (weather === "多云") {
                                                    return require("@/assets/images/pest/weather/tianqi-duoyun.png");
                                                } else if (weather === "阴") {
                                                    return require("@/assets/images/pest/weather/tianqi-yin.png");
                                                } else if (weather === "晴雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-zhenyu.png");
                                                } else if (weather === "小雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-xiaoyu.png");
                                                } else if (weather === "中雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-zhongyu.png");
                                                } else if (weather === "大雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-dayu.png");
                                                } else if (weather === "暴雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-baoyu.png");
                                                } else if (weather === "雷阵雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-leizhenyu.png");
                                                } else if (weather === "晴雪") {
                                                    return require("@/assets/images/pest/weather/tianqi-zhenxue.png");
                                                } else if (weather === "小雪") {
                                                    return require("@/assets/images/pest/weather/tianqi-xiaoxue.png");
                                                } else if (weather === "中雪") {
                                                    return require("@/assets/images/pest/weather/tianqi-zhongxue.png");
                                                } else if (weather === "大雪") {
                                                    return require("@/assets/images/pest/weather/tianqi-daxue.png");
                                                } else if (weather === "暴雪") {
                                                    return require("@/assets/images/pest/weather/tianqi-baoxue.png");
                                                } else if (weather === "雷电") {
                                                    return require("@/assets/images/pest/weather/tianqi-qing.png");
                                                } else if (weather === "大风") {
                                                    return require("@/assets/images/pest/weather/tianqi-feng.png");
                                                } else if (weather === "雾") {
                                                    return require("@/assets/images/pest/weather/tianqi-wu.png");
                                                } else if (weather === "霾") {
                                                    return require("@/assets/images/pest/weather/tianqi-wumai.png");
                                                } else if (weather === "浮尘") {
                                                    return require("@/assets/images/pest/weather/tianqi-fuchen.png");
                                                } else if (weather === "沙尘") {
                                                    return require("@/assets/images/pest/weather/tianqi-yangsha.png");
                                                } else if (weather === "沙尘暴") {
                                                    return require("@/assets/images/pest/weather/tianqi-shachenbao.png");
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
                                                    return require("@/assets/images/pest/weather/tianqi-qing.png");
                                                } else if (weather === "多云") {
                                                    return require("@/assets/images/pest/weather/tianqi-duoyun.png");
                                                } else if (weather === "阴") {
                                                    return require("@/assets/images/pest/weather/tianqi-yin.png");
                                                } else if (weather === "晴雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-zhenyu.png");
                                                } else if (weather === "小雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-xiaoyu.png");
                                                } else if (weather === "中雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-zhongyu.png");
                                                } else if (weather === "大雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-dayu.png");
                                                } else if (weather === "暴雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-baoyu.png");
                                                } else if (weather === "雷阵雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-leizhenyu.png");
                                                } else if (weather === "晴雪") {
                                                    return require("@/assets/images/pest/weather/tianqi-zhenxue.png");
                                                } else if (weather === "小雪") {
                                                    return require("@/assets/images/pest/weather/tianqi-xiaoxue.png");
                                                } else if (weather === "中雪") {
                                                    return require("@/assets/images/pest/weather/tianqi-zhongxue.png");
                                                } else if (weather === "大雪") {
                                                    return require("@/assets/images/pest/weather/tianqi-daxue.png");
                                                } else if (weather === "暴雪") {
                                                    return require("@/assets/images/pest/weather/tianqi-baoxue.png");
                                                } else if (weather === "雷电") {
                                                    return require("@/assets/images/pest/weather/tianqi-qing.png");
                                                } else if (weather === "大风") {
                                                    return require("@/assets/images/pest/weather/tianqi-feng.png");
                                                } else if (weather === "雾") {
                                                    return require("@/assets/images/pest/weather/tianqi-wu.png");
                                                } else if (weather === "霾") {
                                                    return require("@/assets/images/pest/weather/tianqi-wumai.png");
                                                } else if (weather === "浮尘") {
                                                    return require("@/assets/images/pest/weather/tianqi-fuchen.png");
                                                } else if (weather === "沙尘") {
                                                    return require("@/assets/images/pest/weather/tianqi-yangsha.png");
                                                } else if (weather === "沙尘暴") {
                                                    return require("@/assets/images/pest/weather/tianqi-shachenbao.png");
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
                                                    return require("@/assets/images/pest/weather/tianqi-qing.png");
                                                } else if (weather === "多云") {
                                                    return require("@/assets/images/pest/weather/tianqi-duoyun.png");
                                                } else if (weather === "阴") {
                                                    return require("@/assets/images/pest/weather/tianqi-yin.png");
                                                } else if (weather === "晴雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-zhenyu.png");
                                                } else if (weather === "小雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-xiaoyu.png");
                                                } else if (weather === "中雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-zhongyu.png");
                                                } else if (weather === "大雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-dayu.png");
                                                } else if (weather === "暴雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-baoyu.png");
                                                } else if (weather === "雷阵雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-leizhenyu.png");
                                                } else if (weather === "晴雪") {
                                                    return require("@/assets/images/pest/weather/tianqi-zhenxue.png");
                                                } else if (weather === "小雪") {
                                                    return require("@/assets/images/pest/weather/tianqi-xiaoxue.png");
                                                } else if (weather === "中雪") {
                                                    return require("@/assets/images/pest/weather/tianqi-zhongxue.png");
                                                } else if (weather === "大雪") {
                                                    return require("@/assets/images/pest/weather/tianqi-daxue.png");
                                                } else if (weather === "暴雪") {
                                                    return require("@/assets/images/pest/weather/tianqi-baoxue.png");
                                                } else if (weather === "雷电") {
                                                    return require("@/assets/images/pest/weather/tianqi-qing.png");
                                                } else if (weather === "大风") {
                                                    return require("@/assets/images/pest/weather/tianqi-feng.png");
                                                } else if (weather === "雾") {
                                                    return require("@/assets/images/pest/weather/tianqi-wu.png");
                                                } else if (weather === "霾") {
                                                    return require("@/assets/images/pest/weather/tianqi-wumai.png");
                                                } else if (weather === "浮尘") {
                                                    return require("@/assets/images/pest/weather/tianqi-fuchen.png");
                                                } else if (weather === "沙尘") {
                                                    return require("@/assets/images/pest/weather/tianqi-yangsha.png");
                                                } else if (weather === "沙尘暴") {
                                                    return require("@/assets/images/pest/weather/tianqi-shachenbao.png");
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
                                                    return require("@/assets/images/pest/weather/tianqi-qing.png");
                                                } else if (weather === "多云") {
                                                    return require("@/assets/images/pest/weather/tianqi-duoyun.png");
                                                } else if (weather === "阴") {
                                                    return require("@/assets/images/pest/weather/tianqi-yin.png");
                                                } else if (weather === "晴雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-zhenyu.png");
                                                } else if (weather === "小雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-xiaoyu.png");
                                                } else if (weather === "中雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-zhongyu.png");
                                                } else if (weather === "大雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-dayu.png");
                                                } else if (weather === "暴雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-baoyu.png");
                                                } else if (weather === "雷阵雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-leizhenyu.png");
                                                } else if (weather === "晴雪") {
                                                    return require("@/assets/images/pest/weather/tianqi-zhenxue.png");
                                                } else if (weather === "小雪") {
                                                    return require("@/assets/images/pest/weather/tianqi-xiaoxue.png");
                                                } else if (weather === "中雪") {
                                                    return require("@/assets/images/pest/weather/tianqi-zhongxue.png");
                                                } else if (weather === "大雪") {
                                                    return require("@/assets/images/pest/weather/tianqi-daxue.png");
                                                } else if (weather === "暴雪") {
                                                    return require("@/assets/images/pest/weather/tianqi-baoxue.png");
                                                } else if (weather === "雷电") {
                                                    return require("@/assets/images/pest/weather/tianqi-qing.png");
                                                } else if (weather === "大风") {
                                                    return require("@/assets/images/pest/weather/tianqi-feng.png");
                                                } else if (weather === "雾") {
                                                    return require("@/assets/images/pest/weather/tianqi-wu.png");
                                                } else if (weather === "霾") {
                                                    return require("@/assets/images/pest/weather/tianqi-wumai.png");
                                                } else if (weather === "浮尘") {
                                                    return require("@/assets/images/pest/weather/tianqi-fuchen.png");
                                                } else if (weather === "沙尘") {
                                                    return require("@/assets/images/pest/weather/tianqi-yangsha.png");
                                                } else if (weather === "沙尘暴") {
                                                    return require("@/assets/images/pest/weather/tianqi-shachenbao.png");
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
                                                    return require("@/assets/images/pest/weather/tianqi-qing.png");
                                                } else if (weather === "多云") {
                                                    return require("@/assets/images/pest/weather/tianqi-duoyun.png");
                                                } else if (weather === "阴") {
                                                    return require("@/assets/images/pest/weather/tianqi-yin.png");
                                                } else if (weather === "晴雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-zhenyu.png");
                                                } else if (weather === "小雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-xiaoyu.png");
                                                } else if (weather === "中雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-zhongyu.png");
                                                } else if (weather === "大雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-dayu.png");
                                                } else if (weather === "暴雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-baoyu.png");
                                                } else if (weather === "雷阵雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-leizhenyu.png");
                                                } else if (weather === "晴雪") {
                                                    return require("@/assets/images/pest/weather/tianqi-zhenxue.png");
                                                } else if (weather === "小雪") {
                                                    return require("@/assets/images/pest/weather/tianqi-xiaoxue.png");
                                                } else if (weather === "中雪") {
                                                    return require("@/assets/images/pest/weather/tianqi-zhongxue.png");
                                                } else if (weather === "大雪") {
                                                    return require("@/assets/images/pest/weather/tianqi-daxue.png");
                                                } else if (weather === "暴雪") {
                                                    return require("@/assets/images/pest/weather/tianqi-baoxue.png");
                                                } else if (weather === "雷电") {
                                                    return require("@/assets/images/pest/weather/tianqi-qing.png");
                                                } else if (weather === "大风") {
                                                    return require("@/assets/images/pest/weather/tianqi-feng.png");
                                                } else if (weather === "雾") {
                                                    return require("@/assets/images/pest/weather/tianqi-wu.png");
                                                } else if (weather === "霾") {
                                                    return require("@/assets/images/pest/weather/tianqi-wumai.png");
                                                } else if (weather === "浮尘") {
                                                    return require("@/assets/images/pest/weather/tianqi-fuchen.png");
                                                } else if (weather === "沙尘") {
                                                    return require("@/assets/images/pest/weather/tianqi-yangsha.png");
                                                } else if (weather === "沙尘暴") {
                                                    return require("@/assets/images/pest/weather/tianqi-shachenbao.png");
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
                                                    return require("@/assets/images/pest/weather/tianqi-qing.png");
                                                } else if (weather === "多云") {
                                                    return require("@/assets/images/pest/weather/tianqi-duoyun.png");
                                                } else if (weather === "阴") {
                                                    return require("@/assets/images/pest/weather/tianqi-yin.png");
                                                } else if (weather === "晴雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-zhenyu.png");
                                                } else if (weather === "小雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-xiaoyu.png");
                                                } else if (weather === "中雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-zhongyu.png");
                                                } else if (weather === "大雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-dayu.png");
                                                } else if (weather === "暴雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-baoyu.png");
                                                } else if (weather === "雷阵雨") {
                                                    return require("@/assets/images/pest/weather/tianqi-leizhenyu.png");
                                                } else if (weather === "晴雪") {
                                                    return require("@/assets/images/pest/weather/tianqi-zhenxue.png");
                                                } else if (weather === "小雪") {
                                                    return require("@/assets/images/pest/weather/tianqi-xiaoxue.png");
                                                } else if (weather === "中雪") {
                                                    return require("@/assets/images/pest/weather/tianqi-zhongxue.png");
                                                } else if (weather === "大雪") {
                                                    return require("@/assets/images/pest/weather/tianqi-daxue.png");
                                                } else if (weather === "暴雪") {
                                                    return require("@/assets/images/pest/weather/tianqi-baoxue.png");
                                                } else if (weather === "雷电") {
                                                    return require("@/assets/images/pest/weather/tianqi-qing.png");
                                                } else if (weather === "大风") {
                                                    return require("@/assets/images/pest/weather/tianqi-feng.png");
                                                } else if (weather === "雾") {
                                                    return require("@/assets/images/pest/weather/tianqi-wu.png");
                                                } else if (weather === "霾") {
                                                    return require("@/assets/images/pest/weather/tianqi-wumai.png");
                                                } else if (weather === "浮尘") {
                                                    return require("@/assets/images/pest/weather/tianqi-fuchen.png");
                                                } else if (weather === "沙尘") {
                                                    return require("@/assets/images/pest/weather/tianqi-yangsha.png");
                                                } else if (weather === "沙尘暴") {
                                                    return require("@/assets/images/pest/weather/tianqi-shachenbao.png");
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
                        weatherMain.value.setOption(constoption, true);
                        weatherMain.value.resize();
                    }, 1);
                } else {
                    setTimeout(() => {
                        weatherMain.value.setOption(constoption);
                        weatherMain.value.resize();
                    }, 1)
                }

            } else {
                console.log(11);

            }





        }
        onMounted(async() => {
            await nextTick(); // 等待 DOM 更新
            console.log(weatherMain.value,111)
            getWeather()

            
        })

        

        return {
        };



    },


});
</script>
<style scoped>
.mr-1 {
    margin-right: 5px;
}

.min-h-300 {
    min-height: 500px;
}
</style>