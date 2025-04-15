<template>
    <!-- 使用同一个盒子容器，通过size控制样式 -->
    <div class="memo-box" :class="'size-' + props.size">
      <!-- 1x1 布局内容 -->
      <div v-if="size === 1" class="content-1x1">
        <div class="flex flex-direction justify-around align-center">
          <div class="background-1x1">
            <div class="icon">备忘录</div>
          </div>
          <p class="cl-ant-p sg-omit-sm text-white-sm">备忘录</p>
        </div>
      </div>
  
      <!-- 2x1 布局内容 -->
      <div v-if="size === '2x1'" class="content-2x1">
        <div class="flex justify-around align-center">
          <div class="left-2x1">
            <div class="icon">备忘录</div>
          </div>
          <div class="right-2x1">
            <div v-if="memoStore.memoList.length > 0" >
              {{ memoStore.memoList[0].title }}
            </div>
            <div v-else class="empty-text">无备忘</div>
          </div>
        </div>
      </div>
  
      <!-- 2x2 布局内容 -->
      <div v-else-if="size === '2x2'" class="content-2x2">
        <div class="header-2x2">备忘录</div>
        <div class="body-2x2">
          <template v-if="memoStore.memoList.length > 0">
            <div 
              v-for="(item, index) in memoStore.memoList.slice(0, 4)" 
              :key="index" 
              class="memo-item"
            >
              {{ item.title }}
            </div>
          </template>
          <template v-else>
            <div class="empty-state">
              <img :src="noneImg" alt="无备忘" class="empty-img"/>
              <div class="empty-text">暂无备忘录</div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { PropType } from "vue";
  import { useMemoStore } from "@/store/memoStore";
  import noneImg from "@/assets/images/none.png";
  
  const props = defineProps({
    size: {
      type: [String, Number] as PropType<string | number>,
      default: "1",
      validator: (value: string | number) =>
        ["1", "2x1", "2x2"].includes(value.toString()),
    },
  });
  
  const memoStore = useMemoStore();
  </script>
  
  <style scoped>
  /* 基础盒子样式 - 添加过渡动画 */
  .memo-box {
    transition: all 0.5s ease;
    border-radius: 20px;
    overflow: hidden;
  }
  
  /* 1x1 尺寸样式 */
  .memo-box.size-1 {
    width: 80px;
    height: 80px;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
  
  /* 2x1 尺寸样式 */
  .memo-box.size-2x1 {
    width: 180px;
    height: 80px;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
  }
  
  /* 2x2 尺寸样式 */
  .memo-box.size-2x2 {
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
  
  .background-1x1 {
    width: 60px;
    height: 60px;
    border-radius: 15px;
    background-color: #ffb716;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
  }
  
  .icon {
    font-size: 16px;
    font-weight: bold;
  }
  
  /* 2x1 内容布局 */
  .content-2x1 {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  
  .left-2x1 {
    width: 60px;
    height: 80px;
    background-color: #ffb716;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
  }
  
  .right-2x1 {
    width: 120px;
    height: 80px;
    background-color: #f8f8f8;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
  }
  
  /* 2x2 内容布局 */
  .content-2x2 {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  
  .header-2x2 {
    height: 40px;
    background-color: #ffb716;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    font-weight: bold;
  }
  
  .body-2x2 {
    flex: 1;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background-color: white;
  }
  
  .memo-item {
    width: 100%;
    padding: 8px;
    background-color: #f5f5f5;
    border-radius: 8px;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  .empty-img {
    width: 80px;
    height: 60px;
    margin-bottom: 10px;
  }
  
  .empty-text {
    color: #999;
    font-size: 14px;
  }
  </style>