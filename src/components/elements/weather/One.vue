<!--
 * @Author: panrunjun
 * @Date: 2025-03-28 14:33:42
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-03-31 15:11:28
 * @Description: 
 * @FilePath: \ytab-master\src\components\elements\weather\one.vue
-->
<template>
  <div class="box">
    <div class="content">
      <div class="item">
        <div class="place">{{ city }}</div>
        <div class="temperature">{{ weather.temp }}&deg;C</div>
      </div>
      <p class="description">天气</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const city = localStorage.getItem("city");
const weather = JSON.parse(localStorage.getItem("weather"));
</script>

<style scoped>
.box {
  width: 80px;
  border-radius: 20px;
  color: #fff;
  font-family: Arial, sans-serif;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.item {
  width: 60px;
  height: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
   background: linear-gradient(135deg, #3d4d6c, #7c8daa);
  border-radius: 15px;
}

.place {
  font-size: 14px;
  font-weight: bold;
  text-align: center;
}

.temperature {
  font-size: 16px;
  font-weight: bold;
}

.description {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
}
</style>