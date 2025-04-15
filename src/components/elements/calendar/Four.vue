<!--
 * @Author: panrunjun
 * @Date: 2025-03-25 13:51:06
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-03-29 11:46:27
 * @Description: 备忘录4x4
 * @FilePath: \ytab-master\src\components\elements\calendar\Four.vue
-->
<template>
  <div class="dataItem item">
    <div class="header">{{ month }}</div>
    <div class="body">
      <div class="num">{{ date }}</div>
      <div class="day">第205天 第30周</div>
      <div class="week">六月二十八 {{ dayOfWeekText }}</div>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import dayjs from "dayjs";
// 获取当前日期
const today = dayjs();
// 使用.day()方法获取星期几，返回0-6，0表示星期日，1表示星期一，以此类推
const dayOfWeek = today.day();
// 将数字转换为对应的星期几文字
const dayOfWeekText = [
  "星期日",
  "星期一",
  "星期二",
  "星期三",
  "星期四",
  "星期五",
  "星期六",
][dayOfWeek];

const date = ref(dayjs(new Date()).format("DD"));
const month = ref(dayjs(new Date()).format("YYYY年M月"));
</script>
  
<style scoped>
.item {
  width: 180px;
  /* margin: 20px; */
  height: 180px;
  border-radius: 20px;
}
.body {
  height: 120px;
  color: black;
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}


.dataItem {
  background-color: white;
  display: flex;
  flex-direction: column;
}

.header {
  height: 40px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: #ff5a5d;
  color: white;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.num {
  font-size: 40px;
  font-weight: bold;
}

.day {
  font-size: 10px;
  color: gray;
}

.week {
  font-size: 14px;
}
</style>