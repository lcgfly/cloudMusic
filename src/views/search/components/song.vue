<template>
    <div>
        <song-item
            v-for="(item,index) in obj.songs"
            :key="index"
            :num="index + 1"
            :name="item.name"
            :alias="item.alias[0]"
            :artist="item.artists[0].name"
            :albumName="item.album.name"
            @playAll="playAll(index)"
            @dotMenu="dotMenu(index)"
        ></song-item>
        <dot-menu
            :imgUrl="''"
            :name="obj.songs?obj.songs[idx].name:''"
            :alias="obj.songs?obj.songs[idx].alias[0]:''"
            :artist="obj.songs?obj.songs[idx].artists[0].name:''"
            @insert="insert"
        ></dot-menu>
    </div>
</template>

<script>
import Bus from "@/util/Bus.js";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import songItem from "@/components/songItem";
import dotMenu from "@/components/dotMenu";
export default {
    data() {
        return {
            idx: 0
        };
    },
    props: {
        obj: {
          type:Object,
          default:{}
        }
    },
    components: {
        songItem,
        dotMenu
    },
    deactivated() {
        Bus.$off("dotMenu_call");
    },
    methods: {
        ...mapActions(["_playAll", "_insert"]),
        playAll(index) {
            this._playAll({
                list: this.obj.songs,
                index: index
            });
        },
        dotMenu(index) {
            this.idx = index;
        },
        insert() {
            let source = this.list[this.idx];
            this._insert(source);
        }
    }
};
</script>

<style>
</style>