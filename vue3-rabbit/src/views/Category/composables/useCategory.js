// 分类业务代码
import { onBeforeRouteUpdate } from "vue-router";
import { getTopCategoryAPI } from "@/apis/category.js";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
export function useCategory() {
    const categoryList = ref({});
    const route = useRoute();

    // 传了就用传过来的id，没有就默认路由的id
    const getCategoryList = async (id = route.params.id) => {
        const res = await getTopCategoryAPI(id);
        categoryList.value = res.result;
    };
    onMounted(() => {
        getCategoryList();
    });
    // 判断下页面路由改变了，就重新获取数据，像这里bananr的数据是一样的不用改变就只调用分类接口就行
    onBeforeRouteUpdate((to) => {
        getCategoryList(to.params.id);
    });
    return {
        categoryList,
    };
}