<!--
 * @Author: panrunjun
 * @Date: 2025-03-25 13:51:06
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-03-25 17:11:45
 * @Description: 热搜组件
 * @FilePath: \ytab-master\src\components\elements\hot\Four.vue
-->
<template>
  <div class="box">
    <a-tabs v-model:activeKey="activeKey" type="card" size="small">
      <a-tab-pane key="1" tab="Tab 1">Content of Tab Pane 1</a-tab-pane>
      <a-tab-pane key="2" tab="Tab 2" force-render
        >Content of Tab Pane 2</a-tab-pane
      >
      <a-tab-pane key="3" tab="Tab 3">Content of Tab Pane 3</a-tab-pane>
    </a-tabs>
  </div>
</template>
  
<script setup lang="ts">
const activeKey = ref("1");
</script>
  
<style scoped>
.box {
  margin: 20px;
  background: linear-gradient(45deg, #5d616b, #8a94a7);
  border-radius: 10px;
  width: 180px;
  height: 160px;
}
.hotSearchItem {
  height: 100%;
  border-radius: 20px;
}
.hotSearchItem-bgColor {
}

.tab {
  display: inline-block;
  margin: 5px 8px;
  padding: 3px 4px;
  cursor: pointer;
  font-size: 15px;
  color: white;
}

.tab:hover {
  background-color: #5d616b;
}

.tab-content {
  color: white;
  padding: 5px;
  display: flex;
  justify-content: left;
}

.tab-pane {
  width: 100%;
  display: none;
}

.tab-pane.active {
  display: block;
}

.tab-pane-item {
  border-bottom: 1px solid rgb(225, 220, 220);
  color: white;
  padding: 5px;
  display: flex;
  justify-content: left;
  overflow: hidden;
  /* 确保超出部分被隐藏 */
  white-space: nowrap;
  /* 不允许换行 */
  text-overflow: ellipsis;
  /* 超出文本用省略号表示 */
}

a {
  display: block;
  text-decoration: none;
  /* 取消下划线 */
  color: inherit;
  /* 使链接颜色继承父元素的颜色 */
  cursor: pointer;
  /* 更改鼠标悬停时的光标样式 */
}

a:hover {
  /* 悬停时链接颜色保持不变 */
}
</style>