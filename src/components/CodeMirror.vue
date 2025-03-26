<!--
 * @Author: panrunjun
 * @Date: 2024-09-11 19:02:16
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-03-17 20:19:06
 * @Description: 编辑器
 * @FilePath: \ytab-master\src\components\CodeMirror.vue
-->
<template>
    <Codemirror v-model="codeValue" :style="codeStyle" :extensions="extensions" @ready="handleReady" @change="onChange"
        @focus="onFocus" @blur="onBlur" v-bind="$attrs" />
</template>
<script setup lang="ts">
import type { CSSProperties } from 'vue';
import { ref, watchEffect } from 'vue';
import { Codemirror } from 'vue-codemirror';
import { vue } from '@codemirror/lang-vue';
import { oneDark } from '@codemirror/theme-one-dark';

interface Props {
    codeStyle?: CSSProperties // 代码样式
    dark?: boolean // 是否暗黑主题
    code?: string // 代码字符串
    // placeholder?: string // 占位文本
    // autofocus?: boolean // 自动聚焦
    // disabled?: boolean // 禁用输入行为和更改状态
    // indentWithTab?: boolean // 启用 tab 按键
    // tabSize?: number // tab 按键缩进空格数
    // autoDestroy?: boolean // 组件销毁时是否自动销毁代码编辑器实例
}
const props = withDefaults(defineProps<Props>(), {
    codeStyle: () => ({}),
    dark: false,
    code: ''
    // placeholder: 'Code goes here...',
    // autofocus: false,
    // disabled: false,
    // indentWithTab: true,
    // tabSize: 2
});
const extensions = props.dark ? [vue(), oneDark] : [vue()];
const codeValue = ref('');
watchEffect(() => {
    codeValue.value = props.code;
});
const emits = defineEmits(['update:code', 'ready', 'change', 'focus', 'blur']);
function handleReady(payload: any) {
    // console.log('ready')
    emits('ready', payload);
}
function onChange(value: string, viewUpdate: any) {
    emits('change', value, viewUpdate);
    emits('update:code', value);
}
function onBlur(viewUpdate: any) {
    emits('blur', viewUpdate);
}
</script>

<style scoped>
/* :deep(.cm-editor) {
    border-radius: 8px;
    outline: none;
    border: 1px solid transparent;

    .cm-scroller {
        border-radius: 8px;
    }
}

:deep(.cm-focused) {
    border: 1px solid fade(@themeColor, 48%);
} */
</style>