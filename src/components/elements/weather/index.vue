<template>
  <!-- 使用同一个盒子容器，通过size控制样式 -->
  <div class="weather-box" :class="'size-' + props.size">
    <!-- 1x1 布局内容 -->
    <div v-if="size === 1" class="content-1x1">
      <div class="flex flex-direction justify-around align-center">
        <div class="background-1x1">
          <div class="place">{{ city }}</div>
          <div class="temperature">{{ weather.temp }}&deg;C</div>
        </div>
        <p class="cl-ant-p sg-omit-sm text-white-sm">天气</p>
      </div>
    </div>

    <!-- 2x1 布局内容 -->
    <div v-if="size === '2x1'" class="content-2x1">
      <div class="flex justify-between align-center">
        <div class="left-2x1">
          <div class="place">{{ city }}</div>
          <div class="temperature">{{ weather.temp }}&deg;C</div>
        </div>
        <div class="right-2x1">
          <img class="weather-icon" :src="getIcon(weather.text)" />
          <div class="weather-text">{{ weather.text }}</div>
        </div>
      </div>
    </div>

    <!-- 2x2 布局内容 -->
    <div v-else-if="size === '2x2'" class="content-2x2">
      <div class="flex justify-between header">
        <div>
          <div class="place">{{ city }}</div>
          <div class="temperature">{{ weather.temp }}&deg;C</div>
        </div>
        <div class="icon-container">
          <img class="weather-icon" :src="getIcon(weather.text)" />
          <div class="weather-text">{{ weather.text }}</div>
        </div>
      </div>
      <div class="details">
        <div class="aqi">风向: {{ weather.windDir }}</div>
        <div class="high">
          <span>湿度: {{ weather.humidity }}%</span>
          <span>能见度: {{ weather.vis }}km</span>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script setup lang="ts">
import { PropType } from "vue";
import getIcon from "@/utils/getWeatherIcon";

const props = defineProps({
  size: {
    type: [String, Number] as PropType<string | number>,
    default: "1",
    validator: (value: string | number) =>
      ["1", "2x1", "2x2"].includes(value.toString()),
  },
});

const city = localStorage.getItem("city");
const weather = JSON.parse(localStorage.getItem("weather"));
</script>
  
  <style scoped>
/* 基础盒子样式 - 添加过渡动画 */
.weather-box {
  transition: all 0.5s ease;
  border-radius: 20px;
  overflow: hidden;
  color: white;
  font-family: Arial, sans-serif;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* .weather-box:hover {
    transform: scale(1.02);
  } */

/* 1x1 尺寸样式 */
.weather-box.size-1 {
  width: 80px;
  height: 80px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* 2x1 尺寸样式 */
.weather-box.size-2x1 {
  width: 180px;
  height: 80px;
  border-radius: 20px;
  padding: 10px 20px;
  background: linear-gradient(135deg, #3d4d6c, #7c8daa);
}

/* 2x2 尺寸样式 */
.weather-box.size-2x2 {
  width: 180px;
  height: 180px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #3d4d6c, #7c8daa);
}

/* 1x1 内容布局 */
.content-1x1 {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.background-1x1 {
  width: 60px;
  height: 60px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #3d4d6c, #7c8daa);
}

.content-1x1 .place {
  font-size: 14px;
  font-weight: bold;
  text-align: center;
}

.content-1x1 .temperature {
  font-size: 16px;
  font-weight: bold;
}

.content-1x1 .description {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  margin-top: 5px;
}

/* 2x1 内容布局 */
.content-2x1 {
  width: 100%;
  height: 100%;
}

.content-2x1 .left-2x1 {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.content-2x1 .place {
  font-size: 16px;
  font-weight: bold;
}

.content-2x1 .temperature {
  font-size: 24px;
  font-weight: 800;
  margin-top: 5px;
}

.content-2x1 .right-2x1 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.content-2x1 .weather-icon {
  width: 35px;
  height: 35px;
  /* margin-bottom: 5px; */
}

.content-2x1 .weather-text {
  font-size: 14px;
}

/* 2x2 内容布局 */
.content-2x2 {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
}

.content-2x2 .header-2x2 {
  padding: 15px;
}

.content-2x2 .place {
  font-size: 16px;
  font-weight: bold;
}

.content-2x2 .temperature {
  font-size: 24px;
  font-weight: 800;
  margin-top: 5px;
}

.content-2x2 .body-2x2 {
  flex: 1;
  padding: 0 15px 15px;
  display: flex;
  flex-direction: column;
}

.content-2x2 .icon-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
}

.content-2x2 .weather-icon {
  width: 50px;
  height: 50px;
}

.content-2x2 .weather-text {
  font-size: 16px;
  margin-top: 5px;
}

.content-2x2 .details {
  font-size: 12px;
  line-height: 1.5;
}

.content-2x2 .aqi {
  margin-bottom: 5px;
}

.content-2x2 .high span {
  display: block;
}
</style>