<!--
 * @Author: panrunjun
 * @Date: 2024-09-03 10:04:07
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-09-05 18:05:19
 * @Description: 图库的弹窗
 * @FilePath: \ytab-master\src\components\home\PictureModal.vue
-->
<template>
    <a-layout>
        <a-layout-sider width="150" class="site-layout-background min-h-500">
            <a-menu mode="inline" :selected-keys="[current]" @click="handleMenuClick">
                <a-menu-item key="1">推荐</a-menu-item>
                <a-menu-item key="2">我的</a-menu-item>
                <!-- <a-menu-item key="3">Content 3</a-menu-item> -->
            </a-menu>
        </a-layout-sider>
        <a-layout>

            <a-layout-content>
                <div v-if="current === '1'">
                    <div class="container">
                        <div class="component">
                            <img src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" alt="">
                            <div class="mask">
                                <div class="mask-container">
                                    <div class="mask-component"
                                        @click="handleSelect('https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png')">
                                        <check-outlined :style="{ fontSize: '20px', color: 'white' }" />
                                    </div>
                                    <div class="mask-component" @click="handleLike()">
                                        <like-outlined :style="{ fontSize: '20px', color: 'white' }" />
                                        <!-- <div class="badge">99+</div> -->
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="component">
                            <img src="https://www4.bing.com//th?id=OHR.ImpalaOxpecker_ZH-CN9652434873_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp&w=360&h=202"
                                alt="">
                            <div class="mask">
                                <div class="mask-container">
                                    <div class="mask-component"
                                        @click="handleSelect('https://www4.bing.com//th?id=OHR.ImpalaOxpecker_ZH-CN9652434873_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp&w=360&h=202')">
                                        <check-outlined :style="{ fontSize: '20px', color: 'white' }" />
                                    </div>
                                    <div class="mask-component" @click="handleLike()">
                                        <like-outlined :style="{ fontSize: '20px', color: 'white' }" />
                                        <!-- <div class="badge">99+</div> -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ContextMenu :menu="menu" @select="getSelect">
                    <div v-if="current === '2'">
                        <div>
                            <div class="container">
                                <div class="component">
                                    <img src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                        alt="">
                                    <div class="mask">
                                        <div class="mask-container">
                                            <div class="mask-component"
                                                @click="handleSelect('https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png')">
                                                <check-outlined :style="{ fontSize: '20px', color: 'white' }" />
                                            </div>
                                            <div class="mask-component" @click="handleLike()">
                                                <like-outlined :style="{ fontSize: '20px', color: 'white' }" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- <div class="loginBox" >
                            <div>登录后查看我的图库</div>
                            <a-button type="primary" shape="round">去登录</a-button>
                        </div> -->
                    </div>
                </ContextMenu>
                <!-- <div v-if="current === '3'">Content 3 Displayed Here</div> -->
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>
  
<script lang="ts">
import { ref } from 'vue';
import ContextMenu from '@/components/ContextMenu.vue'
import { message } from 'ant-design-vue';
import { useWallpaperStore } from '@/store/wallpaper';
import {
    CheckOutlined,
    LikeOutlined
} from '@ant-design/icons-vue';
import { uploadImage } from "@/api/upload";
import { add_background } from '@/api/background';
export default defineComponent({
    components: {
        ContextMenu,
        CheckOutlined,
        LikeOutlined
    },
    setup(props, { emit }) {
        const current = ref<string>('1');
        const $transBackground = inject('$transBackground') as (() => void); //改变背景图
        const wallpaperStore = useWallpaperStore();
        const token = ref(localStorage.getItem('token'));
        // 处理菜单点击
        const handleMenuClick = async (e: { key: string }) => {
            current.value = e.key;
        };
        const menu = ref([
            { label: '上传图片', icon: 'copy' },
            // { label: '复制', icon: 'copy' }
        ])

        const getSelect = (e) => {
            console.log('eee', e)
            if (e.label === '上传图片') {
                // 触发文件选择对话框
                const fileInput = document.createElement('input');
                fileInput.type = 'file';
                fileInput.accept = 'image/*';
                fileInput.style.display = 'none';
                document.body.appendChild(fileInput);

                fileInput.addEventListener('change', async (event) => {
                    const file = (event.target as HTMLInputElement).files?.[0];
                    console.log(file, "file--");

                    if (file) {
                        uploadImage(file)
                            .then(response => {
                                console.log('上传成功', response);
                                // message.success('上传成功')
                                add_background({
                                    url: response.data.url,
                                    name: "picture",
                                    attribute: "picture",
                                    themeColor: "#fff"
                                }).then((res: any) => {
                                    console.log(res);
                                    if (res.code === 200) {
                                        message.success('上传成功')
                                    } else {
                                        message.error('上传失败')
                                    }
                                })
                            })
                            .catch(error => {
                                console.error('上传失败', error);
                                message.error('上传失败')
                            });
                    }
                });

                fileInput.click();
            }
        };
        const handleLike = () => {
            console.log('点赞成功');
            message.success('点赞成功')
        }
        const handleSelect = (src: string) => {
            let data = {
                url: src,
                themeColor: '#fff',
                name: "picture",
                attribute: "picture"
            }
            message.success('更换壁纸成功')
            wallpaperStore.SET_CURRENTWALLPAPER(data);
            $transBackground();
        }

        return {
            current,
            menu,
            handleMenuClick,
            handleSelect,
            getSelect,
            handleLike,
            ContextMenu,
            token,
        }
    }
})


</script>
  
<style scoped lang="scss">
.site-layout-background {
    background: #fff;
}

.container {
    position: relative;
    display: flex;
    flex-wrap: wrap;
}

.component {
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    height: 150px;
    width: 200px;
    flex: 0 0 calc(33.33% - 20px);
    transition: box-shadow 0.3s, background-color 0.3s;
    cursor: pointer;
    margin: 10px;
    position: relative;
    overflow: hidden;
}

.component img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.mask {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.2);
    // pointer-events: none;
    z-index: 1;
    transition: opacity 0.3s;
    opacity: 0;
    /* 默认隐藏遮罩 */

}

.mask-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}

.mask-component {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 45px;
    width: 45px;
    background-color: rgba(225, 220, 220, 0.6);
    border-radius: 50%;
    margin: 5px;
    z-index: 22;
}

.mask-component:hover {
    background-color: #8cb6fe;
}


.component:hover .mask {
    opacity: 1;
}

.loginBox {
    width: 100%;
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: gray;
}
</style>
  