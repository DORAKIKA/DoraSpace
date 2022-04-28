<template>
    <div id="AppStyle"></div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed:{
        ...mapGetters(['customStyle'])
    },
    methods:{
        updateStyle(){
            let dom = document.getElementById('AppStyle');
            if(dom){
                dom.innerHTML = `
                <style>
                ${this.customStyle}
                </style>
                `
            }
        }
    },
    mounted(){
        this.$bus.$on('onCustomStyleLoad',this.updateStyle);
        this.$bus.$on('onLogin',()=>{
            this.$store.dispatch('getCustomStyle');
        })
        this.$store.dispatch('getCustomStyle');
        window.addEventListener('load',this.updateStyle);
        this.updateStyle();
    }
}
</script>

<style>

</style>