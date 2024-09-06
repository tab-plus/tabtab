<template>
    <a-form :model="loginState" name="normal_login" class="login-form" @finish="onFinish" @finishFailed="onFinishFailed">
        <a-form-item label="Username" name="account" :rules="[{ required: true, message: 'Please input your account!' }]">
            <a-input v-model:value="loginState.account">
                <template #prefix>
                    <UserOutlined class="site-form-item-icon" />
                </template>
            </a-input>
        </a-form-item>

        <a-form-item label="Password" name="password" :rules="[{ required: true, message: 'Please input your password!' }]">
            <a-input-password v-model:value="loginState.password">
                <template #prefix>
                    <LockOutlined class="site-form-item-icon" />
                </template>
            </a-input-password>
        </a-form-item>

        <a-form-item>
            <a-form-item name="remember" no-style>
                <a-checkbox v-model:checked="loginState.remember">Remember me</a-checkbox>
            </a-form-item>
            <a class="login-form-forgot" href="">Forgot password</a>
        </a-form-item>

        <a-form-item>
            <a-button :disabled="disabled" type="primary" html-type="submit" class="login-form-button">
                登 录
            </a-button>
            Or
            <a @click="openRegister()">去注册!</a>
        </a-form-item>

        <!-- 注 册 -->
        <a-modal v-model:visible="registerVisible" title="注 册" @ok="registerVisible = false;">
            <Register></Register>
        </a-modal>
    </a-form>
</template>
<script lang="ts">
import { defineComponent, reactive, computed } from 'vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { login } from '@/api/user';
import { LoginState } from '@/types/login';
import  Register  from '@/components/Register.vue'
import { useUserStore } from '@/store/user';
interface LoginForm extends LoginState {
    remember: boolean;
}
export default defineComponent({
    components: {
        UserOutlined,
        LockOutlined,
        Register
    },
    emits: ['closeLogin'], // 声明子组件可以触发的事件

    setup(props, { emit }: { emit: Function }) {
        const $message: { success: Function, error: Function } = inject('$message')!
        const userStore = useUserStore()
        const loginState = reactive<LoginForm>({
            account: '',
            password: '',
            remember: true,
        });
        const registerVisible = ref<boolean>(false);
        const onFinish = (values: any) => {
            console.log('Success:', values);
            login(loginState).then((res: any) => {
                console.log(res);
                if (res.code === 200) {
                    $message.success(res.message);
                    userStore.LOGIN(res.data.token)
                    emit('closeLogin');
                } else {
                }
            })
        };

        const onFinishFailed = (errorInfo: any) => {
            console.log('Failed:', errorInfo);
        };
        const disabled = computed(() => {
            return !(loginState.account && loginState.password);
        });

        const openRegister = () => {
            registerVisible.value = true

        }
        return {
            loginState,
            onFinish,
            onFinishFailed,
            disabled,
            openRegister,
            registerVisible,
        };
    },
});
</script>
<style>
#components-form-demo-normal-login .login-form {
    max-width: 300px;
}

#components-form-demo-normal-login .login-form-forgot {
    float: right;
}

#components-form-demo-normal-login .login-form-button {
    width: 100%;
}
</style>
  