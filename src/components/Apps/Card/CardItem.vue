<template>
  <div class="cardItem" @click="toCardInfo(cid)" :title="cardInfo.title">
      <div class="title">{{cardInfo.title}}</div>
      <div class="tags">
          <span v-for="tag in cardInfo.tags" :key="tag" class="tagItem">{{tag}}</span>
      </div>
      <div class="process">
          <el-progress :percentage="cardInfo.process"></el-progress>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            cardInfo:{},
        }
    },
    methods:{
        toCardInfo(cid){
            this.$router.push({
                path: `/Card/cardInfo?cid=${cid}`,
            })
        },
        initCardInfo(cid){
            this.cardInfo = this.$store.state.CardInfo.cards[cid]?this.$store.state.CardInfo.cards[cid]:{};
        }
    },
    mounted(){
        this.initCardInfo(this.cid);
        this.$bus.$on("onCardDataLoad",()=>{this.initCardInfo(this.cid)})
    },
    props:['cid']
}
</script>

<style>
.cardItem{
    width: 200px;
    /* height: 150px; */
    padding: 1rem;
    background: var(--bg);
    border-radius: 8px;
    margin: 8px;
    transition: 0.3s;
    cursor: pointer;
}
.cardItem:hover{
    box-shadow: 2px 2px 6px #aaa4;
}
.cardItem .title{
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    height: 1.5rem;
}
.carditem .tags{
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
    border-radius: 0.2rem;
    overflow: hidden;
}
.cardItem .process .complete{
    width: 50%;
    height: 100%;
    background: var(--theme-color);
}
</style>