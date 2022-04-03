const axios = require("axios").default;
import Vue from 'vue'

export default {
    actions:{
        initCardData:function(context,$bus){
            // 获取信息，拆分
            if(!this.state.AppInfo.isLogin) return;
            let userAuth = localStorage.getItem('userAuth');
            var config = {
                method: 'get',
                url: 'http://localhost:8080/jianguo/DoraSpace/cardsInfo.json',
                headers: { 
                    'Authorization': `Basic ${userAuth}`
                }
            };

            axios(config).then((response)=>{
                console.log(typeof response.data);
                let cardsInfo;
                if(typeof response.data === 'string'){
                    cardsInfo = JSON.parse(response.data)
                }else if(typeof response.data === 'object'){
                    cardsInfo = response.data;
                }
                context.commit("SetCardCategories",cardsInfo.categories);
                context.commit("SetCardTags",cardsInfo.tags);
                context.commit("SetCardCardsData",cardsInfo.cards);
                $bus.$emit("onCardDataLoad");
                context.state.isDataGet = true;
            }).catch((error)=>{
                //log=
                console.log(error);
                // context.commit('SetCardData',{num:0,categoryNum:0,tagNum:0,totalProcess:0,categories:{}});
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
                    obCards.splice(i);
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
                        state.tags[tag].splice(i);
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
                    obCards.splice(i);
                    break;
                }
            }
            //移除tags中的card
            state.cards[value.cid].tags.forEach(tag => {
                for(let i = 0; i < state.tags[tag].length;i++){
                    if(state.tags[tag][i] === value.cid){
                        state.tags[tag].splice(i);
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