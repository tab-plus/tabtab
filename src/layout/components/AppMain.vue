<!--
 * @Author: panrunjun
 * @Date: 2024-07-22 21:46:02
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-08-02 16:27:16
 * @Description: 
 * @FilePath: \ytab-master\src\layout\components\AppMain.vue
-->
<template>
  <div class="app-main">
    <router-view v-slot="{ Component }">
      <component :is="Component" :key="key" />
    </router-view>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();

const key = computed(() => route.path);
</script>

<style scoped lang="scss">
.app-main {
  padding: $appMainPadding;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
