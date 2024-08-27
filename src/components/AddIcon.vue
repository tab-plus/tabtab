<!--
 * @Author: panrunjun
 * @Date: 2024-07-27 21:46:10
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-08-27 21:05:17
 * @Description: 添加快捷方式图标
 * @FilePath: \ytab-master\src\components\AddIcon.vue
-->
<template>
    <div class="body">
        <div class="box" v-for="item in iconList" :key="item.key">
            <div class="flex">
                <div class="icon">
                    <img style="height:70px;width:70px;border-radius: 20px;" :src="item.src" alt="">
                </div>
                <div style="width: 100%; margin: 0 10px">
                    <div class="flex justify-between">
                        <div class="title">{{ item.name }}</div>
                        <div><img style="height:20px;width:20px;" src="@/assets/link.png" alt=""></div>
                    </div>

                    <div class="content">{{ item.content }}</div>
                </div>
            </div>
            <a-button class="add" size="mini" @click="handleAdd(item)">添加</a-button>
        </div>
    </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { message } from 'ant-design-vue';
import { v4 as uuidv4 } from 'uuid';
import { get_allicon_list } from '@/api/icon';


export default defineComponent({

    emits: ['addNewWidget'], // 声明子组件可以触发的事件
    setup(props, { emit }: { emit: Function }) {
        const route = useRoute();
        const iconList = ref([
            {
                name: '百度',
                key: '3',
                src: 'https://www.baidu.com/favicon.ico',
                url: 'https://www.baidu.com',
                content: '全球领先的中文搜索引擎、致力于让网民更便捷地获取信息，找到所求。百度超过千亿的中文网页数据库，可以瞬间找到相关的搜索结果。'
            },
        ]);

        const handleAdd = (item: any) => {
            console.log(item);
            const routeName = route.name;
            const uniqueID = uuidv4();
            let data = {
                id: uniqueID,
                name: item.name,
                size: 4,
                iconId: item.id,
                type: 'icon',
                url: item.url,
                src: item.src
            }
            emit('addNewWidget', item.src, item.name, item.url, uniqueID);
            // 1. 获取存储的数组
            let garids = JSON.parse(localStorage.getItem(routeName as string)) || [];
            console.log(garids.icon);
            // 2. 修改数组（例如，添加新元素）
            garids.icon.push(data);
            // 3. 重新存储数组
            localStorage.setItem(routeName as string, JSON.stringify(garids));
            message.success(`添加成功`);
        }

        onMounted(() => {
            get_allicon_list().then(res => {
                iconList.value = res.data
            })
        })
        return {
            iconList,
            handleAdd
        }
    }
})


// 暴露组件的属性和事件
// defineExpose({ iconList, emits });


</script>

<style lang="scss" scoped>
.body {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    height: 500px;

}

.box {
    background-color: white;
    // display: flex;
    border-radius: 10px;
    height: 140px;
    margin: 10px;
    padding: 10px;
    flex: 0 0 calc(33.33% - 20px);
    /* 每个子元素宽度为33.33%，减去20px的固定间距 */
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
</style>