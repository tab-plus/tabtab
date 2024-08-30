<template>
    <div>
        <ContextMenu :menu="menu" @select="getSelect">
        <div style="height:500px;width:500px;background-color:white;"></div>
        </ContextMenu>
    </div>
</template>

<script lang="ts" setup>
import ContextMenu from '@/components/ContextMenu.vue'
const menu = ref([
    { label: '复制', icon: 'copy' }
]) 

const getSelect =(e)=>{
    console.log('复制',e)
}
</script>

<style></style>