<!--
 * @Author: panrunjun
 * @Date: 2024-07-22 21:46:02
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-09-10 15:18:50
 * @Description: 
 * @FilePath: \ytab-master\src\views\home\index.vue
-->
<template>
  <!-- 登录弹窗 -->
  <a-drawer v-model:visible="loginVisible" class="custom-class" title="登录" placement="right">
    <Login @closeLogin="() => { loginVisible = false; }"></Login>
  </a-drawer>
  <a-dropdown :trigger="['contextmenu']">
    <div class="ya-matter flex flex-direction align-center">

      <!-- 登录头像 -->
      <div class="loginIcon" @click="loginVisible = true">
        <img style="height: 50px;" src="@/assets/user.png" alt="" />
      </div>

      <!-- 头部 -->
      <header class="flex justify-center align-center flex-direction">
        <div class="time" @click="clickTime()">
          <div class="hour">{{ dayjs(new Date()).format('HH:mm') }}</div>
          <div class="footer">
            <div>{{ dayjs(new Date()).format('YYYY-MM-DD') }} {{ dayOfWeekText }}</div>
          </div>
        </div>
        <SearchEngine class="se" />
      </header>

      <!-- 主要内容 -->
      <main v-show="haveIcon">
        <section class="grid-stack beautiful-sm-scroll"></section>
      </main>
      <!-- 日历 -->
      <a-modal :destroyOnClose="true" width="1200px" height="500px" v-model:visible="calendarModal.isVisible.value" footer="" title="日历" closable
        @ok="() => { calendarModal.open() }">
        <!-- <a-calendar v-model:value="calendarValue" :fullscreen="false" @panelChange="onPanelChange" /> -->
        <CalendarModal></CalendarModal>
      </a-modal>

      <!-- <GenericModal v-model:visible="calendarModal.isVisible.value" title="日历" @ok="() => { calendarModal.open() }">
      </GenericModal> -->

      <!-- 备忘录 -->
      <a-modal width="60%" v-model:visible="memoModal.isVisible.value" footer="" title="备忘录" closable
        @ok="() => { memoModal.open() }">
        <MemoModal></MemoModal>
      </a-modal>

      <!-- 天气 -->
      <a-modal width="60%" v-model:visible="weatherModal.isVisible.value" footer="" title="天气" closable
        @ok="() => { weatherModal.open() }">
        <WeatherModal></WeatherModal>

      </a-modal>

      <!-- 添加图标 -->
      <a-modal width="60%" v-model:visible="iconVisible" footer="" title="添加组件" closable
        @ok="() => { iconVisible = false; }">
        <a-layout>
          <a-layout-sider :style="{ overflow: 'auto' }" v-model:collapsed="collapsed" theme="light">
            <a-menu v-model:selectedKeys="selectedKeys" mode="inline">
              <template v-for="item in iconMenuList" :key="item.key">
                <a-menu-item>
                  <pie-chart-outlined />
                  <span>{{ item.title }}</span>
                </a-menu-item>
              </template>
            </a-menu>
          </a-layout-sider>
          <!-- <a-button type="primary" @click="addMemoMenu()"
            style="position:absolute;bottom: 0;left: 0;margin:10px;">+</a-button> -->
          <a-layout>
            <div v-if="selectedKeys.includes('1')">
              <AddIcon @addNewWidget="addComponent"></AddIcon>
            </div>
            <div v-if="selectedKeys.includes('2')">
              <AddComponent @addNewWidget="addComponent"></AddComponent>
            </div>
            <div v-if="selectedKeys.includes('3')">
              <AddCustomize @addNewWidget="addComponent"></AddCustomize>
            </div>
          </a-layout>
        </a-layout>
      </a-modal>

      <!-- 热搜 -->
      <a-modal width="60%" v-model:visible="hotModal.isVisible.value" footer="" title="热搜" closable
        @ok="() => { hotModal.open() }">
        <HotModal></HotModal>
      </a-modal>


      <!-- 图库 -->
      <a-modal width="60%" v-model:visible="pictureModal.isVisible.value" footer="" title="图库" closable
        @ok="() => { pictureModal.open() }">
        <PictureModal @go-login="goLogin"></PictureModal>
      </a-modal>

    </div>
    <template #overlay>
      <a-menu>
        <a-menu-item key="1" @click="changeBgImg();">
          <AntdIcon :name="'SwapOutlined'" :style="'font-size: 14px'" />
          切换壁纸
        </a-menu-item>
        <a-menu-item key="2" @click="iconVisible = true;">
          <AntdIcon :name="'PlusOutlined'" :style="'font-size: 14px'" />
          添加图标或组件
        </a-menu-item>
        <a-menu-item key="3">
          <a-upload name="file" :show-upload-list="false" v-model:file-list="fileList" :max-count="1"
            :before-upload="beforeUpload">
            <AntdIcon :name="'DownloadOutlined'" :style="'font-size: 14px'" /> 导入
          </a-upload>
        </a-menu-item>
        <a-menu-item key="4" @click="exportJSON()">
          <AntdIcon :name="'UploadOutlined'" :style="'font-size: 14px'" /> 导出
        </a-menu-item>
        <a-menu-item key="5" @click="importCloudJSON()">
          <AntdIcon :name="'DownloadOutlined'" :style="'font-size: 14px'" /> 云端导入
        </a-menu-item>
        <a-menu-item key="6" @click="exportCloudJSON()">
          <AntdIcon :name="'UploadOutlined'" :style="'font-size: 14px'" /> 导出云端
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script lang="ts">
import SearchEngine from '@/components/SearchEngine.vue'
import { GridStack } from 'gridstack';
import { useGridsStore } from '@/store/grids'
import AddIcon from '@/components/AddIcon.vue'
import AddComponent from '@/components/AddComponent.vue'
import AddCustomize from '@/components/AddCustomize.vue';
import MemoModal from '@/components/home/MemoModal.vue';
import WeatherModal from '@/components/home/WeatherModal.vue';
import HotModal from '@/components/home/HotModal.vue';
import PictureModal from '@/components/home/PictureModal.vue';
import CalendarModal from '@/components/home/CalendarModal.vue';
import Login from '@/components/Login.vue';
import '@/styles/item.scss'
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs'
import { get_memo_list } from '@/api/memo';
import { delete_icon_ByUserId, export_icon, import_icon } from '@/api/icon';
import { exportMultipleLocalStorageItems } from '@/utils/exportLocalJSON';
import { importJSONToLocalStorage } from '@/utils/importLocalJSON';
import { message, UploadProps } from 'ant-design-vue';
import { getIconList } from '@/api/user';
import { DateItem, HotSearchItem, Icon, PintureItem, WeatherItem } from '@/types/icon'
import { getCity, getLocation } from '@/utils/getLocation'
import axios from 'axios';
import useUpdateItem from '@/hooks/useUpdateItem';
import { useModals } from '@/hooks/useModals';
import { useWallpaperStore } from '@/store/wallpaper';
import { useAppStore } from '@/store/app';
import { add_visit } from '@/api';
import { getWeatherNow } from '@/utils/getWeather';
// import GenericModal from '@/components/GenericModal';
export const calendarModal = useModals('calendar');
export const memoModal = useModals('memo');
export const weatherModal = useModals('weather');
export const hotModal = useModals('hot');
export const pictureModal = useModals('pictuer');
export default defineComponent({
  components: {
    SearchEngine,
    AddComponent,
    AddCustomize,
    Login,
    AddIcon,
    MemoModal,
    HotModal,
    WeatherModal,
    CalendarModal,
    PictureModal,
    // GenericModal
  },
  setup() {
    const {
      updateItemPlace,
      changeWeather4,
      changeWeather1,
      changeHot4,
      changeHot1,
      changeDate4,
      changeDate1,
      changeMemo4,
      changeMemo1, } = useUpdateItem();
    const wallpaperStore = useWallpaperStore();//切换背景图
    const $message: { success: Function } = inject('$message')!
    const $transBackground = inject('$transBackground') as (() => void); //改变背景图
    const route = useRoute();
    // const calendarModal.isVisible = ref<boolean>(false);
    const memoVisible = ref<boolean>(false);
    const iconVisible = ref<boolean>(false); //添加图标弹窗
    const haveIcon = ref<boolean>(true);
    const isContextMenuOpen = ref<boolean>(false);
    const loginVisible = ref<boolean>(false);
    // 热搜数据
    const baiduHotList = ref<Array<any>>();
    const zhihuHotList = ref<Array<any>>();
    const weiboHotList = ref<Array<any>>();
    // const clickedItem = ref<HTMLElement>(); //被点击的el
    const onclickItemClass = ref<string>(''); //右键的item
    const weather = ref<any>({}); //天气
    // 位置
    const latitude = ref<string>('');
    const longitude = ref<string>('');
    const city = ref<string>('');
    // 导入文件
    const fileList = ref<UploadProps['fileList']>([]);
    const clickedItem = reactive({
      x: '0',
      y: '0',
      el: ref(),
      id: '0',
    })
    // 使用不同的 id 来管理不同的模态框

    // 获取当前日期
    const today = dayjs();
    // 使用.day()方法获取星期几，返回0-6，0表示星期日，1表示星期一，以此类推
    const dayOfWeek = today.day();
    // 将数字转换为对应的星期几文字
    const dayOfWeekText = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][dayOfWeek];

    const memoState = reactive({
      collapsed: false,
      selectedKeys: ['1'],
      openKeys: ['sub1'],
    });
    type iconMemu = {
      key: string,
      title: string,
    }
    const memoMenuList = ref<Array<string>>([]);

    // 添加组件菜单
    const iconMenuList = ref<Array<iconMemu>>([
      { title: '快捷方式', key: '1' },
      { title: '小组件', key: '2' },
      { title: '自定义', key: '3' },
    ]);


    const calendarValue = ref<Dayjs>();
    let grid: any;
    onMounted(async () => {

      // 异步获取备忘录列表
      await get_memo_list().then((res: any) => {
        console.log(res);
        if (res == undefined) return;
        if (res.code === 200) {
          let count = 0; // 计数器，用于限制推入的元素个数
          if (res.data.length > 0) {
            for (let i = 0; i < res.data.length; i++) {
              if (count < 4) {
                const title = res.data[i].title;
                memoMenuList.value.push(title);
                count++; // 每推入一个元素，计数器加一
              } else {
                break; // 如果已经推入了4个元素，退出循环
              }
            }
          }
        } else {
          memoMenuList.value = []
        }
      })


      grid = GridStack.init({
        float: false,
        cellHeight: "50px",
        minRow: 1,
      });
      // 禁止调整大小
      grid.enableResize(false);

      //监听到dragstop
      grid.on("dragstop", (event: any, element: any) => {
        console.log(element, "element")
        const node = element.gridstackNode;
        console.log(node, "移动")
        updateItemPlace({ id: node.id, x: node.x, y: node.y })
        $message.success(`成功移动至${node.y / 2 + 1}行${node.x + 1}列`)
      });

      // 获取经纬度
      if (!localStorage.getItem('latitude') || !localStorage.getItem('longitude')) {
        let location = await getLocation()
        console.log(location);
        localStorage.setItem("latitude", String(location.latitude));
        localStorage.setItem("longitude", String(location.longitude));
        latitude.value = String(location.latitude);
        longitude.value = String(location.longitude);
      } {
        latitude.value = localStorage.getItem('latitude')
        longitude.value = localStorage.getItem('longitude')
      }
      // 获取城市
      if (localStorage.getItem('city') == null) {
        let data = await getCity(localStorage.getItem('latitude'), localStorage.getItem('longitude'))
        localStorage.setItem("city", data);
        city.value = data;
      } else {
        console.log("城市是：" + localStorage.getItem('city'));
        city.value = localStorage.getItem('city');
      }


      // 获取天气
      if (localStorage.getItem('weather') == null || undefined) {
        let data = await getWeatherNow(latitude.value, longitude.value)
        weather.value = data.data;
        console.log(weather.value);
        // 将对象转换为 JSON 字符串
        localStorage.setItem('weather', JSON.stringify(data.data))
      } else {
        weather.value = JSON.parse(localStorage.getItem('weather'))
      }

      // 获取热搜（接口卡顿）
      // await getHotSearch()


      // 初始化icon
      initIconList()
    });

    function getAllElToMenu() {
      console.log("给元素加上右键菜单");
      // 获取所有元素
      const gridElements = document.querySelectorAll('.grid-stack-item');
      // 遍历每个元素并进行操作
      for (let i = 0; i < gridElements.length; i++) {
        const gridElement = gridElements[i] as HTMLElement;
        gridElement!.addEventListener('contextmenu', (event) => {
          // event.preventDefault(); // 阻止默认右键菜单行为
          handleContextMenu(event, gridElement)
        });
      }
    }

    // 递归函数，用于检查节点及其所有子孙节点的类名
    function checkForItem(node: Node | null): string {
      // 如果节点为空，返回空字符串
      if (!node) return '';

      // 如果当前节点是元素节点
      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as Element;

        // 检查当前节点的类名是否匹配 'dateItem' 或 'memoItem'
        if (element.className.match(/\bdateItem\d*\b/)) {
          return 'date';
        } else if (element.className.match(/\bmemoItem\d*\b/)) {
          return 'memo';
        } else if (element.className.match(/\bhotSearchItem\d*\b/)) {
          return 'hot';
        } else if (element.className.match(/\bweatherItem\d*\b/)) {
          return 'weather';
        }
      }

      // 递归检查所有子节点
      const childNodes = Array.from(node.childNodes);
      for (const childNode of childNodes) {
        const result = checkForItem(childNode);
        if (result) {
          return result; // 如果子节点中找到匹配的类名，直接返回
        }
      }

      // 如果没有找到匹配的类名，返回空字符串
      return '';
    }


    // 创建一个右键弹窗元素里的子元素
    function createBox(content: string) {
      const box = document.createElement('div');
      box.className = 'popup-box';
      box.textContent = content;
      box.addEventListener('click', (event) => {
        if (content == "1x1") {
          console.log(clickedItem.el, "clickedItem.value");
          // 开始递归检查
          if (clickedItem.el) {
            let itemName = checkForItem(clickedItem.el);
            console.log(itemName, "bool")
            if (itemName == 'date') {
              clickedItem!.el.remove();
              changeDate1(dayOfWeekText, clickedItem, grid)
              // 遍历给所有加上方法
              getAllElToMenu();
            } else if (itemName == 'memo') {
              clickedItem!.el.remove();
              changeMemo1(clickedItem, grid)
              // 遍历给所有加上方法
              getAllElToMenu();
            } else if (itemName == 'hot') {
              clickedItem!.el.remove();
              changeHot1(clickedItem, grid)
              // 遍历给所有加上方法
              getAllElToMenu();
            } else if (itemName == 'weather') {
              clickedItem!.el.remove();
              changeWeather1(clickedItem, grid)
              // 遍历给所有加上方法
              getAllElToMenu();
            } else {
              message.error("icon图标不能改变大小")
            }
          }

        } else if (content == "4x4") {

          if (clickedItem.el) {
            let itemName = checkForItem(clickedItem.el);
            console.log(itemName, "bool")
            if (itemName == 'date') {
              clickedItem!.el.remove();
              changeDate4(dayOfWeekText, clickedItem, grid)
              // 遍历给所有加上方法
              getAllElToMenu();
            } else if (itemName == 'memo') {
              clickedItem!.el.remove();
              changeMemo4(memoMenuList.value, clickedItem, grid)
              getAllElToMenu();
            } else if (itemName == 'hot') {
              clickedItem!.el.remove();
              changeHot4(clickedItem, grid, baiduHotList, zhihuHotList, weiboHotList)
              // 遍历给所有加上方法
              getAllElToMenu();
            } else if (itemName == 'weather') {
              clickedItem!.el.remove();
              changeWeather4(clickedItem, grid)
              // 遍历给所有加上方法
              getAllElToMenu();
            } else {
              message.error("icon图标不能改变大小")
            }
          }

          // grid.update(clickedItem.el, { w: 2, h: 4 });
        } else if (content == "删除") {
          console.log(clickedItem!.el)
          clickedItem!.el.remove();
          // 1. 获取存储的数组
          let garids = JSON.parse(localStorage.getItem(route.name as string)) || [];
          console.log(garids.icon);
          // 2. 删除数组（例如，添加新元素）
          const filteredArr = garids.icon.filter(item => item.id !== clickedItem.id);
          console.log(filteredArr, filteredArr);
          garids.icon = filteredArr
          // 3. 重新存储数组
          localStorage.setItem(route.name as string, JSON.stringify(garids));
          message.success('删除成功');
        }
      });
      return box;
    }

    // 打开icon右键菜单
    const openContextMenu = (posX: number, posY: number) => {
      isContextMenuOpen.value = true
      // 在这里打开弹窗的逻辑，可以根据 posX 和 posY 定位弹窗
      console.log('打开右键菜单在', posX, posY);
      // 创建一个弹窗元素
      const container = document.createElement('div');
      container.className = 'popup';
      container.style.position = 'absolute';
      container.style.left = posX + 'px';
      container.style.top = posY + 'px';

      const box1 = createBox('1x1');
      // const box2 = createBox('1x2');
      const box3 = createBox('4x4');
      const box4 = createBox('删除');

      container.appendChild(box1);
      // container.appendChild(box2);
      container.appendChild(box3);
      container.appendChild(box4);
      // 添加弹窗到页面中
      // 添加弹窗到页面中
      document.body.appendChild(container);
      // 添加过渡效果的触发
      setTimeout(() => {
        container.classList.add('popup-open');
      }, 10);
    }

    // 点击其他地方或按下 ESC 键关闭弹窗
    const closePopup = () => {
      isContextMenuOpen.value = false; // 更新状态
      const popup = document.querySelector('.popup');
      if (popup) {
        popup.remove(); // 移除下拉列表
      }
    };

    // 右键菜单创建一个弹窗容器
    const handleContextMenu = (event: MouseEvent, gridElement?: HTMLElement) => {
      console.log(event, "event")
      console.log(gridElement, "gridElement")
      const click = event.currentTarget as HTMLElement; // 获取点击的 DOM 元素（小部件的 DOM 元素）
      // 可以进一步处理点击的小部件，例如获取其 data-gs-id
      const gsX = click.getAttribute('gs-x')?.toString() || '';
      const gsY = click.getAttribute('gs-y')?.toString() || '';
      const gsId = click.getAttribute('gs-id')?.toString() || '';
      // clickedItem.value = gridElement as HTMLElement;
      // console.log(clickedItem.value)
      console.log('点击了具有 ID ' + gsX, gsY + ' 的小部件。');
      clickedItem.el = gridElement
      clickedItem.x = gsX
      clickedItem.y = gsY
      clickedItem.id = gsId
      event.preventDefault(); // 阻止默认的右键菜单
      event.stopPropagation(); // 阻止事件冒泡
      const posX = event.clientX; // 获取鼠标点击的水平位置
      const posY = event.clientY; // 获取鼠标点击的垂直位置
      if (isContextMenuOpen.value) {
        // 如果已经有弹窗打开，则关闭现有弹窗
        closePopup();
        // 如果有点击其他item则打开其他item的props
        if (onclickItemClass.value) {
          openContextMenu(posX, posY);
        }
      } else {
        // 否则打开新弹窗
        openContextMenu(posX, posY);
      }

      // 按下esc关闭弹窗
      const closePopupOnEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          closePopup();
        }
      };
      // 监听点击页面其他地方或按下 ESC 键，关闭弹窗
      document.addEventListener('click', closePopup);
      document.addEventListener('keyup', closePopupOnEsc);
      document.addEventListener('contextmenu', closePopup);
    }



    /**
     * 点击日历图标
     */
    const calendarClick = () => {
      console.log('calendarClick!');
      calendarModal.open()
    };

    /**
     * 点击备忘录图标
     */
    const memoClick = () => {
      console.log('memoClick!');
      // 可以在这里添加更多的处理逻辑
      memoModal.open();
    };

    const weatherClick = () => {
      console.log('weatherClick!');
      // 可以在这里添加更多的处理逻辑
      weatherModal.open();
    };

    /**
     * 点击日历图标
     */
    const pictureClick = () => {
      console.log('pictureClick!');
      pictureModal.open()
    };
    // 点击 icon 的处理函数
    const iconClick = (event) => {
      console.log('iconClick!');

      // 获取被点击的 .iconItem 元素
      const iconItem = event.currentTarget;

      if (iconItem) {
        // 查找最近的 <a> 标签
        const anchorElement = iconItem.closest('a');

        if (anchorElement) {
          // 获取 <a> 标签的 href 属性值
          const url = anchorElement.getAttribute('href');
          console.log(url, "URL"); // 输出 href 属性值
          if (url) {
            // 在这里处理 href 属性值
            add_visit({ url }).then(res => {
              console.log(res, "res");
            });
          }
        } else {
          console.log('没有找到最近的 <a> 标签');
        }
      }
    };


    // 鼠标点击时间
    const clickTime = () => {
      console.log('clickTime!');
      // 可以在这里添加更多的处理逻辑
      haveIcon.value = !haveIcon.value;
    };


    // 日历切换方法
    const onPanelChange = (value: Dayjs, mode: string) => {
    };


    async function initIconList() {

      // 获取icon
      useGridsStore().getSelectedGrids.icon.forEach(v => {
        if (v.type === 'icon') {
          addNewWidget(v.src, v.name, v.url, v.id, v.x, v.y)
        } else if (v.type === 'component') {
          if (v.name === '备忘录') {
            addMemoItem(v.id, memoMenuList.value, v.size, v.x, v.y)
          } else if (v.name === '日历') {
            addDateItem(v)
          } else if (v.name === '天气') {
            addWeatherItem(v)
          } else if (v.name === '热搜') {
            addHotSearchItem(v)
          } else if (v.name === '图库') {
            addPictureItem(v)
          }
        }
      })

      // 日历
      const dateElements = document.querySelectorAll('.dateItem');
      dateElements.forEach(dateElement => {
        // 为每个元素添加点击事件监听器
        dateElement.addEventListener('click', calendarClick);
      });


      // 备忘录
      const memoElements = document.querySelectorAll('.memoItem'); // 选择所有匹配的元素
      if (memoElements) {
        memoElements.forEach(memoElement => {
          // 为每个元素添加点击事件监听器
          memoElement.addEventListener('click', memoClick);
        });
      }

      // 图库
      const pictureElements = document.querySelectorAll('.pictureItem');
      pictureElements.forEach(pictureElement => {
        // 为每个元素添加点击事件监听器
        pictureElement.addEventListener('click', pictureClick);
      });

      // 天气
      const weatherElements = document.querySelectorAll('.weatherItem'); // 选择所有匹配的元素
      if (weatherElements) {
        weatherElements.forEach(weatherElement => {
          // 为每个元素添加点击事件监听器
          weatherElement.addEventListener('click', weatherClick);
        });
      }

      // icon
      const iconElements = document.querySelectorAll('.iconItem'); // 选择所有匹配的元素
      if (iconElements) {
        iconElements.forEach(iconElement => {
          // 为每个元素添加点击事件监听器
          iconElement.addEventListener('click', iconClick);
        });
      }

      // 热搜
      const hotSearchElements = document.querySelectorAll('.hotSearchItem'); // 选择所有匹配的元素
      if (hotSearchElements) {
        hotSearchElements.forEach(hotSearchElement => {
          // 为每个元素添加点击事件监听器
          hotSearchElement.addEventListener('click', hotModal.open);
        });
      }


      // 获取所有的tab元素
      const tabs = document.querySelectorAll('.tab');
      // 获取所有的tab内容元素
      const tabContents = document.querySelectorAll('.tab-pane');
      // 默认显示第一个tab的内容
      if (tabContents.length > 0 && tabs.length > 0) {
        tabContents[0].classList.add('active');
        // 为每个tab添加悬浮事件监听
        tabs.forEach(tab => {
          tab.addEventListener('mouseover', () => {
            const tabId = tab.getAttribute('data-tab');

            // 隐藏所有tab内容
            tabContents.forEach(content => {
              content.classList.remove('active');
            });

            // 显示对应的tab内容
            const activeContent = document.getElementById(tabId!);
            activeContent!.classList.add('active');
          });
        });
      }

      // 给所有按钮加上右键弹窗方法
      getAllElToMenu()


    }
    // 给子组件用的方法
    function addComponent(v: any) {
      console.log(v, "v--");

      if (v.name === '备忘录') {
        addMemoItem(v.id, memoMenuList.value, v.size, v.x, v.y)
      } else if (v.name === '日历') {
        addDateItem(v)
      } else if (v.name === '天气') {
        addWeatherItem(v)
      } else if (v.name === '热搜') {
        addHotSearchItem(v)
      } else if (v.name === '图库') {
        addPictureItem(v)
      }
      else {
        addNewWidget(v.src, v.name, v.url, v.id, v.x, v.y)
      }
      getAllElToMenu()
    }

    // 新增备忘录节点
    function addMemoItem(id: string, arr: Array<string>, size: number, x: number, y: number) {
      const items = arr.map(item => `<div class="cl-ant-p sg-omit-sm text-white-sm memoItemBody">${item}</div>`).join('');
      if (size === 1) {
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
        grid.addWidget(el, { id: id, x: x, y: y, w: 1, h: 2 });
        const memoElements = document.querySelectorAll('.memoItem'); // 选择所有匹配的元素
        if (memoElements) {
          memoElements.forEach(memoElement => {
            // 为每个元素添加点击事件监听器
            memoElement.addEventListener('click', memoClick);
          });
        }
      } else if (size === 4) {
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
        grid.addWidget(el, { id: id, w: 2, h: 4 });
        const memoElements = document.querySelectorAll('.memoItem'); // 选择所有匹配的元素
        if (memoElements) {
          memoElements.forEach(memoElement => {
            // 为每个元素添加点击事件监听器
            memoElement.addEventListener('click', memoClick);
          });
        }
      }

    }

    // 新增图库节点
    function addPictureItem(v: PintureItem) {
      const el = `
        <div class="grid-stack-item">
            <div class="pictureItem">
                <div class="grid-stack-item-content flex flex-direction justify-around align-center">
                  <img src="${v.src}" style="width: 60px; height: 60px; border-radius: 15px;" class="shadow-md" />
                  <p class="cl-ant-p sg-omit-sm text-white-sm">${v.name}</p>
                </div>
            </div>
        </div>
      `
      grid.addWidget(el, { w: 1, h: 2, x: v.x, y: v.y, id: v.id });
      // 日历
      const pictureElements = document.querySelectorAll('.pictureItem');
      pictureElements.forEach(pictureElement => {
        // 为每个元素添加点击事件监听器
        pictureElement.addEventListener('click', pictureClick);
      });
    }


    // 新增日历节点
    function addDateItem(v: DateItem) {
      let el = ''
      if (v.size === 1) {
        el = `
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
        grid.addWidget(el, { id: v.id, x: v.x, y: v.y, w: 1, h: 2 });
        // 日历
        const dateElements = document.querySelectorAll('.dateItem');
        dateElements.forEach(dateElement => {
          // 为每个元素添加点击事件监听器
          dateElement.addEventListener('click', calendarClick);
        });
      } else {
        el = `
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
        grid.addWidget(el, { id: v.id, x: v.x, y: v.y, w: 2, h: 4 });
        // 日历
        const dateElements = document.querySelectorAll('.dateItem');
        dateElements.forEach(dateElement => {
          // 为每个元素添加点击事件监听器
          dateElement.addEventListener('click', calendarClick);
        });
      }
    }

    // 新增天气节点
    function addWeatherItem(v: WeatherItem) {
      if (v.size === 1) {
        const el = `
        <div class="grid-stack-item">
            <div class="weatherItem">
                  <div class="grid-stack-item-content flex flex-direction justify-around align-center">
                    <img src="https://files.codelife.cc/itab/weather/icon/104-fill.svg" style="width: 55px; height: 55px; border-radius: 15px;" class="shadow-md" />
                    <p class="cl-ant-p sg-omit-sm text-white-sm">天气</p>
                  </div>
              </div>
            </div>
        </div>
      `
        grid.addWidget(el, { id: v.id, x: v.x, y: v.y, w: 1, h: 2 });
        const weatherElements = document.querySelectorAll('.weatherItem'); // 选择所有匹配的元素
        if (weatherElements) {
          weatherElements.forEach(weatherElement => {
            // 为每个元素添加点击事件监听器
            weatherElement.addEventListener('click', weatherClick);
          });
        }
      } else if (v.size === 4) {
        const el = `
        <div class="grid-stack-item">
          <div class="grid-stack-item-content">
            <div class="weatherItemFour bg-weather weatherItem" >
              <div class="flex justify-between">
                <div>
                  <div class="flex">
                    <div class="place">${city.value}</div>
                    <div></div>
                  </div>
                  <div class="temperature">${weather.value.temp}&deg;C</div>
                </div>
                <div >
                  <img class="weatherIcon" src="https://files.codelife.cc/itab/weather/icon/104-fill.svg"></img>
                  <div>${weather.value.text}</div>
                </div>
              </div>
              <div class="aqi">${weather.value.windDir} </div>
              <div class="high">相对湿度:${weather.value.humidity}，能见度:${weather.value.vis}</div>
            </div>
          </div>
        </div>
      `
        grid.addWidget(el, { id: v.id, w: 2, h: 4, x: v.x, y: v.y });
        const weatherElements = document.querySelectorAll('.weatherItem'); // 选择所有匹配的元素
        if (weatherElements) {
          weatherElements.forEach(weatherElement => {
            // 为每个元素添加点击事件监听器
            weatherElement.addEventListener('click', weatherClick);
          });
        }
      }
    }

    // 新增热搜节点
    async function addHotSearchItem(v: HotSearchItem) {
      if (v.size === 1) {
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

        grid.addWidget(el, { id: v.id, x: v.x, y: v.y, w: 1, h: 2 });
        const hotSearchElements = document.querySelectorAll('.hotSearchItem'); // 选择所有匹配的元素
        if (hotSearchElements) {
          hotSearchElements.forEach(hotSearchElement => {
            // 为每个元素添加点击事件监听器
            hotSearchElement.addEventListener('click', hotModal.open);
          });
        }
      } else if (v.size === 4) {
        const baiduItems = baiduHotList.value && baiduHotList.value.length > 0
          ? baiduHotList.value.map((item: any, index: number) =>
            `<div class="cl-ant-p sg-omit-sm text-white-sm tab-pane-item" rel="noopener noreferrer"><span>${index + 1}.</span><a target="_blank" href="${item.url}">${item.name}</a></div>`
          ).join('')
          : '<div class="text-white-sm">暂无数据</div>';
        const zhihuItems = zhihuHotList.value && zhihuHotList.value.length > 0
          ? zhihuHotList.value.map((item: any, index: number) =>
            `<div class="cl-ant-p sg-omit-sm text-white-sm tab-pane-item" rel="noopener noreferrer"><span>${index + 1}.</span><a target="_blank" href="${item.url}">${item.name}</a></div>`
          ).join('')
          : '<div class="text-white-sm">暂无数据</div>';

        const weiboItems = weiboHotList.value && weiboHotList.value.length > 0
          ? weiboHotList.value.map((item: any, index: number) =>
            `<div class="cl-ant-p sg-omit-sm text-white-sm tab-pane-item" rel="noopener noreferrer"><span>${index + 1}.</span><a target="_blank" href="${item.url}">${item.name}</a></div>`
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
        grid.addWidget(el, { id: v.id, w: 2, h: 4, x: v.x, y: v.y, });

      }
    }

    // 新增icon节点
    function addNewWidget(src: string, name: string, url: string, id: string, x: number, y: number) {
      const el = `
        <div class="grid-stack-item">
          <a href="${url}" target="_blank">
            <div class="iconItem">
                <div class="grid-stack-item-content flex flex-direction justify-around align-center">
                  <img src="${src}" style="width: 60px; height: 60px; border-radius: 15px;" class="shadow-md" />
                  <p class="cl-ant-p sg-omit-sm text-white-sm">${name}</p>
                </div>
            </div>
          </a>
        </div>
      `
      grid.addWidget(el, { w: 1, h: 2, x: x, y: y, id: id });
    }

    // 获取热搜数据
    async function getHotSearch() {
      try {
        const res = await axios.get('https://tenapi.cn/v2/baiduhot');
        console.log(res, 111);
        baiduHotList.value = res.data.data.slice(0, 4);
        const res1 = await axios.get('https://tenapi.cn/v2/zhihuhot');
        console.log(res1, 111);
        zhihuHotList.value = res1.data.data.slice(0, 4);
        const res2 = await axios.get('https://tenapi.cn/v2/weibohot');
        console.log(res2, 111);
        weiboHotList.value = res2.data.data.slice(0, 4);
      } catch (error) {
        console.error('获取热搜数据时出错:', error);
      }
    }
    // 切换图片
    function changeBgImg() {
      console.log(wallpaperStore.getAllPictureWallpaper);
      let wallpaper = wallpaperStore.getCurrentWallpaper
      const wallpaperArr = wallpaperStore.getAllPictureWallpaper;
      let index = wallpaperArr.findIndex(obj => obj.name === wallpaper.name);
      if (index === wallpaperArr.length - 1) {
        index = -1;
      }
      wallpaperStore.SET_CURRENTWALLPAPER(wallpaperStore.getAllPictureWallpaper[index + 1]);
      $transBackground();
    }

    // 导出JSON
    function exportJSON() {
      let asyncRoutes = JSON.parse(localStorage.getItem('ASYNC_ROUTES'))
      console.log(asyncRoutes);
      if (asyncRoutes === null) {
        asyncRoutes = []
      }
      asyncRoutes.push({ name: 'home' })
      // if (asyncRoutes && asyncRoutes.length === 0) {
      //   let asyncRoutes = []
      //   asyncRoutes.push({ name: 'home' })
      // } else {
      // asyncRoutes.push({ name: 'home' })
      // }
      let arr = ['home', 'ASYNC_ROUTES']
      for (let i = 0; i < asyncRoutes.length; i++) {
        const name = asyncRoutes[i].name;
        arr.push(name)
      }
      exportMultipleLocalStorageItems(arr)
    }

    // 导出JSON到云端
    function exportCloudJSON() {
      let asyncRoutes = JSON.parse(localStorage.getItem('ASYNC_ROUTES'))
      let iconArr = []
      if (asyncRoutes === null) {
        asyncRoutes = []
      }
      asyncRoutes.push({ name: 'home' })
      console.log(asyncRoutes, "asyncRoutes");
      for (let i = 0; i < asyncRoutes.length; i++) {
        const route = asyncRoutes[i];
        console.log(route, "route");

        let newIconArr = JSON.parse(localStorage.getItem(route.name))
        console.log(newIconArr, "newIconArr");

        for (let j = 0; j < newIconArr.icon.length; j++) {
          newIconArr.icon[j].routeName = route.name
        }
        console.log(newIconArr.icon, "newIconArr.icon");

        iconArr.push(...newIconArr.icon)
      }
      console.log(iconArr, "export_icon");
      export_icon(iconArr).then((res: any) => {
        if (res.code === 200) {
          message.success('导出成功')
          // 删除最后一个对象（即刚刚推送的对象）
          asyncRoutes.pop();
        } else {
          message.error(res.message)
        }
      })
    }

    // 导入云端的JSON
    function importCloudJSON() {
      import_icon().then((res: any) => {
        if (res.code === 200) {
          let data = res.data
          const result = data.reduce((acc, item) => {
            if (!acc[item.routeName]) {
              acc[item.routeName] = [];
            }
            acc[item.routeName].push(item);
            return acc;
          }, {});
          console.log(result, "result");

          // 处理对象
          for (const key in result) {
            console.log(key, "key");
            if (result.hasOwnProperty(key)) {
              // 为每个属性创建新结构
              const newStructure = { icon: result[key] };
              // 存储到 localStorage
              localStorage.setItem(key, JSON.stringify(newStructure));
            }
          }
          message.success('下载成功')
        } else {
          message.error(res.message)
        }
      })
    }

    const beforeUpload: UploadProps['beforeUpload'] = (file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const content = reader.result as string;
        const bool = importJSONToLocalStorage(content);
        if (bool) {
          message.success('导入成功')
          // 刷新侧边栏UI
          nextTick(() => {
          });
        } else {
          message.error('导入失败')
        }
      };

      reader.readAsText(file);

      // 阻止上传
      return false;
    };

    const goLogin = () => {
      loginVisible.value = true
    }






    return {
      addNewWidget,
      addComponent,
      memoVisible,
      calendarValue,
      onPanelChange,
      ...toRefs(memoState),
      clickTime,
      calendarModal,
      memoModal,
      weatherModal,
      pictureModal,
      hotModal,
      haveIcon,
      iconVisible,
      iconMenuList,
      dayjs,
      dayOfWeekText,
      loginVisible,
      changeBgImg,
      exportJSON,
      beforeUpload,
      fileList,
      goLogin,
      exportCloudJSON,
      importCloudJSON,
    };

  }

});
</script>

<style scoped lang="scss">
header {
  width: 100%;
  height: 30vh;
}

main {
  width: 90%;
  height: 70vh;
  //background-color: rgba(255, 228, 196, 0.294);


  section {
    width: 100%;
    max-height: 100%;
    overflow-y: scroll;
  }


}

.loginIcon {
  position: absolute;
  right: 0;
  margin-right: 10px;
}

</style>