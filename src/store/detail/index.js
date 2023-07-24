import { reqGoodsInfo, reqAddOrUpdateShopCart } from "@/api"
// 游客临时身份模块
import { getUUID } from '@/utils/uuid_token'

const state = {
    goodInfo: [],
    // 游客临时身份
    uuid_token: getUUID()
}
const actions = {
    //获取产品信息的action
    async getGoodInfo({ commit }, skuid) {
        let result = await reqGoodsInfo(skuid)
        if (result.code == 200) {
            commit('GETGOODINFO', result.data)
        }
    },
    //将产品添加到购物车中
    async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
        let result = await reqAddOrUpdateShopCart(skuId, skuNum)
        if (result.code == 200) {
            //成功
            return 'ok'
        } else {
            // 失败
            return Promise.reject(new Error('faile'))
        }

    }
}
const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo
    }
}
const getters = {
    //路径导航
    categoryView(state) {
        return state.goodInfo.categoryView || {}
    },
    // 产品信息
    skuInfo(state) {
        return state.goodInfo.skuInfo || {}
    },
    // 产品售卖属性
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || []
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}