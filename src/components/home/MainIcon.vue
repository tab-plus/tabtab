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
      <div
        class="icon-box"
        v-for="icon in iconList"
        :key="icon.id"
        :data-size="icon.size"
      >
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
              <p class="cl-ant-p sg-omit-sm text-white-sm icon-name">
                {{ icon.name }}
              </p>
            </div>
            <div v-else-if="icon.type === 'component'" class="one-box">
              <div v-if="icon.name == '备忘录'">
                <div v-if="icon.size === 1">
                  <MemoOne></MemoOne>
                </div>
                <div v-else-if="icon.size == '2x1'">
                  <MemoTwoOne></MemoTwoOne>
                </div>
                <div v-else-if="icon.size == '2x2'">
                  <MemoTwo></MemoTwo>
                </div>
              </div>
              <div v-else-if="icon.name == '日历'">
                <div>
                  <Calendar :size="icon.size"></Calendar>
                </div>
              </div>
              <div v-else-if="icon.name == '热搜'">
                <div v-if="icon.size === 1">
                  <HotOne></HotOne>
                </div>
                <div v-else-if="icon.size === '2x1'">
                  <HotTwoOne></HotTwoOne>
                </div>
                <div v-else-if="icon.size === '2x2'">
                  <HotTwo></HotTwo>
                </div>
              </div>

              <div v-else-if="icon.name == '天气'">
                <div v-if="icon.size === 1">
                  <WeatherOne></WeatherOne>
                </div>
                <div v-else-if="icon.size === '2x2'">
                  <WeatherFour></WeatherFour>
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
import MemoTwo from "@/components/elements/memo/Two.vue";
import MemoTwoOne from "@/components/elements/memo/TwoOne.vue";

import CalendarOne from "@/components/elements/calendar/One.vue";
import CalendarFour from "@/components/elements/calendar/Four.vue";
import Calendar from "@/components/elements/calendar/index.vue";

import HotOne from "@/components/elements/hot/One.vue";
import HotTwo from "@/components/elements/hot/Two.vue";
import HotTwoOne from "@/components/elements/hot/TwoOne.vue";

import WeatherOne from "@/components/elements/weather/One.vue";
import WeatherFour from "@/components/elements/weather/Four.vue";

const mainIconStore = useMainIconStore();
const route = useRoute();

const emit = defineEmits([
  "openPicture",
  "openMemo",
  "openCalendar",
  "openHot",
  "openWeather",
  "openIndexModal",
]);

mainIconStore.INIT_LIST(route.name as string); //初始化

const iconList = ref<Array<Icon>>(mainIconStore.iconList); //icon列表
const rightId = ref(""); //右键弹窗选择的id
// 右键点击按钮
const menu = ref([
  { label: "1x1", icon: "delete" },
  { label: "2x1", icon: "delete" },
  { label: "2x2", icon: "delete" },
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
  } else if (e.label === "2x2") {
    mainIconStore.UPDATE_ICON_SIZE(rightId.value, "2x2");
  } else if (e.label === "2x1") {
    mainIconStore.UPDATE_ICON_SIZE(rightId.value, "2x1");
  }
}

// 选择图标方法
const selectIcon = (icon) => {
  console.log(icon);
  const modalIcons = ["图库", "备忘录", "日历", "热搜", "天气", "翻译"];
  if (modalIcons.includes(icon.name)) {
    emit("openIndexModal", icon.name);
  } else if (icon.name === "添加") {
    emit("openPicture");
  } else if (icon.url) {
    window.open(icon.url);
  }
};
</script>

<style scoped>
.icon-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 15px;
}

.icon-box {
  /* 默认1x1大小 */
  width: 60px;
  height: 60px;
  transition: width 0.3s ease, height 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 2x1大小的图标 */
.icon-box[data-size="2x1"] {
  /* 水平 */
  grid-column: span 2;
  /* 垂直 */
  grid-row: span 1;
  width: 180px;
  height: 80px;
}

/* 2x2大小的图标 */
.icon-box[data-size="2x2"] {
  grid-column: span 2;
  grid-row: span 2;
  width: 180px;
  height: 180px;
}

.icon-name {
  text-align: center;
}

.box {
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.box:hover {
  transform: translateY(-10px); /* 图标往上移动 */
  /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); */
}
.img-box {
  /* width: 100%;
  height: 100%; */
}

.icon-img {
  width: 100%;
  height: 100%;
  border-radius: 15px;
  /* background-color: rgba(255, 255, 255, 0.4); */
}

.one-box {
  /* margin: 20px; */
}
</style>