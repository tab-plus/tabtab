<template>
  <div id="sidebar" class="sd flex flex-direction justify-center align-center">
    <div class="sd-top"></div>
    <div class="sd-mid flex flex-direction justify-around align-center">
      <Link :to="resolvePath(routes[0].path, item.path)" v-for="item in routes[0].children" :key="item.path">
        <a-dropdown :trigger="['contextmenu']" :overlayStyle="{'width': '80px'}">
          <div class="sd-mid-div flex flex-direction justify-around align-center"
            :class="{ active: selectedRouteName === item.name }" @click.stop="chooseBlock(item.name)">
            <AntdIcon :name="item.meta?.icon" :style="atdIconSelected(item.name)"></AntdIcon>
            <span class="sg-omit-sm" :class="{ active: selectedRouteName === item.name }">{{ item.meta?.title }}</span>
          </div>
          <template #overlay>
            <a-menu>
              <a-menu-item key="1">编辑</a-menu-item>
              <a-menu-item key="2" @click.stop="deleteRoute(item)">删除</a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </Link>
      <AddGroupBtn>
        <AntdIcon :name="'PlusSquareOutlined'" :style="'font-size: 20px; color: #40a9ff'"></AntdIcon>
      </AddGroupBtn>
    </div>
    <div class="sd-bottom"></div>
  </div>
</template>

<script lang="ts">
import path from 'path';
import { useAppStore } from '@/store/app';
import Link from './Link.vue';
import AddGroupBtn from '@/components/AddGroupBtn.vue';
import { isExternal, calcContrastColor } from '@/utils/validate';
import { useWallpaperStore } from '@/store/wallpaper';
import { RouterRowTy } from '~/router'
import router from '@/router'

export default defineComponent({
  data() {
    return {
      sidebarThemeColor: useWallpaperStore().getCurrentWallpaperThemeColor,
      fontColor: calcContrastColor(useWallpaperStore().getCurrentWallpaperThemeColor)
    };
  },
  components: {
    Link,
    AddGroupBtn
  },
  methods: {
    atdIconSelected(name: string) {
      if (this.selectedRouteName === name) {
        return 'font-size: 20px; color: #40a9ff';
      }
      return 'font-size: 20px; color: #eeeeee';
    },
    deleteRoute(item: RouterRowTy) {
      if(item.name === 'home') {
        this.$message.error('主页无法删除');
      } else {
        router.removeRoute(item.name!)
        this.$nextTick(async () => {
          this.selectedRouteName = (await useAppStore().REMOVE_ASYNC_ROUTE())!
        })
      }
    }
  },
  setup() {
    const appStore = useAppStore();

    const routes = computed(() => appStore.routes);

    // 二级子路由需要拼接path 例如：/noob-guide/account-login
    const resolvePath = (basePath: string, routePath: string) => {
      if (isExternal(routePath)) {
        return routePath;
      }
      if (isExternal(basePath)) {
        return basePath;
      }

      return path.resolve(basePath, routePath);
    };

    let selectedRouteName = ref<string>('');
    const chooseBlock = (routeName: string) => {
      selectedRouteName.value = routeName!;
    };

    // const openKeys = ref<string[]>(["sub1"]);
    // const selectedKeys = ref<string[]>(["1"]);
    // const handleClick: MenuProps["onClick"] = (e) => {
    //   console.log("click", e);
    // };
    // const titleClick = (e: Event) => {
    //   console.log("titleClick", e);
    // };
    // watch(
    //   () => openKeys,
    //   (val) => {
    //     console.log("openKeys", val);
    //   }
    // );

    return {
      routes,
      resolvePath,
      chooseBlock,
      selectedRouteName
    };
  }
});
</script>

<style scoped lang="scss">
.sd {
  width: 100%;
  height: 100%;
  background-color: v-bind(sidebarThemeColor);
  backdrop-filter: blur(2px);

  .sd-mid {
    width: 100%;
    height: 60%;

    .sd-mid-div {
      width: 50px;
      height: 50px;

      &.active {
        background-color: #c6d3dd;
        color: #40a9ff;
      }

      span {
        font-weight: 500;
        color: v-bind(fontColor);
        font-size: 12px;
        line-height: 18px;

        &.active {
          color: #40a9ff;
        }
      }
    }
  }
}
</style>
