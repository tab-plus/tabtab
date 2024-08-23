<!--
 * @Author: panrunjun
 * @Date: 2024-07-22 21:46:02
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-08-17 16:06:54
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
      wallpaperStore.SET_CURRENTWALLPAPER(wallpaperStore.getAllPictureWallpaper[0]);
    };

    
    
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
