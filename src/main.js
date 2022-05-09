import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui'
import App from './App.vue'
import 'element-ui/lib/theme-chalk/index.css'
import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
import {VueJsonp} from 'vue-jsonp';

import store from './store/index';

// import kkMessage from '@/kk/tip/';


import './style/index.css';

//提示信息不显示
Vue.config.productionTip = false

//引入路由器
import router from './router';

//
Vue.use(ElementUI);
Vue.use(Router);
Vue.use(store)
Vue.use(mavonEditor);
Vue.use(VueJsonp);


// Vue.use(kkMessage)



new Vue({
  //将App组件放入容器中
  render: h => h(App),
  store: store,
  router:router,
  //公共总线
  beforeCreate(){
    Vue.prototype.$bus = this;
    this.$store.$bus = this;
  }
}).$mount('#app')

// vm.$store.$bus = vm.$bus;
