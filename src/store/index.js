// 该文件用于创建Vuex中最为核心的store
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

import CardInfo from './CardInfo';
import LinkInfo from './LinkInfo';
import AppInfo from './AppInfo';
import DiaryInfo from './DiaryInfo';



//创建store
export default new Vuex.Store({
    modules:{
        AppInfo,
        CardInfo,
        LinkInfo,
        DiaryInfo
    }
});