<template>
    <div class="DsHitokoto">
        <div class="hitokoto">「 {{data.hitokoto}} 」</div>
        <div class="from">
            <span class="from_who">{{data.from_who}}</span>
            <span class="from_from">《{{data.from}}》</span>
        </div>
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
            http.get('https://v1.hitokoto.cn').then(
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
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    transition: 0.3s;
    align-items: center;
    justify-content: center;
}
.DsHitokoto:hover{
    color: var(--theme-color);
}
.DsHitokoto .hitokoto{
    flex: 1;
    width: 100%;
    padding: 1rem 0.5rem;
    line-height: 1.5rem;
    border-radius: 6px;
    background: var(--card-inner);
    text-align: center;
}
.DsHitokoto .from{
    margin-top: 0.5rem;
    width: 100%;
    height: 2rem;
    line-height: 2rem;
    font-size: 12px;
    color: var(--font-color2);
    text-align: center;
}
</style>