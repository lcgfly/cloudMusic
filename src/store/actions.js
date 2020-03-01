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
    //删除待播放队列其中的某一首
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
    },
    
    /**
     *  下一首播放功能 
     * @param {Object} source 下一首播放的歌曲对象 
     */
    _insert({commit,state},source){
        let curIndex = state.audioIndex
        let audioList = state.audioList.slice()
        let target
        //先查找当前播放队列是否有相同id歌曲，如有则直接在当前队列中更改位置，不需要后续插入操作
        for(let i in audioList){
            if(audioList[i].id === source.id){
                target = audioList.splice(i,1)
                break
            }
        }
        if(target){
            audioList.splice(curIndex+1,0,target[0])//splice返回的是一个数组
            commit('AUDIOLIST_REPLACE',audioList)
        }
        else{
            audioList.splice(curIndex+1,0,source)
            commit('AUDIOLIST_REPLACE',audioList)
        }
        
    }
}