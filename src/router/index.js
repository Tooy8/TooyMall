import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入store
import store from '@/store'
//使用插件
Vue.use(VueRouter)
// 引入路由组件
import routes from './routes';

//1、先把VueRouter原型对象的push，保存一份
let originPush = VueRouter.prototype.push;
//2、重写push|replace
//第一个参数：告诉原来的push，跳转的目标位置和传递了哪些参数
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}



// 配置路由
let router = new VueRouter({
    // 配置路由
    routes,
    // 滚动行为
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { y: 0 }
    },
})


// 全局守卫,前置守卫
router.beforeEach(async (to, from, next) => {
    let token = store.state.user.token
    let name = store.state.user.userInfo.name
    //登录了(有token)
    if (token) {
        //不准去登录页面
        if (to.path == '/login') { next('/home') }
        else {
            //判断有无用户信息
            if (name) { next() }
            else {
                //没有用户信息就派发action
                try {
                    await store.dispatch("getUserInfo")
                    next()
                } catch (error) {
                    // 失败原因:token过期,要清除token
                    await store.dispatch("userLogout")
                    next('/login')
                }
            }
        }
    }
    // 未登录(无token)
    else {
        let toPath = to.path
        if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1 || toPath.indexOf('/shopcart') != -1) {
            // 把未登录时想去的做成信息
            next('/login?redirect=' + toPath)
        }
        else {
            next()
        }

    }
})


export default router