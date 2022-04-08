<template>
  <div id="AppPanel">
    <div class="panelMain">
      <Hitokoto v-if="AppInfo.config.Panel.showHitokoto" class="mainItem"></Hitokoto>
      <LinkClickPanel class="mainItem item50"></LinkClickPanel>
    </div>
    <div class="panelAside">
      <BilibiliHot v-if="AppInfo.config.Panel.showBilibiliHot" class="asideItem"></BilibiliHot>
      <WeiboHot v-if="AppInfo.config.Panel.showWeiboHot" class="asideItem"></WeiboHot>
      <ZhihuHot v-if="AppInfo.config.Panel.showZhihuHot" class="asideItem"></ZhihuHot>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
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
    BilibiliHot,
    Hitokoto,
    LinkClickPanel,
    WeiboHot,
    ZhihuHot,
  },
  methods:{
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
    this.$store.dispatch('getLinkData');
  }
}
</script>

<style>
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
  box-shadow: 4px 4px 8px var(--card-inner);
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