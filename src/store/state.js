export default{
    LOGIN_STATE:0,  //用户登录状态 0:未登录 1:登录
    fullScreen:false, //播放页是否开启全屏
    playing:true,   //歌曲是否正在播放，默认暂停
    audioList:[],    //播放列表
    audioIndex:-1,  //播放歌曲的索引
    mode:0  //0：列表循环 1：单曲循环 2：随机播放
}