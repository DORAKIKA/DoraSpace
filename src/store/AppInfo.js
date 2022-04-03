const axios = require("axios").default;

export default {
    actions:{
        checkLogin(context,app){
            //检查登录
            let userAuth = localStorage.getItem('userAuth');
           
            var config = {
                method: 'put',
                url: `http://localhost:8080/jianguo/DoraSpace/checkLogin.data`,
                headers: { 
                    'Authorization': `Basic ${userAuth}`, 
                    'Content-Type': 'application/json'
                },
            };
            axios(config).then((response)=>{
                if(response.data.status === 1){
                    context.state.isLogin = true;
                    
                    app.$message({
                        showClose: true,
                        message: '登录成功',
                        type: 'success'
                    });
                    app.$bus.$emit('onLogin');
                }else if(response.data.status === 0){
                    context.state.isLogin = false;
                    
                    app.$message({
                        showClose: true,
                        message: '用户名或密码错误！',
                        type: 'error'
                    });
                    console.log("登录失败",response.data.data);
                }
            }).catch(function (error) {
                console.log("登录失败",error)
            });
            return false;
        },
        getConfig(context,$bus){
            if(!context.state.isLogin) return;
            let userAuth = localStorage.getItem('userAuth')

            var config = {
                method: 'get',
                url: 'http://localhost:8080/jianguo/DoraSpace/config.json',
                headers: { 
                    'Authorization': `Basic ${userAuth}`
                }
            };
            
            axios(config).then((response)=>{
                context.commit('UpdateConfig',response.data);
                $bus.$emit('onDataLoad');
            }).catch((error)=>{
                console.log(error);
            });
        },
        uploadConfig(context){
            context.dispatch("uploadJianGuoAppFile",{url:"/DoraSpace/config.json",data:context.state.config});
        },
        uploadJianGuoAppFile(context,options){
            if(!context.state.isLogin) return;
            let userAuth = localStorage.getItem('userAuth');
            var data = JSON.stringify(options.data);
            var config = {
                method: 'put',
                url: `http://localhost:8080/jianguo${options.url}`,
                headers: { 
                    'Authorization': `Basic ${userAuth}`, 
                    'Content-Type': 'application/json'
                },
                data : data
            };
            axios(config).then(function (response) {
                console.log("upload file success")
                console.log(JSON.stringify(response.data));
            }).catch(function (error) {
                console.log("upload file fail")
                console.log(error);
            });
        },
    },
    mutations:{
        UpdateConfig(state,value){
            state.config = value;
        },
        GetAuth(state){
            return state.auth;
        },
        ToggleDark(state){
            state.config.isDark = !state.config.isDark;
        }
    },
    state:{
        config:{
            themeColor:"#386ade",
            isDark:false,
        },
        isLogin: false,
    }
}