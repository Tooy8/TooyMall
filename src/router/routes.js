// 引入路由组件
// import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from "@/pages/Pay"
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
// 引入二级路由
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'

export default [
    // 路由懒加载写法
    { path: '/home', component: () => import('@/pages/Home'), meta: { show: true } },
    //--------------
    { path: '/search/:keyword?', component: Search, meta: { show: true }, name: 'search' },
    { path: '/login', component: Login, meta: { show: false } },
    { path: '/register', component: Register, meta: { show: false } },
    { path: '/detail/:skuid', component: Detail, meta: { show: true } },
    { path: '/addcartsuccess', name: 'addcartsuccess', component: AddCartSuccess, meta: { show: true } },
    { path: '/shopcart', component: ShopCart, meta: { show: true } },
    {
        path: '/trade', component: Trade, meta: { show: true },
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            if (from.path == '/shopcart') { next() } else { next(false) }
        }
    },
    {
        path: '/pay', component: Pay, meta: { show: true },
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            if (from.path == '/trade') { next() } else { next(false) }
        }
    },
    {
        path: '/paysuccess', component: PaySuccess, meta: { show: true },
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            if (from.path == '/pay') { next() } else { next(false) }
        }
    },
    { path: '/center', component: Center, meta: { show: true }, children: [{ path: 'myOrder', component: MyOrder }, { path: 'groupOrder', component: GroupOrder }, { path: '/center', redirect: '/center/myOrder' }] },


    // 重定向，在项目跑起来的时候，访问/ ，立马让他定向回到首页
    { path: '/', redirect: '/home' },

]