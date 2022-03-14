import Vue from 'vue'
import App from './App.vue'

//提示信息不显示
Vue.config.productionTip = false

new Vue({
  //将App组件放入容器中
  render: h => h(App),
}).$mount('#app')
