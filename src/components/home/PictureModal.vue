<!--
 * @Author: panrunjun
 * @Date: 2024-09-03 10:04:07
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-09-03 20:26:54
 * @Description: 图库的弹窗
 * @FilePath: \ytab-master\src\components\home\PictureModal.vue
-->
<template>
    <a-layout>
        <a-layout-sider width="150" class="site-layout-background min-h-500">
            <a-menu mode="inline" :selected-keys="[current]" @click="handleMenuClick">
                <!-- <a-menu-item key="1">推荐</a-menu-item> -->
                <a-menu-item key="2">我的</a-menu-item>
                <!-- <a-menu-item key="3">Content 3</a-menu-item> -->
            </a-menu>
        </a-layout-sider>
        <a-layout>

            <a-layout-content>
                <div v-if="current === '1'">Content 1 Displayed Here</div>
                <ContextMenu :menu="menu" @select="getSelect">
                    <div v-if="current === '2'">
                        <div class="container">
                            <div class="component">
                                <img src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                    alt="">
                                <div class="mask">
                                    <div class="mask-container">
                                        <div class="mask-component"
                                            @click="handleSelect('https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png')">
                                            <check-outlined :style="{ fontSize: '20px' }" />
                                        </div>
                                        <div class="mask-component" @click="handleLike()">
                                            <like-outlined :style="{ fontSize: '20px' }" />
                                            <!-- <div class="badge">99+</div> -->
                                        </div>
                                    </div>
                                </div>

                            </div>
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
import {
    CheckOutlined,
    LikeOutlined
} from '@ant-design/icons-vue';
export default defineComponent({
    components: {
        ContextMenu,
        CheckOutlined,
        LikeOutlined
    },
    setup(props, { emit }) {
        const current = ref<string>('1');
        const $transBackground = inject('$transBackground') as ((src: string) => void); //改变背景图
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
                        // try {
                        //   const formData = new FormData();
                        //   formData.append('file', file);

                        //   // 示例上传逻辑：使用 fetch API
                        //   const response = await fetch('YOUR_UPLOAD_URL', {
                        //     method: 'POST',
                        //     body: formData,
                        //   });

                        //   if (!response.ok) throw new Error('Upload failed');

                        //   // 假设响应是 JSON 格式
                        //   const result = await response.json();

                        //   message.success('Upload successful!');
                        // } catch (error) {
                        //   message.error('Upload failed.');
                        // }
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
            message.success('更换壁纸成功')
            $transBackground(src);
        }

        return {
            current,
            menu,
            handleMenuClick,
            handleSelect,
            getSelect,
            handleLike,
            ContextMenu,
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
    background-color: rgba(212, 40, 40, 0.6) !important;
}


.component:hover .mask {
    opacity: 1;
}
</style>
  