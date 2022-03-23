import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App.vue'
import 'element-ui/lib/theme-chalk/index.css'

//提示信息不显示
Vue.config.productionTip = false

//
Vue.use(ElementUI);

new Vue({
  //将App组件放入容器中
  render: h => h(App),
}).$mount('#app')
