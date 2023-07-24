import { reqCategoryList, reqGetBannerList, reqGetFloorList } from '@/api'
//home模块的小仓库
const state = {
    //三级菜单数据
    categoryList: [],
    // 轮播图数据
    bannerList: [],
    //floor数据
    floorList: []
}

const mutations = {
    CETEGORYLIST(state, categoryList) {
        state.categoryList = categoryList
    },
    //轮播图
    CETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList
    },
    //floor
    CETFLOORLIST(state, floorList) {
        state.floorList = floorList
    },
}

const actions = {
    //通过api里的接口函数调用，向服务器发请求，获取服务器数据
    async categoryList({ commit }) {
        let result = await reqCategoryList()
        if (result.code == 200) {
            commit("CETEGORYLIST", result.data)
        }
    },
    //获取首页轮播图的数据
    async getBannerList({ commit }) {
        let result = await reqGetBannerList()
        if (result.code == 200) {
            commit("CETBANNERLIST", result.data)
        }
    },
    //获取floor数据
    async getFloorList({ commit }) {
        let result = await reqGetFloorList()
        if (result.code == 200) {
            commit("CETFLOORLIST", result.data)
        }
    },
}



const getters = {}

export default {
    actions, mutations, state, getters
}