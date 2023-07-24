// 该文件用于创建veux中最核心的store
//引入Vue核心库
import Vue from 'vue'
// 引入vuex
import Vuex from 'vuex'
// 使用Vuex插件
Vue.use(Vuex)

// // 准备actions--用于响应组件中的动作
// const actions = {}
// // 准备mutations--用于操作数据(state)
// const mutations = {}
// // 准备state--用于存储数据
// const state = {}
// //准备getters--用于简化仓库数据
// const getters = {}

//引入小仓库
import home from './home'
import search from './search'
import detail from './detail'
import shopcart from './shopcart'
import user from './user'
import trade from './trade'

// 创建并暴露store
export default new Vuex.Store({
    //实现vuex仓库模块式开发存储数据
    modules: {
        home,
        search,
        detail,
        shopcart,
        user,
        trade
    }
})