<template>
  <div id="dock">
    <ContextMenu :menu="menu" @select="getSelect">
      <vue-draggable
        id="icon-container"
        v-model="iconList"
        group="icon"
        @mousemove="handleMouseMove"
        @mouseleave="handleMouseLeave"
        @start="onStart"
        @end="onEnd"
        @update="onUpdate"
        @remove="onRemove"
        @add="onAdd"
      >
        <div
          v-for="(icon, index) in iconList"
          :key="icon.name"
          :style="{ '--scale': scales[index] }"
        >
          <img
            :src="icon.src"
            :alt="icon.name"
            @click="selectIcon(icon)"
            @contextmenu.prevent="handleRightClick(icon.id)"
          />
    </div>
      </vue-draggable>
    </ContextMenu>
  </div>
</template>
  

  <script setup lang="ts">
import { ref, reactive, defineEmits } from "vue";
import { VueDraggable } from "vue-draggable-plus";
import { useBottomIconStore } from "@/store/bottomIcon";
import ContextMenu from "@/components/ContextMenu.vue";
import { message } from "ant-design-vue";
import { Icon } from "@/types/icon";
const bottomIconStore = useBottomIconStore();

const emit = defineEmits(["handleAdd"]);
const rightId = ref(""); //右键弹窗选择的id
// 右键点击按钮
const menu = ref([{ label: "删除", icon: "delete" }]);

// 右键弹窗的选择
function getSelect(e) {
  console.log(e);
  if (e.label === "删除") {
    if (rightId.value === "add") {
      message.error("添加icon不能删除");
      return;
    }
    bottomIconStore.DELETE_ICON(rightId.value);
  }
}

// 右键的方法
function handleRightClick(id: string) {
  console.log(id, 11);
  rightId.value = id;
}

// 获取store实例
const iconList = ref<Array<Icon>>(bottomIconStore.iconList);

const scales = reactive(Array(iconList.value.length).fill(1));

const curve = (x, multiple = 1) =>
  multiple * Math.exp((-x * x) / 200 / 200) + 1;

const handleMouseMove = (e) => {
  const container = e.currentTarget;
  const items = container.querySelectorAll("div");
  items.forEach((div, index) => {
    const centroid = div.offsetLeft + div.offsetWidth / 2;
    scales[index] = curve(e.clientX - centroid);
  });
};

const handleMouseLeave = () => {
  scales.fill(1);
};

const selectIcon = (icon) => {
  console.log(icon);
  if (icon.type === "add") {
    emit("handleAdd", 1);
  } else {
    window.open(icon.url);
  }
};

//移动事件
const onStart = (event) => {
  //被拖拽的元素
  console.log("start for bottom");
  // 在开始拖动之前，清除所有样式
  // scales.fill(1);
  // event.target.style.height = "60px";
  // event.target.style.width = "60px";
  // event.target.style.backgroundColor = "red";
  const draggedItem = event.item || event.draggedItem; // 获取拖拽元素
  const icon = draggedItem.querySelector("img"); // 获取 icon 元素
  if (icon) {
    icon.style.width = "60px";
    icon.style.height = "60px";
  }
  console.log(event.target.style);
};

// 拖动结束时保存排序到store
const onEnd = (event) => {
  // 更新 store 中的 iconList 顺序
};
// icon位置更新
const onUpdate = (event) => {
  console.log("update for bottom");
  // 更新 store 中的 iconList 顺序
  bottomIconStore.UPDATE_ICON_LIST(iconList.value);
};

const onRemove = (event) => {
  console.log("remove for bottom");
  // 更新 store 中的 iconList 顺序
  bottomIconStore.UPDATE_ICON_LIST(iconList.value);
};

const onAdd = (event) => {
  console.log("add for main");
  // 更新 store 中的 iconList 顺序
  bottomIconStore.UPDATE_ICON_LIST(iconList.value);
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

#icon-container > div {
  list-style: none;
  margin: 0.4em 1em;
  transition: transform 0.2s ease; /* smooth transition for scaling */
}

#icon-container > div > img {
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
  