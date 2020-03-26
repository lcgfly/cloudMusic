<template>
    <div>
        <default-nav title="最近播放"></default-nav>
        <song-item
            v-for="(item,index) in list"
            :key="index"
            :num="index + 1"
            :name="item.name"
            :alias="item.alia[0]"
            :artist="item.ar[0].name"
            :albumName="item.al.name"
            @playAll="playAll(index)"
            @dotMenu="dotMenu(index)"
        ></song-item>
        <dot-menu
            :imgUrl="list.length>0?list[idx].al.picUrl:''"
            :name="list.length>0?list[idx].name:''"
            :alias="list.length>0?list[idx].alia[0]:''"
            :artist="list.length>0?list[idx].ar[0].name:''"
            @insert="insert"
        ></dot-menu>
    </div>
</template>

<script>
import api from "@/api";
import Bus from "@/util/Bus.js";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import defaultNav from "@/components/defaultNav";
import songItem from "@/components/songItem";
import dotMenu from "@/components/dotMenu";
export default {
    data() {
        return {
            list: [],
            idx: 0
        };
    },
    components: {
        defaultNav,
        songItem,
        dotMenu
    },
    created() {
        let uid = localStorage.getItem("mscUid");
        this.getUserRecord(uid);
    },
    deactivated() {
        Bus.$off("dotMenu_call");
    },
    methods: {
        getUserRecord(uid) {
            api.getUserRecord(uid).then(res => {
                res = res.data;
                if (res.code == 200) {
                    let data = res.weekData;
                    for (let i in data) {
                        this.list.push(data[i].song);
                    }
                }
            });
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
        }
    }
};
</script>

<style>
</style>