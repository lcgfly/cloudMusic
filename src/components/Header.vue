<template>
<div>
        <van-tabs v-model="active" swipeable>
            
  <van-tab v-for="index in 4" :title="'选项 ' + index" :key="index">
    内容 {{ index }}
    111111111111<br>
    11111111111<br>
    111111111<br>
  </van-tab>
</van-tabs>
<van-button type="danger">危险按钮</van-button>

</div>
</template>
<script>
import Vue from 'vue';
import { Tab, Tabs } from 'vant';
import { Button } from 'vant';

Vue.use(Button);
Vue.use(Tab).use(Tabs);

export default {
    data(){
        return{
            active:2
        }
    }
}
</script>