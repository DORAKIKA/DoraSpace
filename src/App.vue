<template>
  <div id="app" :data-theme="AppInfo.config.isDark?'dark':'light'" :style="`--theme-color:${AppInfo.config.themeColor}`">
    <el-container>
      <AppNav></AppNav>
      <el-main>
          <transition name="float">
            <router-view></router-view>
          </transition>
      </el-main>
    </el-container>

  </div>
</template>

<script>
import AppNav from './components/Layout/AppNav.vue'
import {mapState} from 'vuex';
import 'animate.css'

export default {
  name: 'App',
  data() {
    return {
    }
  },
  computed:{
      ...mapState(['AppInfo'])
  },
  components: {
    AppNav,
  },
  methods: {
    getConfig(){
      this.$store.dispatch('getConfig',this.$bus);
    },
    go(url){
        if(this.$router.currentRoute.path !== url){
          this.$router.replace({
            path: url,
          })
        }
    },
    changePage(e){
      if(e.altKey){
        if(this.AppInfo.navItems[e.keyCode-49]){
          this.go(this.AppInfo.navItems[e.keyCode-49].link);
          return false;
        }
        // switch(e.keyCode){
        //   case 49:
        //     this.go('/Panel');
        //     return false;
        //   case 50:
        //     this.go('/Card');
        //     return false;
        //   case 51:
        //     this.go('/Link');
        //     return false;
        //   case 52:
        //     this.go('/Setting');
        //     return false;
        // }
      }
    }
  },
  mounted() {
    this.$store.dispatch('checkLogin',this);
    this.$bus.$on('onLogin',this.getConfig);
    window.addEventListener('keydown',this.changePage)
  },
  beforeDestroy() {
    this.$bus.$off('onLogin',this.getConfig);
  },
}
</script>

<style>
*{
  margin:0;
  padding:0;
  box-sizing: border-box;
  transition: background 0.3s;
}
a{
    text-decoration: none;
}
:root{
  --theme-color: #5588ff;
  --theme-color2: #f70095;
  --theme-light-color: #e7eeff;
  --bg: #edf4ff;
  --card-white: #fff;
  --card-inner: #f1f4f9;
  --font-color: #333;

  --over90: rgba(255,255,255,0.9);
  --over80: rgba(255,255,255,0.8);
  --over70: rgba(255,255,255,0.7);
  --over60: rgba(255,255,255,0.6);
  --over50: rgba(255,255,255,0.5);
  --over40: rgba(255,255,255,0.4);
  --over30: rgba(255,255,255,0.3);
}
[data-theme="dark"]{
  --theme-color: #334455;
  --theme-color2: #f70095;
  --theme-light-color: #222226;
  --bg: #222226;
  --card-white: #333;
  --card-inner: #444;
  --font-color: #eee;

  --over90: rgba(51,51,51,0.9);
  --over80: rgba(51,51,51,0.8);
  --over70: rgba(51,51,51,0.7);
  --over60: rgba(51,51,51,0.6);
  --over50: rgba(51,51,51,0.5);
  --over40: rgba(51,51,51,0.4);
  --over30: rgba(51,51,51,0.3);
}
::-webkit-scrollbar{
    width: 8px;
    height: 8px;
    background: var(--card-white);
    border: 1px solid var(--bg)
}
::-webkit-scrollbar-button,
::-webkit-scrollbar-corner{
  display: none;
}
::-webkit-scrollbar-thumb{
    width: 8px;
    border-radius: 4px;
    background: var(--theme-color);
    border: 1px solid var(--card-white);
}
html,body{
  font-size: 16px;
  height: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif,"微软雅黑";
}
.icon{
  width: 2rem;
  height: 2rem;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  color: var(--font-color);

  background: var(--bg);
  /* background: url('./assets/background.jpg'); */
  background-size: cover;
  background-position: center;
  display: flex;
  /* min-height: 500px; */
}
main.el-main{
  flex: 1;
  width: 100%;
  height: 100%;
  padding: 0;
  display: flex;
  flex-direction: column;
}
.el-main>:first-child{
  flex: 1;
  width: 100%;
}

#login{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loginBox{
  width: 300px;
  padding: 1rem;
  background: var(--card-white);
  box-shadow:  2px 2px 8px var(--card-inner);
  border-radius: 8px;
  display: flex;
  flex-wrap: wrap;
}
#login .loginBox input{
  width: 100%;
  height: 2rem;
  padding: 0 1rem;
  border-radius: 4px;
  margin: 0.5rem 0;
  background: var(--card-inner);
  border: none;
  outline: none;
  box-shadow: 0 0 0 1rem rgba(255, 255, 255, 0) inset;
  transition: 0.3s;
}
#login .loginBox input:hover{
  box-shadow: 0 0 0 1rem rgba(255, 255, 255, 0.1) inset;
}
#login .loginBox input:focus{
  box-shadow: 0 0 0 1rem rgba(255, 255, 255, 0.2) inset;
}
#login .loginBox .el-button{
  width: 4rem;
  height: 2rem;
  line-height: 2rem;
  padding: 0;
  margin: 0.5rem 0;
  background: var(--bg);
  border: none;
}

@media screen and (max-width:900px) {
  ::-webkit-scrollbar{
    width: 2px;
    height: 2px;
}
  #app>.el-container{
    flex-direction: column-reverse;
  }
}
</style>
