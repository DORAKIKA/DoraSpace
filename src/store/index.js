// 该文件用于创建Vuex中最为核心的store
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

import AppInfo from './AppInfo';

import state from './state';
import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'



//创建store
export default new Vuex.Store({
    state,
    actions,
    getters,
    mutations,
    modules:{
        AppInfo,
    }
});