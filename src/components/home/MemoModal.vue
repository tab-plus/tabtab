
<template>
  <div ref="globalModal">
    <a-modal
      width="60%"
      v-model:visible="props.visible"
      footer=""
      title="备忘录"
      closable
      :getContainer="() => $refs.globalModal"
      @cancel="emit('update:visible', false)"
    >
      <a-layout>
        <a-layout-sider
          class="min-h-500"
          :style="{ overflow: 'auto' }"
          v-model:collapsed="memoState.collapsed"
          theme="light"
        >
          <a-dropdown :trigger="['contextmenu']">
            <a-menu v-model:selectedKeys="memoState.selectedKeys" mode="inline">
              <template v-for="item in memoList" :key="item.id">
                <a-menu-item
                  @contextmenu.prevent="
                    $event.preventDefault();
                    handleContextMenu(item.id);
                  "
                >
                  <span class="mr-1" v-show="!showInput">{{ item.title }}</span>
                </a-menu-item>
              </template>
            </a-menu>
            <template #overlay>
              <a-menu @click="handleMenuClick">
                <a-menu-item key="1"> <form-outlined /> 编辑 </a-menu-item>
                <a-menu-item key="2"> <delete-outlined /> 删除 </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </a-layout-sider>
        <a-button
          type="primary"
          @click="addMemoList()"
          style="position: absolute; bottom: 0; left: 0; margin: 10px"
          >+</a-button
        >
        <a-layout>
          <template v-for="item in memoList" :key="item.id">
            <div
              v-if="
                Array.isArray(memoState.selectedKeys) &&
                memoState.selectedKeys.includes(item.id)
              "
            >
              <a-textarea
                @blur="blurInput($event)"
                style="
                  width: 100%;
                  min-height: 300px;
                  border: 0px;
                  background-color: #f0f2f5;
                "
                v-model:value="item.content"
                placeholder="Basic usage"
                autosize="true"
              />
            </div>
          </template>
        </a-layout>
      </a-layout>
    </a-modal>
  </div>

  <a-modal
    width="30%"
    v-model:visible="visible"
    title="修改title"
    @ok="submitTitle"
  >
    <a-input v-model:value="visibleInput" style="width: 100%" />
  </a-modal>
</template>
  
  <script setup lang="ts">
import { reactive, ref, onMounted, toRefs } from "vue";
import {
  EditTwoTone,
  DeleteOutlined,
  FormOutlined,
} from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import { MemoMenu } from "@/types/menu";
import { add_memo, delete_memo, get_memo_list, update_memo } from "@/api/memo";
import { useMemoStore } from "@/store/memoStore";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import { Memo } from "@/types/memo";

const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
});
const memoStore = useMemoStore();
const emit = defineEmits(); // 声明emit

// 获取数据
const memoList = ref<Array<Memo>>([]);
const getMemoList = () => {
  memoList.value = memoStore.memoList;
};
getMemoList();

const showInput = ref<Boolean>(false);
const contextMenuKey = ref("");
const memoState = reactive({
  collapsed: false,
  selectedKeys: memoStore.memoList.length > 0 ? [memoStore.memoList[0].id] : "",
});

const visible = ref(false); //是否打开修改标题输入框
const visibleInput = ref(""); // 修改标题输入框

// 自定义右键方法传入item
function handleContextMenu(id: string) {
  console.log(id);
  contextMenuKey.value = id;
}

// 添加备忘录页签
const addMemoList = () => {
  let data = {
    id: uuidv4(),
    title: "新建备忘录",
    content: "...",
    createDate: dayjs(new Date()).format("YYYY-MM-DD"),
  };
  memoStore.ADD_MEMO(data);
  message.success("添加成功");
};

// 删除数据
const deleteMemo = () => {
  memoStore.DELETE_MEMO(contextMenuKey.value);
};

const handleMenuClick = ({ key }: { key: string }) => {
  console.log(key);
  if (key === "1") {
    console.log("编辑");
    visible.value = true;
  } else if (key === "2") {
    deleteMemo();
  }
};

const blurInput = (event: any) => {
  console.log(event.target.value);
  memoStore.UPDATE_MEMO(
    memoState.selectedKeys[0],
    "content",
    event.target.value
  );
  message.success("修改成功");
};

const submitTitle = () => {
  memoStore.UPDATE_MEMO(contextMenuKey.value, "title", visibleInput.value);
  message.success("修改成功");
  visible.value = false;
};

onMounted(() => {});
</script>
  
  <style scoped>
.mr-1 {
  margin-right: 5px;
}

:deep(.ant-modal-content) {
  /* background-color: rgba(255, 255, 255, 0.3); */
  border-radius: 20px;
  padding: 10px;
}
</style>