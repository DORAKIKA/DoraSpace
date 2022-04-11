const axios = require("axios").default;
const http = require('../http/index').default;

export default {
    actions:{
        checkLogin(context,app){
            //检查登录
            let userAuth = localStorage.getItem('userAuth');
           
            var config = {
                method: 'put',
                // url: `${context.state.origin}/jianguo/DoraSpace/checkLogin.data`,
                url: `${this.state.AppInfo.https}://api.dorakika.cn/jianguoyun?target=DoraSpace&method=mkcol`,
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
                    app.$bus.$emit('onLogin');
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
        uploadConfig(context){
            context.dispatch("uploadJianGuoAppFile",{url:"DoraSpace/config.json",data:context.state.config});
        },
        uploadJianGuoAppFile(context,options){
            if(!context.state.isLogin) return;
            let userAuth = localStorage.getItem('userAuth');
            var data = JSON.stringify(options.data);
            var config = {
                method: 'put',
                url: `${this.state.AppInfo.https}://api.dorakika.cn/jianguoyun?target=${options.url}`,
                headers: { 
                    'Authorization': `Basic ${userAuth}`, 
                    'Content-Type': 'application/json'
                },
                data : data
            };
            axios(config).then(function (response) {
                console.log(JSON.stringify(response.data));
            }).catch(function (error) {
                console.log(error);
            });
        },
    },
    mutations:{
        UpdateConfig(state,value){
            state.config = {
                ...state.config,
                ...value,
            };
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
            Panel:{
                showBilibiliHot: true,
                showWeiboHot: false,
                showZhihuHot: false,
                showHitokoto: true,
            },
            Card:{
                categoryExtended: true,
            },
            Link:{
                showLinkChart: true,
                chartLimit: 10,
                showNav: true,
            }
        },
        isLogin: false,
        https: window.location.origin[4]==='s'?'https':'http',
        origin: window.location.origin,
        navItems:[
            {id:'AppPanel',name:'Panel',icon:'iconfont icon-bodongtu',link:'/Panel'},
            {id:'AppCard',name:'Card',icon:'iconfont icon-cards',link:'/Card'},
            {id:'AppLink',name:'Link',icon:'iconfont icon-link',link:'/Link'},
            {id:'AppDiary',name:"Diary",icon:'iconfont icon-rili',link:'/Diary'},
            {id:'AppSetting',name:'Setting',icon:'iconfont icon-shezhi',link:'/Setting'},
        ],
    }
}