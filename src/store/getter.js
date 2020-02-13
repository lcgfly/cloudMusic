

export default {
    AUDIOLIST_EMPTY: state => state.audioList.length <= 0,   //查看播放列表是否为空
    AUDIO_PLAY_ING: state => state.audioList[state.audioIndex] || {}    //当前播放的歌曲信息
}