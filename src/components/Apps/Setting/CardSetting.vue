<template>
  <div class="cardSetting">
    <div class="group-name">card设置</div>
    <div class="group card">
        <!-- 分类展开？ -->
        <div class="item">
        <div class="key">分类是否默认展开</div>
        <div class="value">
            <el-switch
            v-model="config.Card.categoryExtended"
            active-color="#13ce66"
            inactive-color="#ff4949">
            </el-switch>
        </div>
        </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    computed:{
        ...mapGetters(['config']),
    },
}
</script>

<style>

</style>