<template>
  <el-drawer
    title="Setting"
    :visible.sync="settingShow"
    >

  </el-drawer>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  computed:{
    settingShow:{
      get(){
        return this.isSetting
      },
      set(val){
        if(!val) this.showSetting(false);
        console.log(val)
      }
    }
  },
  props:["isSetting","showSetting"]
}
</script>

<style>

</style>