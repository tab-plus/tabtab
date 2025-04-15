<template>
  <div class="weather-item-four item bg-weather">
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
</template>

<script setup lang="ts">
import getIcon from "@/utils/getWeatherIcon";
const city = localStorage.getItem("city");
const weather = JSON.parse(localStorage.getItem("weather"));
</script>

<style scoped>
.item {
  width: 180px;
  height: 180px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
}

.item:hover {
  transform: scale(1.05);
}

.weather-item-four {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: white;
  padding: 15px;
}

.bg-weather {
  background: linear-gradient(135deg, #354564, #7f90ad);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.place {
  font-size: 16px;
  font-weight: bold;
}

.temperature {
  font-size: 24px;
  font-weight: 800;
  margin-top: 5px;
}

.icon-container {
  text-align: center;
}

.weather-icon {
  width: 40px;
  height: 40px;
  margin-bottom: 5px;
}

.weather-text {
  font-size: 14px;
}

.details {
  margin-top: 10px;
  font-size: 12px;
  line-height: 1.5;
}

.high span {
  display: block;
}

.aqi {
  margin-bottom: 5px;
}
</style>