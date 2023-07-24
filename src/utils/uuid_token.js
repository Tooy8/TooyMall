import { v4 as uuidv4 } from 'uuid'
//生成临时游客的uuid（随机字符串）,每个用户的uuid不能发生变化，还要持久存储
export const getUUID = () => {
    //1、判断本地存储是否由uuid
    let uuid_token = localStorage.getItem('UUIDTOKEN')
    //2、本地存储没有uuid
    if (!uuid_token) {
        //2.1生成uuid
        uuid_token = uuidv4()
        //2.2存储本地
        localStorage.setItem("UUIDTOKEN", uuid_token)
    }
    //当用户有uuid时就不会再生成
    return uuid_token
}
