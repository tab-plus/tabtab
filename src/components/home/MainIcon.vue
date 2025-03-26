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
          <div
            @click="selectIcon(icon)"
            class="box"
            @contextmenu.prevent="handleRightClick(icon.id)"
          >
            <div
              v-if="icon.type === 'icon' || icon.name === '图库'"
              class="img-box"
            >
              <img class="icon-img" :src="icon.src" :alt="icon.name" />
              <p class="cl-ant-p sg-omit-sm text-white-sm">{{ icon.name }}</p>
            </div>
            <div v-else-if="icon.type === 'component'" class="one-box">
              <div v-if="icon.name == '备忘录'">
                <div v-if="icon.size === 1">
                  <MemoOne></MemoOne>
                </div>
                <div v-else-if="icon.size === 4">
                  <MemoFour></MemoFour>
                </div>
              </div>
              <div v-else-if="icon.name == '日历'">
                <div v-if="icon.size === 1">
                  <CalendarOne></CalendarOne>
                </div>
                <div v-else-if="icon.size === 4">
                  <CalendarFour></CalendarFour>
                </div>
              </div>
              <div v-else-if="icon.name == '热搜'">
                <div v-if="icon.size === 1">
                  <HotOne></HotOne>
                </div>
                <div v-else-if="icon.size === 4">
                  <HotFour></HotFour>
                </div>
              </div>
            </div>
          </div>
        </ContextMenu>
      </div>
    </VueDraggable>
    <div></div>
  </div>
</template>

<script setup lang="ts">
import { VueDraggable } from "vue-draggable-plus";
import { useMainIconStore } from "@/store/mainIcon";
import ContextMenu from "@/components/ContextMenu.vue";
import { message } from "ant-design-vue";
import { Icon } from "@/types/icon";
import MemoOne from "@/components/elements/memo/One.vue";
import MemoFour from "@/components/elements/memo/Four.vue";

import CalendarOne from "@/components/elements/calendar/One.vue";
import CalendarFour from "@/components/elements/calendar/Four.vue";

import HotOne from "@/components/elements/hot/One.vue";
import HotFour from "@/components/elements/hot/Four.vue";
const mainIconStore = useMainIconStore();
const route = useRoute();

const emit = defineEmits(["openPicture", "openMemo", "openCalendar"]);

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
  console.log("删除：", e);
  if (e.label === "删除") {
    mainIconStore.DELETE_ICON(rightId.value);
  } else if (e.label === "1x1") {
    mainIconStore.UPDATE_ICON_SIZE(rightId.value, 1);
  } else if (e.label === "4x4") {
    mainIconStore.UPDATE_ICON_SIZE(rightId.value, 4);
  }
}

// 选择图标方法
const selectIcon = (icon) => {
  console.log(icon);
  if (icon.name === "图库") {
    emit("openPicture");
  } else if (icon.name === "添加") {
    emit("openPicture");
  } else if (icon.name === "备忘录") {
    emit("openMemo");
  } else if (icon.name === "日历") {
    emit("openCalendar");
  } else if (icon.name === "热搜") {
    // emit("openCalendar");
  } else {
    window.open(icon.url);
  }
};
</script>

<style scoped>
.icon-container {
  /* background-color: rgba(200, 200, 200, 0.5); */
  display: flex;
  align-items: flex-end;
  flex-wrap: wrap; /* 超出后换行 */
}
.box {
  cursor: pointer;
}
.img-box {
  margin: 20px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 80px;
}

.icon-img {
  width: 60px;
  height: 60px;
  border-radius: 5px;
  /* background-color: rgba(255, 255, 255, 0.4); */
}

.one-box {
  /* margin: 20px; */
}
</style>