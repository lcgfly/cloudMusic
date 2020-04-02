<template>
    <div class="ar-desc-mask" v-show="show" @click="descHidden">
        <div class="ar-desc-wrapper" @click.stop>
            <div>
                <h1>{{name+'个人简介'}}</h1>
                <p>{{briefDesc}}</p>
            </div>
            <div v-for="(item,index) in introduction" :key="index">
                <h1>{{item.ti}}</h1>
                <p>{{item.txt}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import Bus from "@/util/Bus";
import api from "@/api";
export default {
    data() {
        return {
            show: false,
            briefDesc: "",
            introduction: []
        };
    },
    props: {
        id: Number,
        name: String
    },
    watch:{
        id:{
            handler:function(val,oldVal){
                this.artistDesc(this.id);
            },
            immediate:true
            
        }
    },
    mounted() {
        Bus.$on("descShow", this.descShow);
    },
    methods: {
        descShow() {
            this.show = true;
            document
                .getElementsByTagName("body")[0]
                .classList.add("scroll-ban");
        },
        descHidden() {
            this.show = false;
            document
                .getElementsByTagName("body")[0]
                .classList.remove("scroll-ban");
        },
        artistDesc(id) {
            api.getArtistDesc(id).then(res => {
                res = res.data;
                if (res.code == 200) {
                    this.briefDesc = res.briefDesc;
                    this.introduction = res.introduction;
                }
            });
        }
    }
};
</script>

<style lang="less">
.ar-desc-mask {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 10;
    .ar-desc-wrapper {
        width: 80%;
        height: 80%;
        overflow: scroll;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: left;
        padding: 10px;
        background-color: #fff;
        &>div{
            margin-bottom: 20px;
        }
        h1 {
            font-size: 16px;
            color: #333;
            font-weight: bolder;
            padding-left: 10px;
            position: relative;
            &::after{
                content: '';
                position: absolute;
                top: 50%;
                left: 0;
                transform: translate(0,-50%);
                border: 5px solid transparent;
                border-right-width: 0;
                border-left-color: #42b983;
            }
        }
        p {
            font-size: 14px;
            line-height: 1.5;
            white-space: pre-wrap;
            word-break: break-all;
        }
        &::-webkit-scrollbar{
            width: 5px;
        }
        &::-webkit-scrollbar-thumb{
            background-color: #42b983;
        }
    }
}
.scroll-ban {
    overflow-y: hidden;
}
</style>