<template>
  <div class="search-sug">
      <ul>
          <li v-for="(item,index) in list" :key="index" @click.stop="toSearch(item.keyword)">
              {{item.keyword}}
          </li>
      </ul>
  </div>
</template>

<script>
export default {
    props:{
        list:Array
    },
    methods:{
        toSearch(keywords){
            this.$emit('toSearch',keywords)
        }
    }
}
</script>

