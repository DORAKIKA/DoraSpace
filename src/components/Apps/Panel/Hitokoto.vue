<template>
  <div class="DsHitokoto">
      <div class="title">一言</div>
      <div class="hitokoto">「 {{data.hitokoto}} 」</div>
      <div class="from">{{data.from}}</div>
  </div>
</template>

<script>
const http = require('../../../http/index').default;
export default {
    name:"DsHitokoto",
    data(){
        return{
            data:{},
        }
    },
    methods:{
        getHitokoto(){
            http.get('https://v1.hitokoto.cn?max_length=20').then(
                (res)=>{
                    this.data = res.data;
                }
            )
        }
    },
    mounted(){
        this.getHitokoto();
    }
}
</script>

<style>
.DsHitokoto{
    padding: 1rem;
    display: flex;
    transition: 0.3s;
    align-items: center;
    justify-content: center;
}
.DsHitokoto:hover{
    color: var(--theme-color);
}
.DsHitokoto .title{
    padding: 0 1rem 0 0rem;
}
.DsHitokoto .hitokoto{
    flex: 1;
    text-align: center;
}
</style>