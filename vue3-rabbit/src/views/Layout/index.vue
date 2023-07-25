<script setup>
import LayoutSticky from "@/views/Layout/components/LayoutSticky.vue";
import LayoutHeader from "@/views/Layout/components/LayoutHeader.vue";
import LayoutNav from "@/views/Layout/components/LayoutNav.vue";
import LayoutFooter from "@/views/Layout/components/LayoutFooter.vue";

// 触发获取导航列表的action
import { useCateGoryStore } from "@/stores/category";
import { onMounted } from "vue";

// 这里拿数据的事时候记得先赋值给变量，然后再在模板中使用，否则会报错
const CateGoryStore = useCateGoryStore();

onMounted(()=>{
  CateGoryStore.getCategory()
})
</script>

<template>
  <div>
    <LayoutSticky></LayoutSticky>
    <LayoutHeader></LayoutHeader>
    <LayoutNav></LayoutNav>
    <!-- 刷新页面 -->
    <!-- <RouterView :key="$route.fullPath"></RouterView> -->
    <RouterView></RouterView>
    <LayoutFooter></LayoutFooter>
    <!-- 二级路由出口 -->
  </div>
</template>