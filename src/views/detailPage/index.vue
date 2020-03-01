<template>
    <div>
        <song-list
            :hasAlbum="true"
            height="240px"
            :bgUrl="albumInfo.coverImgUrl"
            :playCount="albumInfo.playCount"
            :albumTitle="albumInfo.name"
            :description="albumInfo.description"
            :creatorAvatar="albumInfo.creator.avatarUrl"
            :creatorName="albumInfo.creator.nickname"
            @playAll="playAll"
        >
            <song-item
                v-for="(item,index) in albumInfo.tracks"
                :key="index"
                :num="index+1"
                :name="item.name"
                :alias="item.alia[0]"
                :artist="item.ar[0].name"
                :albumName="item.al.name"
                @playAll="playAll(index)"
                @dotMenu="dotMenu(index)"
            ></song-item>
            <dot-menu
            :imgUrl="albumInfo.tracks.length>0?albumInfo.tracks[idx].al.picUrl:''"
            :name="albumInfo.tracks.length>0?albumInfo.tracks[idx].name:''"
            :alias="albumInfo.tracks.length>0?albumInfo.tracks[idx].alia[0]:''"
            :artist="albumInfo.tracks.length>0?albumInfo.tracks[idx].ar[0].name:''"
            @insert="insert"
        ></dot-menu>
        </song-list>
    </div>
</template>

<script>
import api from "@/api";
import { mapActions } from "vuex";
import songList from "@/components/songList";
import songItem from "@/components/songItem";
import dotMenu from "@/components/dotMenu";
export default {
    data() {
        return {
            albumInfo: [],
            id: 0,
            idx:0
        };
    },
    components: {
        songList,
        songItem,
        dotMenu
    },
    created() {
        this.id = this.$route.params.id;
        this.playlistData(this.id);
    },
    mounted() {},
    activated() {
        this.check();
    },
    methods: {
        ...mapActions(["_playAll","_insert"]),
        check() {
            let nid = this.$route.params.id;
            if (!(nid === this.id)) {
                this.playlistData(nid);
                this.id = nid;
            }
        },
        playlistData(id) {
            api.getPlaylistDetail(id)
                .then(res => {
                    var res = res.data;
                    if (res.code == 200) {
                        this.albumInfo = res.playlist;
                    }
                })
                .catch(e => console.log(e));
        },
        playAll(index) {
            let list = this.albumInfo.tracks;
            this._playAll({ list: list, index: index });
        },
        dotMenu(index) {
            this.idx = index;
        },
        insert(){
            let source = this.albumInfo.tracks[this.idx]
            this._insert(source)
        }
    }
};
</script>

<style lang="less">
</style>