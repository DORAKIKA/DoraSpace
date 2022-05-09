<template>
    <div id="AppStyle"></div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed:{
        ...mapGetters(['customStyle']),
    },
    watch:{
        customStyle(){
            this.setCustomStyle();
        }
    },
    methods:{
        setCustomStyle(){
            let style = document.getElementById('AppStyle');
            style.innerHTML = `
                <style>
                ${this.customStyle}
                </style>
                `
        }
    },
    mounted(){
        this.setCustomStyle();
    }
}
</script>

<style>

</style>