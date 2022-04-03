const axios = require("axios").default;
import Vue from 'vue';
export default {
    actions:{
        getLinkData:function(context,$bus){
            if(!this.state.AppInfo.isLogin) return;
            let userAuth = localStorage.getItem('userAuth');
            var config = {
                method: 'get',
                url: 'http://localhost:8080/jianguo/DoraSpace/linkInfo.json',
                headers: { 
                    'Authorization': `Basic ${userAuth}`
                }
            };

            axios(config).then((response)=>{
                console.log(typeof response.data);
                let links = response.data;
                if(typeof response.data === 'string'){
                    links = JSON.parse(links)
                }else if(typeof response.data === 'object'){
                    links = response.data;
                }
                context.commit('UpdateLinks',links);
                $bus.$emit('onLinkDataLoad');
                //
            }).catch((error)=>{
                console.log('无文件？',error);
            });
        },
        uploadLinkData(context){
            console.log("upload");
            if(!this.state.AppInfo.isLogin) return;
            let userAuth = localStorage.getItem('userAuth');
            var data = JSON.stringify(context.state.links);
            var config = {
                method: 'put',
                url: `http://localhost:8080/jianguo/DoraSpace/linkInfo.json`,
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
                state.links[options.listId][options.linkId].click = 1;
            }
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