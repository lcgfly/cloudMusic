import axios from "axios";
import {
    banner,
    login_phone,
    logout,
    daily_recommend,
    login_status,
    lyric,
    song_url,
    playlist_hot
} from "./config";

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
    /**
     * 退出登录
     */
    logout() {
        return axios.get(logout)
    },
    /**
     * 获取每日推荐歌曲
     */
    DailyRecommendSongs() {
        return axios.get(daily_recommend)
    },
    /**
     * 获取登录状态
     */
    getLoginStatus() {
        return axios.get(login_status)
    },
    /**
     * 获取歌词
     * @param {String} id 歌曲id
     */
    getLyric(id) {
        return axios.get(lyric, {
            params: {
                id: id
            }
        })
    },
    /**
     * 获取歌曲url
     * @param {String} id 歌曲id
     */
    getSongUrl(id){
        return axios.get(song_url,{
            params:{
                id:id
            }
        })
    },
    getPlaylistHot(){
        return axios.get(playlist_hot)
    }
}