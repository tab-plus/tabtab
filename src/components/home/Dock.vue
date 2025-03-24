<template>
  <div id="dock">
    <vue-draggable
      id="icon-container"
      v-model="iconList"
      @mousemove="handleMouseMove"
      @mouseleave="handleMouseLeave"
      @start="onStart"
    >
      <li
        v-for="(icon, index) in iconList"
        :key="icon.name"
        :style="{ '--scale': scales[index] }"
      >
        <img :src="icon.src" :alt="icon.name" @click="selectIcon(icon)" />
      </li>
    </vue-draggable>
  </div>
</template>
  

  <script setup>
import { ref, reactive, defineEmits } from "vue";
import { VueDraggable } from "vue-draggable-plus";
import addImage from "@/assets/images/add.png";

const emit = defineEmits(["handleAdd"]);
const iconList = ref([
  {
    url: "https://www.baidu.com",
    type: "icon",
    name: "百度",
    src: "https://www.baidu.com/favicon.ico",
  },
  {
    url: "https://chat.qwen.ai",
    type: "icon",
    name: "千问",
    src: "https://assets.alicdn.com/g/qwenweb/qwen-webui-fe/0.0.53/favicon.png",
  },
  {
    url: "",
    type: "add",
    name: "add",
    src: addImage,
    disabled: true,
  },
]);

const scales = reactive(Array(iconList.value.length).fill(1));

const curve = (x, multiple = 1) =>
  multiple * Math.exp((-x * x) / 200 / 200) + 1;

const handleMouseMove = (e) => {
  const container = e.currentTarget;
  const items = container.querySelectorAll("li");
  items.forEach((li, index) => {
    const centroid = li.offsetLeft + li.offsetWidth / 2;
    scales[index] = curve(e.clientX - centroid);
  });
};

const handleMouseLeave = () => {
  scales.fill(1);
};

const selectIcon = (icon) => {
  console.log(icon);
  if (icon.type === "add") {
    emit("handleAdd");
  } else {
    window.open(icon.url);
  }
};

//移动事件
const onStart = (event) => {
  //被拖拽的元素
  console.log(event);
};
</script>
  

  <style scoped>
#dock {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
#icon-container {
  height: 60px;
  margin: 0;
  padding: 0;
  --scale: 1;
  border-radius: 20px;
  background-color: rgba(200, 200, 200, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

#icon-container > li {
  list-style: none;
  margin: 0.4em 1em;
  transition: transform 0.2s ease; /* smooth transition for scaling */
}

#icon-container > li > img {
  width: calc(var(--scale) * 50px);
  border-radius: calc(var(--scale) * 15px);
  overflow: hidden;
  cursor: pointer;
}

.vue-draggable-dragging {
  opacity: 0.5;
  transform: scale(1.2); /* Optionally scale the icon when dragging */
}
</style>
  