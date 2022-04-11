<template>
  <div class="diarySetting">
    <div class="group-name">diary设置</div>
    <div class="group">
        <div class="item">
            <div class="key">表情设置（英文逗号分隔）</div>
            <div class="value">
                <el-input v-model="$store.state.DiaryInfo.emojis"></el-input>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>