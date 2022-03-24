const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/jianguo':{
        target: 'https://dav.jianguoyun.com/dav/',
        ws:true,
        changeOrigin:true,
        pathRewrite:{
          '^/jianguo': ''
        },
      },
    }
  }
})
