<!--
 * @Author: panrunjun
 * @Date: 2025-03-25 16:02:29
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-03-31 15:00:51
 * @Description: 热搜组件
 * @FilePath: \ytab-master\src\components\elements\hot\One.vue
-->
<template>
  <div class="box">
    <div class="flex flex-direction justify-around align-center">
      <div
        class="hotSearchItem-bgColor flex flex-direction justify-around align-center"
      >
        <img
          :src="hotImg"
          style="width: 40px; height: 40px; border-radius: 15px"
          class=""
        />
      </div>
      <p class="cl-ant-p sg-omit-sm text-white-sm">热搜</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import hotImg from "@/assets/icon/hotSearch.png";
</script>

<style scoped>
.box {
  width: 80px;
  height: 80px;
  border-radius: 5px;
  /* margin: 20px; */
}

.hotSearchItem-bgColor {
  width: 60px;
  height: 60px;
  background: linear-gradient(45deg, #2a2f3a, #444a56);
  border-radius: 20px;
  /* background-color: rgba(255, 255, 255,0.5); */
}
</style>