<template>
  <div id="AppCard">
    <div class="banner">BANNER</div>
    <CategoryList></CategoryList>
    <CategoryList></CategoryList>
  </div>
  
</template>

<script>
import CategoryList from './Card/CategoryList.vue'
  export default {
    data() {
      return {
        isCollapse: true
      };
    },
    components:{
      CategoryList,
    }
  }
</script>

<style>
#AppCard{
  width: 80%;
  height: 100%;
  /* background: #fff; */
  margin: 0 auto;
  padding: 1rem;
}
.banner{
  width: 100%;
  height: 200px;
  background: #fff;
  border-radius: 8px;
  text-align: center;
}
</style>