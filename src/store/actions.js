import types from './mutation_types';
import http from '@/http/index';
import axios from '@/utils/axios';
import { getLocalConfig,setLocalConfig } from '@/utils/storage';
 
// 设置用户配置
export const setDarkMode = function({ commit }, { config }) {
    commit(types.SET_CONFIG, config);
}
//切换昼夜
export const switchDarkMode = function({commit,state}){
    commit(types.SET_DARKMODE, !state.config.isDark);
    setLocalConfig(JSON.stringify(state.config));
}

//获取所有数据
export const getAppData = function({commit,state}){
    if(!state.isLogin) return;
    let userAuth = localStorage.getItem('userAuth');
    http.get(`${state.https}://api.dorakika.cn/jianguoyun?target=DoraSpace/AppData.json`,{
        headers:{
            'Authorization': `Basic ${userAuth}`
        }
    }).then(res=>{
        if(res.data.code===404){
            http.get('https://doraspace-1303371957.cos.ap-nanjing.myqcloud.com/AppData.json')
            .then((res)=>{
                commit(types.SET_CARD_DATA,res.data.CARD_DATA);
                commit(types.SET_LINK_DATA,res.data.LINK_DATA);
                commit(types.SET_DIARY_DATA,res.data.DIARY_DATA);
                commit(types.SET_SETTING_DATA,res.data.SETTING_DATA);
                // $bus.$emit('onDataLoad');
            })
        }else if(res.data.code){
            commit(types.SET_CARD_DATA,res.data.data.CARD_DATA);
            commit(types.SET_LINK_DATA,res.data.data.LINK_DATA);
            commit(types.SET_DIARY_DATA,res.data.data.DIARY_DATA);
            commit(types.SET_SETTING_DATA,res.data.data.SETTING_DATA);
            // $bus.$emit('onDataLoad');
        }
    },error=>{
        console.log(error)
    });
}
//上传所有数据--
export const uploadAppData = function({state}){
    if(!state.isLogin) return;
    let userAuth = localStorage.getItem('userAuth');
    var data = JSON.stringify({
        CARD_DATA: state.CardData,
        LINK_DATA: state.LinkData,
        DIARY_DATA: state.DiaryData,
        SETTING_DATA: state.SettingData
    });
    axios
      .put(`${state.AppInfo.https}://api.dorakika.cn/jianguoyun?target=DoraSpace/AppData.json`, {
        data,
        headers: { 
            'Authorization': `Basic ${userAuth}`, 
            'Content-Type': 'application/json'
        },
      }).then(
          res=>console.log(res)
      )
}
//获取CONFIG
export const getConfig = function({commit}){
    commit(types.SET_CONFIG,JSON.parse(getLocalConfig()))
}



// -----------------Card
//更新目录
export const updateCategory = function({commit},value){
    commit(types.UPDATE_CARD_CATEGORY,value);
}
//添加目录
export const addCategory = function({commit},value){
    console.log(value)
    commit(types.UPDATE_CARD_CATEGORY,value);
}
//删除目录
export const deleteCategory = function({commit},bid){
    commit(types.DELETE_CARD_CATEGORY,bid)
}
//添加卡片
export const addCard = function({commit},bid){
    //在category中生成cardid
    let cid = 'card'+new Date().getTime();
    //向cards中添加一个模板card
    let card = {
        cid: cid,
        title:"TITLE",
        description: "description",
        category: bid,
        tags:[],
        process: 0,
        content: "write something here!"
    }
    commit(types.ADD_CARD_INFO,card);
}
//更新卡片信息
export const updateCardInfo = function({commit},cardInfo){
    commit(types.UPDATE_CARD_INFO,cardInfo);
}
//删除卡片
export const deleteCardInfo = function({commit},cardInfo){
    commit(types.DELETE_CARD_INFO,cardInfo);
}


//-----Link
//添加Link链接
export const addLinkItem = function({commit},opt){
    commit(types.ADD_LINK_ITEM,opt);
}
//删除Link链接
export const deleteLinkItem = function({commit},opt){
    commit(types.DELETE_LINK_ITEM,opt);
}
//更新Link链接
export const updateLinkItem = function({commit},opt){
    commit(types.DELETE_LINK_ITEM,{listId:opt.listId,linkId:opt.link.id});
    commit(types.ADD_LINK_ITEM,{listId:opt.link.listName,linkId:opt.link.id,link:opt.link});
}


//------Diary
//添加Diary日记
export const addDiaryItem = function({commit},value){
    commit(types.ADD_DIARY_ITEM,value);
}
//删除Diary日记
export const deleteDiaryItem = function({commit},value){
    commit(types.DELETE_DIARY_ITEM,value);
}