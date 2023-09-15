import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', () => {
    // 1.定义数据
    const cartList = ref([])
    // 2.定义方法
    const addCart = (goods) => {
        // 3.添加购物车操作
        // 已经添加过+1 没有的话加入
        const index = cartList.value.findIndex(item => item.skuId === goods.skuId)
        if (index === -1) {
            // 没有添加过
            cartList.value.push(goods)
        } else {
            cartList.value[index].count++
        }
        console.log(cartList.value);
    }

    const delCart = (skuId) => {
        let data = cartList.value.filter(item => item.skuId !== skuId)
        cartList.value = data
    }

    // 单选功能
    const singleCheck = (selected, skuId) => {
        let item = cartList.value.find(item => item.skuId === skuId)
        item.selected = selected
    }
    // 全选
    const allCheck = (selected) => {
        cartList.value.forEach(item => item.selected = selected)
    }
    // 计算属性
    // 1.总数
    let allCount = computed(() => {
        return cartList.value.reduce((prev, item) => prev + item.count, 0)
    })
    // 2.总价
    let allPrice = computed(() => {
        return cartList.value.reduce((prev, item) => prev + item.count * item.price, 0)
    })
    // 当前是否全部选中
    let isAllSelected = computed(() => {
        return cartList.value.every(item => item.selected)
    })
    // 3.已经选中的数量
    let selectedCount = computed(() => {
        return cartList.value.filter(item => item.selected).reduce((prev, item) => prev + item.count, 0)
    })
    // 4.已经选中的商品价格合计
    let selectedPrice = computed(() => {
        return cartList.value.filter(item => item.selected).reduce((prev, item) => prev + item.count * item.price, 0)
    })
    return { cartList, addCart, delCart, allCount, allPrice, singleCheck, allCheck, isAllSelected, selectedCount, selectedPrice }
}, {
    persist: true,
})