// 该文件用于创建Vuex中最为核心的store
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
//actions=>用于响应组件中的动作
const actions = {};
//mutations=>用于操作数据（state）
const mutations = {};
//state=>用于存储数据
const state = {};

//创建store
export default new Vuex.Store({
    actions,
    mutations,
    state,
});