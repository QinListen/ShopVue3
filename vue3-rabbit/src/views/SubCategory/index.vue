<script setup>
import { getCategoryFilterAPI, getSubCategoryAPI } from "@/apis/category";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import GoodsItem from "@/views/Home/components/GoodsItem.vue";
const categoryData = ref({});
const route = useRoute();
// 获取面包屑的数据
const getCategoryData = async () => {
  const res = await getCategoryFilterAPI(route.params.id);
  categoryData.value = res.result;
};
onMounted(() => {
  getCategoryData();
});

const list = ref({});
const reqData = ref({
  categoryId: route.params.id,
  page: 1,
  pageSize: 20,
  sortField: "publishTime",
});
const geyList = async () => {
  const res = await getSubCategoryAPI(reqData.value);
  console.log(res);
  list.value = res.result.items;
};
onMounted(() => {
  geyList();
});
// 改变排序
const tabChange = (e) => {
  console.log(e);
  reqData.value.page = 1;
  reqData.value.sortField = e;
  geyList();
};
const disabled = ref(false);
// 无线滚动
const load = async () => {
  reqData.value.page++;
  const res = await getSubCategoryAPI(reqData.value);
  list.value = [...list.value, ...res.result.items];
  // 加载完毕 停止监听
  if (res.result.items.length === 0) {
    disabled.value = true;
  }
  console.log("load");
};
</script>

<template>
  <div class="container">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/${categoryData.parentId}` }"
          >{{ categoryData.parentName }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ categoryData.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <!-- 绑定默认数据增加点击事件用于修改列表排序 -->
      <el-tabs v-model="reqData.sortField" @tab-change="tabChange">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <!-- elm的无线滚动插件 -->
      <div
        class="body"
        v-infinite-scroll="load"
        :infinite-scroll-disabled="disabled"
      >
        <!-- 商品列表-->
        <GoodsItem :good="good" v-for="good in list" :key="good.id"></GoodsItem>
      </div>
    </div>
  </div>
</template>



<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>