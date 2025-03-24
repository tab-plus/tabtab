<!--
 * @Author: panrunjun
 * @Date: 2024-08-30 11:24:22
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-03-18 10:57:21
 * @Description: 
 * @FilePath: \ytab-master\src\views\test.vue
-->
<template>
  <el-card>
    <div style="display: flex;">
      <!-- <div>
        <CodeMirror v-model:code="code" dark :codeStyle="{
          width: '500px', height: '500px', borderTopLeftRadius: '4px', borderBottomLeftRadius: '4px',
        }" @change="compileVueCode" />
      </div> -->
      <!-- 使用 iframe 实现安全沙箱预览 -->
      <!-- <div style="width: 500px;">
        <div ref="previewContainer" class="preview-container">
        </div>
      </div> -->
    <Repl :editor="CodeMirror" style="height: 500px;width: 1000px;"/>

    </div>

  </el-card>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watchEffect, defineComponent, h, render } from 'vue';
// import CodeMirror from '@/components/CodeMirror.vue';
import { Repl } from '@vue/repl'
import CodeMirror from '@vue/repl/codemirror-editor'
</script>

<style>

</style>
