<!--
 * @Author: panrunjun
 * @Date: 2024-08-23 16:26:36
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-08-23 16:26:56
 * @Description: 二次封装通用modal
 * @FilePath: \ytab-master\src\components\GenericModal.vue
-->
<template>
    <a-modal
      :width="width"
      v-model:visible="visible"
      :footer="footer"
      :title="title"
      :closable="closable"
      @ok="handleOk"
    >
      <slot name="content"></slot>
    </a-modal>
  </template>
  
  <script setup lang="ts">
  import { defineProps, defineEmits } from 'vue'
  
  const props = defineProps({
    // 宽度
    width: {
      type: String,
      default: '60%'
    },
    // 是否显示
    visible: {
      type: Boolean,
      required: true
    },
    // 底部
    footer: {
      type: [String, Object],
      default: ''
    },
    // 标题
    title: {
      type: String,
      default: ''
    },
    // 是否显示关闭按钮
    closable: {
      type: Boolean,
      default: true
    },
    // 点击确定按钮方法
    onOk: {
      type: Function,
      default: () => {}
    }
  })
  
  const emit = defineEmits(['update:visible'])
  
  const handleOk = () => {
    props.onOk()
  }
  </script>
  