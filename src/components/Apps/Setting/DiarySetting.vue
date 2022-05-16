<template>
  <div class="diarySetting">
    <div class="group-name">diary设置</div>
    <div class="group card">
        <div class="item">
            <div class="key">表情设置（英文逗号分隔）</div>
            <div class="value">
                <el-input v-model="DiaryData.emojis"></el-input>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed:{
    ...mapState(['DiaryData'])
  }
}
</script>

<style>

</style>