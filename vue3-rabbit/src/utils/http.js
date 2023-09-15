import axios from "axios";
import { ElMessage } from "element-plus";
import { useUserStore } from "@/stores/user";
import router from "@/router";

// 创建实例
const http = axios.create({
    baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
    timeout: 5000
})
// axios请求拦截器
http.interceptors.request.use(config => {
    // 1. 从pinia获取token数据
    const userStore = useUserStore()
    // 2. 按照后端的要求拼接token数据
    const token = userStore.userInfo.token
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, e => Promise.reject(e))

// axios响应式拦截器
http.interceptors.response.use(res => res.data, e => {
    console.log('报错了',e);
    ElMessage({
        type: 'warning',
        message: e.response.data.message
    })

    // token失效要清楚用户数据
    if (e.response.status === 401) {
        console.log('token失效');
        const userStore = useUserStore()
        userStore.clearUserInfo()
        router.push('/login')
    }
    return Promise.reject(e)
})

export default http