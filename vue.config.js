const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/bilibili':{
        target: 'https://api.bilibili.com/',
        ws:true,
        changeOrigin:true,
        pathRewrite:{
          '^/bilibili': ''
        },
      }
    }
  }
})
