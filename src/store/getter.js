import state from "./state";

export default {
    isAudioListEmpty: state => state.audioList.length > 0   //查看播放列表是否为空
}