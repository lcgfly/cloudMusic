<template>
    <div class="ar-wrapper">
        <div class="ar-bref">
            <span class="ar-name">{{name}}</span>
            <span class="ar-alia">{{alia}}</span>
        </div>
        <div class="ar-btn" @click="descShow">歌手信息</div>
        <song-list :bgUrl="bgUrl" height="300px" :mask="true" @playAll="playAll">
            <song-item
                v-for="(item,index) in list"
                :key="index"
                :num="index+1"
                :name="item.name"
                :alias="item.alia[0]"
                :artist="item.ar[0].name"
                :albumName="item.al.name"
                @playAll="playAll(index)"
                @dotMenu="dotMenu(index)"
            ></song-item>
        </song-list>
        <dot-menu
            :imgUrl="list.length>0?list[idx].al.picUrl:''"
            :name="list.length>0?list[idx].name:''"
            :alias="list.length>0?list[idx].alia[0]:''"
            :artist="list.length>0?list[idx].ar[0].name:''"
            @insert="insert"
        ></dot-menu>
        <ar-desc :id="id" :name="name"></ar-desc>
    </div>
</template>

<script>
import api from "@/api";
import Bus from "@/util/Bus";
import { mapActions } from "vuex";
import songList from "@/components/songList";
import songItem from "@/components/songItem";
import dotMenu from "@/components/dotMenu";
import arDesc from "./arDesc";
export default {
    data() {
        return {
            id: '',
            idx: 0,
            list: [],
            name: "",
            alia: "",
            bgUrl: "",
            show:false
        };
    },
    components: {
        songList,
        songItem,
        dotMenu,
        arDesc
    },
    created(){
        this.id = this.$route.params.id;
    },
    activated() {
        this.id = this.$route.params.id;
        this.getArtistHot(this.id);
    },
    methods: {
        getArtistHot(id) {
            api.getArtistSong(id)
                .then(res => {
                    res = res.data;
                    if (res.code == 200) {
                        this.name = res.artist.name;
                        this.alia = res.artist.alias[0]
                            ? "/" + res.artist.alias[0]
                            : "";
                        this.bgUrl = res.artist.picUrl;
                        this.list = res.hotSongs;
                    }
                })
                .catch(e => console.log(e));
        },
        ...mapActions(["_playAll", "_insert"]),
        playAll(index) {
            this._playAll({
                list: this.list,
                index: index
            });
        },
        dotMenu(index) {
            this.idx = index;
        },
        insert() {
            let source = this.list[this.idx];
            this._insert(source);
        },
        descShow(){
            Bus.$emit('descShow')
        }
    },
    deactivated() {
        this.bgUrl = "";
    }
};
</script>

<style lang="less">
.ar-wrapper {
    position: relative;
    .ar-bref {
        position: absolute;
        color: #fff;
        top: 220px;
        left: 20px;
    }
    .ar-name {
        font-size: 24px;
    }
    .ar-alia {
        vertical-align: bottom;
        color: hsla(0, 0%, 100%, 0.6);
    }
    .ar-btn {
        position: absolute;
        top: 220px;
        right: 20px;
        padding: 3px;
        line-height: 1.5;
        border-top-right-radius: 15px;
        border-bottom-right-radius: 15px;
        background-color: #ccc;
        color: #fff;
        z-index: 2;
    }
}
</style>