const api = 'api';

export const banner = api+'/banner?type=1'    //首页轮播图，0:PC 1:Android 2:iphone 3:ipad
export const login_phone = api+'/login/cellphone' //手机+密码登录接口
export const logout = api+'/logout' //退出登录
export const daily_recommend = api+'/recommend/songs'   //每日推荐歌曲
export const login_status = api+'/login/status' //验证登录状态
export const song_url = api+'/song/url' //获取歌曲url
export const lyric = api+'/lyric'   //获取歌词
export const playlist_hot = api+'/playlist/hot' //热门歌单分类
export const playlist_top = api+'/top/playlist' //对应分类的歌单
export const playlist_highquality = api+'/top/playlist/highquality' //获取精品歌单
export const playlist_detail = api+'/playlist/detail'   //获取歌单详情
export const toplist_detail = api+'/toplist/detail' //所有榜单的内容摘要
export const playlist_recommend = api+'/recommend/resource' //每日推荐歌单，需登录
export const artist_hot = api+'/top/artists'    //热门歌手
export const artist_song =api+'/artists'    //获取歌手热门歌曲
export const artist_desc = api+'/artist/desc'   //获取歌手描述
export const user_playlist = api+ '/user/playlist'  //获取用户歌单
export const user_record = api+'/user/record'   //最近播放记录
export const search_suggest = api + '/search/suggest'   //搜索建议
