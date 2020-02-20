export default {
    _playAll({ commit }, {list, index}) {
        //点击播放全部按钮的策略是每点击一次，就更新播放队列一次
        commit('AUDIOLIST_CLEAR');
        //替换当前播放队列
        commit('AUDIOLIST_REPLACE', list);
        //开始播放队列第一首歌
        commit('SET_AUDIO_INDEX', index ? index : 0);
        //切换到全屏
        commit('FULLSCREEN_TOGGLE');
    }
}