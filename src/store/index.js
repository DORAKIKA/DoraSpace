// 该文件用于创建Vuex中最为核心的store
import Vue from 'vue'
import Vuex from 'vuex'
const axios = require("axios").default;
Vue.use(Vuex);

const CardInfo = {
    actions:{
        getCardData(context){
            //get
            const auth = btoa(encodeURIComponent('yangkai2413@163.com:ah3jf5vqyaknidd9')
                        .replace(/%([0-9A-F]{2})/g, function(match, p1) {return String.fromCharCode('0x' + p1);}));

            var config = {
                method: 'get',
                url: 'http://localhost:8080/jianguo/DoraSpace/cards.json',
                headers: { 
                    'Authorization': `Basic ${auth}`
                }
            };
            
            axios(config).then((response)=>{
                context.commit('SetCardData',response.data);
            }).catch((error)=>{
                //log=
                console.log(error);
                // context.commit('SetCardData',{num:0,categoryNum:0,tagNum:0,totalProcess:0,categories:{}});
            });
        },
        updateCardData(){
            //upload
        }
    },
    mutations:{
        SetCardData(state,value){
            state.cardsInfo = value;
        }
    },
    state:{
        categories:[
            {name:"加载中",description:"加载中",created:"2022-03-23 08:21:12"}
        ],
        config:{},
        cardsInfo:{
            num:0,
            categoryNum: 0,
            tagNum: 0,
            totalProcess: 0,
            categories:{
            }
        }
    },

    categoryInfo:{},
    tagInfo:{},
}

const AppInfo = {
    actions:{
        getConfig(context){
            const auth = btoa(encodeURIComponent('yangkai2413@163.com:ah3jf5vqyaknidd9')
                        .replace(/%([0-9A-F]{2})/g, function(match, p1) {return String.fromCharCode('0x' + p1);}));

            var config = {
                method: 'get',
                url: 'http://localhost:8080/jianguo/DoraSpace/config.json',
                headers: { 
                    'Authorization': `Basic ${auth}`
                }
            };
            
            axios(config).then((response)=>{
                context.commit('UpdateConfig',response.data)
            }).catch((error)=>{
                console.log(error);
            });
        }
    },
    mutations:{
        UpdateConfig(state,value){
            state.config = value;
        }
    },
    state:{
        config:{}
    }
}

//创建store
export default new Vuex.Store({
    modules:{
        AppInfo,
        CardInfo
    }
});