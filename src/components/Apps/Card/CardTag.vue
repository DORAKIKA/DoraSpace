<template>
  <div id="CardTag">
    <div class="tagCloud">
      <div
        class="tag"
        v-for="(cards,name) in tags"
        :key="name"
        :style="`color:${colors[Math.floor(Math.random()*colors.length)]};`"
        @click="toTag(name)"
      >{{name}}</div>
    </div>
    <h2 v-show="showTag">#{{showTag}}</h2>
    <div class="tagCards" v-show="showTag">
      <CardItem v-for="cid in tagCards" :key="cid" :cid="cid"></CardItem>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CardItem from './CardItem.vue';
export default {
  data(){
    return {
      tags:{},
      colors:['#386ade','#ff6655','#18e7ae','#61649f'],
      showTag: '',
    }
  },
  computed:{
    tagCards(){
      return this.CardData.tags[this.showTag];
    },
    ...mapGetters(['CardData']),
  },
  methods:{
    toTag(name){
      if(this.$route.query.name !== name){
        this.$router.replace({
            path: `/Card/tag?name=${name}`,
        });
      }
      if(this.$route.query.name){
        this.showMode = 'tag';
        this.showTag = this.$route.query.name;
      }
    }
  },
  mounted(){
    this.tags = this.CardData.tags;
    if(this.$route.query.name){
      this.showMode = 'tag';
      this.showTag = this.$route.query.name;
    }
  },
  components:{
    CardItem,
  }
}
</script>

<style>
#CardTag{
  width: 100%;
  padding: 1rem;
  background: var(--card-white);
  border-radius: 8px;
  margin-top: 1rem;
}
#CardTag .tagCloud{
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
#CardTag .tag{
  padding: 0.4rem;
  margin: 0.2rem;
  border: 1px solid currentColor;
  border-radius: 0.4rem;
  background: currentColor;
  font-size: 0.8rem;
  box-shadow: 0 0 0 2rem rgba(255, 255, 255, 0.8) inset;
  transition:0.3s;
  cursor:pointer;
}
#CardTag .tag:hover{
  box-shadow: 0 0 0 2rem rgba(255, 255, 255, 0.6) inset;
}
#CardTag .tagCards{
  display: flex;
}
</style>