<template>
  <div id="app">
    <el-container>
      <AppNav
        ref="nav"
        :switchPage="switchPage"
        :pageShow="pageShow"
        :showSetting="showSetting"
        ></AppNav>
      <el-main>
          <AppPanel v-show="pageShow=='AppPanel'"></AppPanel>
          <AppTodo v-show="pageShow=='AppTodo'"></AppTodo>
          <AppMemo v-show="pageShow=='AppMemo'"></AppMemo>
          <AppCard v-show="pageShow=='AppCard'"></AppCard>
          <AppSetting :isSetting="isSetting" :showSetting="showSetting"></AppSetting>
      </el-main>
    </el-container>

  </div>
</template>

<script>
import AppNav from './components/Layout/AppNav.vue'
import AppTodo from './components/Apps/AppTodo.vue'
import AppPanel from './components/Apps/AppPanel.vue'
import AppMemo from './components/Apps/AppMemo.vue'
import AppCard from './components/Apps/AppCard.vue'
import AppSetting from './components/Apps/AppSetting.vue'

export default {
  name: 'App',
  data() {
    return {
      pageShow: 'AppPanel',
      isSetting: false,
    }
  },
  components: {
    AppNav,
    AppPanel,
    AppTodo,
    AppMemo,
    AppCard,
    AppSetting,
  },
  methods: {
    switchPage(id){
      this.pageShow = id;
    },
    showSetting(b=true){
      if(!b)console.log(this.$refs.nav.$refs.asideMenu.submenus)
      this.isSetting = b;
      // if(!b)this.switchPage(this.pageShow);
    }
  },
}
</script>

<style>
*{
  margin:0;
  padding:0;
}
:root{
  --theme-color: #386ade;
  --theme-color-light: #e7eeff;
}
html,body{
  font-size: 16px;
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  color: #2c3e50;
  background: #f7f9fc;
  display: flex;
}

main{
  flex: 1;
}
</style>
