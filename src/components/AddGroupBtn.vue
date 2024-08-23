<template>
  <a-popover title="添加分组" trigger="click" placement="right" v-model:visible="visible">
    <template #content>
      <div class="group">
        <span>图标</span>
        <div class="group-icons flex flex-wrap">
          <AntdIcon
            class="s-group-icon"
            v-for="item in groupIcons"
            :key="item.name"
            :name="item.name"
            :style="'font-size: 22px; color: #40a9ff; margin-left: 6px; margin-top: 5px; padding: 4px; border-radius: 4px'"
            :class="{selected : selectedIcon === item.name}"
            @click="selectIcon(item.name)"
          ></AntdIcon>
        </div>
      </div>
      <a-input-group compact>
        <a-input v-model:value="groupName" style="width: calc(100% - 80px)" placeholder="请输入组名"/>
        <a-button type="primary" @click="submitGroup">确定</a-button>
      </a-input-group>
    </template>
    <slot></slot>
  </a-popover>
</template>

<script lang="ts">
import router from '../router';
import { useAppStore } from '../store/app';

export default defineComponent({
  data() {
    return {
      visible: false,
      groupName: '',
      selectedIcon: 'HeartOutlined',
      groupIcons: [
        {
          name: 'HeartOutlined'
        },
        {
          name: 'MacCommandOutlined'
        },
        {
          name: 'MobileOutlined'
        },
        {
          name: 'MonitorOutlined'
        },
        {
          name: 'ReadOutlined'
        },
        {
          name: 'VideoCameraAddOutlined'
        },
        {
          name: 'TrophyOutlined'
        },
        {
          name: 'TableOutlined'
        }
      ]
    };
  },
  methods: {
    selectIcon(name: string) {
      this.selectedIcon = name;
    },
    submitGroup() {
      if (this.groupName.length === 0 || this.selectedIcon.length === 0) return;

      if (useAppStore().routes[0].children.length > 8) {
        this.$message.error('最多9个分组!');
        return;
      }

      if(useAppStore().getRouteIsExisted(this.selectedIcon.toLowerCase())) {
        this.$message.error('此类型模块已存在!')
        return
      }

      const localStorageExistedAsyncRoutes = JSON.parse(localStorage.getItem('ASYNC_ROUTES')!);
      const routeObj = {
        path: this.selectedIcon.toLowerCase(),
        name: this.selectedIcon.toLowerCase(),
        meta: {
          title: this.groupName,
          icon: this.selectedIcon
        },
        component: () => import('@/views/home/index.vue')
      };

      if (localStorageExistedAsyncRoutes) {
        localStorageExistedAsyncRoutes.push(routeObj);
        localStorage.setItem('ASYNC_ROUTES', JSON.stringify(localStorageExistedAsyncRoutes));
      } else {
        localStorage.setItem('ASYNC_ROUTES', JSON.stringify([routeObj]));
      }

      //创建成功后加入创建模块的grids列表
      localStorage.setItem(this.selectedIcon.toLowerCase(), JSON.stringify({
        icon: [],
        component: [],
      }))

      // 动态添加一个路由，往fater父路由中添加
      router.addRoute('father', routeObj);
      this.visible = false;

      // 刷新侧边栏UI
      this.$nextTick(() => {
        useAppStore().ADD_ASYNC_ROUTES(routeObj);
      });
    }
  },
  setup() {
    return {};
  }
});
</script>

<style scoped lang="scss">
.group-icons{
  width: 224px;
  height: 66px;
  margin-bottom: 10px;
  .s-group-icon {
    &:hover {
      background-color: #1278cb32;
    }
    &.selected {
      background-color: #1278cb32;
    }
  }
}
</style>
