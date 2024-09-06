/*
 * @Author: panrunjun
 * @Date: 2024-07-22 21:46:02
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-09-06 17:12:29
 * @Description: 
 * @FilePath: \ytab-master\src\main.ts
 */
import { createApp } from 'vue'
import '@/styles/reset.css'
//import 'normalize.css/normalize.css' // A modern alternative to CSS resets //个人感觉reset不干净，比如input原生组件
import App from './App.vue'
const app = createApp(App);

import '@/styles/index.scss' // global css
import '@/styles/flex-class.css' // 引入flex快写样式


//pinia
import { createPinia } from 'pinia'
app.use(createPinia())

//antd
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import { message } from 'ant-design-vue';
app.use(Antd)
app.config.globalProperties.$message = message

//svg-icon
import 'virtual:svg-icons-register' //引入雪碧图注册脚本，到这里雪碧图已经生成
import svgIcon from '@/icons/SvgIcon.vue'
app.component('SvgIcon', svgIcon)

//antd-icon  //这里会极大变大打包文件
import AntdIcon from '@/icons/AntdIcon.vue'
app.component('AntdIcon', AntdIcon)

//router
import router from './router'

import './initAsyncRoutes'

//gridstack
import 'gridstack/dist/gridstack.min.css';
import 'gridstack/dist/h5/gridstack-dd-native';  // THEN to get HTML5 drag&drop
import { add_visit } from './api';

//analyze pic theme  这个工具暂时不用，太吃性能了
// import analyze from 'rgbaster'
// const result = await analyze('https://kodo.mboke.top/ytab/iyk7.mp4', { scale: 0.6 })
// console.log(result)


// 初始化获取登录状态
import { useUserStore } from '@/store/user';
const userStore = useUserStore();
userStore.INIT_USER();
const vm = app.use(router).mount('#app');

// 访问量加1
add_visit().then(res => {
    console.log(res)
})