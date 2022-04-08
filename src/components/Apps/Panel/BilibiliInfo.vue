<template>
  <div class="BilibiliInfo">

  </div>
</template>

<script>
const http = require('../../../http/index').default;
export default {
    mounted(){
        http.get('https://yuanxiapi.cn/api/bilibilihome/?url=https://space.bilibili.com/288009433/').then((res)=>{
            console.log(res);
        },(error)=>{
            console.log(error)
        })
    }
}
</script>

<style>

</style>