<!--
 * @Author: panrunjun
 * @Date: 2024-07-22 21:46:02
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-08-15 19:44:30
 * @Description: 
 * @FilePath: \ytab-master\src\components\ContentLayout.vue
-->
<template>
  <div class="cl" :style="clStyle">
    <div class="cl-top flex flex-direction justify-center">
      <span>🎉 欢迎使用想天浏览器，简单几步设置即可开启效率之门！</span>
      <span>想天浏览器是一款基于浏览器的团队协作工具，目前正在内测中～</span>
    </div>
    <div class="cl-bottom flex justify-center align-center" :style="clBottomStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    width: {
      type: Number,
      default: 900
    },
    height: {
      type: Number,
      default: 713
    }
  },
  setup(props) {
    const clStyle = computed(() => `width: ${props.width}px; height: ${props.height}px;`);

    const clBottomStyle = computed(() => `width: 100%; height: calc(${props.height}px - 86px)`);

    return { clStyle, clBottomStyle };
  }
});
</script>

<style scoped lang="scss">
.cl {
  border: 1px solid rgba(230, 230, 230, 1);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  .cl-top {
    width: 100%;
    height: 86px;
    background: rgba(80, 139, 254, 1);
    border-radius: 8px 8px 0px 0px;
    :nth-child(1) {
      color: rgba(255, 255, 255, 1);
      font-size: 18px;
      font-weight: 600;
      margin-left: 20px;
      font-family: PingFangSC;
    }
    :nth-child(2) {
      color: rgba(255, 255, 255, 1);
      font-size: 14px;
      margin-left: 20px;
      font-family: PingFangSC;
    }
  }
  .cl-bottom {
    background: rgba(255, 255, 255, 1);
    position: relative;
    border-radius: 0px 0px 8px 8px;
  }
}
</style>
