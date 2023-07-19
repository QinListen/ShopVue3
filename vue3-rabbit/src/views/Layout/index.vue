<script setup>
import LayoutHeader from "@/views/Layout/components/LayoutHeader.vue";
import LayoutNav from "@/views/Layout/components/LayoutNav.vue";
import LayoutFooter from "@/views/Layout/components/LayoutFooter.vue";
</script>

<template>
  <div>
    <LayoutHeader></LayoutHeader>
    <LayoutNav></LayoutNav>
    <RouterView></RouterView>
    <LayoutFooter></LayoutFooter>
    <!-- 二级路由出口 -->
  </div>
</template>