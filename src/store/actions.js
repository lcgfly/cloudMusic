export default {
    /**
     * 
     * @param {Array} list 含有歌曲对象的数组 
     * @param {Number} index 从指定歌曲开始播放的索引，非必填，不传此参数则默认从第一首开始播放 
     */
    _playAll({ commit }, { list, index }) {
        //点击播放全部按钮的策略是每点击一次，就更新播放队列一次
        commit('AUDIOLIST_CLEAR');
        //替换当前播放队列
        commit('AUDIOLIST_REPLACE', list);
        //开始播放队列第一首歌
        commit('SET_AUDIO_INDEX', index ? index : 0);
        //切换到全屏
        commit('FULLSCREEN_TOGGLE');
    },
    _deleteOne({ commit, state }, index) {
        if (state.audioList.length <= 1) {
            commit('AUDIOLIST_CLEAR')
            return
        }
        let currentIndex = state.audioIndex
        let audioList = state.audioList.slice()
        audioList.splice(index, 1)
        if(index<currentIndex){
            currentIndex--
        }
        commit('AUDIOLIST_REPLACE',audioList)
        commit('SET_AUDIO_INDEX',currentIndex)
    }
}