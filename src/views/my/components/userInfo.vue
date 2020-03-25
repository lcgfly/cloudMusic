<template>
  <div>
    <div class="login-user">
                <img :src="login?avatarUrl:''" alt class="avatar" />
                <span class="nickname">{{login?nickname:'-'}}</span>
            </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            
        }
    },
    props:{
      login:Boolean,
      avatarUrl:String,
      nickname:String
    }
}
</script>

<style>

</style>