<template>
  <div class="cardItem" @click="toCardInfo(cid)" :title="cardInfo.title">
      <div class="title">{{cardInfo.title}}</div>
      <div class="tags">
          <span v-for="tag in cardInfo.tags" :key="tag" class="tagItem">{{tag}}</span>
      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    data(){
        return {
            cardInfo:{},
        }
    },
    computed:{
        ...mapGetters(['CardData']),
    },
    methods:{
        toCardInfo(cid){
            this.$router.push({
                path: `/Card/cardInfo?cid=${cid}`,
            })
        },
        initCardInfo(cid){
            this.cardInfo = this.CardData.cards[cid]?this.CardData.cards[cid]:{};
        }
    },
    mounted(){
        this.initCardInfo(this.cid);
    },
    props:['cid']
}
</script>

<style>
.cardItem{
    width: calc((100% - 5rem) / 5);
    /* height: 150px; */
    padding: 1rem;
    background: var(--card-inner);
    border-radius: 8px;
    margin: 0.5rem;
    transition: 0.3s;
    cursor: pointer;
    border: 2px solid transparent;
}
.cardItem:hover{
    /* background: var(--theme-color); */
    border: 2px solid var(--theme-color);
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
@media screen and (max-width:1200px) {
    .cardItem{
        width: calc((100% - 4rem) / 4);
    }
}
@media screen and (max-width:900px) {
    .cardItem{
        width: calc((100% - 3rem) / 3);
    }
}
@media screen and (max-width:600px) {
    .cardItem{
        width: calc((100% - 2rem) / 2);
    }
}
</style>