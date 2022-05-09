<template>
  <div id="AppPanel">
    <div class="panelMain">
      
      <el-carousel :autoplay="false" height="100%" style="height:100%">
        <el-carousel-item class="mainItem" v-if="config.Link.showLinkChart">
          <LinkClickPanel></LinkClickPanel>
        </el-carousel-item>
        <el-carousel-item class="mainItem">
          <task-week></task-week>
        </el-carousel-item>
      </el-carousel>

    </div>
    <div class="panelAside">
      <Hitokoto v-if="config.Panel.showHitokoto" class="asideItem"></Hitokoto>

      <BilibiliHot v-if="config.Panel.showBilibiliHot" class="asideItem"></BilibiliHot>
      <WeiboHot v-if="config.Panel.showWeiboHot" class="asideItem"></WeiboHot>
      <ZhihuHot v-if="config.Panel.showZhihuHot" class="asideItem"></ZhihuHot>
    </div>
    <AppFooter></AppFooter>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import AppFooter from '../Layout/AppFooter.vue';

import LinkClickPanel from './Panel/LinkClickPanel.vue';
import TaskWeek from './Panel/TaskWeek.vue';
// import DiaryEmoji from './Panel/DiaryEmoji.vue';
// import WeatherPanel from './Panel/WeatherPanel.vue';

import Hitokoto from './Panel/Hitokoto.vue';
import BilibiliHot from './Panel/BilibiliHot.vue'
import WeiboHot from './Panel/WeiboHot.vue';
import ZhihuHot from './Panel/ZhihuHot.vue';
export default {
  data(){
    return {
      currentPanel: ''
    }
  },
  computed:{
    ...mapState(['config','isLogin'])
  },
  components:{
    AppFooter,
    BilibiliHot,
    Hitokoto,
    LinkClickPanel,
    TaskWeek,
    WeiboHot,
    ZhihuHot,
    // WeatherPanel,
  },
  methods:{
    checkLogin(){
      if(!this.isLogin){
        this.$router.replace({
          path: '/Login',
        })
      }
    }
  },
  mounted(){
    this.checkLogin();
  }
}
</script>

<style>
#footer{
  border-radius: 8px;
}
#AppPanel{
  flex: 1;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
#AppPanel .panelMain{
  width: calc(100% - 350px - 1rem);
  height: calc(100vh - 6rem);
}
#AppPanel .panelMain .mainItem{
  background: var(--card-white);
  border-radius: 8px;
}

#AppPanel .panelAside{
  width: 350px;
  max-height: calc(100vh - 6rem);
  overflow-y: scroll;
}
#AppPanel .panelAside .asideItem{
  background: var(--card-white);
  border-radius: 8px;
  margin-top: 1rem;
}
#AppPanel .panelMain .mainItem:first-child,
#AppPanel .panelAside .asideItem:first-Child{
  margin-top: 0;
}

#AppPanel .mainItem,
#AppPanel .asideItem{
  border: 1px solid var(--bg);
  transition: 0.3s;
}
#AppPanel .mainItem:hover,
#AppPanel .asideItem:hover{
  border: 1px solid var(--theme-color);
}




@media screen and (max-width:1200px) {
  #AppPanel .mainItem{
    width: 100%;
  }
}
@media screen and (max-width:900px){
  #AppPanel .panelMain{
    width: 100%;
  }
  #AppPanel .panelAside{
    margin-top: 1rem;
    width: 100%;
    height: fit-content;
  }

}
</style>