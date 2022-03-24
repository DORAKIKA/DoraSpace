<template>
  <div class="cardItem" @click="toCardInfo(id)">
      <div class="title">{{card.title}}</div>
      <div class="tags">
          <span v-for="tag in card.tags" :key="tag" class="tagItem">{{tag}}</span>
      </div>
      <div class="process">
          <div class="complete" :style="`width:${card.process}%;`"></div>
      </div>
  </div>
</template>

<script>
export default {
    methods:{
        toCardInfo(id){
            // console.log(target)
            this.$router.push({
                path: `/Card/cardInfo?id=${id}&categoryId=${this.categoryId}`,
            })
        }
    },
    mounted(){
        console.log(this.categoryId)
    },
    props:['id','card','categoryId']
}
</script>

<style>
.cardItem{
    width: 200px;
    /* height: 150px; */
    padding: 1rem;
    background: #f1f4f9;
    border-radius: 8px;
    margin: 8px;
    transition: 0.3s;
    cursor: pointer;
}
.cardItem:hover{
    box-shadow: 2px 2px 6px #aaa8;
}
.tags{
    padding: 0.3rem 0;
}
.tagItem {
    font-size: 0.8rem;
    padding-right: 0.1rem;
    color: #666;
}
.tagItem:before{
    content:"#"
}
.cardItem .process{
    width: 100%;
    height: 0.5rem;
    border-radius: 0.2rem;
    background: #aaa;
    overflow: hidden;
}
.cardItem .process .complete{
    width: 50%;
    height: 100%;
    background: var(--theme-color);
}
</style>