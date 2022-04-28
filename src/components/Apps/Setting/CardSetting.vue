<template>
  <div class="cardSetting">
    <div class="group-name">card设置</div>
    <div class="group card">
        <!-- 分类展开？ -->
        <div class="item">
        <div class="key">分类是否默认展开</div>
        <div class="value">
            <el-switch
            v-model="cardsConfig.categoryExtended"
            active-color="#13ce66"
            inactive-color="#ff4949">
            </el-switch>
        </div>
        </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    data(){
        return {
            cardsConfig: {}
        }
    },
    computed:{
        ...mapState(['AppInfo'])
    },
    methods:{
        onDataLoad(){
            this.cardsConfig = this.AppInfo.config.Card
            console.log("hello")
        }
    },
    mounted(){
        this.onDataLoad();
        this.$bus.$on('onDataLoad',this.onDataLoad)
    },
    beforeDestroy(){
        this.$bus.$off('onDataLoad',this.onDataLoad);
    }
}
</script>

<style>

</style>