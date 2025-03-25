<!--
 * @Author: panrunjun
 * @Date: 2025-03-25 16:02:29
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-03-25 16:22:24
 * @Description: 日历组件
 * @FilePath: \ytab-master\src\components\elements\calendar\One.vue
-->
<template>
  <div class="box">
    <div
      class="flex flex-direction justify-around align-center"
    >
      <div class="oneBackground">
        <div class="oneWeek">{{ dayOfWeekText }}</div>
        <div class="day">{{ date }}</div>
      </div>
      <p class="cl-ant-p sg-omit-sm text-white-sm">日历</p>
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
</script>

<style scoped>
.box {
  width: 80px;
  border-radius: 5px;
  margin: 20px;
}
</style>