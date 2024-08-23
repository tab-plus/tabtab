
<template>
    <a-layout>
        <a-layout-sider class="min-h-300" :style="{ overflow: 'auto' }" v-model:collapsed="collapsed" theme="light">
            <a-dropdown :trigger="['contextmenu']">
                <a-menu v-model:selectedKeys="selectedKeys" mode="inline">
                    <template v-for="item in memoMenuList" :key="item.id">
                        <a-menu-item @contextmenu.prevent="$event.preventDefault(); handleContextMenu(item.id)">
                            <span class="mr-1" v-show="!showInput">{{ item.title }}</span>
                            <!-- <a-input class="mr-1" v-show="showInput" v-model:value="inputValue" style="width:100px"/> -->
                            <!-- <EditTwoTone v-show="!showInput" @click="() => { inputValue = item.name,showInput = true }" /> -->
                        </a-menu-item>

                    </template>
                </a-menu>
                <template #overlay>
                    <a-menu @click="handleMenuClick">
                        <a-menu-item key="1">
                            <form-outlined /> 编辑
                        </a-menu-item>
                        <a-menu-item key="2">
                            <delete-outlined /> 删除
                        </a-menu-item>
                    </a-menu>
                </template>
            </a-dropdown>
        </a-layout-sider>
        <a-button type="primary" @click="addMemoMenu()"
            style="position:absolute;bottom: 0;left: 0;margin:10px;">+</a-button>
        <a-layout>
            <template v-for="item in memoMenuList" :key="item.id">
                <div v-if="selectedKeys.includes(item.id)">
                    <a-textarea @blur="blurInput($event)" style="width:100%;min-height:300px;border: 0px; background-color: #f0f2f5;"
                        v-model:value="item.content" placeholder="Basic usage" autosize="true" />
                </div>
            </template>
        </a-layout>
    </a-layout>
    <a-modal width="30%" v-model:visible="visible" title="修改title" 
        @ok="submitTitle">
        <a-input v-model:value="visibleInput" style="width:100%;" />
      </a-modal>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, toRefs, ref } from 'vue';
import { EditTwoTone, DeleteOutlined, FormOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import {
} from '@ant-design/icons-vue';
import { MemoMenu } from '@/types/menu';
import { add_memo, delete_memo, get_memo_list, update_memo } from '@/api/memo';
export default defineComponent({
    components: {
        EditTwoTone,
        DeleteOutlined,
        FormOutlined,
    },
    emits: ['closeMemo'], // 声明子组件可以触发的事件

    setup(props, { emit }: { emit: Function }) {

        const memoState = reactive({
            collapsed: false,
            selectedKeys: [0],
            openKeys: ['sub1'],
        });
        const inputValue = ref('');
        const showInput = ref<Boolean>(false);
        const contextMenuKey = ref(0);
        const memoMenuList = ref<Array<MemoMenu>>([]);
        const visible = ref(false);
        const visibleInput = ref('');
        onMounted(() => {
            getMemoList()
        })

        // 自定义右键方法传入item
        function handleContextMenu(id: number) {
            console.log(id)
            contextMenuKey.value = id;
        }

        // 添加备忘录页签
        const addMemoMenu = () => {
            let data = {
                title: '新建备忘录',
                content: '...'
            }
            add_memo(data).then((res: any) => {
                console.log(res)
                if (res.code === 200) {
                    message.success('添加成功')
                    getMemoList()
                } else {
                    message.error(res.message)
                }
            })
        };

        // 获取数据
        const getMemoList = () => {
            get_memo_list().then((res: any) => {
                console.log(res)
                if (res.code === 200) {
                    memoMenuList.value = res.data
                } else {
                    message.error(res.message)
                }
            })
        }

        // 删除数据
        const deleteMemo = () => {
            delete_memo(contextMenuKey.value).then((res: any) => {
                console.log(res)
                if (res.code === 200) {
                    message.success(res.message)
                    memoMenuList.value = res.data
                    getMemoList()
                } else {
                    message.error(res.message)
                }
            })
        }
        const handleMenuClick = ({ key }: { key: string }) => {
            console.log(key)
            if (key === '1') {
                console.log('编辑')
                visible.value = true
            } else if (key === '2') {
                deleteMemo()
            }
        }

        const blurInput = (event:any) => {
            console.log(event.target.value)  
            update_memo({
                id: memoState.selectedKeys[0],
                content: event.target.value
            }).then((res: any) => {
                console.log(res)
                if (res.code === 200) {
                    message.success(res.message)
                    getMemoList()
                } else {
                    message.error(res.message)
                }
            })
        }

        const submitTitle = () => {
            update_memo({
                id: memoState.selectedKeys[0],
                title: visibleInput.value
            }).then((res: any) => {
                console.log(res)
                if (res.code === 200) {
                    message.success(res.message)
                    visible.value = false
                    getMemoList()
                } else {
                    message.error(res.message)
                }
            })
        }
        
        return {
            addMemoMenu,
            memoMenuList,
            inputValue,
            showInput,
            handleMenuClick,
            handleContextMenu,
            blurInput,
            visible,
            visibleInput,
            submitTitle,
            ...toRefs(memoState),
        };



    },


});
</script>
<style scoped>
.mr-1 {
    margin-right: 5px;
}
.min-h-300{
    min-height: 500px;
}
</style>