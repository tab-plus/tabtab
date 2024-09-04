<!--
 * @Author: panrunjun
 * @Date: 2024-07-22 21:46:02
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-09-04 18:00:14
 * @Description: 
 * @FilePath: \ytab-master\src\App.vue
-->
<template>
  <router-view />
  <video autoplay muted loop :src="$pinia.state.value.wallpaper.currentWallpaper.url" id="video"
    v-show="$pinia.state.value.wallpaper.currentWallpaper.atrribute === 'video'"></video>
</template>
<script lang="ts">
import DataBeforeGuard from '@/dataBeforeGuard';
import { useWallpaperStore } from '@/store/wallpaper';
export default defineComponent({
  data() {
    return {
      sk: 'haha'
    }
  },
  provide() {
    return {
      '$message': this.$message,
    }
  },

  setup() {
    const wallpaperStore = useWallpaperStore();
    const setCurrentWallpaper = () => {
      console.log(localStorage.getItem('CURRENTWALLPAPER'), "--");
      const value = localStorage.getItem('CURRENTWALLPAPER');
      console.log(value);

      // wallpaperStore.SET_CURRENTWALLPAPER(wallpaperStore.getAllPictureWallpaper[0]);
      if (value === null) {
        wallpaperStore.SET_CURRENTWALLPAPER(wallpaperStore.getAllPictureWallpaper[0]);
      } else {
        try {
          const parsedValue = JSON.parse(value);
          const isEmpty = Object.prototype.toString.call(parsedValue) === '[object Object]' && Object.keys(parsedValue).length === 0;
          // 判断是否空对象
          if (isEmpty) {
            console.log("空对象");
            wallpaperStore.SET_CURRENTWALLPAPER(wallpaperStore.getAllPictureWallpaper[0]);
          } else {
            console.log("不是空对象",localStorage.getItem('CURRENTWALLPAPER'));
            wallpaperStore.SET_CURRENTWALLPAPER(JSON.parse(localStorage.getItem('CURRENTWALLPAPER')));
          }
        } catch (e) {
          console.log('解析错误，值不是有效的 JSON 对象');
        }
      }

    };


    // 修改背景
    function transBackground(): void {
      if (useWallpaperStore().getCurrentWallpaper.attribute === 'picture') {
        // 设置的背景是图片的话
        const domApp = document.querySelector('#app') as HTMLElement;
        domApp.style.background = `url(${useWallpaperStore().getCurrentWallpaper.url}) no-repeat`;
        domApp.style.backgroundSize = 'cover';
        domApp.style.backgroundAttachment = 'fixed';

      } else {
        // 设置的背景是视频的话
      }
    }

    onMounted(() => {
      DataBeforeGuard.initWp();
      DataBeforeGuard.initSearchEngine();
      DataBeforeGuard.initHome();
      setCurrentWallpaper();
      transBackground();
    });

    provide('$transBackground', transBackground);
    return {
      setCurrentWallpaper,
    };
  }
});
</script>
<style lang="scss">
#video {
  position: fixed;
  left: 0%;
  top: 0%;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;

  /* 这几个属性为poster图片过度用的 */
  /* transition: .3s;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center; */
}
</style>
