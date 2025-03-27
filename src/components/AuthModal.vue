<template>
    <a-modal v-model:visible="props.visible" :title="null" :footer="null" :width="500" @cancel="handleCancel">
        <a-tabs v-model:activeKey="activeKey" centered>
            <a-tab-pane key="login" tab="登录">
                <a-form :model="loginState" name="login_form" @finish="handleLogin" @finishFailed="onFinishFailed">
                    <a-form-item name="account" :rules="[{ required: true, message: '请输入账号!' }]">
                        <a-input v-model:value="loginState.account" placeholder="账号">
                            <template #prefix>
                                <UserOutlined />
                            </template>
                        </a-input>
                    </a-form-item>

                    <a-form-item name="password" :rules="[{ required: true, message: '请输入密码!' }]">
                        <a-input-password v-model:value="loginState.password" placeholder="密码">
                            <template #prefix>
                                <LockOutlined />
                            </template>
                        </a-input-password>
                    </a-form-item>

                    <a-form-item>
                        <a-checkbox v-model:checked="loginState.remember">记住我</a-checkbox>
                        <a class="login-form-forgot" style="float: right">忘记密码?</a>
                    </a-form-item>

                    <a-form-item>
                        <a-button type="primary" html-type="submit" :disabled="loginDisabled" block>
                            登录
                        </a-button>
                    </a-form-item>
                </a-form>
            </a-tab-pane>

            <a-tab-pane key="register" tab="注册">
                <a-form :model="registerState" name="register_form" @finish="handleRegister" @finishFailed="onFinishFailed">
                    <a-form-item name="account" :rules="[{ required: true, message: '请输入账号!' }]">
                        <a-input v-model:value="registerState.account" placeholder="账号">
                            <template #prefix>
                                <UserOutlined />
                            </template>
                        </a-input>
                    </a-form-item>

                    <a-form-item name="password" :rules="[{ required: true, message: '请输入密码!' }]">
                        <a-input-password v-model:value="registerState.password" placeholder="密码">
                            <template #prefix>
                                <LockOutlined />
                            </template>
                        </a-input-password>
                    </a-form-item>

                    <a-form-item>
                        <a-button type="primary" html-type="submit" :disabled="registerDisabled" block>
                            注册
                        </a-button>
                    </a-form-item>
                </a-form>
            </a-tab-pane>
        </a-tabs>
    </a-modal>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, ref, onBeforeUnmount } from 'vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { login, registerApi } from '@/api/user';
import { LoginState } from '@/types/login';
import { useUserStore } from '@/store/user';
import { message } from 'ant-design-vue';

interface AuthForm extends LoginState {
    remember: boolean;
}

export default defineComponent({
    name: 'AuthModal',
    components: {
        UserOutlined,
        LockOutlined,
    },
    props: {
        visible: {
            type: Boolean,
            required: true
        }
    },
    emits: ['update:visible'],
    setup(props, { emit }) {
        const activeKey = ref('login');
        const userStore = useUserStore();

        const loginState = reactive<AuthForm>({
            account: '',
            password: '',
            remember: true,
        });

        const registerState = reactive<AuthForm>({
            account: '',
            password: '',
            remember: false,
        });

        const loginDisabled = computed(() => {
            return !(loginState.account && loginState.password);
        });

        const registerDisabled = computed(() => {
            return !(registerState.account && registerState.password);
        });

        const handleLogin = (values: any) => {
            login(loginState).then((res: any) => {
                if (res.code === 200) {
                    message.success(res.message);
                    userStore.LOGIN(res.data.token);
                    handleCancel();
                } else {
                    message.error(res.message);
                }
            });
        };

        const handleRegister = (values: any) => {
            registerApi(registerState).then((res: any) => {
                if (res.code === 200) {
                    message.success('注册成功');
                    activeKey.value = 'login';
                } else {
                    message.error(res.message);
                }
            });
        };

        const onFinishFailed = (errorInfo: any) => {
            console.log('Failed:', errorInfo);
        };

        const handleCancel = () => {
            emit('update:visible', false);
            loginState.account = '';
            loginState.password = '';
            registerState.account = '';
            registerState.password = '';
        };

        onBeforeUnmount(() => {
            emit('update:visible', false);
        });

        return {
            activeKey,
            loginState,
            registerState,
            loginDisabled,
            registerDisabled,
            handleLogin,
            handleRegister,
            onFinishFailed,
            handleCancel,
            props
        };
    },
});
</script>

<style scoped>
.ant-form {
    padding:0 40px;
}

.login-form-forgot {
    color: #1890ff;
    text-decoration: none;
}

.login-form-forgot:hover {
    text-decoration: underline;
}

:deep(.ant-modal) {
    position: fixed;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%);
    margin: 0 !important;
}

:deep(.ant-modal-content) {
    border-radius: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

:deep(.ant-tabs-nav) {
    margin-bottom: 24px;
}
</style>