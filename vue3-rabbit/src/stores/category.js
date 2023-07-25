import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getCategoryAPI } from "@/apis/layout";

export const useCateGoryStore = defineStore('category', () => {
    // 防止重复调用，这里使用pinia来管理在父组件调用两个子组件拿这个数据就行了
    const categoryList = ref({})
    const getCategory = async () => {
        const res = await getCategoryAPI();
        categoryList.value = res.result
    };
    return { categoryList, getCategory }
})
