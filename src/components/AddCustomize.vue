<!--
 * @Author: panrunjun
 * @Date: 2024-07-28 14:18:41
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-09-06 18:08:09
 * @Description: 输入url添加icon
 * @FilePath: \ytab-master\src\components\AddCustomize.vue
-->
<template>
    <div class="body">
        <a-form :model="formState" style="width: 500px;" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }"
            autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed">
            <a-form-item label="链接地址" name="url">
                <a-input v-model:value="urlValue">
                    <template #addonBefore>
                        <a-select v-model:value="httpValue" style="width: 90px">
                            <a-select-option value="Http://">Http://</a-select-option>
                            <a-select-option value="Https://">Https://</a-select-option>
                            <a-select-option value=""></a-select-option>
                        </a-select>
                    </template>
                    <template #addonAfter>
                        <a-select v-model:value="comValue" style="width: 80px">
                            <a-select-option value=".com">.com</a-select-option>
                            <a-select-option value=".jp">.jp</a-select-option>
                            <a-select-option value=".cn">.cn</a-select-option>
                            <a-select-option value=".org">.org</a-select-option>
                            <a-select-option value=""></a-select-option>
                        </a-select>
                    </template>
                </a-input>
                <!-- <a-input v-model:value="formState.url" /> -->
            </a-form-item>

            <a-form-item label="名称" name="name">
                <a-input v-model:value="formState.name" />
            </a-form-item>

            <a-form-item label="图标地址" name="src">
                <a-input placeholder="不填则自动获取" v-model:value="formState.src" />
            </a-form-item>

            <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                <a-button type="primary" html-type="submit">确 定</a-button>
            </a-form-item>
            <a-form-item label="tip" name="tip">
                <div>网页链接前带 <span class="tab-red">https://</span> or <span class="tab-red">http://</span> </div>
                <div>eg:https://www.baidu.com</div>
            </a-form-item>
        </a-form>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { v4 as uuidv4 } from 'uuid';
interface FormState {
    url: string;
    name: string;
    src: string;
    id: string;
    type: string;
}
export default defineComponent({
    emits: ['addNewWidget'], // 声明子组件可以触发的事件
    setup(props, { emit }: { emit: Function }) {
        const route = useRoute();
        const $message: { success: Function } = inject('$message')!
        const formState = reactive<FormState>({
            url: '',
            name: '',
            src: '',
            id: '',
            type: ''
        });
        const urlValue = ref('');
        const httpValue = ref('https://');
        const comValue = ref('.com');
        const onFinish = (values: FormState) => {
            const uniqueID = uuidv4();
            console.log('Success:', values);
            values.id = uniqueID;
            values.type = 'icon';
            values.url = `${httpValue.value}${urlValue.value}${comValue.value}`;
            // 获取icon
            if (values.src === '') {
                values.src = values.url + '/favicon.ico'
            }
            emit('addNewWidget', values);
            // 1. 获取存储的数组
            let garids = JSON.parse(localStorage.getItem(route.name as string)) || [];
            // 2. 修改数组（例如，添加新元素）
            garids.icon.push(values);
            // 3. 重新存储数组
            localStorage.setItem(route.name as string, JSON.stringify(garids));
            $message.success(`添加成功`);
            formState.url = ''
            formState.name = ''
            formState.src = ''
            urlValue.value = ''
        };

        const onFinishFailed = (errorInfo: any) => {
            console.log('Failed:', errorInfo);
        };
        return {
            formState,
            urlValue,
            httpValue,
            comValue,
            onFinish,
            onFinishFailed,
        };
    },
});
</script>

<style scoped>
.body {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    height: 500px;
    padding: 10px;
}
</style>
  
  