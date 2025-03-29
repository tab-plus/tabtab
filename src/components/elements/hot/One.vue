<!--
 * @Author: panrunjun
 * @Date: 2025-03-25 16:02:29
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-03-28 20:47:52
 * @Description: 热搜组件
 * @FilePath: \ytab-master\src\components\elements\hot\One.vue
-->
<template>
  <div class="box">
    <div class="hotSearchItem">
      <div
        class="flex flex-direction justify-around align-center"
      >
        <img
          src="http://106.52.154.20:9000/tabs/1743165883199-hot.png"
          style="width: 60px; height: 60px; border-radius: 15px"
          class="shadow-md hotSearchItem-bgColor"
        />
        <p class="cl-ant-p sg-omit-sm text-white-sm">热搜</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.box {
  width: 80px;
  border-radius: 5px;
  /* margin: 20px; */
}

.hotSearchItem {
  height: 100%;
  border-radius: 20px;
}
.hotSearchItem-bgColor {
  /* background: linear-gradient(45deg, #5d616b, #8a94a7); */
  /* background-color: rgba(255, 255, 255,0.5); */
}


</style>