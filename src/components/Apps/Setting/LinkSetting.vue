<template>
  <div class="linkSetting">
    <div class="group-name">link设置</div>
    <div class="group card">
        <!-- link点击视图 -->
        <div class="item">
            <div class="key">面板显示点击分布图</div>
            <div class="value">
                <el-switch
                v-model="linkConfig.showLinkChart"
                active-color="#13ce66"
                inactive-color="#ff4949">
                </el-switch>
            </div>
        </div>
        <!-- 视图统计个数限制 -->
        <div class="item" :class="{'disabled':!linkConfig.showLinkChart}">
            <div class="key">点击分布图统计链接数</div>
            <div class="value">
                <el-input-number :disabled="!linkConfig.showLinkChart" v-model="linkConfig.chartLimit" :min="1" :max="10" label="限制"></el-input-number>
            </div>
        </div>
        <!-- 侧栏导航 -->
        <div class="item">
            <div class="key">显示分类侧栏</div>
            <div class="value">
                <el-switch
                v-model="linkConfig.showNav"
                active-color="#13ce66"
                inactive-color="#ff4949">
                </el-switch>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data(){
        return {
            linkConfig: {}
        }
    },
    computed:{
        ...mapState(['AppInfo'])
    },
    methods:{
        onDataLoad(){
            this.linkConfig = this.AppInfo.config.Link
            console.log("hello")
        }
    },
    mounted(){
        this.linkConfig = this.AppInfo.config.Link ? this.AppInfo.config.Link : {};
        this.$bus.$on('onDataLoad',this.onDataLoad)
    },
    beforeDestroy(){
        this.$bus.$off('onDataLoad',this.onDataLoad);
    }
}
</script>

<style>

</style>