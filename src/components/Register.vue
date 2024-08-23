<template>
    <a-form
      :model="formState"
      name="basic"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 12 }"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
      style="margin:20px 0px ;"
    >
      <a-form-item
        label="Account"
        name="account"
        :rules="[{ required: true, message: 'Please input your account!' }]"
      >
        <a-input v-model:value="formState.account" />
      </a-form-item>
  
      <a-form-item
        label="Password"
        name="password"
        :rules="[{ required: true, message: 'Please input your password!' }]"
      >
        <a-input-password v-model:value="formState.password" />
      </a-form-item>
  
  
      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit">确 定</a-button>
      </a-form-item>
    </a-form>
  </template>
  <script lang="ts">
  import { registerApi } from '@/api/user';
import { message } from 'ant-design-vue';
import { defineComponent, reactive } from 'vue';
  
  interface FormState {
    account: string;
    password: string;
    remember: boolean;
  }
  export default defineComponent({
    setup() {
      const formState = reactive<FormState>({
        account: '',
        password: '',
        remember: true,
      });
      const onFinish = (values: any) => {
        console.log('Success:', values);
        registerApi(values).then((res:any)=>{
            console.log(res,111);
            if(res.code==200){
                message.success('注册成功')
            }else{
                message.error(res.message)
            }
            
        })
      };
  
      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
      };
      return {
        formState,
        onFinish,
        onFinishFailed,
      };
    },
  });
  </script>
  
  