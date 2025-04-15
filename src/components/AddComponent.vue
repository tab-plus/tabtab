<!--
 * @Author: panrunjun
 * @Date: 2024-07-27 22:58:42
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-04-15 15:19:04
 * @Description: 添加小组件
 * @FilePath: \ytab-master\src\components\AddComponent.vue
-->
<template>
  <div class="body">
    <div class="boxShadow" @click="addComponent('备忘录')">
      <Memo :size="size"></Memo>
    </div>
    <div class="boxShadow" @click="addComponent('日历')">
      <Calendar :size="size"></Calendar>
    </div>

    <div class="boxShadow" @click="addComponent('热搜')">
      <Hot :size="size"></Hot>
    </div>
    <div class="boxShadow" @click="addComponent('天气')">
      <Weather :size="size"></Weather>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps, defineEmits } from "vue";
import { message } from "ant-design-vue";
import { useMainIconStore } from "@/store/mainIcon";
import { v4 as uuidv4 } from "uuid";
import Memo from "@/components/elements/memo/index.vue";
import Calendar from "@/components/elements/calendar/index.vue";
import Hot from "@/components/elements/hot/index.vue";
import Weather from "@/components/elements/weather/index.vue";
import { useRoute } from "vue-router";

// 定义子组件触发的事件
const emit = defineEmits(["addNewWidget", "handleClose"]);
const route = useRoute();
const mainIconStore = useMainIconStore();
const weather = ref<any>();
const city = ref<string>();
const size = ref<string | number>("2x2");

weather.value = JSON.parse(localStorage.getItem("weather") || "{}");
city.value = localStorage.getItem("city") || "";

const addComponent = (name: string) => {
  const uniqueID = uuidv4();
  let data = {
    id: uniqueID,
    name,
    size: "2x2",
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