import kkMessage from './kk-message.vue'

let instance
let showToast = false
let time // 存储toast显示状态
const kkToast = {
  install(Vue, options = {}) {
    let opt = kkMessage.data() // 获取组件中的默认配置
    Object.assign(opt, options) // 合并配置
    Vue.prototype.$kkMessage = (message, type) => {
      if (showToast) {
        clearTimeout(time)
        instance.vm.visible = showToast = false
        document.body.removeChild(instance.vm.$el)
        // return;// 如果toast还在，则不再执行
      }
      if (message) {
        opt.message = message // 如果有传message，则使用所传的message
      }
      if (type) {
        opt.type = type // 如果有传type，则使用所传的type
      }
      let kkMessageConstructor = Vue.extend(kkMessage)
      instance = new kkMessageConstructor({
        data: opt
      })
      instance.vm = instance.$mount()
      document.body.appendChild(instance.vm.$el)
      instance.vm.visible = showToast = true

      time = setTimeout(function() {
        instance.vm.visible = showToast = false
        document.body.removeChild(instance.vm.$el)
      }, opt.duration)
    }
  }
}

export default kkToast
