<template>
  <div class="diarySetting">
    <div class="group-name">diary设置</div>
    <div class="group card">
        <div class="item">
            <div class="key">表情设置（英文逗号分隔）</div>
            <div class="value">
                <el-input v-model="diaryEmojis"></el-input>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed:{
    ...mapGetters(['diaryEmojis'])
  }
}
</script>

<style>

</style>