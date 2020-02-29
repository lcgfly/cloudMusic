<template>
  <div>
      <default-nav></default-nav>
      <official :list="officialList"></official>
      <other :list="otherList"></other>
  </div>
</template>

<script>
import api from "@/api";
import defaultNav from "@/components/defaultNav";
import official from "./components/official";
import other from "./components/other";
export default {
    data(){
        return{
            officialList:[],
            otherList:[]
        }
    },
    components:{
        defaultNav,
        official,
        other
    },
    created(){
        this.getToplist()
    },
    methods:{
        getToplist(){
            api.getToplistDetail().then((res)=>{
                var res = res.data
                if(res.code == 200){
                    var list = res.list
                    for(var i in list){
                        if(list[i].tracks.length){
                             this.officialList.push(list[i])
                        }
                        else{
                            list.splice(0,i)
                            this.otherList = list
                            break
                        }
                        
                    }
                }
            })
        }
    }
}
</script>

<style lang="less">

</style>