<template>
  <!-- 使用同一个盒子容器，通过size控制样式 -->
  <div class="calendar-box" :class="'size-' + size">
    <!-- 1x1 布局内容 -->
    <div v-if="size === 1" class="content-1x1">
      <div class="flex flex-direction justify-around align-center">
        <div class="oneBackground">
          <div class="oneWeek">{{ dayOfWeekText }}</div>
          <div class="day">{{ date }}</div>
        </div>
        <p class="cl-ant-p sg-omit-sm text-white-sm">日历</p>
      </div>
    </div>

    <!-- 2x2 布局内容 -->
    <div v-else-if="size === '2x2'" class="content-2x2">
      <div class="header">{{ month }}</div>
      <div class="body">
        <div class="num">{{ date }}</div>
        <div class="day">第205天 第30周</div>
        <div class="week">六月二十八 {{ dayOfWeekText }}</div>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
import { ref } from "vue";
import dayjs from "dayjs";

const props = defineProps({
  size: {
    type: String,
    default: "1",
    validator: (value) => ["1", "2x2"].includes(value),
  },
});

const today = dayjs();
const dayOfWeek = today.day();
const dayOfWeekText = [
  "星期日",
  "星期一",
  "星期二",
  "星期三",
  "星期四",
  "星期五",
  "星期六",
][dayOfWeek];
const date = ref(today.format("DD"));
const month = ref(today.format("YYYY年M月"));
</script>
  
  <style scoped>
/* 基础盒子样式 - 添加过渡动画 */
.calendar-box {
  transition: width 0.2s ease, height 0.2s ease;
  /* overflow: hidden; */
  background-color: white;
  border-radius: 20px;
}

/* 1x1 尺寸样式 */
.calendar-box.size-1 {
  width: 60px;
  height: 60px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

/* 2x2 尺寸样式 */
.calendar-box.size-2x2 {
  width: 180px;
  height: 180px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
}

/* 1x1 内容布局 */
.content-1x1 {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.oneBackground {
  text-align: center;
}

.oneWeek {
  font-size: 12px;
}

.calendar-label {
  font-size: 12px;
  color: #666;
}

/* end------- */

/* 2x2 内容布局 */
.content-2x2 {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.header {
  /* height: 40px; */
  background-color: #ff5a5d;
  color: white;
  display: flex;
  font-size: 24px;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  transition: font-size 0.5s ease, height 0.5s ease;
}

.body {
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.num {
  font-size: 40px;
  font-weight: bold;
}

.day {
  font-size: 12px;
  color: gray;
}

.week {
  font-size: 14px;
}

/* end--- */
</style>