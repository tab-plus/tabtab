<!--
 * @Author: panrunjun
 * @Date: 2024-07-22 21:46:02
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-08-02 16:26:14
 * @Description: 
 * @FilePath: \ytab-master\src\layout\Layout.vue
-->
<template>
  <div class="layout-wrapper">
    <Sidebar class="sidebar-container flex justify-center align-center" />
    <div class="main-container">
      <AppMain />
    </div>
    <!-- <Sidebar class="sidebar-container-right flex justify-center align-center" /> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Sidebar, AppMain } from './components';

export default defineComponent({
  components: {
    Sidebar,
    AppMain
  }
});
</script>

<style scoped lang="scss">
.layout-wrapper {
  width: 100%;
  height: 100%;
  z-index: 1000;
  .main-container {
    height: 100%;
    margin-left: $sideBarWidth;
    position: relative;
  }
  .sidebar-container {
    width: $sideBarWidth !important;
    height: 100%;
    position: fixed;
    font-size: 0;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
  }
  // .sidebar-container-right {
  //   width: $sideBarWidth !important;
  //   height: 100%;
  //   position: fixed;
  //   font-size: 0;
  //   top: 0;
  //   bottom: 0;
  //   right: 0;
  //   z-index: 1001;
  //   overflow: hidden;
  // }
}
</style>
