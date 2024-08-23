/*
 * @Author: panrunjun
 * @Date: 2024-08-15 14:32:08
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-08-15 14:52:14
 * @Description: 管理多个modal在同一个文件中，传递id标识管理
 * @FilePath: \ytab-master\src\hooks\useModals.ts
 */
// useModals.ts
import { ref } from 'vue';

// 传递一个标识符以管理不同的模态框
export function useModals(id: string) {
    const modals = new Map<string, boolean>();

    // 初始化状态
    if (!modals.has(id)) {
        modals.set(id, false);
    }

    const isVisible = ref<boolean>(modals.get(id)!);

    const open = () => {
        modals.set(id, true);
        console.log(id)
        isVisible.value = true;
    };

    const close = () => {
        modals.set(id, false);
        isVisible.value = false;
    };

    const toggle = () => {
        const newValue = !isVisible.value;
        modals.set(id, newValue);
        isVisible.value = newValue;
    };

    return {
        isVisible,
        open,
        close,
        toggle
    };
}
