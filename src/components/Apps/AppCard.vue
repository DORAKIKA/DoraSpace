<template>
  <div id="AppCard">
    <div class="banner">
      <!-- <router-link to="/Card/category">Category</router-link> -->
      <div
        v-for="item in banners"
        :data-target="item.target"
        :key="item.name"
        @click="go"
        class="bannerItem"
        :style="`background:${item.bg}`"
      >
        <div class="title">{{item.name}}</div>
        <i :class="item.icon"></i>
      </div>
    </div>
    <router-view></router-view>
  </div>
  
</template>

<script>
  export default {
    data() {
      return {
        banners:[
          {name:"面板",icon:"iconfont icon-cards",bg:"linear-gradient(to right,#358bff,#15c6ff)",target:"/Card/panel"},
          {name:"分类",icon:"iconfont icon-fenlei",bg:"linear-gradient(to right,#f65,#ffbf37)",target:"/Card/category"},
          {name:"标签",icon:"iconfont icon-biaoqian",bg:"linear-gradient(to right,#18e7ae,#1eebeb)",target:"/Card/tag"},
          {name:"漫步",icon:"iconfont icon-huiyuan2",bg:"linear-gradient(to right,#61649f,#8184cf)",target:"/Card/review"},
        ],
        isCollapse: true
      };
    },
    methods:{
      go(e){
        this.$router.replace({
          path: e.currentTarget.dataset.target,
        })
      }
    },
    mounted(){
      this.$store.dispatch('getCardData');
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
  transition: 0.3s;
}
.banner{
  width: 100%;
  /* height: 7rem; */
  /* background: #fff; */
  border-radius: 8px;
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.bannerItem{
  width: calc((100% - 3rem) / 4);
  border-radius: 8px;
  background: var(--theme-color);
  color: #fff;
  position: relative;
  overflow: hidden;
  margin-top: 1rem;
  /* transition: 0.3s; */
  cursor: pointer;
}

.bannerItem .title{
  padding-left: 1.5rem;
  font-size: 1.5rem;
  line-height: 2rem;
  text-align: left;
  margin: 2rem 0 3rem;
  position: relative;
}
.bannerItem .title::before{
  content: "";
  position: absolute;
  bottom: -4px;
  left: 1.5rem;
  width: 2rem;
  height: 4px;
  background: #fff;
  border-radius: 2px;
}
.bannerItem i{
  position: absolute;
  right: 0;
  top: 30%;
  font-size: 5rem;
  font-weight: bold;
  opacity: 0.5;
  transition: 0.3s;
}
.bannerItem:hover i{
  transform: scale(1.3);
  opacity: 0.7;
}
@media screen and (max-width:900px){
  #AppCard{
    width: 85%;
  }
  .bannerItem{
    width: calc((100% - 1rem) / 2);
  }
}
</style>