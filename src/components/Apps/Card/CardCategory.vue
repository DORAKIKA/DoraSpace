<template>
  <div>
    <CategoryList v-for="(category,id) in this.$store.state.CardInfo.cardsInfo.categories" :key="id" :category="category" :categoryId="id"></CategoryList>
  </div>
</template>

<script>
import CategoryList from './CategoryList.vue'
export default {
  components:{
    CategoryList
  },
  mounted(){
    // console.log(this.$store.state.CardInfo.categories)
    // this.$store.dispatch('updateCategories')
  }
}
</script>

<style>

</style>