<template>
  <div id="AppPanel">
    <div class="panelMain">
      <Hitokoto v-if="AppInfo.config.Panel.showHitokoto" class="mainItem"></Hitokoto>
      <LinkClickPanel v-if="AppInfo.config.Link.showLinkChart" class="mainItem item50"></LinkClickPanel>
    </div>
    <div class="panelAside">
      <BilibiliHot v-if="AppInfo.config.Panel.showBilibiliHot" class="asideItem"></BilibiliHot>
      <WeiboHot v-if="AppInfo.config.Panel.showWeiboHot" class="asideItem"></WeiboHot>
      <ZhihuHot v-if="AppInfo.config.Panel.showZhihuHot" class="asideItem"></ZhihuHot>
    </div>
    <AppFooter></AppFooter>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import AppFooter from '../Layout/AppFooter.vue';

import LinkClickPanel from './Panel/LinkClickPanel.vue';

import Hitokoto from './Panel/Hitokoto.vue';
import BilibiliHot from './Panel/BilibiliHot.vue'
import WeiboHot from './Panel/WeiboHot.vue';
import ZhihuHot from './Panel/ZhihuHot.vue';
export default {
  computed:{
    ...mapState(['AppInfo'])
  },
  components:{
    AppFooter,
    BilibiliHot,
    Hitokoto,
    LinkClickPanel,
    WeiboHot,
    ZhihuHot,
  },
  methods:{
    onLogin(){
      this.$store.dispatch('getLinkData');
    },
    checkLogin(){
      if(!this.$store.state.AppInfo.isLogin){
        this.$router.replace({
          path: '/Login',
        })
      }
    }
  },
  mounted(){
    this.checkLogin();
    this.onLogin();
    this.$bus.$on('onLogin',this.onLogin);
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
  width: calc(100% - 400px - 1rem);
}
#AppPanel .panelMain .mainItem{
  background: var(--card-white);
  border-radius: 8px;
  margin-top: 1rem;
}

#AppPanel .panelAside{
  width: 400px;
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
  box-shadow: 1px 1px 3px var(--card-shadow);
}
#AppPanel .mainItem:hover,
#AppPanel .asideItem:hover{
  box-shadow: 3px 3px 8px var(--card-shadow);
}

#AppPanel .mainItem.item50{
  width: calc(50% - 1rem);
}
@media screen and (max-width:1200px) {
  #AppPanel .mainItem.item50{
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
  }
}
</style>