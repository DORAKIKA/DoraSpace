import types from './mutation_types';
import Vue from 'vue';

const mutations = {
    //设置用户配置文件
    [types.SET_CONFIG](state,value){
        state.config = {
            ...state.config,
            ...value,
            Nav: {
                ...state.config.Nav,
                ...value.Nav
            },
        }

    },
    [types.SET_CUSTOM_STYLE](state,value){
        state.customStyle = value;
    },
    [types.SET_DARKMODE](state,value){
        state.config.isDark = value;
    },
    [types.SET_LOGINMODE](state,value){
        state.config.loginMode = value;
    },

    //设置Card数据
    [types.SET_CARD_DATA](state,value){
        if(value)state.CardData = value;
    },
    //设置Link数据
    [types.SET_LINK_DATA](state,value){
        if(value)state.LinkData = value;
    },
    //设置Diary数据
    [types.SET_DIARY_DATA](state,value){
        if(value)state.DiaryData = value;
    },
    //设置Setting数据
    [types.SET_SETTING_DATA](state,value){
        if(value)state.SettingData = value;
    },
    //设置Task数据
    [types.SET_TASK_DATA](state,value){
        if(!value)return;
        if(!value.history)return;
        for(let key in value.history){
            if(Object.keys(value.history[key].history).length===0 && !value.presets[key]){
                Vue.delete(value.history,key);
            }
        }
        
        state.TaskData = value;
    },
    [types.SET_CUSTOM_STYLE](state,value){
        state.customStyle = value;
    },


    //Card操作
    //更新Card分类信息
    [types.UPDATE_CARD_CATEGORY](state,value){
        Vue.set(state.CardData.categories,value.id, value);
        //上传...
    },
    //删除分类
    [types.DELETE_CARD_CATEGORY](state,bid){
        //删除分类中的卡片
        state.CardData.categories[bid].cards.forEach(cid=>{
            Vue.delete(state.CardData.cards,cid);
        })
        //删除分类
        Vue.delete(state.CardData.categories,bid);
        //保存
    },
    //更新Card卡片信息
    [types.UPDATE_CARD_INFO](state,value){
        //修改categories
        //1. 去除原cate
        console.log(state.CardData.cards[value.cid])
        let obCards = state.CardData.categories[state.CardData.cards[value.cid].category].cards
        for(let i = 0; i < obCards.length; i++){
            if(obCards[i] === value.cid){
                obCards.splice(i,1);
                break;
            }
        }
        //2. 添加现cate
        let nbCards = state.CardData.categories[value.category].cards;
        nbCards.push(value.cid);
        //修改tags
        //1. 移除原有
        state.CardData.cards[value.cid].tags.forEach(tag => {
            for(let i = 0; i < state.CardData.tags[tag].length;i++){
                if(state.CardData.tags[tag][i] === value.cid){
                    state.CardData.tags[tag].splice(i,1);
                    break;
                }
            }
        });
        //2. 添加新的
        value.tags.forEach(tag=>{
            if(state.CardData.tags[tag]){
                state.CardData.tags[tag].push(value.cid);
            }else{
                state.CardData.tags[tag] = [value.cid];
            }
        });
        //修改cards
        state.CardData.cards[value.cid] = JSON.parse(JSON.stringify(value));
        //同步至云
        // this.dispatch('uploadCardData');
    },
    //添加Card卡片
    [types.ADD_CARD_INFO](state,value){
        state.CardData.categories[value.category].cards.push(value.cid);
        state.CardData.cards[value.cid] = value;
    },
    //删除Card卡片
    [types.DELETE_CARD_INFO](state,value){
        //移除categories中的card
        let obCards = state.CardData.categories[state.CardData.cards[value.cid].category].cards
        for(let i = 0; i < obCards.length; i++){
            if(obCards[i] === value.cid){
                obCards.splice(i,1);
                break;
            }
        }
        //移除tags中的card
        state.CardData.cards[value.cid].tags.forEach(tag => {
            for(let i = 0; i < state.CardData.tags[tag].length;i++){
                if(state.CardData.tags[tag][i] === value.cid){
                    state.CardData.tags[tag].splice(i,1);
                    if(!state.CardData.tags[tag].length){
                        Vue.delete(state.CardData.tags,tag);
                    }
                    break;
                }
            }
        });
        //移除cards中的card
        Vue.delete(state.CardData.cards,value.cid);
        //保存
    },


    //Link操作
    //添加Link链接
    [types.ADD_LINK_ITEM](state,{listId,linkId,link}){
        //分类不存在，添加分类
        if(!state.LinkData[listId]){
            Vue.set(state.LinkData,listId,{});
        }
        Vue.set(state.LinkData[listId],linkId,link);
    },
    [types.DELETE_LINK_ITEM](state,{listId,linkId}){
        Vue.delete(state.LinkData[listId],linkId);
        if(Object.keys(state.LinkData[listId]).length === 0){
            Vue.delete(state.LinkData,listId);
        }
    },

    //Diary操作
    [types.ADD_DIARY_ITEM](state,value){
        state.DiaryData.diaries.push(value);
    },
    [types.DELETE_DIARY_ITEM](state,value){
        for(let i = 0; i < state.DiaryData.diaries.length; i++){
            if(state.DiaryData.diaries[i].date === value){
                Vue.delete(state.DiaryData.diaries,i);
                break;
            }
        }
    },

    //Task操作
    //添加任务记录
    [types.ADD_TASK_HISTORY](state,{id,history}){
        console.log(id)
        if(!state.TaskData.history[id].history) Vue.set(state.TaskData.history[id],'history',{});
        Vue.set(state.TaskData.history[id].history,history.id,history);
    },
    [types.DELETE_TASK_HISTORY](state,{id,hid}){
        for(let key in state.TaskData.history){
            if(key === id){
                Vue.delete(state.TaskData.history[id].history,hid);
            }
        }
    },
    [types.ADD_TASK_PRESET](state,preset){
        Vue.set(state.TaskData.presets,preset.id,preset);
        Vue.set(state.TaskData.history,preset.id,{...preset,history:{}})
    },
    [types.DELETE_TASK_PRESET](state,id){
        Vue.delete(state.TaskData.presets,id);
        if(!Object.keys(state.TaskData.history[id].history)){
            Vue.delete(state.TaskData.history,id);
        }
    },


}
export default mutations;