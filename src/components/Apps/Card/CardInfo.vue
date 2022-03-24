<template>
  <div id="cardInfo">
      <div class="header">
          <div class="back">back</div>
          <div class="title">{{info.title}}</div>
      </div>
      <div class="meta">
          <div class="category">1</div>
          <div class="tags">2</div>
          <div class="process">3</div>
      </div>
      <div class="content">
          test
      </div>
      
  </div>
</template>

<script>
export default {
    data(){
        return{
            info:""
        }
    },
    mounted(){
        this.id = this.$route.query.id
        this.category = this.$route.query.categoryId
        console.log(this.category)
        this.info = this.$store.state.CardInfo.cardsInfo.categories[this.category].cards[this.id];
    }
}
</script>

<style>
#cardInfo .header,#cardInfo .meta,#cardInfo .content{
    padding: 1rem;
    margin-top: 1rem;
    background: #fff;
    border-radius: 8px;
}
</style>