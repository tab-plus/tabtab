<!--
 * @Author: panrunjun
 * @Date: 2024-07-22 21:46:02
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-03-26 15:10:44
 * @Description: 首页
 * @FilePath: \ytab-master\src\views\home\index.vue
-->
<template>
  <!-- 登录弹窗 -->
  <a-drawer
    v-model:visible="loginVisible"
    class="custom-class"
    title="登录"
    placement="right"
  >
    <Login
      @closeLogin="
        () => {
          loginVisible = false;
        }
      "
    ></Login>
  </a-drawer>

  <!-- 设置弹窗 -->
  <a-drawer
    v-model:visible="settingVisible"
    class="custom-class"
    title="设置"
    width="50%"
    placement="right"
    @close="
      () => {
        useStore.CLOSE_SETTING();
      }
    "
  >
    <Setting></Setting>
  </a-drawer>

  <a-dropdown :trigger="['contextmenu']">
    <div class="ya-matter flex flex-direction align-center">
      <!-- 登录头像 -->
      <div class="loginIcon" @click="loginVisible = true">
        <img style="height: 50px" src="@/assets/user.png" alt="" />
      </div>

      <!-- 头部 -->
      <header class="flex justify-center align-center flex-direction">
        <div class="time" @click="clickTime()">
          <div class="hour">{{ dayjs(new Date()).format("HH:mm") }}</div>
          <div class="footer">
            <div>
              {{ dayjs(new Date()).format("YYYY-MM-DD") }} {{ dayOfWeekText }}
            </div>
          </div>
        </div>
        <SearchEngine class="se" />
      </header>

      <!-- 主要内容 -->
      <main v-show="haveIcon">
        <div class="main-icon">
          <MainIcon
            @openPicture="pictureModal.open()"
            @openMemo="memoModal.open()"
            @openCalendar="calendarModal.open()"
          ></MainIcon>
        </div>

        <!-- 底部菜单栏 -->
        <div class="bottom">
          <Dock @handleAdd="bottomAdd"></Dock>
        </div>
      </main>
      <!-- 日历 -->
      <a-modal
        :destroyOnClose="true"
        width="1200px"
        height="500px"
        v-model:visible="calendarModal.isVisible.value"
        footer=""
        title="日历"
        closable
        @ok="
          () => {
            calendarModal.open();
          }
        "
      >
        <CalendarModal></CalendarModal>
      </a-modal>

      <!-- <GenericModal v-model:visible="calendarModal.isVisible.value" title="日历" @ok="() => { calendarModal.open() }">
      </GenericModal> -->

      <!-- 备忘录 -->
      <a-modal
        width="60%"
        v-model:visible="memoModal.isVisible.value"
        footer=""
        title="备忘录"
        closable
        @ok="
          () => {
            memoModal.open();
          }
        "
      >
        <MemoModal></MemoModal>
      </a-modal>

      <!-- 天气 -->
      <a-modal
        width="60%"
        v-model:visible="weatherModal.isVisible.value"
        footer=""
        title="天气"
        closable
        @ok="
          () => {
            weatherModal.open();
          }
        "
      >
        <WeatherModal></WeatherModal>
      </a-modal>

      <!-- 添加图标 -->
      <a-modal
        width="60%"
        v-model:visible="iconVisible"
        footer=""
        title="添加组件"
        closable
        @ok="
          () => {
            iconVisible = false;
          }
        "
      >
        <a-layout>
          <a-layout-sider
            :style="{ overflow: 'auto' }"
            v-model:collapsed="collapsed"
            theme="light"
          >
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
              <AddIcon
                @addNewWidget="addComponent"
                @handleClose="iconVisible = false"
              ></AddIcon>
            </div>
            <div v-if="selectedKeys.includes('2')">
              <AddComponent
                @addNewWidget="addComponent"
                @handleClose="iconVisible = false"
              ></AddComponent>
            </div>
            <div v-if="selectedKeys.includes('3')">
              <AddCustomize
                @addNewWidget="addComponent"
                @handleClose="iconVisible = false"
              ></AddCustomize>
            </div>
          </a-layout>
        </a-layout>
      </a-modal>

      <!-- 热搜 -->
      <a-modal
        width="60%"
        v-model:visible="hotModal.isVisible.value"
        footer=""
        title="热搜"
        closable
        @ok="
          () => {
            hotModal.open();
          }
        "
      >
        <HotModal></HotModal>
      </a-modal>

      <!-- 图库 -->
      <a-modal
        width="60%"
        v-model:visible="pictureModal.isVisible.value"
        footer=""
        title="图库"
        closable
        @ok="
          () => {
            pictureModal.open();
          }
        "
      >
        <PictureModal @go-login="goLogin"></PictureModal>
      </a-modal>
    </div>
    <template #overlay>
      <a-menu>
        <a-menu-item key="1" @click="changeBgImg()">
          <AntdIcon :name="'SwapOutlined'" :style="'font-size: 14px'" />
          切换壁纸
        </a-menu-item>
        <a-menu-item key="2" @click="handleAddIcon()">
          <AntdIcon :name="'PlusOutlined'" :style="'font-size: 14px'" />
          添加图标或组件
        </a-menu-item>
        <a-menu-item key="3">
          <a-upload
            name="file"
            :show-upload-list="false"
            v-model:file-list="fileList"
            :max-count="1"
            :before-upload="beforeUpload"
          >
            <AntdIcon :name="'DownloadOutlined'" :style="'font-size: 14px'" />
            导入
          </a-upload>
        </a-menu-item>
        <a-menu-item key="4" @click="exportJSON()">
          <AntdIcon :name="'UploadOutlined'" :style="'font-size: 14px'" /> 导出
        </a-menu-item>
        <a-menu-item key="5" @click="importCloudJSON()">
          <AntdIcon :name="'DownloadOutlined'" :style="'font-size: 14px'" />
          云端导入
        </a-menu-item>
        <a-menu-item key="6" @click="exportCloudJSON()">
          <AntdIcon :name="'UploadOutlined'" :style="'font-size: 14px'" />
          导出云端
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script lang="ts">
import SearchEngine from "@/components/SearchEngine.vue";
import { GridStack } from "gridstack";
import { useGridsStore } from "@/store/grids";
import AddIcon from "@/components/AddIcon.vue";
import AddComponent from "@/components/AddComponent.vue";
import AddCustomize from "@/components/AddCustomize.vue";
import MemoModal from "@/components/home/MemoModal.vue";
import WeatherModal from "@/components/home/WeatherModal.vue";
import HotModal from "@/components/home/HotModal.vue";
import PictureModal from "@/components/home/PictureModal.vue";
import CalendarModal from "@/components/home/CalendarModal.vue";
import Login from "@/components/Login.vue";
import Dock from "@/components/home/Dock.vue";
import Setting from "@/components/home/Setting.vue";
import "@/styles/item.scss";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { delete_icon_ByUserId, export_icon, import_icon } from "@/api/icon";
import { exportMultipleLocalStorageItems } from "@/utils/exportLocalJSON";
import { importJSONToLocalStorage } from "@/utils/importLocalJSON";
import { message, UploadProps } from "ant-design-vue";
import {
  DateItem,
  HotSearchItem,
  PintureItem,
  WeatherItem,
} from "@/types/icon";
import { getCity, getLocation } from "@/utils/getLocation";
import axios from "axios";
import useUpdateItem from "@/hooks/useUpdateItem";
import { useModals } from "@/hooks/useModals";
import { useWallpaperStore } from "@/store/wallpaper";
import { useAppStore } from "@/store/app";
import { add_visit } from "@/api";
import { getWeatherNow } from "@/utils/getWeather";
import { useUserStore } from "@/store/user";
// import GenericModal from '@/components/GenericModal';
export const calendarModal = useModals("calendar");
export const memoModal = useModals("memo");
export const weatherModal = useModals("weather");
export const hotModal = useModals("hot");
export const pictureModal = useModals("pictuer");
import MainIcon from "@/components/home/MainIcon.vue";
import { useBottomIconStore } from "@/store/bottomIcon";
import { useMainIconStore } from "@/store/mainIcon";
export default defineComponent({
  components: {
    SearchEngine,
    AddComponent,
    AddCustomize,
    Login,
    Setting,
    AddIcon,
    MemoModal,
    HotModal,
    WeatherModal,
    CalendarModal,
    PictureModal,
    MainIcon,
    Dock,
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
      changeMemo1,
    } = useUpdateItem();
    const wallpaperStore = useWallpaperStore(); //切换背景图
    const useStore = useUserStore();
    const bottomIconStore = useBottomIconStore();
    const mainIconStore = useMainIconStore();

    // 使用计算属性来同步 store 的 setting 属性
    const settingVisible = computed(() => useStore.setting);
    const $message: { success: Function } = inject("$message")!;
    const $transBackground = inject("$transBackground") as () => void; //改变背景图
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
    const onclickItemClass = ref<string>(""); //右键的item
    const weather = ref<any>({}); //天气
    // 位置
    const latitude = ref<string>("");
    const longitude = ref<string>("");
    const city = ref<string>("");
    // 导入文件
    const fileList = ref<UploadProps["fileList"]>([]);

    // 是否是底部的icon,0 不是 1 是
    const isBottom = ref(0);

    // 获取当前日期
    const today = dayjs();
    // 使用.day()方法获取星期几，返回0-6，0表示星期日，1表示星期一，以此类推
    const dayOfWeek = today.day();
    // 将数字转换为对应的星期几文字
    const dayOfWeekText = [
      "星期日",
      "星期一",
      "星期二",
      "星期三",
      "星期四",
      "星期五",
      "星期六",
    ][dayOfWeek];

    const memoState = reactive({
      collapsed: false,
      selectedKeys: ["1"],
      openKeys: ["sub1"],
    });
    type iconMemu = {
      key: string;
      title: string;
    };

    // 添加组件菜单
    const iconMenuList = ref<Array<iconMemu>>([
      { title: "快捷方式", key: "1" },
      { title: "小组件", key: "2" },
      { title: "自定义", key: "3" },
    ]);

    const calendarValue = ref<Dayjs>();
    let grid: any;
    onMounted(async () => {
      grid = GridStack.init({
        float: false,
        cellHeight: "50px",
        minRow: 1,
      });

      // 获取经纬度
      if (
        !localStorage.getItem("latitude") ||
        !localStorage.getItem("longitude")
      ) {
        let location = await getLocation();
        console.log(location);
        localStorage.setItem("latitude", String(location.latitude));
        localStorage.setItem("longitude", String(location.longitude));
        latitude.value = String(location.latitude);
        longitude.value = String(location.longitude);
      }
      {
        latitude.value = localStorage.getItem("latitude");
        longitude.value = localStorage.getItem("longitude");
      }
      // 获取城市
      if (localStorage.getItem("city") == null) {
        let data = await getCity(
          localStorage.getItem("latitude"),
          localStorage.getItem("longitude")
        );
        localStorage.setItem("city", data);
        city.value = data;
      } else {
        console.log("城市是：" + localStorage.getItem("city"));
        city.value = localStorage.getItem("city");
      }

      // 获取天气
      if (localStorage.getItem("weather") == null || undefined) {
        let data = await getWeatherNow(latitude.value, longitude.value);
        weather.value = data.data;
        console.log(weather.value);
        // 将对象转换为 JSON 字符串
        localStorage.setItem("weather", JSON.stringify(data.data));
      } else {
        weather.value = JSON.parse(localStorage.getItem("weather"));
      }

      // 获取热搜（接口卡顿）
      // await getHotSearch()

      // 初始化icon
      // initIconList();
    });

    const weatherClick = () => {
      console.log("weatherClick!");
      // 可以在这里添加更多的处理逻辑
      weatherModal.open();
    };

    // 鼠标点击时间
    const clickTime = () => {
      console.log("clickTime!");
      // 可以在这里添加更多的处理逻辑
      haveIcon.value = !haveIcon.value;
    };

    // 给子组件用的方法
    function addComponent(v: any) {
      console.log(v, "v--");
      if (isBottom.value) {
        addBottom(v);
        // 复原isBottom
        isBottom.value = 0;
        return;
      }
      mainIconStore.ADD_ICON(v);
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
      `;
        const weatherElements = document.querySelectorAll(".weatherItem"); // 选择所有匹配的元素
        if (weatherElements) {
          weatherElements.forEach((weatherElement) => {
            // 为每个元素添加点击事件监听器
            weatherElement.addEventListener("click", weatherClick);
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
      `;
        const weatherElements = document.querySelectorAll(".weatherItem"); // 选择所有匹配的元素
        if (weatherElements) {
          weatherElements.forEach((weatherElement) => {
            // 为每个元素添加点击事件监听器
            weatherElement.addEventListener("click", weatherClick);
          });
        }
      }
    }

    // 给底部添加icon
    function addBottom(data: any) {
      bottomIconStore.ADD_ICON(data);
    }

    // 获取热搜数据
    async function getHotSearch() {
      try {
        const res = await axios.get("https://tenapi.cn/v2/baiduhot");
        console.log(res, 111);
        baiduHotList.value = res.data.data.slice(0, 4);
        const res1 = await axios.get("https://tenapi.cn/v2/zhihuhot");
        console.log(res1, 111);
        zhihuHotList.value = res1.data.data.slice(0, 4);
        const res2 = await axios.get("https://tenapi.cn/v2/weibohot");
        console.log(res2, 111);
        weiboHotList.value = res2.data.data.slice(0, 4);
      } catch (error) {
        console.error("获取热搜数据时出错:", error);
      }
    }
    // 切换图片
    function changeBgImg() {
      console.log(wallpaperStore.getAllPictureWallpaper);
      let wallpaper = wallpaperStore.getCurrentWallpaper;
      const wallpaperArr = wallpaperStore.getAllPictureWallpaper;
      let index = wallpaperArr.findIndex((obj) => obj.name === wallpaper.name);
      if (index === wallpaperArr.length - 1) {
        index = -1;
      }
      wallpaperStore.SET_CURRENTWALLPAPER(
        wallpaperStore.getAllPictureWallpaper[index + 1]
      );
      $transBackground();
    }

    // 导出JSON
    function exportJSON() {
      let asyncRoutes = JSON.parse(localStorage.getItem("ASYNC_ROUTES"));
      console.log(asyncRoutes);
      if (asyncRoutes === null) {
        asyncRoutes = [];
      }
      asyncRoutes.push({ name: "home" });
      // if (asyncRoutes && asyncRoutes.length === 0) {
      //   let asyncRoutes = []
      //   asyncRoutes.push({ name: 'home' })
      // } else {
      // asyncRoutes.push({ name: 'home' })
      // }
      let arr = ["home", "ASYNC_ROUTES"];
      for (let i = 0; i < asyncRoutes.length; i++) {
        const name = asyncRoutes[i].name;
        arr.push(name);
      }
      exportMultipleLocalStorageItems(arr);
    }

    // 导出JSON到云端
    function exportCloudJSON() {
      let asyncRoutes = JSON.parse(localStorage.getItem("ASYNC_ROUTES"));
      let iconArr = [];
      if (asyncRoutes === null) {
        asyncRoutes = [];
      }
      asyncRoutes.push({ name: "home" });
      console.log(asyncRoutes, "asyncRoutes");
      for (let i = 0; i < asyncRoutes.length; i++) {
        const route = asyncRoutes[i];
        console.log(route, "route");

        let newIconArr = JSON.parse(localStorage.getItem(route.name));
        console.log(newIconArr, "newIconArr");

        for (let j = 0; j < newIconArr.icon.length; j++) {
          newIconArr.icon[j].routeName = route.name;
        }
        console.log(newIconArr.icon, "newIconArr.icon");

        iconArr.push(...newIconArr.icon);
      }
      console.log(iconArr, "export_icon");
      export_icon(iconArr).then((res: any) => {
        if (res.code === 200) {
          message.success("导出成功");
          // 删除最后一个对象（即刚刚推送的对象）
          asyncRoutes.pop();
        } else {
          message.error(res.message);
        }
      });
    }

    // 导入云端的JSON
    function importCloudJSON() {
      import_icon().then((res: any) => {
        if (res.code === 200) {
          let data = res.data;
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
          message.success("下载成功");
        } else {
          message.error(res.message);
        }
      });
    }

    const beforeUpload: UploadProps["beforeUpload"] = (file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const content = reader.result as string;
        const bool = importJSONToLocalStorage(content);
        if (bool) {
          message.success("导入成功");
          // 刷新侧边栏UI
          nextTick(() => {});
        } else {
          message.error("导入失败");
        }
      };

      reader.readAsText(file);

      // 阻止上传
      return false;
    };

    const goLogin = () => {
      loginVisible.value = true;
    };

    // 底部菜单栏添加icon
    const bottomAdd = (status: number) => {
      console.log(status, "bottomAdd called with num");
      isBottom.value = status;
      iconVisible.value = true;
      iconMenuList.value = [
        { title: "快捷方式", key: "1" },
        { title: "自定义", key: "3" },
      ];
    };

    function handleAddIcon() {
      iconVisible.value = true;
      iconMenuList.value = [
        { title: "快捷方式", key: "1" },
        { title: "组件", key: "2" },
        { title: "自定义", key: "3" },
      ];
    }

    return {
      addComponent,
      memoVisible,
      calendarValue,
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
      settingVisible,
      useStore,
      changeBgImg,
      exportJSON,
      beforeUpload,
      fileList,
      goLogin,
      exportCloudJSON,
      importCloudJSON,
      bottomAdd,
      handleAddIcon,
    };
  },
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

.bottom {
  position: absolute;
  bottom: 0px;
  left: 0;
  width: 100%;
  height: 100px;
  background-color: transparent;
  z-index: 999;
}

.main-icon {
  height: 100%;
}
</style>