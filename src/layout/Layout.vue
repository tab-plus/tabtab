<!--
 * @Author: panrunjun
 * @Date: 2024-07-22 21:46:02
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-03-27 09:13:52
 * @Description: 
 * @FilePath: \ytab-master\src\layout\Layout.vue
-->
<template>
  <div class="layout-wrapper">
    <!-- 包裹 Sidebar 使用 transition -->
    <transition name="fade" mode="out-in">
      <Sidebar
        :style="{ width: appStore.haveLayout?'50px':'0px' }" 
        class="sidebar-container flex justify-center align-center"
      />
    </transition>
    <div
      class="main-container"
      :style="{ marginLeft: appStore.haveLayout ? '50px' : '0px' }"
    >
      <AppMain />
    </div>
    <!-- <Sidebar class="sidebar-container-right flex justify-center align-center" /> -->
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from "vue";
import { Sidebar, AppMain } from "./components";
import { useAppStore } from "@/store/app";
const appStore = useAppStore();
</script>

<style scoped lang="scss">
// $sideBarWidth:0px;
.layout-wrapper {
  width: 100%;
  height: 100%;
  z-index: 1000;
  .main-container {
    height: 100%;
    margin-left: $sideBarWidth;
    transition: margin-left 0.3s ease;
    position: relative;
  }
  .sidebar-container {
    // width: $sideBarWidth !important;
    height: 100%;
    position: fixed;
    font-size: 0;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
    transition: width 0.3s ease;
  }
}
/* 当 Sidebar 显示时，宽度变为指定值 */
.sidebar-container.sidebar-slide-enter-active,
.sidebar-container.sidebar-slide-leave-active {
  transition: 0px 0.3s ease;
}

.sidebar-container.sidebar-slide-enter,
.sidebar-container.sidebar-slide-leave-to {
  width: $sideBarWidth; /* 设置 Sidebar 展开时的宽度 */
}
</style>
