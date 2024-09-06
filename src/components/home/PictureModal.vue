<!--
 * @Author: panrunjun
 * @Date: 2024-09-03 10:04:07
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-09-06 17:42:41
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
                        <template v-for="item in backgroundListByRecommend" :key="item.name">
                            <div class="component">
                                <img :src=item.url
                                    alt="">
                                <div class="mask">
                                    <div class="mask-header">
                                        <div class="header-component" @click="handleDownload(item)">
                                            <download-outlined :style="{ fontSize: '15px', color: 'white' }" />
                                        </div>
                                        <a-popconfirm title="确定要删除这个背景吗?" ok-text="Yes" cancel-text="No"
                                            @confirm="deleteConfirm" @cancel="deleteCancel">
                                            <div class="header-component" @click="handleDelete(item)">
                                                <minus-outlined :style="{ fontSize: '15px', color: 'white' }" />
                                            </div>
                                        </a-popconfirm>

                                    </div>
                                    <div class="mask-container">
                                        <div class="container-component"
                                            @click="handleSelect(item)">
                                            <check-outlined :style="{ fontSize: '20px', color: 'white' }" />
                                        </div>
                                        <!-- <div class="container-component" @click="handleLike()">
                                            <like-outlined :style="{ fontSize: '20px', color: 'white' }" />
                                        </div> -->
                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
                <ContextMenu :menu="menu" @select="getSelect">
                    <div v-if="current === '2'">
                        <div v-show="isLogin">
                            <div class="container">
                                <template v-for="item in backgroundListByUser" :key="item.name">
                                    <div class="component">
                                        <img :src=item.url alt="">
                                        <div class="mask">
                                            <div class="mask-header">
                                                <div class="header-component" @click="handleDownload(item)">
                                                    <download-outlined :style="{ fontSize: '15px', color: 'white' }" />
                                                </div>
                                                <a-popconfirm title="确定要删除这个背景吗?" ok-text="Yes" cancel-text="No"
                                                    @confirm="deleteConfirm" @cancel="deleteCancel">
                                                    <div class="header-component" @click="handleDelete(item)">
                                                        <minus-outlined :style="{ fontSize: '15px', color: 'white' }" />
                                                    </div>
                                                </a-popconfirm>

                                            </div>
                                            <div class="mask-container">
                                                <div class="container-component" @click="handleSelect(item)">
                                                    <check-outlined :style="{ fontSize: '20px', color: 'white' }" />
                                                </div>
                                                <!-- <div class="container-component" @click="handleLike()">
                                                    <like-outlined :style="{ fontSize: '20px', color: 'white' }" />
                                                </div> -->
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </div>
                        </div>
                        <div class="loginBox" v-show="!isLogin">
                            <div>登录后查看我的图库</div>
                            <a-button type="primary" shape="round" @click="goLogin">去登录</a-button>
                        </div>
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
import { v4 as uuidv4 } from 'uuid';
import {
    CheckOutlined,
    LikeOutlined,
    MinusOutlined,
    DownloadOutlined
} from '@ant-design/icons-vue';
import { uploadImage } from "@/api/upload";
import { add_background, delete_background, get_background_list, get_background_recommend } from '@/api/background';
import { Background } from '@/types/background';
import { saveAs } from 'file-saver';
import { defineEmits } from 'vue';
import { useUserStore } from '@/store/user';
export default defineComponent({
    components: {
        ContextMenu,
        CheckOutlined,
        LikeOutlined,
        MinusOutlined,
        DownloadOutlined
    },

    emits: ['go-login'], // 声明子组件可以触发的事件
    setup(props, { emit }) {
        const current = ref<string>('1');
        const $transBackground = inject('$transBackground') as (() => void); //改变背景图
        const wallpaperStore = useWallpaperStore();
        const userStore = useUserStore();
        const backgroundListByRecommend = ref([]);
        const backgroundListByUser = ref([]);
        const deleteName = ref('');
        // 右键点击按钮
        const menu = ref([
            { label: '上传图片', icon: 'add' },
            // { label: '复制', icon: 'copy' }
        ])


        /**
       * @description: 处理菜单点击
       */
        const handleMenuClick = async (e: { key: string }) => {
            current.value = e.key;
            console.log(e.key);
            if (e.key === '2') {
                userStore.isLoggedIn ? getListByUser() : ''
            }

        };
        // 计算监听状态
        const isLogin = computed(() => userStore.isLoggedIn)

        // 监听是否登录
        watch(() => userStore.isLoggedIn, (newValue) => {
            if (newValue) {
                getListByUser()
            }
        })
        /**
        * @description: 获取用户图片数据
        */
        const getListByUser = () => {
            get_background_list().then((res: any) => {
                console.log(res);
                if (res.code === 200) {
                    backgroundListByUser.value = res.data
                } else {
                    message.error(res.message)
                }
            })
        }

        const getListByRecommend = () => {
            get_background_recommend().then((res: any) => {
                console.log(res);
                if (res.code === 200) {
                    backgroundListByRecommend.value = res.data
                } else {
                    message.error(res.message)
                }
            })
        }

        /**
         * @description: 右键点击方法
         */
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
                                const uniqueID = uuidv4();
                                // message.success('上传成功')
                                add_background({
                                    url: response.data,
                                    name: uniqueID,
                                    attribute: "picture",
                                    themeColor: "#fff"
                                }).then((res: any) => {
                                    console.log(res);
                                    if (res.code === 200) {
                                        getListByUser()
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

        /**
         * @description: 点赞
         */
        const handleLike = () => {
            console.log('点赞成功');
            message.success('点赞成功')
        }
        /**
         * @description: 下载图片的方法
         */
        const handleDownload = async (item: Background) => {
            const url = item.url; // 替换为图片的实际路径

            try {
                const response = await fetch(url);
                const blob = await response.blob();
                saveAs(blob, 'background.jpg'); // 下载时的文件名
            } catch (error) {
                console.error('下载图片失败', error);
            }
        }
        /**
         * @description: 删除获取name
         */
        const handleDelete = (item: Background) => {
            deleteName.value = item.name

        }
        /**
         * @description: 确认删除
         */
        const deleteConfirm = (e: MouseEvent) => {
            delete_background(deleteName.value).then((res: any) => {
                console.log(res);
                if (res.code === 200) {
                    getListByUser()
                    message.success('删除成功')
                } else {
                    message.error('删除失败')
                }
            })
        };
        /**
         * @description: 取消删除
         */
        const deleteCancel = (e: MouseEvent) => {
        };
        /**
         * @description: 选这壁纸
         */
        const handleSelect = (item: Background) => {
            message.success('更换壁纸成功')
            wallpaperStore.SET_CURRENTWALLPAPER(item);
            $transBackground();
        }
        /**
         * @description:    去登录
         */
        const goLogin = () => {
            emit('go-login');
        }

        onMounted(() => {
            getListByRecommend()
        })

        return {
            current,
            menu,
            handleMenuClick,
            handleSelect,
            handleDownload,
            handleDelete,
            deleteConfirm,
            deleteCancel,
            getSelect,
            handleLike,
            goLogin,
            ContextMenu,
            backgroundListByUser,
            backgroundListByRecommend,
            isLogin,
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
    height: 500px;
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

.mask-header {
    color: white;
    display: flex;
    justify-content: end;
}

.mask-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
}

.container-component {
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



.container-component:hover {
    background-color: #8cb6fe;
}

.header-component {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 20px;
    width: 20px;
    // background-color: rgba(225, 220, 220, 0.6);
    border-radius: 50%;
    margin: 5px;
    z-index: 22;
}

.header-component:hover {
    background-color: #141416;
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
  