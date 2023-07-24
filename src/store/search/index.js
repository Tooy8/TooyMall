import { reqGetSearchInfo } from '@/api'

//search模块的小仓库
const actions = {
    //获取search模块数据
    async getSearchList({ commit }, params) {
        let result = await reqGetSearchInfo(params)
        if (result.code == 200) {
            commit('GETSEARCHLIST', result.data)
        }
    }
}
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList
    }
}
const state = {
    //仓库初始状态
    searchList: {}
}
// 简化数据
const getters = {
    // state是当前仓库中的
    goodsList(state) {
        return state.searchList.goodsList || []
    },
    attrsList(state) {
        return state.searchList.attrsList || []
    },
    trademarkList(state) {
        return state.searchList.trademarkList || []
    },
}

export default {
    actions, mutations, state, getters
}