import {
    CHECK_LOGIN,
    AUDIOLIST_REPLACE,
    SET_AUDIO_INDEX,
    AUDIOLIST_CLEAR,
    FULLSCREEN_TOGGLE,
    PLAYING_TOGGLE,
    MODE_TOGGLE
} from "./mutation-types";

export default {
    /**
     * @param {Number} loginType 0:未登录 1:已登录
     */
    [CHECK_LOGIN](state, loginType) {
        state.LOGIN_STATE = loginType
    },
    /**
     * @param {Array} data 含有歌曲信息的数组，数组元素是对象，对象对应每首歌
     */
    [AUDIOLIST_REPLACE](state, data) {
        state.audioList = data
    },
    /**
     * 设置当前播放索引
     * @param {Number} index audioList里面的索引
     */
    [SET_AUDIO_INDEX](state, index) {
        state.audioIndex = index
    },
    /**
     * 清空当前播放队列
     */
    [AUDIOLIST_CLEAR](state) {
        state.audioList = []
    },
    /**
     * 切换是否全屏播放
     */
    [FULLSCREEN_TOGGLE](state) {
        state.fullScreen = !state.fullScreen
    },
    [PLAYING_TOGGLE](state) {
        state.playing = !state.playing
    },
    /**
     * 
     * @param {Number} type 模式类型0|1|2 
     */
    [MODE_TOGGLE](state, type) {
        state.mode = type
    }
}