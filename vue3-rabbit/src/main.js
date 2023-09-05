import '@/styles/common.scss' // global css

import { createApp } from 'vue'
import { createPinia } from 'pinia'
// 引入pinia插件 用于持久化存储
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
// 引入懒加载插件
import { lazyPlugin } from '@/directives/index.js'
// 引入全局组件插件
import { componentPlugin } from '@/components'
const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.use(lazyPlugin)
app.use(componentPlugin)
app.mount('#app')

