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
            ></song-item>
        </song-list>
    </div>
</template>

<script>
import api from "@/api";
import { mapActions } from "vuex";
import songList from "@/components/songList";
import songItem from "@/components/songItem";
export default {
    data() {
        return {
            albumInfo: [],
            id: 0
        };
    },
    components: {
        songList,
        songItem
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
        ...mapActions(["_playAll"]),
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
        }
    }
};
</script>

<style lang="less">
</style>