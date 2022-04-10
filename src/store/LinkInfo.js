const axios = require("axios").default;
const http = require("../http/index").default;
import Vue from 'vue';
export default {
    actions:{
        getLinkData:function(context){
            if(!this.state.AppInfo.isLogin) return;
            let userAuth = localStorage.getItem('userAuth');

            http.get(`${this.state.AppInfo.https}://api.dorakika.cn/jianguoyun?target=DoraSpace/linkInfo.json`,{
                headers:{
                    'Authorization': `Basic ${userAuth}`
                }
            }).then(res=>{
                if(res.data.code === 404){
                    http.get('https://doraspace-1303371957.cos.ap-nanjing.myqcloud.com/linkInfo.json')
                    .then((res)=>{
                
                        let links = res.data;
                        if(typeof res.data === 'string'){
                            links = JSON.parse(links)
                        }else if(typeof res.data === 'object'){
                            links = res.data;
                        }
                        context.commit('UpdateLinks',links);
                        this.$bus.$emit('onLinkDataLoad');
                    })
                }else if(res.data.code){
                    let links = res.data.data;
                    if(typeof res.data === 'string'){
                        links = JSON.parse(links)
                    }else if(typeof res.data.data === 'object'){
                        links = res.data.data;
                    }
                    context.commit('UpdateLinks',links);
                    this.$bus.$emit('onLinkDataLoad');
                }
            },error=>{
                console.log(error);
            });

        },
        uploadLinkData(context){
            if(!this.state.AppInfo.isLogin) return;
            let userAuth = localStorage.getItem('userAuth');
            var data = JSON.stringify(context.state.links);
            var config = {
                method: 'put',
                url: `${this.state.AppInfo.https}://api.dorakika.cn/jianguoyun?target=DoraSpace/linkInfo.json`,
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
        deleteLink(context,options){
            context.commit('DeleteLink',options);
            context.dispatch('uploadLinkData');
        },
        addLink(context,options){
            context.commit('AddLink',options);
            context.dispatch('uploadLinkData');
        },
        saveLink(context,options){
            context.commit('DeleteLink',{listId:options.listId,linkId:options.link.id});
            context.commit('AddLink',{listId:options.link.listName,linkId:options.link.id,link:options.link})
            context.dispatch('uploadLinkData');
        }
    },
    mutations:{
        UpdateLinks(state,value){
            if(!value) return ;
            state.links = value;
        },
        DeleteLink(state,option){
            Vue.delete(state.links[option.listId],option.linkId);
            if(Object.keys(state.links[option.listId]).length === 0){
                Vue.delete(state.links,option.listId);
            }
        },
        AddLink(state,options){
            //分类不存在，添加分类
            if(!state.links[options.listId]){
                Vue.set(state.links,options.listId,{});
            }
            Vue.set(state.links[options.listId],options.linkId,options.link);
            this.$bus.$emit("onLinkDataLoad");
        },
        LinkClick(state,options){
            if(state.links[options.listId][options.linkId].click){
                state.links[options.listId][options.linkId].click++;
            }else{
                Vue.set(state.links[options.listId][options.linkId],'click', 1);
            }
            this.dispatch('uploadLinkData');
        }
    },
    state:{
        links:{
            "DORAKIKA":{
                "link001":{id:"link001",listName:"DORAKIKA",name:"DORAKIKA",desc:"My Blog",linkTo:"https://dorakika.cn",click:0},
                "link002":{id:"link002",listName:"DORAKIKA",name:"DORAKIKA",desc:"My Blog",linkTo:"https://dorakika.vercel.app",click:0},
                "link003":{id:"link003",listName:"DORAKIKA",name:"微信读书",desc:"My Blog",linkTo:"https://weread.qq.com/",click:0},
                "link004":{id:"link004",listName:"DORAKIKA",name:"MyGithub",desc:"",linkTo:"https://github.com/dorakika",click:0},
            },
            "开发":{
                "link005":{id:"link005",listName:"开发",name:"1",desc:"My Blog",linkTo:"https://dorakika.cn"},
            }
        }
    }
}