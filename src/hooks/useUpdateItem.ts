import dayjs from 'dayjs'
import { memoModal, calendarModal, hotModal, weatherModal } from '@/views/home/index.vue'
export default function useUpdateItem() {
    const route = useRoute();
    // 获取当前日期
    interface UpdateItemSize {
        id: string;
        size: number;
    }
    interface UpdateItemPlace {
        id: string;
        x: number;
        y: number;
    }
    // 修改元素大小
    function updateItemSize(options: UpdateItemSize) {
        const { id, size } = options;
        let garids = JSON.parse(localStorage.getItem(route.name as string)) || [];
        console.log(garids.icon);
        // 2. 修改数组
        const index = garids.icon.findIndex(item => item.id === id);
        garids.icon[index].size = size;
        // 3. 重新存储数组
        localStorage.setItem(route.name as string, JSON.stringify(garids));
    }

    function updateItemPlace(options: UpdateItemPlace) {
        const { id, x, y } = options;
        let garids = JSON.parse(localStorage.getItem(route.name as string)) || [];
        console.log(garids.icon);
        // 2. 修改数组
        const index = garids.icon.findIndex(item => item.id === id);
        garids.icon[index].x = x;
        garids.icon[index].y = y;
        // 3. 重新存储数组
        localStorage.setItem(route.name as string, JSON.stringify(garids));
    }


    function changeMemo1(clickedItem: any, grid: any) {
        const el = `
            <div class="grid-stack-item">
                <div class="memoItem">
                    <div calss="memoItemOne">
                        <div class="grid-stack-item-content flex flex-direction justify-around align-center">
                        <div class="memoItemOne-bgColor">
                            备忘录
                        </div>
                        <p class="cl-ant-p sg-omit-sm text-white-sm">备忘录</p>
                        </div>
                    </div>
                </div>
            </div>
            `
        grid.addWidget(el, { id: clickedItem.id, x: clickedItem.x, y: clickedItem.y, w: 1, h: 2 });
        const memoItem = document.querySelector('.memoItem');
        if (memoItem) {
            memoItem.addEventListener('click', memoModal.open);
        }
        updateItemSize({ id: clickedItem.id, size: 1 })
    }
    function changeMemo4(arr: Array<string>, clickedItem: any, grid: any) {
        const items = arr.map(item => `<div class="cl-ant-p sg-omit-sm text-white-sm memoItemBody">${item}</div>`).join('');
        const el = `
    <div class="grid-stack-item" >
      <div class="grid-stack-item-content">
        <div class="memoItem memoItem-bgColor" >
        <div class="memoItemHeader">备忘录</div>
        ${items}
        </div>
      </div>
    </div>
  `
        grid.addWidget(el, { id: clickedItem.id, x: clickedItem.x, y: clickedItem.y, w: 2, h: 4 });
        const memoItem = document.querySelector('.memoItem');
        if (memoItem) {
            memoItem.addEventListener('click', memoModal.open);
        }
        updateItemSize({ id: clickedItem.id, size: 4 })
    }

    function changeDate1(dayOfWeekText: any, clickedItem: any, grid: any) {
        const el = `
        <div class="grid-stack-item">
            <div class="dateItem">
                <div class="grid-stack-item-content flex flex-direction justify-around align-center">
                <div class="oneBackground">
                    <div class="oneWeek">${dayOfWeekText}</div>
                    <div class="day">${dayjs(new Date()).format('DD')}</div>
                </div>
                <p class="cl-ant-p sg-omit-sm text-white-sm">日历</p>
                </div>
            </div>
        </div>
        `
        grid.addWidget(el, { id: clickedItem.id, x: clickedItem.x, y: clickedItem.y, w: 1, h: 2 });
        const dateItem = document.querySelector('.dateItem');
        if (dateItem) {
            dateItem.addEventListener('click', calendarModal.open);
        }
        // 调用后端方法update数据
        updateItemSize({ id: clickedItem.id, size: 1 })
    }
    function changeDate4(dayOfWeekText: any, clickedItem: any, grid: any) {
        const el = `
            <div class="grid-stack-item">
            <div class="grid-stack-item-content">
                <div class="dateItem">
                <div class="dataItemFour">
                    <div class="dateItemHeader">${dayjs(new Date()).format('YYYY年M月')}</div>
                    <div class="dateItemBody" >
                    <div class="num">${dayjs(new Date()).format('DD')}</div>
                    <div class="day">第205天 第30周</div> 
                    <div class="week">六月二十八 ${dayOfWeekText}</div>    
                    </div>  
                </div>
                </div> 
            </div>
            </div>
        `
        grid.addWidget(el, { id: clickedItem.id, x: clickedItem.x, y: clickedItem.y, w: 2, h: 4 });
        const dateItem = document.querySelector('.dateItem');
        if (dateItem) {
            dateItem.addEventListener('click', calendarModal.open);
        }
        // 调用后端方法update数据
        updateItemSize({ id: clickedItem.id, size: 4 })
    }


    function changeHot1(clickedItem: any, grid: any) {
        const el = `
        <div class="grid-stack-item">
            <div class="hotSearchItem">
                    <div class="grid-stack-item-content flex flex-direction justify-around align-center">
                        <img src="https://files.codelife.cc/icons/topsearch.svg" style="width: 60px; height: 60px; border-radius: 15px;" class="shadow-md  hotSearchItem-bgColor" />
                        <p class="cl-ant-p sg-omit-sm text-white-sm">热搜</p>
                    </div>
                </div>
            </div>
        </div>
      `
        grid.addWidget(el, { id: clickedItem.id, x: clickedItem.x, y: clickedItem.y, w: 1, h: 2 });

        // 元素插入后再添加事件监听器
        const hotSearchItem = document.querySelector('.hotSearchItem');
        if (hotSearchItem) {
            hotSearchItem.addEventListener('click', hotModal.open);
        }
        updateItemSize({ id: clickedItem.id, size: 1 })
    }

    function changeHot4(clickedItem: any, grid: any, baiduHotList: any, zhihuHotList: any, weiboHotList: any) {
        const baiduItems = baiduHotList.value && baiduHotList.value.length > 0
            ? baiduHotList.value.map((item: any) =>
                `<div class="cl-ant-p sg-omit-sm text-white-sm tab-pane-item" target="_blank" rel="noopener noreferrer"><a target="_blank" href="${item.url}">${item.name}</a></div>`
            ).join('')
            : '<div class="text-white-sm">暂无数据</div>';

        const zhihuItems = zhihuHotList.value && zhihuHotList.value.length > 0
            ? zhihuHotList.value.map((item: any) =>
                `<div class="cl-ant-p sg-omit-sm text-white-sm tab-pane-item" target="_blank" rel="noopener noreferrer"><a target="_blank" href="${item.url}">${item.name}</a></div>`
            ).join('')
            : '<div class="text-white-sm">暂无数据</div>';

        const weiboItems = weiboHotList.value && weiboHotList.value.length > 0
            ? weiboHotList.value.map((item: any) =>
                `<div class="cl-ant-p sg-omit-sm text-white-sm tab-pane-item" target="_blank" rel="noopener noreferrer"><a target="_blank" href="${item.url}">${item.name}</a></div>`
            ).join('')
            : '<div class="text-white-sm">暂无数据</div>';

        const el = `
            <div class="grid-stack-item">
              <div class="grid-stack-item-content">
                <div class="hotSearchItem hotSearchItem-bgColor" >
                    <div class="tab-container">
                      <div class="tab" data-tab="tab1">百度</div>
                      <div class="tab" data-tab="tab2">知乎</div>
                      <div class="tab" data-tab="tab3">微博</div>
                    </div>
                    <div class="tab-content">
                      <div class="tab-pane" id="tab1">
                        ${baiduItems}
                      </div>
                      <div class="tab-pane" id="tab2">
                        ${zhihuItems}
                      </div>
                      <div class="tab-pane" id="tab3">
                        ${weiboItems}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          `
        grid.addWidget(el, { id: clickedItem.id, x: clickedItem.x, y: clickedItem.y, w: 2, h: 4 });
        // 调用后端方法update数据
        updateItemSize({ id: clickedItem.id, size: 4 })
    }

    function changeWeather1(clickedItem: any, grid: any) {
        const el = `
        <div class="grid-stack-item">
            <div class="weatherItem">
                    <div class="grid-stack-item-content flex flex-direction justify-around align-center">
                        <img src="https://files.codelife.cc/itab/weather/icon/104-fill.svg" style="width: 60px; height: 60px; border-radius: 15px;" class="shadow-md " />
                        <p class="cl-ant-p sg-omit-sm text-white-sm">天气</p>
                    </div>
                </div>
            </div>
        </div>
      `
        grid.addWidget(el, { id: clickedItem.id, x: clickedItem.x, y: clickedItem.y, w: 1, h: 2 });
        const weatherElements = document.querySelectorAll('.weatherItem'); // 选择所有匹配的元素
        if (weatherElements) {
          weatherElements.forEach(weatherElement => {
            // 为每个元素添加点击事件监听器
            weatherElement.addEventListener('click', weatherModal.open);
          });
        }
        // 调用后端方法update数据
        updateItemSize({ id: clickedItem.id, size: 1 })
    }
    function changeWeather4(clickedItem: any, grid: any) {
       let city =  localStorage.getItem('city')
       let weather = JSON.parse(localStorage.getItem('weather'))
        const el = `
        <div class="grid-stack-item">
          <div class="grid-stack-item-content">
                <div class="weatherItem weatherItemFour bg-weather" >
                <div class="flex justify-between">
                <div>
                    <div class="flex">
                    <div class="place">${city}</div>
                    <div></div>
                    </div>
                    <div class="temperature">${weather.temp}&deg;C</div>
                </div>
                <div >
                    <img class="weatherIcon" src="https://files.codelife.cc/itab/weather/icon/104-fill.svg"></img>
                    <div>${weather.text}</div>
                </div>
                </div>
                <div class="aqi">${weather.windDir}</div>
                <div class="high">相对湿度:${weather.humidity }，能见度:${weather.vis}</div>
            </div>
          </div>
        </div>
      `
        grid.addWidget(el, { id: clickedItem.id, x: clickedItem.x, y: clickedItem.y, w: 2, h: 4 });
        const weatherElements = document.querySelectorAll('.weatherItem'); // 选择所有匹配的元素
        if (weatherElements) {
          weatherElements.forEach(weatherElement => {
            // 为每个元素添加点击事件监听器
            weatherElement.addEventListener('click', weatherModal.open);
          });
        }
        // 调用后端方法update数据
        updateItemSize({ id: clickedItem.id, size: 4 })
    }


    return {
        updateItemSize,
        updateItemPlace,
        changeWeather4,
        changeWeather1,
        changeHot4,
        changeHot1,
        changeDate4,
        changeDate1,
        changeMemo4,
        changeMemo1,
    };
}
