<template>
  <div class="hot-tab item">
    <div class="tabs">
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
    <div class="tab-content" v-if="activeData.length > 0">
      <ul>
        <li v-for="item in activeData" :key="item.index">
          {{ item.index }}. {{ item.title }}
        </li>
      </ul>
    </div>
    <div v-else class="img-box">
      <img :src="noneImg" style="width: 100px; height: 70px" alt="无信息" />
      <div class="none-title">暂无数据...</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import axios from "axios";
import noneImg from "@/assets/images/none.png";
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
  {
    key: "baidu",
    label: "百度",
    data: <Array<HotItem>>[],
  },
  {
    key: "zhihu",
    label: "知乎",
    data: <Array<HotItem>>[],
  },
  {
    key: "weibo",
    label: "微博",
    data: <Array<HotItem>>[],
  },
]);

const activeTab = ref("baidu");

const activeData = computed(() => {
  const tab = tabs.value.find((t) => t.key === activeTab.value);
  return tab ? tab.data : [];
});

const handleMouseOver = (key: string) => {
  activeTab.value = key;
};

// 获取热搜数据
async function getHotSearch() {
  try {
    const res = await axios.get("https://v2.xxapi.cn/api/baiduhot");
    tabs.value[0].data = res.data.data.slice(0, 4);
    const res1 = await axios.get(
      "https://api.cenguigui.cn/api/juhe/hotlist.php?type=zhihu"
    );
    tabs.value[1].data = res1.data.data.slice(0, 4);
    const res2 = await axios.get("https://v2.xxapi.cn/api/weibohot");
    tabs.value[2].data = res2.data.data.slice(0, 4);
  } catch (error) {
    console.error("获取热搜数据时出错:", error);
  }
}

getHotSearch();
</script>

<style scoped>
.item {
  width: 180px;
  margin: 20px;
  height: 160px;
  border-radius: 20px;
}
.hot-tab {
  font-family: Arial, sans-serif;
  background: linear-gradient(to bottom, #313641, #abaeb4);
}

.tabs {
  height: 40px;
  display: flex;
  justify-content: space-around;
  font-size: 14px;
  justify-content: center;
  align-items: center;
}

.tab {
  padding: 5px 10px;
  cursor: pointer;
  transition: color 0.3s, border-bottom 0.3s;
}

.tab.active {
  color: white;
  /* padding: 10px; */
  border-bottom: 2px solid white;
}

.tab:hover {
  color: white;
}

.tab-content {
  padding: 0px 10px;
}

.tab-content ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tab-content li {
  padding: 4px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.img-box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 120px;
  flex-direction: column;
}
.none-title {
  color: #b8babc;
  font-size: 12px;
  letter-spacing: 1px;
}
</style>
