<template>
  <div id="AppPanel">
    <div class="panelMain">
      <Hitokoto v-if="config.Panel.showHitokoto" class="mainItem col12"></Hitokoto>
      <!-- <WeatherPanel class="mainItem col2 row1"></WeatherPanel> -->
      <div class="mainItem col3 row2">
        <DiaryEmoji></DiaryEmoji>
      </div>
      <div class="mainItem col6 row6">
        <LinkClickPanel v-if="config.Link.showLinkChart"></LinkClickPanel>
      </div>
    </div>
    <div class="panelAside">
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
import DiaryEmoji from './Panel/DiaryEmoji.vue';
// import WeatherPanel from './Panel/WeatherPanel.vue';

import Hitokoto from './Panel/Hitokoto.vue';
import BilibiliHot from './Panel/BilibiliHot.vue'
import WeiboHot from './Panel/WeiboHot.vue';
import ZhihuHot from './Panel/ZhihuHot.vue';
export default {
  computed:{
    ...mapState(['config','isLogin'])
  },
  components:{
    AppFooter,
    BilibiliHot,
    Hitokoto,
    LinkClickPanel,
    DiaryEmoji,
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
  display: grid;
  grid-template-columns: repeat(12,1fr);
  grid-template-rows: repeat(auto-fill,3rem);
  grid-row-gap: 1rem;
  grid-column-gap: 1rem;
  grid-auto-rows: 3rem;
  grid-auto-columns: 1fr;
}
#AppPanel .panelMain .mainItem{
  background: var(--card-white);
  border-radius: 8px;
}

#AppPanel .panelAside{
  width: 350px;
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

#AppPanel .mainItem.col12{
  grid-column-start: span 12;
}
#AppPanel .mainItem.col6{
  grid-column-start: span 6;
}
#AppPanel .mainItem.col4{
  grid-column-start: span 4;
}
#AppPanel .mainItem.col3{
  grid-column-start: span 3;
}
#AppPanel .mainItem.col2{
  grid-column-start: span 2;
}

#AppPanel .mainItem.row6{
  grid-row-start: span 6;
}
#AppPanel .mainItem.row4{
  grid-row-start: span 4;
}
#AppPanel .mainItem.row2{
  grid-row-start: span 2;
}
#AppPanel .mainItem.row1{
  grid-row-start: span 1;
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

  #AppPanel .mainItem.col12{
    grid-column-start: span 12;
  }
  #AppPanel .mainItem.col6{
    grid-column-start: span 12;
  }
  #AppPanel .mainItem.col4{
    grid-column-start: span 12;
  }
  #AppPanel .mainItem.col3{
    grid-column-start: span 6;
  }
  #AppPanel .mainItem.col2{
    grid-column-start: span 4;
  }

  #AppPanel .mainItem.row6{
    grid-row-start: span 6;
  }
  #AppPanel .mainItem.row4{
    grid-row-start: span 4;
  }
  #AppPanel .mainItem.row2{
    grid-row-start: span 2;
  }

}
</style>