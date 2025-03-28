<!--
 * @Author: panrunjun
 * @Date: 2024-07-27 21:46:10
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-03-28 14:27:39
 * @Description: 添加快捷方式图标
 * @FilePath: \ytab-master\src\components\AddIcon.vue
-->
<template>
  <div class="body">
    <template v-if="iconList.length > 0">
      <div class="box" v-for="item in iconList" :key="item.key">
        <div class="flex">
          <div class="icon">
            <img
              style="height: 70px; width: 70px; border-radius: 20px"
              :src="item.src"
              alt=""
            />
          </div>
          <div style="width: 100%; margin: 0 10px">
            <div class="flex justify-between">
              <div class="title">{{ item.name }}</div>
              <div>
                <img
                  style="height: 20px; width: 20px"
                  src="@/assets/link.png"
                  alt=""
                />
              </div>
            </div>

            <div class="content">{{ item.content }}</div>
          </div>
        </div>
        <a-button class="add" size="mini" @click="handleAdd(item)"
          >添加</a-button
        >
      </div>
    </template>
    <template v-else>
      <div class="img-box">
        <img
          :src="noneImg"
          style="width: 300px; height: 250px"
          alt="暂无数据"
        />
        <div class="none-title">暂无数据</div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { message } from "ant-design-vue";
import { v4 as uuidv4 } from "uuid";
import { get_allicon_list } from "@/api/icon";
import noneImg from "@/assets/images/none.png";

export default defineComponent({
  emits: ["addNewWidget", "handleClose"], // 声明子组件可以触发的事件
  setup(props, { emit }: { emit: Function }) {
    const route = useRoute();
    const iconList = ref([]);

    const handleAdd = (item: any) => {
      console.log(item);
      const routeName = route.name;
      const uniqueID = uuidv4();
      let data = {
        id: uniqueID,
        name: item.name,
        size: 4,
        iconId: item.id,
        type: item.type,
        url: item.url,
        src: item.src,
      };
      emit("addNewWidget", data);

      message.success(`添加成功`);
      emit("handleClose");
    };

    onMounted(() => {
      get_allicon_list().then((res) => {
        iconList.value = res.data;
        // iconList.value = [];
      });
    });
    return {
      iconList,
      handleAdd,
      noneImg,
    };
  },
});

// 暴露组件的属性和事件
// defineExpose({ iconList, emits });
</script>

<style lang="scss" scoped>
.body {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  height: 500px;
  overflow-y: auto;
}

.box {
  background-color: white;
  // display: flex;
  border-radius: 10px;
  height: 140px;
  margin: 10px;
  padding: 10px;
  flex: 0 0 calc(33.33% - 20px);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  /* 每个子元素宽度为33.33%，减去20px的固定间距 */
}
.box:hover {
  transform: translateY(-10px); /* 图标往上移动 */
}

.title {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
}

.icon {
  height: 90px;
  border-radius: 20px;
}

.add {
  // display: flex;
  float: right;
  border-radius: 20px;
  // width: 40px;
  // height: 20px;
}

.content {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  /* 显示三行文本 */
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
  color: gray;
}

.img-box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  flex-direction: column;
}

.none-title {
  color: #b8babc;
  font-size: 12px;
  letter-spacing: 1px;
}
</style>