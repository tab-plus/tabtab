
<template>
    <a-layout>
        <a-layout-sider class="min-h-300" :style="{ overflow: 'auto' }" v-model:collapsed="collapsed" theme="light">
            <a-menu v-model:selectedKeys="selectedKeys" mode="inline">
                <template v-for="item in memoMenuList" :key="item.id">
                    <a-menu-item @contextmenu.prevent="$event.preventDefault();">
                        <span class="mr-1" v-show="!showInput">{{ item.title }}</span>
                    </a-menu-item>
                </template>
            </a-menu>
        </a-layout-sider>
        <a-layout>
            <template v-for="item in memoMenuList" :key="item.id">
                <div v-if="selectedKeys.includes(item.id)">
                    <div v-for="(item2, index) in item.list" :key="index">
                        <div style="display: flex;justify-content: space-between;margin-right: 20px;">
                            <div class="Box">
                                <div class="number" :style="getBackgroundColor(index)">{{ index + 1 }}</div>
                                <a class="name" :href="item2.url" target="_blank">
                                    {{ item2.name }}
                                </a>
                            </div>
                            <div>{{ item2.hot }}</div>
                        </div>
                    </div>
                </div>
            </template>
        </a-layout>
    </a-layout>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, toRefs, ref } from 'vue';
import { EditTwoTone, DeleteOutlined, FormOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import {
} from '@ant-design/icons-vue';
import axios from 'axios';
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
        const memoMenuList = ref([
            { id: 0, title: '百度', list: <Array<any>>[] },
            { id: 1, title: '知乎', list: [] },
            { id: 2, title: '微博', list: [] },
        ]);
        const visible = ref(false);
        const visibleInput = ref('');
        onMounted(() => {
            getList()
        })

        // 获取数据
        async function getList() {
            let baidu = await axios.get('https://tenapi.cn/v2/baiduhot');
            memoMenuList.value[0].list = baidu.data.data;
            let zhihu = await axios.get('https://tenapi.cn/v2/zhihuhot');
            memoMenuList.value[1].list = zhihu.data.data;
            let weibo = await axios.get('https://tenapi.cn/v2/weibohot');
            memoMenuList.value[2].list = weibo.data.data;
        }

        // 定义一个方法，根据 ID 返回不同的背景颜色
        const getBackgroundColor = (id) => {
            const colors = {
                0: '#fe2d46',
                1: '#f60',
                2: '#faa90e',
                // 你可以根据需要添加更多颜色
            };

            return {
                backgroundColor: colors[id] || '#f0f1f4', // 默认为白色
            };
        }

        return {
            memoMenuList,
            inputValue,
            showInput,
            visible,
            visibleInput,
            ...toRefs(memoState),
            getBackgroundColor,
        };



    },


});
</script>
<style scoped>
.mr-1 {
    margin-right: 5px;
}


.min-h-300 {
    min-height: 500px;
}

.Box {
    display: flex;
    align-items: center;
}

.name {
    font-size: 20px;
    margin: 5px;
}

.number {
    min-height: 18px;
    min-width: 18px;
    border-radius: 4px;
    display: inline-block;
    line-height: 18px;
    text-align: center;
    font-size: 12px;
    color: white;
    margin: 0 5px;
}

.ant-layout {
    background: white;
}
</style>