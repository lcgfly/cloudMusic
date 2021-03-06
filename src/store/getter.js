

export default {
    AUDIOLIST_EMPTY: state => state.audioList.length <= 0,   //查看播放列表是否为空
    AUDIO_LIST_LENGTH:state =>state.audioList.length,   //播放列表长度
    AUDIO_PLAY_ING: state => state.audioList[state.audioIndex] || {},    //当前播放的歌曲信息
    AUDIO_CURRENT_INDEX:state => state.audioIndex   //返回当前播放歌曲索引
}