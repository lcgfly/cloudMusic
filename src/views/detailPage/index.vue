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
        ></song-list>
    </div>
</template>

<script>
import api from "@/api";
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
                    console.log(res.data.playlist);
                    var res = res.data;
                    if (res.code == 200) {
                        this.albumInfo = res.playlist;
                    }
                })
                .catch(e => console.log(e));
        }
    }
};
</script>

<style lang="less">
</style>