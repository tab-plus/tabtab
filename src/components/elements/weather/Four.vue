<!--
 * @Author: panrunjun
 * @Date: 2025-03-25 13:51:06
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-03-28 19:56:30
 * @Description: 天气组件
 * @FilePath: \ytab-master\src\components\elements\weather\four.vue
-->
<template>
    <div class="weather-item-four item bg-weather">
        <div class="flex justify-between">
            <div>
                <div class="flex">
                    <div class="place">{{ city }}</div>
                </div>
                <div class="temperature">{{ weather.temp }}&deg;C</div>
            </div>
            <div>
                <img class="weather-icon" :src="getIcon(weather.text)" />
                <div class="weather-text">{{ weather.text }}</div>
            </div>
        </div>
        <div class="aqi">{{ weather.windDir }}</div>
        <div class="high">相对湿度:{{ weather.humidity }} 能见度:{{ weather.vis }}</div>
    </div>
</template>

<script setup lang="ts">
import getIcon from "@/utils/getWeatherIcon";
const city = localStorage.getItem("city");
const weather = JSON.parse(localStorage.getItem("weather"));

</script>

<style scoped>
.item {
  width: 180px;
  /* margin: 20px; */
  height: 180px;
  border-radius: 20px;
}
.weather-item-four {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  color: white;
  padding: 20px;
}

.bg-weather {
  background: linear-gradient(45deg, #354564, #7f90ad);
}

.weather-icon {
  width: 30px;
  height: 30px;
}

.weather-text{
  text-align: center;
}
.temperature {
  font-size: 20px;
  font-weight: 800;
}

.high,
.aqi {
  display: flex;
}

.aqi {
  margin-top: 35px;
}
</style>