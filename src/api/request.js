import axios from "axios";
//引入进度条
import nprogress from 'nprogress'
//引入进度条样式
import 'nprogress/nprogress.css'
// 引入store
import store from '@/store'

//1、对axios二次封装
const requests = axios.create({
    //基础路径，requests发出的请求在端口号后面会跟改baseURl
    baseURL: '/api',
    timeout: 5000,
})
//2、配置请求拦截器
requests.interceptors.request.use(config => {
    //config内主要是对请求头Header配置
    //比如添加token

    //1、先判断uuid_token是否为空
    if (store.state.detail.uuid_token) {
        //2、userTempId字段和后端统一
        config.headers['userTempId'] = store.state.detail.uuid_token
    }

    // 携带token给服务器
    if (store.state.user.token) {
        config.headers.token = store.state.user.token.token || store.state.user.token
    }

    //进度条开始动
    nprogress.start()
    return config;
})
//3、配置响应拦截器
requests.interceptors.response.use((res) => {
    //成功的回调函数
    //进度条停止动
    nprogress.done()
    return res.data;
}, (error) => {
    //失败的回调函数
    console.log("响应失败" + error)
    return Promise.reject(new Error('fail'))
})
//4、对外暴露
export default requests;