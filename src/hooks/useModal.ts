/*
 * @Author: panrunjun
 * @Date: 2024-08-15 13:03:25
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-08-15 18:00:35
 * @Description: 弹窗hook函数
 * @FilePath: \ytab-master\src\hooks\useModal.ts
 */
// useModal.ts
// src/composables/useModal.ts
import { ref } from 'vue';

export function useModal() {
    const isVisible = ref<boolean>(false);

    const open = () => {
        console.log(222)
        isVisible.value = true;
    };

    const close = () => {
        isVisible.value = false;
    };

    return {
        isVisible,
        open,
        close,
    };
}

