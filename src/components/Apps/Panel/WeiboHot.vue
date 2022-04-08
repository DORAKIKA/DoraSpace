<template>
  <div class="WeiboHot">
      <div class="title"><span>微博热搜</span><i style="cursor:pointer;" class="iconfont icon-shuaxin" @click="refresh"></i></div>
      <a :href="item.url" target="_blank" class="listItem" v-for="item in data" :key="item.rank" :title="item.keyword">
          <div class="rank">{{item.rank}}</div>
          <div class="keyword">{{item.keyword}}</div>
          <div class="hot" v-show="item.isHot">热</div>
          <div class="new" v-show="item.isNew">新</div>
          <div class="boil" v-show="item.isBoil">沸</div>
          <div class="hotValue">{{item.hotValue}}</div>
      </a>
  </div>
</template>

<script>
export default {
data(){
    return{
        data:[],
    }
},
methods:{
    refresh(){
        this.$jsonp('https://www.coderutil.com/api/resou/v1/weibo.jsonp?access-key=957a46300ff3575a8bd72ad2fd215037&secret-key=5d6902d5d0ae8a82cc8a6cacd77a2844&size=10')
        .then((res)=>{
            this.data = res;
        })
    }
},
mounted(){
    this.refresh();
}
}
</script>

<style>
.WeiboHot{
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    padding: 0.5rem 0.8rem;
}
.WeiboHot .title{
    font-weight: bold;
    line-height: 2rem;
}
.WeiboHot .listItem{
    margin: 0.2rem;
    display: flex;
    color: var(--font-color);
    line-height: 1.5rem;
    transition: 0.3s;
}
.WeiboHot .listItem:hover{
    padding-left: 0.5rem;
    color: var(--theme-color);
}
.WeiboHot .listItem .hot,
.WeiboHot .listItem .new,
.WeiboHot .listItem .boil,
.WeiboHot .listItem .rank{
    width: 1.5rem;
    height: 1.5rem;
    text-align: center;
    border-radius: 4px;
    background: var(--card-inner);
}
.WeiboHot .listItem .hot,
.WeiboHot .listItem:nth-of-type(1) .rank{
    background: rgb(255, 65, 65);
    color: #fff;
}
.WeiboHot .listItem .boil,
.WeiboHot .listItem:nth-of-type(2) .rank{
    background: rgb(255, 119, 65);
    color: #fff;
}
.WeiboHot .listItem .new,
.WeiboHot .listItem:nth-of-type(3) .rank{
    background: rgb(255, 211, 65);
    color: #fff;
}
.WeiboHot .listItem .keyword{
    padding: 0 0.5rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    flex: 1;
}
</style>