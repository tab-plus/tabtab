<!--
 * @Author: panrunjun
 * @Date: 2025-03-25 13:51:06
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-03-28 21:01:54
 * @Description: 备忘录2x1
 * @FilePath: \ytab-master\src\components\elements\memo\TwoOne.vue
-->
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
            {{ item.title }}
          </div>
        </template>
        <template v-else>
          <div class="img-box">
            <!-- <img :src="noneImg" style="width: 40px; height: 40px" alt="无信息" /> -->
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
    border-radius: 10px;
  }
  .body {
    height: 50px;
  }
  
  .memoItem {
    /* border-bottom: 1px solid rgb(225, 220, 220); */
    width: 100%;
    color: black;
    padding:3px 5px;
    display: flex;
    justify-content: left;
  }
  
  .header {
    height: 30px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background-color: #ffb716;
    color: white;
    font-size: 18px;
    letter-spacing: 2px;
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
  
  .title {
    color: #b8babc;
    font-size: 12px;
    letter-spacing: 1px;
  }
  </style>