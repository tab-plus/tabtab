<!--
 * @Author: panrunjun
 * @Date: 2025-03-25 13:51:06
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-03-25 16:30:00
 * @Description: 备忘录4x4
 * @FilePath: \ytab-master\src\components\elements\memo\Four.vue
-->
<template>
  <div class="item memoItem-bgColor">
    <div class="memoItemHeader">备忘录</div>
    <div class="body">
      <div
        class="cl-ant-p sg-omit-sm text-white-sm memoItem"
        v-for="(item, index) in memoMenuList"
        :key="index"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import { get_memo_list } from "@/api/memo";
const memoMenuList = ref([]);
function getList() {
  get_memo_list().then((res: any) => {
    console.log(res);
    if (res == undefined) return;
    if (res.code === 200) {
      let count = 0; // 计数器，用于限制推入的元素个数
      if (res.data.length > 0) {
        for (let i = 0; i < res.data.length; i++) {
          if (count < 4) {
            const title = res.data[i].title;
            memoMenuList.value.push(title);
            count++; // 每推入一个元素，计数器加一
          } else {
            break; // 如果已经推入了4个元素，退出循环
          }
        }
      }
    } else {
      memoMenuList.value = [];
    }
  });
}

getList();
</script>
  
<style scoped>
.item {
  width: 180px;
  margin: 20px;
  border: 0px;
}
.body {
    height: 120px;
}

.memoItem {
  /* border-bottom: 1px solid rgb(225, 220, 220); */
  width: 100%;
  color: black;
  padding: 5px;
  display: flex;
  justify-content: left;
}



.memoItemHeader {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    background-color: #ffb716;
    color: white;
    font-size: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.memoItem-bgColor {
    height: 100%;
    background-color: white;
    border-radius: 20px;
}
</style>