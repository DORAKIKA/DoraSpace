<template>
  <div class="ZhihuHot">
      <div class="title"><span>知乎热榜</span><i class="iconfont icon-shuaxin" @click="refresh"></i></div>
      <a :href="item.link" target="_blank" class="listItem" v-for="(item,index) in data" :key="index" :title="item.title">
          <div class="rank">{{index+1}}</div>
          <div class="keyword">{{item.title}}</div>
      </a>
  </div>
</template>

<script>
const http = require('../../../http/index').default;
export default {
data(){
    return{
        data:[],
    }
},
methods:{
    refresh(){
        // this.$jsonp('https://www.coderutil.com/api/resou/v1/zhihu.jsonp?access-key=957a46300ff3575a8bd72ad2fd215037&secret-key=5d6902d5d0ae8a82cc8a6cacd77a2844')
        // .then((res)=>{
        //     this.data = res;
        // })
        http.get('https://yuanxiapi.cn/api/ZhihuHotsearch/').then(
            (res)=>{
                this.data = res.data.data;
            },
            (error)=>{
                console.log(error)
            }
        )
    }
},
mounted(){
    this.refresh();
}
}
</script>

<style>
.ZhihuHot{
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    padding: 0.5rem 0.8rem;
}
.ZhihuHot .title{
    font-weight: bold;
    line-height: 2rem;
}
.ZhihuHot .listItem{
    margin: 0.2rem;
    display: flex;
    color: var(--font-color);
    line-height: 1.5rem;
    transition: 0.3s;
}
.ZhihuHot .listItem:hover{
    padding-left: 0.5rem;
    color: var(--theme-color);
}
.ZhihuHot .listItem .rank{
    width: 1.5rem;
    height: 1.5rem;
    text-align: center;
    border-radius: 4px;
    background: var(--card-inner);
}
.ZhihuHot .listItem:nth-of-type(1) .rank{
    background: rgb(255, 65, 65);
    color: #fff;
}
.ZhihuHot .listItem:nth-of-type(2) .rank{
    background: rgb(255, 119, 65);
    color: #fff;
}
.ZhihuHot .listItem:nth-of-type(3) .rank{
    background: rgb(255, 211, 65);
    color: #fff;
}
.ZhihuHot .listItem .keyword{
    padding: 0 0.5rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    flex: 1;
}
</style>