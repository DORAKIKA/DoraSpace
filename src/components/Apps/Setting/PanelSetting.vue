<template>
  <div class="PanelSetting">
    <div class="group-name">Panel设置</div>
    <div class="group card">
        <!-- 一言 -->
        <div class="item">
            <div class="key">显示一言</div>
            <div class="value">
                <el-switch
                v-model="config.Panel.showHitokoto">
                </el-switch>
            </div>
        </div>
        
        <!-- B站番剧 -->
        <div class="item">
            <div class="key">显示B站番剧</div>
            <div class="value">
                <el-switch
                v-model="config.Panel.showBilibiliHot">
                </el-switch>
            </div>
        </div>
        <!-- 微博热榜 -->
        <div class="item">
            <div class="key">显示微博热榜</div>
            <div class="value">
                <el-switch
                v-model="config.Panel.showWeiboHot">
                </el-switch>
            </div>
        </div>
        <!-- 知乎热榜 -->
        <div class="item">
            <div class="key">显示知乎热榜</div>
            <div class="value">
                <el-switch
                v-model="config.Panel.showZhihuHot">
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