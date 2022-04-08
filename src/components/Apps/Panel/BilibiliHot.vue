<template>
  <div class="BilibiliInfo">
      <div class="title"><span>B站番剧</span><i class="iconfont icon-shuaxin"></i></div>
      <a :href="item.url" target="_blank" class="listItem" v-for="item in data" :key="item.rank" :title="item.new_ep.index_show">
          <div class="rank">{{item.rank}}</div>
          <div class="keyword">{{item.title}}</div>
          <div class="follow">{{item.stat.view>10000?`${item.stat.follow/10000}万追番`:`${items.stat.view}追番`}}</div>
      </a>
  </div>
</template>

<script>
const http = require('../../../http/index').default;
export default {
    data(){
        return {
            data:[],
        }
    },
    computed:{
    },
    mounted(){
        http.get(`${this.$store.state.AppInfo.origin}/bilibili/pgc/web/rank/list?season_type=1&day=7`).then((res)=>{
            this.data = res.data.result.list.splice(0,10);
        },error=>{
            console.log(error);
        })
    }
}
</script>

<style>
.BilibiliInfo{
    padding: 1rem;
}
.BilibiliInfo{
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    padding: 0.5rem 0.8rem;
}
.BilibiliInfo .title{
    font-weight: bold;
    line-height: 2rem;
}
.BilibiliInfo .listItem{
    margin: 0.2rem;
    display: flex;
    color: var(--font-color);
    line-height: 1.5rem;
    transition: 0.3s;
}
.BilibiliInfo .listItem:hover{
    padding-left: 0.5rem;
    color: var(--theme-color);
}
.BilibiliInfo .listItem .rank{
    width: 1.5rem;
    height: 1.5rem;
    text-align: center;
    border-radius: 4px;
    background: var(--card-inner);
}
.BilibiliInfo .listItem:nth-of-type(1) .rank{
    background: rgb(255, 65, 65);
    color: #fff;
}
.BilibiliInfo .listItem:nth-of-type(2) .rank{
    background: rgb(255, 119, 65);
    color: #fff;
}
.BilibiliInfo .listItem:nth-of-type(3) .rank{
    background: rgb(255, 211, 65);
    color: #fff;
}
.BilibiliInfo .listItem .keyword{
    padding: 0 0.5rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    flex: 1;
}
.BilibiliInfo .listItem .follow{
    font-size: 0.8rem;
}
</style>