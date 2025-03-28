<!--
 * @Author: panrunjun
 * @Date: 2025-03-25 13:51:06
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-03-28 15:30:00
 * @Description: 天气组件
 * @FilePath: \ytab-master\src\components\elements\weather\one.vue
-->
<template>
    <div class="box">
      <div
        class="flex flex-direction justify-around align-center"
      >
        <img
          src="https://files.codelife.cc/itab/weather/icon/104-fill.svg"
          style="width: 65px; height: 65px; border-radius: 15px"
          class="shadow-md"
        />
        <p class="cl-ant-p sg-omit-sm text-white-sm">天气</p>
      </div>
    </div>
</template>
    
<script setup lang="ts">

</script>
    
  <style scoped>
.box {
  width: 80px;
  border-radius: 5px;
  margin: 20px;
}
</style>