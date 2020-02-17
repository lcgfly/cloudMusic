<template>
    <div class="mini-page" @click="toFullScreen">
        <div class="mini-wrapper">
            <div class="mini-left">
                <img :src="picUrl" />
                <div>
                    <p>{{name}}</p>
                    <p>{{artistsFn}}</p>
                </div>
            </div>
            <div class="mini-right">
                <i class="iconfont" :class="{'icon-icon-3':playing,'icon-icon-7':!playing}" @click.stop="toggle"></i>
                <i class="iconfont icon-icon-8"></i>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
    data() {
        return {};
    },
    props: {
        name: String,
        artists: Array,
        picUrl: String
    },
    computed: {
        artistsFn() {
            if (this.artists.length <= 0) return;
            if (this.artists.length == 1) return this.artists[0].name;
            var list = this.artists[0].name;
            for (var i = 1; i < this.artists.length - 1; i++) {
                list += "/" + this.artists[i].name;
            }
            return list;
        },
        ...mapState(['playing'])
    },
    methods: {
        ...mapMutations([
            "FULLSCREEN_TOGGLE",
            "PLAYING_TOGGLE"
            ]),
        toFullScreen() {
            this.FULLSCREEN_TOGGLE();
        },
        toggle(){
            this.PLAYING_TOGGLE()
            this.$emit('toggle')
        }
    }
};
</script>

<style lang="less">
.mini-page {
    position: fixed;
    width: 100vw;
    height: 10vh;
    bottom: 0;
    color: #000;
    background-color: #fff;
    box-shadow: 0 0 5px 3px #ccc;
    .mini-wrapper{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 5px;
        .mini-left{
            display: flex;
            align-items: center;
            
            img{
                width: 50px;
                height: 50px;
                border-radius: 50%;
            }
            &>div{
              margin-left: 5px;
              p:last-child{
                  margin-top: 10px;
                  
              }  
            }
         
        }
        .mini-right{
            i{
                font-size: 40px;
                &:first-child{
                    margin-right: 15px;
                }
            }

        }
    }
}
</style>