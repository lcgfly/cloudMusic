<template>
  <div class="search-sug">
      <ul>
          <li v-for="(item,index) in list" :key="index">
              {{item.keyword}}
          </li>
      </ul>
  </div>
</template>

<script>
export default {
    props:{
        list:Array
    }
}
</script>

