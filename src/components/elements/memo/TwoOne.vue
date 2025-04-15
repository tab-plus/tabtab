<template>
  <div class="item memoItem-bgColor">
    <div class="header">备忘录</div>
    <div class="body">
      <template v-if="memoStore.memoList.length > 0">
        <div
          class="cl-ant-p sg-omit-sm text-white-sm memoItem"
          v-for="(item, index) in memoStore.memoList.slice(0, 2)"
          :key="index"
        >
          <span class="memo-title">{{ item.title }}</span>
        </div>
      </template>
      <template v-else>
        <div class="img-box">
          <img :src="noneImg" class="none-img" alt="无信息" />
          <div class="title">暂无备忘录信息</div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMemoStore } from "@/store/memoStore";
import noneImg from "@/assets/images/none.png";

const memoStore = useMemoStore();
</script>

<style scoped>
.item {
  width: 180px;
  border: 0px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.body {
  height: 50px;
  padding: 5px;
}

.memoItem {
  width: 100%;
  color: black;
  /* padding: 3px 5px; */
  display: flex;
  align-items: center;
  background-color: #f9f9f9;
  border-radius: 5px;
  margin-bottom: 5px;
  transition: background-color 0.3s;
}

.memoItem:hover {
  background-color: #ffecd1;
}

.memo-title {
  font-size: 12px;
  font-weight: 500;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.header {
  height: 30px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: #ffb716;
  color: white;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 1px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.memoItem-bgColor {
  background-color: white;
}

.img-box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  flex-direction: column;
}

.none-img {
  width: 30px;
  height: 30px;
  margin-bottom: 5px;
}

.title {
  color: #b8babc;
  font-size: 12px;
  letter-spacing: 1px;
}
</style>