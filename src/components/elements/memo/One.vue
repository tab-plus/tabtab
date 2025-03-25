<template>
  <div class="box">
    <div class="flex flex-direction justify-around align-center">
      <div class="memoItemOne-bgColor icon">备忘录</div>
      <p class="cl-ant-p sg-omit-sm text-white-sm">备忘录</p>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.box {
  width: 80px;
  border-radius: 5px;
  margin: 20px;
}
.memoItemOne-bgColor {
    background-color: #ffb716;
    color: white;
    width: 60px;
    height: 60px;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: 600;
}
</style>