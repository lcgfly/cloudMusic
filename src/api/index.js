import axios from "axios";
import {
    banner,
    login_phone,
    logout,
    daily_recommend,
    login_status,
    lyric,
    song_url,
    playlist_hot,
    playlist_top,
    playlist_highquality,
    playlist_detail,
    toplist_detail,
    playlist_recommend,
    artist_hot,
    artist_song,
    artist_desc,
    user_playlist
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
    },
    /**
     * 
     * @param {String} tag 分类标签：华语、流行...
     * @param {Number} limit 数据限制
     */
    getPlaylistTop(tag,limit=30){
        return axios.get(playlist_top,{
            params:{
                cat:tag,
                limit:limit
            }
        })
    },
    /**
     * 
     * @param {Number} updateTime 分页参数,取上一页最后一个歌单的 updateTime 获取下一页数据 
     * @param {Number} limit    数据限制 
     */
    playlist_highquality(updateTime,limit=30){
        if(updateTime==undefined){
            return axios.get(playlist_highquality,{
                params:{
                    limit:limit
                }
            })
        }
        else{
            return axios.get(playlist_highquality,{
                params:{
                    limit:limit,
                    before:updateTime
                }
            })
        }
    },
    /**
     * 
     * @param {Number} id   歌单id 
     */
    getPlaylistDetail(id){
        return axios.get(playlist_detail,{
            params:{
                id:id
            }
        })
    },
    getToplistDetail(){
        return axios.get(toplist_detail)
    },
    getPlaylistRecommend(){
        return axios.get(playlist_recommend)
    },
    /**
     * 
     * @param {Number} limit 取出数量
     * @param {Number} offset 页面偏移量 默认0为第一页，所以不用-1
     */
    getArtistHot(offset=0,limit=30){
        return axios.get(artist_hot,{
            params:{
                offset:offset*limit,
                limit:limit
                
            }
        })
    },
    /**
     * 获得歌手热门歌曲(50首)
     * @param {Number} id   歌手id 
     */
    getArtistSong(id){
        return axios.get(artist_song,{
            params:{
                id:id
            }
        })
    },
    /**
     * 
     * @param {Number} id 歌手id 
     */
    getArtistDesc(id){
        return axios.get(artist_desc,{
            params:{
                id:id
            }
        })
    },
    /**
     * 
     * @param {Number} uid  用户的uid 
     */
    getUserPlaylist(uid){
        return axios.get(user_playlist,{
            params:{
                uid:uid
            }
        })
    }
}