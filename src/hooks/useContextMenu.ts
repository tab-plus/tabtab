/*
 * @Author: panrunjun
 * @Date: 2024-08-30 10:16:40
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-08-30 10:26:33
 * @Description: 获取右键弹窗的位置和状态
 * @FilePath: \ytab-master\src\hooks\useContextMenu.ts
 */
import { onMounted, onUnmounted, ref } from "vue";
export default function (containerRef) {
    const showMenu = ref(false);//是否显示右键菜单
    const x = ref(0);
    const y = ref(0);

    // 事件处理函数
    const handleContextMenu = (e) => {
        e.preventDefault(); // 阻止浏览器的默认行为
        e.stopPropagation(); // 阻止冒泡
        showMenu.value = true;//设置菜单显示
        x.value = e.clientX;//设置菜单位置
        y.value = e.clientY;
        console.log("x y >>> ", e.clientX, e.clientY);
    };
    // 注册一个事件函数用来关闭菜单
    function closeMenu() {
        showMenu.value = false;
    };
    onMounted(() => {
        // 监听事件
        const div = containerRef.value;
        // 将事件处理函数传递传入事件中
        div.addEventListener("contextmenu", handleContextMenu);
        // 第三个参数设置为 true 表示事件句柄在捕获阶段执行,防止有人在外层设置了阻止冒泡
        // 触发 window 点击事件的时候执行函数，关闭现有的菜单
        window.addEventListener("click", closeMenu, true);
        // 处理 window 的 contextmenu 事件，用来关闭之前打开的菜单
        window.addEventListener("contextmenu", closeMenu, true);
    });
    onUnmounted(() => {
        // 清除所有事件
        const div = containerRef.value;
        div.removeEventListener("contextmenu", handleContextMenu);
        window.removeEventListener("click", closeMenu, true);
        window.removeEventListener("contextmenu", closeMenu, true);
    });
    return {
        showMenu,
        x,
        y,
    };
}
