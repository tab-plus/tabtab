<!--
 * @Author: panrunjun
 * @Date: 2024-07-27 22:58:42
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-03-28 14:31:14
 * @Description: 添加小组件
 * @FilePath: \ytab-master\src\components\AddComponent.vue
-->
<template>
  <div class="body">
    <div class="boxShadow" @click="addComponent('备忘录')">
      <MemoFour></MemoFour>
    </div>
    <div class="boxShadow" @click="addComponent('日历')">
      <CalendarFour></CalendarFour>
    </div>

    <div class="boxShadow"  @click="addComponent('热搜')">
      <HotFour></HotFour>
    </div>
    <div class="boxShadow"  @click="addComponent('热搜')">
      <HotFour></HotFour>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps, defineEmits } from "vue";
import { message } from "ant-design-vue";
import { useMainIconStore } from "@/store/mainIcon";
import { v4 as uuidv4 } from "uuid";
import MemoFour from "@/components/elements/memo/Four.vue";
import CalendarFour from "@/components/elements/calendar/Four.vue";
import HotFour from "@/components/elements/hot/Four.vue";
import { useRoute } from "vue-router";

// 定义子组件触发的事件
const emit = defineEmits(["addNewWidget", "handleClose"]);
const route = useRoute();
const mainIconStore = useMainIconStore();
const weather = ref<any>();
const city = ref<string>();

weather.value = JSON.parse(localStorage.getItem("weather") || "{}");
city.value = localStorage.getItem("city") || "";

const addComponent = (name: string) => {
  const uniqueID = uuidv4();
  let data = {
    id: uniqueID,
    name,
    size: 4,
    type: "component",
  };
  emit("addNewWidget", data);
  emit("handleClose");
  message.success(`添加成功`);
};

onMounted(() => {
  // 可以在这里放置需要在组件挂载时执行的代码
});
</script>


<style scoped lang="scss">
.body {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  height: 500px;
  padding: 10px;
}
.boxShadow {
  cursor: pointer;
  padding: 10px;
  border-radius: 20px;
  flex: 0 0 calc(25% - 20px);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 180px;
}
.boxShadow:hover {
  transform: translateY(-10px); /* 图标往上移动 */
}

// 覆盖默认样式
.item {
  margin: 0px;
  // width: 100%;
}
</style>