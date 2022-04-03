<template>
  <div id="CardPanel">
    <div class="dataPanel">

    </div>
    <div class="aside">
      
      <div class="aside-item tagCloud">
        <div class="title">标签</div>
        <div
          class="tag"
          v-for="(cards,name) in tags"
          :key="name"
          :style="`color:${colors[Math.floor(Math.random()*colors.length)]};`"
          @click="toTag(name)"
        >{{name}}</div>
      </div>

      <div class="aside-item aside-categories">
        <div class="title">分类</div>
        <div
          class="category"
          v-for="(category,bid) in categories"
          :key="bid"
        >
        {{category.name}}
        </div>
      </div>

      <div class="aside-item showInfo">
          <div class="item"><span class="key">分类</span><span class="value">{{Object.getOwnPropertyNames(this.$store.state.CardInfo.categories).length}}</span></div>
          <div class="item"><span class="key">标签</span><span class="value">{{Object.getOwnPropertyNames(this.$store.state.CardInfo.tags).length}}</span></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      tags:{},
      categories:{},
      colors:['#386ade','#ff6655','#18e7ae','#61649f'],
    }
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
    this.tags = this.$store.state.CardInfo.tags;
    this.categories = this.$store.state.CardInfo.categories;
    this.$bus.$on('onCardDataLoad',()=>{
      this.tags = this.$store.state.CardInfo.tags;
      this.categories = this.$store.state.CardInfo.categories;
    });
  }
}
</script>

<style>
#CardPanel{
  display: flex;
  flex-wrap: wrap;
  margin-top: 1rem;
}
#CardPanel .dataPanel{
  width: calc(100% - 300px);
}
#CardPanel .aside{
  width: 300px;
}
#CardPanel .aside-item{
  width: 100%;
  padding: 1rem;
  background: var(--card-white);
  margin-top: 1rem;
  border-radius: 8px;
}
#CardPanel .tagCloud{
  display: flex;
  flex-wrap: wrap;
}
#CardPanel .tagCloud .tag{
  padding: 0.4rem;
  margin: 0.2rem;
  border: 1px solid currentColor;
  border-radius: 0.4rem;
  background: currentColor;
  font-size: 0.8rem;
  box-shadow: 0 0 0 2rem rgba(255, 255, 255, 0.9) inset;
  transition:0.3s;
  cursor:pointer;
}
#CardPanel .tagCloud .tag:hover{
  box-shadow: 0 0 0 2rem rgba(255, 255, 255, 0.5) inset;
}
.aside-categories .category{
  width: 100%;
  height: 2rem;
  line-height: 2rem;
  transition: 0.3s;
  border-radius: 4px;
}
.aside-categories .category:hover{
  padding-left: 1rem;
  background: var(--theme-color);
}
#CardPanel .showInfo{
  width: 100%;
  padding: 1rem;
  background: var(--card-white);
  display: flex;
  flex-direction: column;
}
#CardPanel .showInfo>.item{
  height: 2rem;
  line-height: 2rem;
  width: 100%;
  margin: 4px;
  display: flex;
  font-size: 0.8rem;
  align-items: center;
}
#CardPanel .showInfo>.item>.key{
  flex: 1;
}
#CardPanel .showInfo>.item>.value{
  padding: 4px 8px;
  border-radius: 4px;
  background: #d7e0e3;
  color: #fff;
  line-height: 1rem;
}
#CardPanel .aside .title{
  width: 100%;
  margin-bottom: 0.5rem;
}
.tagCloud{
  padding: 1rem;
  background: var(--card-white);
  border-radius: 8px;
}
@media screen and (max-width:900px){
  #CardPanel .dataPanel,
  #CardPanel .aside{
    width: 100%;
  }
}
</style>