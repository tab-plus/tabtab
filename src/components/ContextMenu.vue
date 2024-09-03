<!--
 * @Author: panrunjun
 * @Date: 2024-08-30 09:38:24
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-09-03 14:43:50
 * @Description: 公共组件（右键弹窗，传入菜单项，点击菜单项，返回数据）
 * @FilePath: \ytab-master\src\components\ContextMenu.vue
-->
<template>
    <div ref="containerRef">
        <!-- 定义插槽，传递的内容就要显示在插槽之中 -->
        <slot></slot>
        <!-- 通过 Teleport 将菜单传送到 body 中  -->
        <Teleport to="body">
            <!-- 设置一个 div 用来显示菜单 -->
            <div v-if="showMenu" class="context-menu" :style="{ left: x + 'px', top: y + 'px' }">
                <div class="menu-list">
                    <!-- 循环遍历菜单项，显示出来 -->
                    <template v-for="(item) in menu" :key="item.label">
                        <div class="menu-item" @click="handleClick(item)">
                            {{ item.label }}
                        </div>
                    </template>
                </div>
            </div>
        </Teleport>
    </div>
</template>
  
<script setup lang="ts">
import useContextMenu from '@/hooks/useContextMenu';
const props = defineProps({
    // 接收传递进来的菜单项
    menu: {
        type: Array,
        default: () => [],
    },
});
const containerRef = ref(null);
// 声明一个事件，选中菜单项的时候返回数据
const emit = defineEmits(['select']);
//获取弹窗位置
const { x, y, showMenu } = useContextMenu(containerRef);
console.log(x, y, showMenu);
// 定义handleClick方法
const handleClick = (item: any) => {
    console.log('点击了:', item);
    // 选中菜单后关闭菜单
    showMenu.value = false;
    // 并返回选中的菜单
    emit('select', item);
};
</script>

<style scoped>
.context-menu {
    position: absolute;
    /* height: 100px; */
    min-width: 90px;
    /* 黑色背景，70% 透明度 */
    background: rgba(0, 0, 0, 0.7);
    border-radius: 4px;
    /* 边框阴影 */
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    overflow: hidden;
    color: white;
    z-index: 9999;
}

.menu-list {
    cursor: pointer;
    margin: 5px;
}

.menu-item {
    border-radius: 4px;
    display: flex;
    align-content: center;
    justify-content: center;
    padding: 5px 10px;
}

.menu-item:hover{
    background: rgba(0, 0, 0, 0.3);
}
</style>
  