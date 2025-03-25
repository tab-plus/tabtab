<template>
  <div>
    <VueDraggable
      class="icon-container"
      :animation="150"
      group="icon"
      v-model="iconList"
      @start="onStart"
      @end="onEnd"
      @add="onAdd"
      @update="onUpdate"
      @remove="onRemove"
    >
      <div class="icon-box" v-for="icon in iconList" :key="icon.id">
        <ContextMenu :menu="menu" @select="getSelect">
          <img
            class="icon-img"
            :src="icon.src"
            :alt="icon.name"
            @click="selectIcon(icon)"
            @contextmenu.prevent="handleRightClick(icon.id)"
          />
        </ContextMenu>
      </div>
    </VueDraggable>
  </div>
</template>

<script setup lang="ts">
import { VueDraggable } from "vue-draggable-plus";
import { useMainIconStore } from "@/store/mainIcon";
import ContextMenu from "@/components/ContextMenu.vue";
import { message } from "ant-design-vue";
import { Icon } from "@/types/icon";
const mainIconStore = useMainIconStore();
const route = useRoute();

mainIconStore.INIT_LIST(route.name as string); //初始化

const iconList = ref<Array<Icon>>(mainIconStore.iconList); //icon列表
const rightId = ref(""); //右键弹窗选择的id
// 右键点击按钮
const menu = ref([
  { label: "1x1", icon: "delete" },
  { label: "4x4", icon: "delete" },
  { label: "删除", icon: "delete" },
]);
//移动事件开始
const onStart = (event) => {
  //被拖拽的元素
  console.log(event);
};

// 拖动结束时保存排序到store
const onEnd = (event) => {
  // 更新 store 中的 iconList 顺序
  // mainIconStore.UPDATE_ICON_LIST(iconList.value);
};

// 移动进入增加更新
const onAdd = (event) => {
  console.log("add for main");
  // 更新 store 中的 iconList 顺序
  mainIconStore.UPDATE_ICON_LIST(iconList.value);
};

// icon位置更新
const onUpdate = (event) => {
  console.log("update for main");
  // 更新 store 中的 iconList 顺序
  mainIconStore.UPDATE_ICON_LIST(iconList.value);
};

const onRemove = (event) => {
  console.log("remove for main");
  // 更新 store 中的 iconList 顺序
  mainIconStore.UPDATE_ICON_LIST(iconList.value);
};

// 右键的方法
function handleRightClick(id: string) {
  console.log(id, 11);
  rightId.value = id;
}

// 右键弹窗的选择
function getSelect(e) {
  console.log(e);
  if (e.label === "删除") {
    if (rightId.value === "add") {
      message.error("添加icon不能删除");
      return;
    }
    mainIconStore.DELETE_ICON(rightId.value);
  }
}

// 选择图标方法
const selectIcon = (icon) => {
  console.log(icon);
  window.open(icon.url);
};
</script>

<style scoped>
.icon-container {
  /* background-color: rgba(200, 200, 200, 0.5); */
  display: flex;
  align-items: flex-end;
  flex-wrap: wrap; /* 超出后换行 */
}

.icon-img {
  width: 60px;
  height: 60px;
  margin: 20px;
  border-radius: 5px;
}
</style>