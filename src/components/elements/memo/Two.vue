<!--
 * @Author: panrunjun
 * @Date: 2025-03-25 13:51:06
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-03-31 15:41:12
 * @Description: 备忘录4x4
 * @FilePath: \ytab-master\src\components\elements\memo\Two.vue
-->
<template>
  <div class="item memoItem-bgColor">
    <div class="header">备忘录</div>
    <div class="body">
      <template v-if="memoStore.memoList.length > 0">
        <div
          class="cl-ant-p sg-omit-sm text-white-sm memoItem"
          v-for="(item, index) in memoStore.memoList.slice(0, 4)"
          :key="index"
        >
          {{ item.title }}
        </div>
      </template>
      <template v-else>
        <div class="img-box">
          <img :src="noneImg" style="width: 100px; height: 70px" alt="无信息" />
          <div class="title">暂无备忘录信息</div>
        </div>
      </template>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import { get_memo_list } from "@/api/memo";
import { useMemoStore } from "@/store/memoStore";
import noneImg from "@/assets/images/none.png";
import { ref, watch } from "vue";

// 初始化响应式数据
const memoStore = useMemoStore();
</script>

  
<style scoped>
.item {
  width: 180px;
  border: 0px;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 添加阴影 */
  overflow: hidden; /* 防止内容溢出 */
}

.body {
  height: 140px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
}

.memoItem {
  width: 100%;
  color: black;
  padding: 5px 10px;
  display: flex;
  justify-content: left;
  align-items: center; /* 垂直居中 */
  background-color: #f9f9f9; /* 添加背景色 */
  border-radius: 8px; /* 添加圆角 */
  margin-bottom: 8px; /* 增加间距 */
  transition: background-color 0.3s; /* 添加交互效果 */
}

.memoItem:hover {
  background-color: #ffecd1; /* 悬停效果 */
}

.header {
  height: 40px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: #ffb716;
  color: white;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: 2px;
  font-weight: bold; /* 加粗字体 */
}

.memoItem-bgColor {
  background-color: white;
}

.img-box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 120px;
  flex-direction: column;
  text-align: center; /* 居中对齐文字 */
}

.img-box img {
  border-radius: 10px; /* 图片圆角 */
  opacity: 0.8; /* 增加透明度 */
  transition: opacity 0.3s; /* 添加交互效果 */
}

.img-box img:hover {
  opacity: 1; /* 悬停时恢复透明度 */
}

.title {
  color: #b8babc;
  font-size: 12px;
  letter-spacing: 1px;
  margin-top: 10px; /* 增加间距 */
}
</style>
