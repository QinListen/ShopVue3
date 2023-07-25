//定义懒加载插件
import { useIntersectionObserver } from '@vueuse/core'

export const lazyPlugin = {
    install(app) {
        app.directive('img-lazy', {
            mounted(el, binding) {
                //el 指令绑定的那个元素
                //binding binding.value 指令等于后面绑定的表达式的值 图片url
                // console.log(el, binding.value);
                const { stop } = useIntersectionObserver(
                    el,
                    ([{ isIntersecting }]) => {
                        // console.log(isIntersecting);
                        // 为true表示进入了视口区域
                        if (isIntersecting) {
                            el.src = binding.value
                            // 第一次加载完成只后就停止监听了防止重复监听
                            stop()
                        }
                    },
                )
            }
        })
    }
}