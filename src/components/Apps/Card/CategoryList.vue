<template>
  <div class="cardCategoryList">
      <div class="titleBar">
        <div class="name" :style="`background:${category.color};box-shadow:0 0 0 2rem rgba(0,0,0,0.1) inset`">{{category.name}}</div>
        <div class="desc">{{category.description}}</div>
        <a href="javascript:;" class="more">更多</a>
      </div>
      <div class="list">
          <CardItem v-for="(card, id) in category.cards" :key="id" :id="id" :card="card" :categoryId="categoryId"></CardItem>
      </div>
  </div>
</template>

<script>
import CardItem from './CardItem.vue'
export default {
    data(){
        return{
            name: "天文",
            color: "#386ade",
            description: "记录我的天文之旅",
        }
    },
    components:{
        CardItem,
    },
    mounted(){
        console.log(this.categoryId)
    },
    props:['category','categoryId']
}
</script>

<style>
.cardCategoryList{
    width: 100%;
    padding: 1rem;
    background: #fff;
    border-radius: 8px;
    margin-top: 1rem;
}
.cardCategoryList>.titleBar{
    width: 100%;
    height: 2rem;
    line-height: 2rem;
    display: flex;
    justify-content: space-between;
}
.cardCategoryList>.titleBar>.name,
.cardCategoryList>.titleBar>.more{
    padding: 0 0.3rem;
    border-radius: 8px;
    background: var(--theme-color);
    color: #fff;
}
.cardCategoryList>.list{
    margin: 1rem 0 0 0;
    display: flex;
    flex-wrap: wrap;
}
.cardCategoryList>.titleBar>.desc{
    color: #666;
    font-size: 0.8rem;
}
</style>