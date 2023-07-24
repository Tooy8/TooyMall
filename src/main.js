import Vue from 'vue'
import App from './App.vue'
// 三级联动组件--全局组件
import TypeNav from '@/components/TypeNav'
//轮播图--全局组件
import Carousel from '@/components/Carousel'
//分页器--全局组件
import Pagination from '@/components/Pagination'
// 引入element
import { Button, MessageBox } from 'element-ui';
// 第一个参数：全局组件的名字，第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)
// 使用element
Vue.component(Button.name, Button);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
//引入路由
import router from '@/router'
//引入store(仓库)
import store from './store'
//引入mockServe.js
import '@/mock/mockServe'
//引入swiper
import 'swiper/swiper-bundle.css'

// 统一接收api文件夹里的所有请求函数
import * as API from '@/api'

// 引入插件（懒加载）
import VueLazyload from 'vue-lazyload'
// 引入图片
import ljz from '@/assets/1.jpg'
// 注册
Vue.use(VueLazyload, {
  // 图片
  loading: ljz
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  //配置全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  // 注册路由
  router,
  //注册仓库
  store
}).$mount('#app')
