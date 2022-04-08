const axios = require("axios").default;
const http = require("../http/index").default;
import Vue from 'vue'

export default {
    actions:{
        initCardData:function(context,$bus){
            // 获取信息，拆分
            if(!this.state.AppInfo.isLogin) return;
            let userAuth = localStorage.getItem('userAuth');

            
            http.get(`${this.state.AppInfo.origin}/jianguo/DoraSpace/cardsInfo.json`,{
                headers:{
                    'Authorization': `Basic ${userAuth}`
                }
            }).then(res=>{
                console.log(typeof res.data);
                let cardsInfo;
                if(typeof res.data === 'string'){
                    cardsInfo = JSON.parse(res.data)
                }else if(typeof res.data === 'object'){
                    cardsInfo = res.data;
                }
                context.commit("SetCardCategories",cardsInfo.categories);
                context.commit("SetCardTags",cardsInfo.tags);
                context.commit("SetCardCardsData",cardsInfo.cards);
                $bus.$emit("onCardDataLoad");
                context.state.isDataGet = true;
            },error=>{
                if(error.status === 404){
                    http.get('https://doraspace-1303371957.cos.ap-nanjing.myqcloud.com/cardsInfo.json')
                    .then((res)=>{
                        console.log(typeof res.data);
                        let cardsInfo;
                        if(typeof res.data === 'string'){
                            cardsInfo = JSON.parse(res.data)
                        }else if(typeof res.data === 'object'){
                            cardsInfo = res.data;
                        }
                        context.commit("SetCardCategories",cardsInfo.categories);
                        context.commit("SetCardTags",cardsInfo.tags);
                        context.commit("SetCardCardsData",cardsInfo.cards);
                        $bus.$emit("onCardDataLoad");
                        context.state.isDataGet = true;
                    })
                }
            });
        },
        uploadCardData(context){
            context.dispatch("uploadJianGuoFile",{
                url: "/DoraSpace/cardsInfo.json",
                data: {
                    categories: context.state.categories,
                    tags: context.state.tags,
                    cards: context.state.cards,
                }
            });
        },
        uploadJianGuoFile(context,options){
            if(!this.state.AppInfo.isLogin) return;
            let userAuth = localStorage.getItem('userAuth');
            var data = JSON.stringify(options.data);
            var config = {
                method: 'put',
                url: `${this.state.AppInfo.origin}/jianguo${options.url}`,
                headers: { 
                    'Authorization': `Basic ${userAuth}`, 
                    'Content-Type': 'application/json'
                },
                data : data
            };
            axios(config).then((response)=>{
                console.log("upload file success")
                console.log(JSON.stringify(response.data));
                this.$bus.$emit("onCardDataLoad");
            }).catch(function (error) {
                console.log("upload file fail")
                console.log(error);
            });
        },
        saveCard(context,value){
            context.commit('SaveCard',value);
        },
        addCard(context,value){
            //在category中生成cardid
            let cid = 'card'+new Date().getTime();
            context.state.categories[value].cards.push(cid);
            //向cards中添加一个模板card
            context.state.cards[cid] = {
                cid: cid,
                title:"TITLE",
                description: "description",
                category: value,
                tags:[],
                process: 0,
                content: "write something here!"
            },
            context.dispatch('uploadCardData');
        },
        deleteCard(context,value){
            context.commit('DeleteCard',value);
        },
        updateCategory(context,value){
            context.commit('UpdateCategory',value);
        },
        addCategory(context,value){
            context.commit('UpdateCategory',value);
        },
        deleteCategory(context,bid){
            context.commit('DeleteCategory',bid);
        }
    },
    mutations:{
        SetCardCardsData(state,value){
            state.cards = value;
        },
        SetCardCategories(state,value){
            state.categories = value;
        },
        SetCardTags(state,value){
            state.tags = value;
        },
        SaveCard(state,value){
            //修改categories
            //1. 去除原cate
            let obCards = state.categories[state.cards[value.cid].category].cards
            for(let i = 0; i < obCards.length; i++){
                if(obCards[i] === value.cid){
                    obCards.splice(i,1);
                    break;
                }
            }
            //2. 添加现cate
            let nbCards = state.categories[value.category].cards;
            nbCards.push(value.cid);
            //修改tags
            //1. 移除原有
            state.cards[value.cid].tags.forEach(tag => {
                for(let i = 0; i < state.tags[tag].length;i++){
                    if(state.tags[tag][i] === value.cid){
                        state.tags[tag].splice(i,1);
                        break;
                    }
                }
            });
            //2. 添加新的
            value.tags.forEach(tag=>{
                if(state.tags[tag]){
                    state.tags[tag].push(value.cid);
                }else{
                    state.tags[tag] = [value.cid];
                }
            });
            //修改cards
            state.cards[value.cid] = JSON.parse(JSON.stringify(value));
            //同步至云
            this.dispatch('uploadCardData');
        },
        DeleteCard(state,value){
            //移除categories中的card
            let obCards = state.categories[state.cards[value.cid].category].cards
            for(let i = 0; i < obCards.length; i++){
                if(obCards[i] === value.cid){
                    obCards.splice(i,1);
                    break;
                }
            }
            //移除tags中的card
            state.cards[value.cid].tags.forEach(tag => {
                for(let i = 0; i < state.tags[tag].length;i++){
                    if(state.tags[tag][i] === value.cid){
                        state.tags[tag].splice(i,1);
                        break;
                    }
                }
            });
            //移除cards中的card
            Vue.delete(state.cards,value.cid);
            //保存
            this.dispatch('uploadCardData');
        },
        UpdateCategory(state,value){
            state.categories[value.id] = value;
            this.dispatch('uploadCardData');
        },
        DeleteCategory(state,bid){
            //删除分类中的卡片
            state.categories[bid].cards.forEach(cid=>{
                Vue.delete(state.cards,cid);
            })
            //删除分类
            Vue.delete(state.categories,bid);
            //保存
            this.dispatch('uploadCardData');
        }
    },
    state:{
        isDataGet:false,
        cards:{},
        categories:{},
        tags:{},
    },

    categoryInfo:{},
    tagInfo:{},
}