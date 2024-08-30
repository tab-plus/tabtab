<!--
 * @Author: panrunjun
 * @Date: 2024-08-30 16:33:34
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-08-30 16:33:59
 * @Description: canlendar组件
 * @FilePath: \ytab-master\src\components\home\CalendarModal.vue
-->
<template>
    <a-calendar v-model:value="value">
      <template #dateCellRender="{ current }">
        <ul class="events">
          <li v-for="item in getListData(current)" :key="item.content">
            <a-badge :status="item.type" :text="item.content" />
          </li>
        </ul>
      </template>
      <template #monthCellRender="{ current }">
        <div v-if="getMonthData(current)" class="notes-month">
          <section>{{ getMonthData(current) }}</section>
          <span>Backlog number</span>
        </div>
      </template>
    </a-calendar>
  </template>
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { Dayjs } from 'dayjs';
  
  export default defineComponent({
    setup() {
      const value = ref<Dayjs>();
  
      const getListData = (value: Dayjs) => {
        let listData;
        switch (value.date()) {
          case 8:
            listData = [
              { type: 'warning', content: 'This is warning event.' },
              { type: 'success', content: 'This is usual event.' },
            ];
            break;
          case 10:
            listData = [
              { type: 'warning', content: 'This is warning event.' },
              { type: 'success', content: 'This is usual event.' },
              { type: 'error', content: 'This is error event.' },
            ];
            break;
          case 15:
            listData = [
              { type: 'warning', content: 'This is warning event' },
              { type: 'success', content: 'This is very long usual event。。....' },
              { type: 'error', content: 'This is error event 1.' },
              { type: 'error', content: 'This is error event 2.' },
              { type: 'error', content: 'This is error event 3.' },
              { type: 'error', content: 'This is error event 4.' },
            ];
            break;
          default:
        }
        return listData || [];
      };
  
      const getMonthData = (value: Dayjs) => {
        if (value.month() === 8) {
          return 1394;
        }
      };
  
      return {
        value,
        getListData,
        getMonthData,
      };
    },
  });
  </script>
  <style scoped>
  .events {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .events .ant-badge-status {
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
    text-overflow: ellipsis;
    font-size: 12px;
  }
  .notes-month {
    text-align: center;
    font-size: 28px;
  }
  .notes-month section {
    font-size: 28px;
  }
  </style>
  