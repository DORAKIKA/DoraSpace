<template>
  <div class="linkSetting">
    <div class="group-name">link设置</div>
    <div class="group card">
        <!-- link点击视图 -->
        <div class="item">
            <div class="key">面板显示点击分布图</div>
            <div class="value">
                <el-switch
                v-model="config.Link.showLinkChart"
                active-color="#13ce66"
                inactive-color="#ff4949">
                </el-switch>
            </div>
        </div>
        <!-- 视图统计个数限制 -->
        <div class="item" :class="{'disabled':!config.Link.showLinkChart}">
            <div class="key">点击分布图统计链接数</div>
            <div class="value">
                <el-input-number :disabled="!config.Link.showLinkChart" v-model="config.Link.chartLimit" :min="1" :max="10" label="限制"></el-input-number>
            </div>
        </div>
        <!-- 侧栏导航 -->
        <div class="item">
            <div class="key">显示分类侧栏</div>
            <div class="value">
                <el-switch
                v-model="config.Link.showNav"
                active-color="#13ce66"
                inactive-color="#ff4949">
                </el-switch>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed:{
        ...mapGetters(['config']),
    },
}
</script>

<style>

</style>