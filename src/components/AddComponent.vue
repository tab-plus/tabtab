<!--
 * @Author: panrunjun
 * @Date: 2024-07-27 22:58:42
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-08-21 19:16:11
 * @Description: 添加小组件
 * @FilePath: \ytab-master\src\components\AddComponent.vue
-->
<template>
    <div class="body">
        <div class="memoComponent boxShadow" @click="addComponent('备忘录')">
            <div class="memoItemHeader">备忘录</div>
            <div class="cl-ant-p sg-omit-sm text-white-sm memoItemBody">备忘录</div>
        </div>
        <div class="dateComponent boxShadow" @click="addComponent('日历')">
            <div class="dateItemHeader">2024/7</div>
            <div class="dateItemBody">
                <div class="num">23</div>
                <div class="day">第205天 第30周</div>
                <div class="week">六月二十八 周二</div>
            </div>

        </div>

        <div class="hotSearchComponent boxShadow" @click="addComponent('热搜')">
            <div class="tab-container">
                <div class="tab" add-data-tab="add-tab1">百度</div>
                <div class="tab" add-data-tab="add-tab2">知乎</div>
                <div class="tab" add-data-tab="add-tab3">微博</div>
            </div>
            <div class="tab-content">
                <div class="add-tab-pane" id="add-tab1">暂无数据</div>
                <div class="add-tab-pane" id="add-tab2">暂无数据</div>
                <div class="add-tab-pane" id="add-tab3">暂无数据</div>
            </div>
        </div>


        <div class="weatherComponent boxShadow" @click="addComponent('天气')">
            <div class="flex justify-between">
                <div>
                    <div class="flex">
                        <div class="place">{{ city }}</div>
                        <div></div>
                    </div>
                    <div class="temperature">{{ weather.temp }}&deg;C</div>
                </div>
                <div>
                    <img class="weatherIcon" src="https://files.codelife.cc/itab/weather/icon/104-fill.svg" />
                    <div>{{ weather.text }}</div>
                </div>
            </div>
            <div class="aqi">{{ weather.windDir }}</div>
            <div class="high">相对湿度:{{ weather.humidity }}，能见度:{{ weather.vis }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { add_icon_ByUserId } from '@/api/icon';
import { message } from 'ant-design-vue';
import { v4 as uuidv4 } from 'uuid';
const route = useRoute();
const weather = ref<any>()
const city = ref<string>()
weather.value = JSON.parse(localStorage.getItem('weather'))
city.value = localStorage.getItem('city')
// 定义可以触发的事件
const emits = defineEmits(['addNewWidget']);
const addComponent = (name: string) => {
    const uniqueID = uuidv4();
    message.success(`添加成功`);
    let data = {
        id: uniqueID,
        name,
        size: 4,
        type: 'component'

    }
    // 1. 获取存储的数组
    let garids = JSON.parse(localStorage.getItem(route.name as string)) || [];
    console.log(garids.icon);
    // 2. 修改数组（例如，添加新元素）
    garids.icon.push(data);
    // 3. 重新存储数组
    localStorage.setItem(route.name as string, JSON.stringify(garids));
    emits('addNewWidget', data);
}
onMounted(() => {
    // 热搜
    const hotSearchElement = document.querySelector('.hotSearchItem');
    // hotSearchElement!.addEventListener('click', hotSearchClick);
    // 获取所有的tab元素
    const tabs = document.querySelectorAll('.tab');
    // 获取所有的tab内容元素
    const tabContents = document.querySelectorAll('.add-tab-pane');
    // 默认显示第一个tab的内容
    tabContents[0].classList.add('active');
    // 为每个tab添加悬浮事件监听
    tabs.forEach(tab => {
        tab.addEventListener('mouseover', () => {
            const tabId = tab.getAttribute('add-data-tab');

            // 隐藏所有tab内容
            tabContents.forEach(content => {
                content.classList.remove('active');
            });

            // 显示对应的tab内容
            const activeContent = document.getElementById(tabId!);
            activeContent!.classList.add('active');
        });
    });
})

</script>

<style scoped lang="scss">
.body {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    height: 500px;
    padding: 10px;
}



.memoComponent {
    border-radius: 20px;
    background-color: white;
    height: 200px;
    flex: 0 0 calc(33.33% - 20px);
    transition: box-shadow 0.3s, background-color 0.3s;
    cursor: pointer;
}




.dateComponent {
    border-radius: 20px;
    background-color: white;
    display: flex;
    flex-direction: column;
    height: 200px;
    // width: 200px;
    flex: 0 0 calc(33.33% - 20px);
    transition: box-shadow 0.3s, background-color 0.3s;
    cursor: pointer;
}


/* 热搜 */
.hotSearchComponent {
    border-radius: 20px;
    background: linear-gradient(45deg, #5d616b, #8a94a7);
    height: 200px;
    flex: 0 0 calc(33.33% - 20px);
    transition: box-shadow 0.3s, background-color 0.3s;
    cursor: pointer;
}



.add-tab-pane {
    display: none;
}

.add-tab-pane.active {
    display: block;
}

/* end 热搜 */


.weatherComponent {
    border-radius: 20px;
    background: linear-gradient(45deg, #354564, #7f90ad);
    display: flex;
    height: 200px;
    flex-wrap: nowrap;
    flex-direction: column;
    color: white;
    padding: 20px 30px;
    flex: 0 0 calc(33.33% - 20px);
    transition: box-shadow 0.3s, background-color 0.3s;
    cursor: pointer;
}

.boxShadow:hover {
    box-shadow: 0 0 10px 4px rgba(0, 0, 0, 0.2);
    /* 外扩的阴影效果 */
}



.temperature {
    font-size: 25px;
    font-weight: 800;
}

.high,
.aqi {
    display: flex;
}

.aqi {
    margin-top: 45px;
}

.weatherIcon {
    width: 30px;
    height: 30px;
}
</style>