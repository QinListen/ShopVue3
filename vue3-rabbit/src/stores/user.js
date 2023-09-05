import { ref } from 'vue'
import { defineStore } from 'pinia'
import { loginApi } from "@/apis/user.js";


export const useUserStore = defineStore('user', () => {
    // d定义用户数据的state
    const userInfo = ref({})
    const getUserInfo = async ({ account, password }) => {
        const res = await loginApi({ account, password });
        userInfo.value = res.result
    };
    return { userInfo, getUserInfo }
},
    {
        persist: true,
    })
