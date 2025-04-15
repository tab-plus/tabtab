<template>
  <!-- 使用同一个盒子容器，通过size控制样式 -->
  <div class="hot-box" :class="'size-' + props.size">
    <!-- 1x1 布局内容 -->
    <div v-if="size === 1" class="content-1x1">
      <div class="flex align-center img-box-1x1">
        <img :src="hotImg" class="hot-icon" />
      </div>
      <p class="cl-ant-p sg-omit-sm text-white-sm">热搜</p>
    </div>

    <!-- 2x1 布局内容 -->
    <div v-if="size === '2x1'" class="content-2x1">
      <div class="flex align-center justify-center img-box-2x1">
        <img :src="hotImg" class="hot-icon-2x1" />
      </div>
    </div>

    <!-- 2x2 布局内容 -->
    <div v-else-if="size === '2x2'" class="content-2x2">
      <div class="header-2x2">
        <div
          v-for="tab in tabs"
          :key="tab.key"
          class="tab"
          :class="{ active: activeTab === tab.key }"
          @mouseover="handleMouseOver(tab.key)"
        >
          {{ tab.label }}
        </div>
      </div>
      <div class="body-2x2">
        <template v-if="activeData.length > 0">
          <div
            v-for="(item, index) in activeData"
            :key="index"
            class="hot-item"
          >
            <span class="index">{{ index + 1 }}.</span>
            <span class="title">{{ item.title }}</span>
          </div>
        </template>
        <template v-else>
          <div class="empty-state">
            <img :src="noneImg" alt="无热搜" class="empty-img" />
            <div class="empty-text">暂无热搜数据</div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
  
  <script setup lang="ts">
import { ref, computed, PropType } from "vue";
import axios from "axios";
import hotImg from "@/assets/icon/hotSearch.png";
import noneImg from "@/assets/images/none.png";

const props = defineProps({
  size: {
    type: [String, Number] as PropType<string | number>,
    default: "1",
    validator: (value: string | number) =>
      ["1", "2x1", "2x2"].includes(value.toString()),
  },
});

type HotItem = {
  index: number;
  key: string;
  desc: string;
  img: string;
  url: string;
  hot: string;
  title: string;
};

const tabs = ref([
  { key: "baidu", label: "百度", data: [] as HotItem[] },
  { key: "zhihu", label: "知乎", data: [] as HotItem[] },
  { key: "weibo", label: "微博", data: [] as HotItem[] },
]);

const activeTab = ref("baidu");

const activeData = computed(() => {
  const tab = tabs.value.find((t) => t.key === activeTab.value);
  return tab ? tab.data.slice(0, 4) : [];
});

// 鼠标悬停事件处理函数
const handleMouseOver = (key: string) => {
  activeTab.value = key;
};

async function getHotSearch() {
  try {
    const [baiduRes, zhihuRes, weiboRes] = await Promise.all([
      axios.get("https://v2.xxapi.cn/api/baiduhot"),
      axios.get("https://api.cenguigui.cn/api/juhe/hotlist.php?type=zhihu"),
      axios.get("https://v2.xxapi.cn/api/weibohot"),
    ]);

    tabs.value[0].data = baiduRes.data.data;
    tabs.value[1].data = zhihuRes.data.data;
    tabs.value[2].data = weiboRes.data.data;
  } catch (error) {
    console.error("获取热搜数据时出错:", error);
  }
}

getHotSearch();
</script>
  
  <style scoped>
/* 基础盒子样式 - 添加过渡动画 */
.hot-box {
  transition: all 0.3s ease;
  /* background: linear-gradient(45deg, #2a2f3a, #444a56); */
  border-radius: 20px;
  overflow: hidden;
  color: white;
}

/* 1x1 尺寸样式 */
.hot-box.size-1 {
  width: 80px;
  height: 80px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

/* 2x1 尺寸样式 */
.hot-box.size-2x1 {
  width: 180px;
  height: 80px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
}

/* 2x2 尺寸样式 */
.hot-box.size-2x2 {
  width: 180px;
  height: 180px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
}

/* 1x1 内容布局 */
.content-1x1 {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.img-box-1x1 {
  width: 60px;
  height: 60px;
  background: linear-gradient(45deg, #2a2f3a, #444a56);
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hot-icon {
  width: 40px;
  height: 40px;
  border-radius: 15px;
}

/* 2x1 内容布局 */
.content-2x1 {
  width: 180px;
  height: 80px;
  background: linear-gradient(45deg, #2a2f3a, #444a56);
  display: flex;
  justify-content: center;
  align-items: center;
}

.img-box-2x1 {
  width: 100%;
}

.hot-icon-2x1 {
  width: 50px;
  height: 50px;
}

/* 2x1 内容布局 end */

/* 2x2 内容布局 */
.content-2x2 {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: linear-gradient(45deg, #2a2f3a, #444a56);
}

.header-2x2 {
  height: 40px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 14px;
  overflow: hidden;
}

.tab {
  padding: 8px 12px;
  cursor: pointer;
  transition: all 0.3s;
}

.tab.active {
  color: #fff;
  border-bottom: 2px solid #fff;
}

.tab:hover {
  color: #fff;
}

.body-2x2 {
  flex: 1;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 13px;
}

.hot-item {
  display: flex;
  align-items: center;
  padding: 2px;
  /* background-color: rgba(255, 255, 255, 0.1); */
  border-radius: 8px;
}

.title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.index {
  font-weight: bold;
  margin-right: 8px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.empty-img {
  width: 80px;
  height: 60px;
  opacity: 0.8;
  margin-bottom: 10px;
}

.empty-text {
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
}
</style>