const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    setupMiddlewares:(middlewares, devServer)=>{
      middlewares.unshift({
        name:"delete401",
        path:"/jianguo/DoraSpace/checkLogin.data",
        middleware:async(req,res)=>{
          res.setHeader('test','atest');
          //
          let auth = req.get('Authorization');
          var axios = require('axios');
          var data = JSON.stringify({});

          var config = {
            method: 'put',
            url: 'https://dav.jianguoyun.com/dav/DoraSpace/checkLogin.data',
            headers: { 
              'Authorization': auth, 
              'Content-Type': 'application/json'
            },
            data : data
          };

          await axios(config)
          .then(function (response) {
            res.send({status:1,data:response.data});
          })
          .catch(function (error) {
            res.send({status:0,data:"error"});
          });
        }
      })
      return middlewares;
    },
    headers: {
      'www-authenticate': '',
    },
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
