<template>
    <div class="hot-tab item">
      <div class="tab-content" v-if="1">
      </div>
      <div v-else class="img-box">
        <img :src="noneImg" style="width: 100px; height: 70px" alt="无信息" />
        <div class="none-title">暂无数据...</div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from "vue";
  import axios from "axios";
  import noneImg from "@/assets/images/none.png";
  
  </script>
  
  <style scoped>
  .item {
    width: 180px;
    margin: 20px;
    height: 160px;
    border-radius: 20px;
  }
  .hot-tab {
    font-family: Arial, sans-serif;
    background: linear-gradient(to bottom, #313641, #abaeb4);
  }
  
  .tabs {
    height: 40px;
    display: flex;
    justify-content: space-around;
    font-size: 14px;
    justify-content: center;
    align-items: center;
  }
  
  .tab {
    padding: 5px 10px;
    cursor: pointer;
    transition: color 0.3s, border-bottom 0.3s;
  }
  
  .tab.active {
    color: white;
    /* padding: 10px; */
    border-bottom: 2px solid white;
  }
  
  .tab:hover {
    color: white;
  }
  
  .tab-content {
    padding: 0px 10px;
  }
  
  .tab-content ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .tab-content li {
    padding: 4px 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .img-box {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 120px;
    flex-direction: column;
  }
  .none-title {
    color: #b8babc;
    font-size: 12px;
    letter-spacing: 1px;
  }
  </style>
  