<template>
  <div id="app" :data-theme="config.isDark?'dark':'light'" :style="`--theme-color:${config.themeColor}`">
    <el-container>
      <AppNav></AppNav>
      <el-main>
          <transition name="float">
            <router-view></router-view>
          </transition>
      </el-main>
    </el-container>
    <AppStyle v-if="config.customStyle"></AppStyle>
  </div>
</template>

<script>
import AppNav from './components/Layout/AppNav.vue';
import AppStyle from './components/Layout/AppStyle.vue';
import {mapActions, mapGetters} from 'vuex';
import 'animate.css'

export default {
  name: 'App',
  data() {
    return {
    }
  },
  computed:{
      ...mapGetters(['config'])
  },
  components: {
    AppNav,
    AppStyle,
  },
  methods: {
    ...mapActions(['getAppData','getConfig'])
  },
  mounted() {
    this.$store.dispatch('checkLogin',this);

    this.getConfig();
  },
  created(){
    this.getAppData();
  },
  beforeDestroy() {
    this.$bus.$off('onLogin',this.getConfig);
  },
}
</script>

<style>



.icon{
  width: 2rem;
  height: 2rem;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.card{
  background: var(--card-white);
  border-radius: 8px;
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



@media screen and (max-width:900px) {
  ::-webkit-scrollbar{
    width: 2px;
    height: 2px;
}
  /* #app>.el-container{
    flex-direction: column-reverse;
  } */
}
</style>
