<template>
  <form id="AppSetting">
      <div class="title"><div class="text">Setting</div><el-button @click="saveSetting" type="primary">保存</el-button></div>
      <div class="container1">
        <div class="group-name">用户设置</div>
        <div class="group">
          <div class="item">
            <div class="key">账号</div>
            <div class="value"><el-input v-model="AppInfo.account"></el-input></div>
          </div>
          <div class="item">
            <div class="key">密钥</div>
            <div class="value"><el-input v-model="AppInfo.accountPassword" showPassword></el-input></div>
          </div>
          <!-- 主题色 -->
          <div class="item">
            <div class="key">主题色</div>
            <div class="value">
              <div class="themeColor">
                <button 
                  v-for="color in themeColors"
                  :key="color"
                  @click.prevent="changeThemeColor(color)" 
                  :class="AppInfo.config.themeColor===color?'checked':''"
                  :style="`background:${color}`">
                </button>
              </div>
            </div>
          </div>
          <!-- 夜间切换 -->
          <div class="item">
            <div class="key">夜间模式</div>
            <div class="value">
              <el-switch
                v-model="AppInfo.config.isDark"
                active-color="var(--theme-color)"
                inactive-color="var(--theme-color)">
              </el-switch>
            </div>
          </div>
        </div>
      </div>
      <div class="container2">
        <div class="group-name">card设置</div>
        <div class="group">
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
  </form>
</template>

<script>
import {mapState} from 'vuex';
export default {
  data() {
    return {
      value: true,
      settings:{},
      themeColors:["#386ade","#ff6755","#61649f","#18e7ae"],
      cardsConfig:{},
    }
  },
  computed:{
      ...mapState(['AppInfo'])
  },
  methods: {
    changeThemeColor(value){
      this.AppInfo.config.themeColor = value;
    },
    saveSetting(){
      this.$store.dispatch("uploadConfig");
    }
  },
  mounted(){
    this.cardsConfig = this.AppInfo.config.cardsConfig ? this.AppInfo.config.cardsConfig : {};
    this.$bus.$on('onDataLoad',()=>{
      // console.log(this.AppInfo.config)
      this.cardsConfig = this.AppInfo.config.cardsConfig
    })
  }
}
</script>

<style>
#AppSetting{
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
}

#AppSetting .title{
  width: 100%;
  background: var(--card-white);
  height: 4rem;
  padding: 0.5rem 1rem;
  text-align: center;
  display: flex;
}
#AppSetting .title .text{
  height: 3rem;
  line-height: 3rem;
  font-size: 1.2rem;
  font-weight: bold;
  flex: 1;
}
#AppSetting .container1{
  width: 50%;
  padding: 1rem;
}
#AppSetting .container2{
  width: 50%;
  padding: 1rem;
}
#AppSetting .group-name{
  font-size: 0.9rem;
  height: 2rem;
  line-height: 2rem;
  padding-left: 0.5rem;
  color: #666;
  position: relative;
}
#AppSetting .group-name::before{
  content: "";
  position: absolute;
  left: 0;
  top: 0.5rem;
  width: 4px;
  height: 1rem;
  border-radius: 2px;
  background: var(--theme-color);
}
#AppSetting .group{
  background: var(--card-white);
  border-radius: 8px;
  margin-bottom: 0.5rem;
  padding: 0.5rem 1rem;
}
#AppSetting .group .item{
  display: flex;
  line-height: 2rem;
  margin: 0.2rem 0;
}
#AppSetting .group .item .value{
  width: 50%;
  min-width: 10rem;
  max-width: calc(100% - 4rem);
  text-align: right;
}
#AppSetting .group .el-input{
  width: 100%;
}
#AppSetting .group .el-input input{
  outline: none;
  border: none;
  min-width: 10rem;
  width: 100%;
  height: 2rem;
  line-height: 2rem;
  background: var(--theme-color);
  transition: 0.3s;
    box-shadow: 0 0 0 1rem inset var(--over90);
}
#AppSetting .group .el-input .el-input__icon{
  line-height: 2rem;
}
#AppSetting .group .el-input input:focus{
  background: var(--theme-color);
  box-shadow: 0 0 0 1rem inset var(--over80);
  color: var(--theme-color)!important;
  padding-left: 2rem;
}
#AppSetting .group .item:nth-child(n+2){
  /* border-top: 1px solid #eee; */
}
#AppSetting .group .item .key{
  flex: 1;
}

#AppSetting .themeColor>button{
  width: 1rem;
  height: 1rem;
  border: none;
  margin: 0 0.2rem;
  border-radius: 50%;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.6) inset;
}
#AppSetting .themeColor>button.checked{
  box-shadow: 0 0 0 0.2rem rgba(255, 255, 255, 0.6) inset;
}

@media screen and (max-width: 900px) {
  #AppSetting .container1,
  #AppSetting .container2{
    width: 100%;
  }
}
</style>