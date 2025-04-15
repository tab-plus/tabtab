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
          <span class="index">{{ item.index }}.</span>
          <span class="title">{{ item.title }}</span>
        </li>
      </ul>
    </div>
    <div v-else class="img-box">
      <img :src="noneImg" class="none-img" alt="无信息" />
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
  height: 180px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background: linear-gradient(to bottom, #2c3e50, #bdc3c7);
  color: #282c37;
}

.hot-tab {
  font-family: "Roboto", Arial, sans-serif;
}

.tabs {
  height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 14px;
  border-bottom: 1px solid #2c3e50;

}

.tab {
  padding: 8px 12px;
  cursor: pointer;
  transition: color 0.3s, border-bottom 0.3s;
}

.tab.active {
  color: #fff;
  border-bottom: 2px solid #fff;
}

.tab:hover {
  color: #fff;
}

.tab-content {
  padding:6px 12px;
  font-size: 13px;
}

.tab-content ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tab-content li {
  padding: 4px 0;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.tab-content li:last-child {
  border-bottom: none;
}

.index {
  font-weight: bold;
  margin-right: 8px;
  color: #282c37;
}

.title {
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

.none-img {
  width: 80px;
  height: 60px;
  opacity: 0.8;
}

.none-title {
  color: #ecf0f1;
  font-size: 12px;
  margin-top: 8px;
  letter-spacing: 1px;
}
</style>
