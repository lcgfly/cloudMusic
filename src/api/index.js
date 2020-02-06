import axios from "axios";
import { banner, login_phone,logout } from "./config";

export default {
    /**
     * 发现页轮播图
     */
    getBanner() {
        return axios.get(banner)
    },
    /**
     * 手机号+密码登录
     * @param {String} phone 手机号
     * @param {String} pwd 密码
     */
    loginByPhone(phone, pwd) {
        return axios.post(login_phone, {
            phone: phone,
            password: pwd
        })
    },
    logout(){
        return axios.get(logout)
    }
}