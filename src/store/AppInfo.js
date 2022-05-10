const axios = require("axios").default;
const http = require('../http/index').default;

export default {
    actions:{
        checkLogin(context,app){
            //检查登录
            let userAuth = localStorage.getItem('userAuth');
            if(context.state.loginMode=="local")return;
            var config = {
                method: 'get',
                // url: `${context.state.origin}/jianguo/DoraSpace/checkLogin.data`,
                url: `${context.state.https}://api.dorakika.cn/jianguoyun?target=DoraSpace&method=mkcol`,
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
                    if(app.$router.currentRoute.path === '/Login' || app.$router.currentRoute.path === '/'){
                        app.$router.replace({
                            path: '/Panel',
                        })
                    }
                    context.dispatch("getAppData");
                }else if(response.data.status === 0){
                    context.state.isLogin = false;
                    
                    app.$message({
                        showClose: true,
                        message: '用户名或密码错误！',
                        type: 'error'
                    });
                    if(app.$router.currentRoute.path !== '/Login'){
                        app.$router.replace({
                            path: '/Login',
                        })
                    }
                    console.log("登录失败",response.data);
                }
            }).catch(function (error) {
                console.log("登录失败",error)
            });
            return false;
        },
        getConfig(context,$bus){
            if(!context.state.isLogin) return;
            let userAuth = localStorage.getItem('userAuth')
            // http.get(`${context.state.origin}/jianguo/DoraSpace/config.json`,{
            http.get(`${this.state.AppInfo.https}://api.dorakika.cn/jianguoyun?target=DoraSpace/config.json`,{
                headers:{
                    'Authorization': `Basic ${userAuth}`
                }
            }).then(res=>{
                if(res.data.code===404){
                    http.get('https://doraspace-1303371957.cos.ap-nanjing.myqcloud.com/config.json')
                    .then((res)=>{
                        context.commit('UpdateConfig',res.data);
                        $bus.$emit('onDataLoad');
                    })
                }else if(res.data.code){
                    context.commit('UpdateConfig',res.data.data);
                    $bus.$emit('onDataLoad');
                }
            },error=>{
                console.log(error)
            });
        },
    },
    mutations:{
    },
    state:{
    }
}