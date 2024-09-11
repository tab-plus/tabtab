<!--
 * @Author: panrunjun
 * @Date: 2024-08-30 16:33:34
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-09-10 18:03:46
 * @Description: 日历组件
 * @FilePath: \ytab-master\src\components\home\CalendarModal.vue
-->
<template>
  <a-row>
    <a-col :span="16">
      <div class="calendar">
        <a-calendar v-model:value="selectDate" @select="onSelect" @panelChange="onPanelChange">
          <template #headerRender="{ value: current, type, onChange, onTypeChange }">
            <div style="padding: 10px">
              <!-- <div style="margin-bottom: 10px">Custom header</div> -->
              <a-row type="flex" justify="space-between">
                <a-col>
                  <a-radio-group size="small" :value="type" @change="e => onTypeChange(e.target.value)">
                    <a-radio-button value="month">Month</a-radio-button>
                    <a-radio-button value="year">Year</a-radio-button>
                  </a-radio-group>
                </a-col>
                <a-col>
                  <a-select size="small" :dropdown-match-select-width="false" class="my-year-select"
                    :value="String(current.year())" @change="newYear => {
                      onChange(current.year(+newYear));
                    }
                      ">
                    <a-select-option v-for="val in getYears(current)" :key="String(val)" class="year-item">
                      {{ val }}
                    </a-select-option>
                  </a-select>
                </a-col>
                <a-col>
                  <a-select size="small" :dropdown-match-select-width="false" :value="String(current.month())" @change="selectedMonth => {
                    onChange(current.month(parseInt(String(selectedMonth), 10)));
                  }
                    ">
                    <a-select-option v-for="(val, index) in getMonths(current)" :key="String(index)" class="month-item">
                      {{ val }}
                    </a-select-option>
                  </a-select>
                </a-col>
              </a-row>
            </div>
          </template>
          <template #dateCellRender="{ current }">
            <ul class="events">
              <li v-for="item in getListData(current)" :key="item.content">
                <a-badge status="error" :text="item.content" />
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
      </div>
    </a-col>
    <a-col :span="8">
      <div class="right">
        <div class="right-header">
          <div class="right-date">
            <div class="right-date-header">{{ selectYear }}年{{ selectMonth }}月</div>
            <div class="right-date-body">
              <div class="num">{{ selectDay }}</div>
              <div class="day">第205天 第30周</div>
              <div class="week">六月二十八</div>
            </div>
          </div>
        </div>
        <div class="right-bottom">
          <template v-for="(item, index) in selectedValue" :key="item.id">

            <div class="tab-pointer textBox">
              <div class="flex">
                <div class="number">{{ index + 1 }}</div>
                <span>{{ item.content }}</span>
              </div>
              <span class="deleteBox" @click="deleteText(item.id)"><minus-outlined /></span>
            </div>
            <a-divider />
          </template>
          <a-input v-show="showInput" @blur="handleBlur()" v-model:value="inputValue" placeholder="输出日志" />
          <div v-show="!showInput">
            <div class="number tab-pointer" @click="addValue()">
              <plus-outlined />
            </div>
          </div>
        </div>
      </div>
    </a-col>
  </a-row>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import dayjs, { Dayjs } from 'dayjs';
import { useUserStore } from '@/store/user';
import { v4 as uuidv4 } from 'uuid';
import {
  PlusOutlined,
  MinusOutlined
} from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { type } from 'os';
export default defineComponent({

  components: {
    PlusOutlined,
    MinusOutlined,
  },
  setup() {
    const selectDate = ref<Dayjs>();
    const selectYear = ref('');
    const selectMonth = ref('');
    const selectDay = ref('');
    const selectedValue = ref([]);
    const inputValue = ref('')
    const showInput = ref(false)
    const eventMap = ref({})
    /**
     * @description: 用于是否要选着push数据进selectValue，解决第二次不能修改slectValue数据的原因
     */
    const isPushSelect = ref(false);
    const onPanelChange = (value: Dayjs, mode: string) => {
      // console.log(value, mode, 222);
    };

    const getMonths = (value: Dayjs) => {
      const localeData = value.localeData();
      const months = [];
      for (let i = 0; i < 12; i++) {
        months.push(localeData.monthsShort(value.month(i)));
      }
      return months;
    };

    const getYears = (value: Dayjs) => {
      const year = value.year();
      const years = [];
      for (let i = year - 10; i < year + 10; i += 1) {
        years.push(i);
      }
      return years;
    };
    const getListData = (value: Dayjs) => {
      let listData = [];

      // 遍历年份、月份和日期
      for (const year in eventMap.value) {
        if (parseInt(year) === value.year()) { // 匹配年份
          const months = eventMap.value[year];
          for (const m in months) {
            if (parseInt(m) === value.month() + 1) { // 匹配月份
              const dates = months[m];
              for (const d in dates) {
                if (parseInt(d) === value.date()) { // 匹配日期
                  listData = dates[d];
                  break; // 退出日期循环
                }
              }
              break; // 退出月份循环
            }
          }
          break; // 退出年份循环
        }
      }
      return listData || [];
    };

    const getMonthData = (value: Dayjs) => {
      if (value.month() === 8) {
        return 1394;
      }
    };

    const onSelect = (value: Dayjs) => {
      selectDate.value = value;
      selectYear.value = value && value.format('YYYY')
      selectMonth.value = value && value.format('M')
      selectDay.value = value && value.format('DD')
      const data = getListData(value)
      // selectedValue.value = value;
      selectedValue.value = data
      const year = selectYear.value;
      const month = selectMonth.value;
      const date = selectDay.value;
      // 如果 eventMap 是 null 或 undefined，初始化为一个空对象

      if (!eventMap.value[year]) {
        eventMap.value[year] = {};
      }
      if (!eventMap.value[year][month]) {
        eventMap.value[year][month] = {};
      }

      if (!eventMap.value[year][month][date]) {
        eventMap.value[year][month][date] = [];
        isPushSelect.value = true;
      }
      else {
        isPushSelect.value = false;
      }

      // if (selectedValue.value.length === 0) {
      //   isPushSelect.value = true
      // } else {
      //   isPushSelect.value = false
      // }
    };

    const addValue = () => {
      showInput.value = true
    }
    /**
     * @description: 输入框失去焦点时
     */
    const handleBlur = () => {
      if (inputValue.value != '') {
        const uniqueID = uuidv4();
        // 要插入的数据
        const newEvent = { id: uniqueID, content: inputValue.value };

        // 插入数据
        const year = selectYear.value;
        const month = selectMonth.value;
        const date = selectDay.value;

        if (!eventMap.value[year]) {
          eventMap.value[year] = {};
        }
        if (!eventMap.value[year][month]) {
          eventMap.value[year][month] = {};
        }

        if (!eventMap.value[year][month][date]) {
          eventMap.value[year][month][date] = [];
        }

        eventMap.value[year][month][date].push(newEvent);
        // selectedValue.value.push(newEvent)
        if (isPushSelect.value) {
          selectedValue.value.push(newEvent)
        }

        inputValue.value = ''
      }
      showInput.value = false
    }

    /**
     * @description: 删除文本
     * @param {*} id
     */
    const deleteText = (id: string) => {
      let data = eventMap.value

      for (const year in data) {
        if (data.hasOwnProperty(year)) {
          for (const month in data[year]) {
            if (data[year].hasOwnProperty(month)) {
              for (const day in data[year][month]) {
                if (data[year][month].hasOwnProperty(day)) {
                  // 获取日期对应的数组
                  const items = data[year][month][day];
                  // 更新数组，删除匹配的项
                  data[year][month][day] = items.filter(item => item.id !== id);
                }
              }
            }
          }
        }
      }

      // 获取日期对应的数组
      const items = selectedValue.value;
      // 更新数组，删除匹配的项
      selectedValue.value = items.filter(item => item.id !== id);

      eventMap.value = data
     

    }


    // 页面挂载
    onMounted(() => {
      // eventMap.value = JSON.parse(localStorage.getItem('calendarData'));
      const calendarData = (localStorage.getItem('calendarData'))

      if (calendarData != "null") {
        eventMap.value = JSON.parse(calendarData)
      } else {
        eventMap.value = {}
      }
      selectYear.value = dayjs(new Date()).format('YYYY')
      selectMonth.value = dayjs(new Date()).format('M')
      selectDay.value = dayjs(new Date()).format('DD')
      const data = getListData(dayjs(new Date()))
      selectedValue.value = data
    })

    // 页面卸载
    onBeforeUnmount(() => {
      console.log('页面卸载', eventMap.value);
      localStorage.setItem('calendarData', JSON.stringify(eventMap.value))

    });

    return {
      selectDate,
      selectYear,
      selectMonth,
      selectDay,
      selectedValue,
      inputValue,
      showInput,
      handleBlur,
      addValue,
      getListData,
      getMonthData,
      onSelect,
      onPanelChange,
      getMonths,
      getYears,
      deleteText,
    };
  },
});
</script>
<style scoped lang="scss">
.calendar {
  height: 100%;
}

.right {
  height: 100%;
  background-color: #f5f5f5;
}

.right-header {
  display: flex;
  justify-content: center;
}

.right-date {
  height: 150px;
  width: 150px;
  margin: 20px;
  background-color: white;
  border-radius: 20px;
}


.right-date-header {
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: #ff5a5d;
  color: white;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  // height: 40px;
}

.right-date-body {
  color: black;
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.num {
  font-size: 40px;
  font-weight: bold;
}

.day {
  font-size: 10px;
  color: gray;
}

.week {
  font-size: 14px;

}

.right-bottom {
  margin: 10px;
}

.ant-divider-horizontal {
  margin: 5px;
}


.number {
  background-color: #2395ff;
  min-height: 18px;
  min-width: 18px;
  border-radius: 4px;
  display: inline-block;
  line-height: 18px;
  text-align: center;
  font-size: 12px;
  color: white;
  margin: 0 5px;
}

.textBox {
  display: flex;
  justify-content: space-between;
  margin: 0 5px 0 0;
}

.textBox:hover .deleteBox {
  display: flex;
}

.deleteBox {
  display: none;
  justify-content: center;
  align-content: center;
  height: 18px;
  width: 18px;
  background-color: #ff5a5d;
  border-radius: 50%;
  line-height: 18px;
  font-size: 20px;
  color: white;
}

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

.ant-picker-calendar-full::v-deep .ant-picker-panel .ant-picker-calendar-date-content {
  max-height: 56px;
}
</style>
  