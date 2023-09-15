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

    // 退出时清除用户信息
    const clearUserInfo = () => {
        userInfo.value = {}
    }

    return { userInfo, getUserInfo, clearUserInfo }
},
    {
        //这是一个插件，会在每次调用mutation时触发  用于持久化数据 相当于自己封装的localStorage
        persist: true,
    })
