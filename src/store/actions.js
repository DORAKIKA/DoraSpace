import types from './mutation_types';
import http from '@/http/index';
import axios from '@/utils/axios';
import { 
    getLocalConfig,
    setLocalConfig,
    setLocalData,
    getLcoalData,
} from '@/utils/storage';
 
// 设置用户配置
export const setDarkMode = function({ commit }, { config }) {
    commit(types.SET_CONFIG, config);
}
//切换昼夜
export const switchDarkMode = function({commit,state}){
    commit(types.SET_DARKMODE, !state.config.isDark);
    setLocalConfig(JSON.stringify(state.config));
}

//检查登录
export const checkLogin = function({dispatch,state},app){
    //检查登录
    let userAuth = localStorage.getItem('userAuth');
    if(state.config.loginMode=="local"){
        app.$message({
            showClose: true,
            message: '登录成功',
            type: 'success'
        });
        state.isLogin = true;
        dispatch("getAppData");
        if(app.$router.currentRoute.path === '/Login' || app.$router.currentRoute.path === '/'){
            app.$router.replace({
                path: '/Panel',
            })
        }
        return;
    }
    var config = {
        method: 'get',
        // url: `${context.state.origin}/jianguo/DoraSpace/checkLogin.data`,
        url: `${state.https}://api.dorakika.cn/jianguoyun?target=DoraSpace&method=mkcol`,
        headers: { 
            'Authorization': `Basic ${userAuth}`, 
            'Content-Type': 'application/json'
        },
    };
    axios(config).then((response)=>{
        console.log(response)
        if(response.data.status === 1){
            state.isLogin = true;
            
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
            dispatch("getAppData");
        }else if(response.data.status === 0){
            state.isLogin = false;
            
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
}
export const setLoginMode = function({commit,state},value){
    commit(types.SET_LOGINMODE,value);
    setLocalConfig(JSON.stringify(state.config));
}

//获取所有数据
export const getAppData = function({commit,state}){
    if(!state.isLogin) return;
    if(state.config.loginMode === 'local'){
        let data = getLcoalData();
        commit(types.SET_CARD_DATA,data.CARD_DATA);
        commit(types.SET_LINK_DATA,data.LINK_DATA);
        commit(types.SET_DIARY_DATA,data.DIARY_DATA);
        commit(types.SET_SETTING_DATA,data.SETTING_DATA);
        commit(types.SET_TASK_DATA,data.TASK_DATA);
        return;
    }


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
                commit(types.SET_TASK_DATA,res.data.TASK_DATA);
            })
        }else if(res.data.code<400){
            console.log(res.data)
            commit(types.SET_CARD_DATA,res.data.data.CARD_DATA);
            commit(types.SET_LINK_DATA,res.data.data.LINK_DATA);
            commit(types.SET_DIARY_DATA,res.data.data.DIARY_DATA);
            commit(types.SET_SETTING_DATA,res.data.data.SETTING_DATA);
            commit(types.SET_TASK_DATA,res.data.data.TASK_DATA);
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
    var data = {
        CARD_DATA: state.CardData,
        LINK_DATA: state.LinkData,
        DIARY_DATA: state.DiaryData,
        SETTING_DATA: state.SettingData,
        TASK_DATA: state.TaskData,
    };


    if(state.config.loginMode === 'local'){
        setLocalData(data);
        return;
    }

    data = JSON.stringify(data);
    var config = {
        method: 'put',
        url: `${this.state.AppInfo.https}://api.dorakika.cn/jianguoyun?target=DoraSpace/AppData.json`,
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
}
//获取CONFIG
export const getConfig = function({commit}){
    commit(types.SET_CONFIG,JSON.parse(getLocalConfig()))
}

//获取自定义样式
export const getCustomStyle  = function({commit,state},url){
    if(!state.isLogin) return;
    let userAuth = localStorage.getItem('userAuth');
    http.get(`${state.https}://api.dorakika.cn/jianguoyun?target=DoraSpace/${url?url:'custom.css'}`,{
        headers:{
            'Authorization': `Basic ${userAuth}`
        }
    }).then(res=>{
        if(res.data.code){
            commit(types.SET_CUSTOM_STYLE,res.data.data);
        }
    },error=>{
        console.log(error)
    });
}




// -----------------Card
//更新目录
export const updateCategory = function({commit,dispatch},value){
    commit(types.UPDATE_CARD_CATEGORY,value);
    dispatch('uploadAppData');
}
//添加目录
export const addCategory = function({commit,dispatch},value){
    console.log(value)
    commit(types.UPDATE_CARD_CATEGORY,value);
    dispatch('uploadAppData');
}
//删除目录
export const deleteCategory = function({commit,dispatch},bid){
    commit(types.DELETE_CARD_CATEGORY,bid)
    dispatch('uploadAppData');
}
//添加卡片
export const addCard = function({commit,dispatch},bid){
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
    dispatch('uploadAppData');
}
//更新卡片信息
export const updateCardInfo = function({commit,dispatch},cardInfo){
    commit(types.UPDATE_CARD_INFO,cardInfo);
    dispatch('uploadAppData');
}
//删除卡片
export const deleteCardInfo = function({commit,dispatch},cardInfo){
    commit(types.DELETE_CARD_INFO,cardInfo);
    dispatch('uploadAppData');
}


//-----Link
//添加Link链接
export const addLinkItem = function({commit,dispatch},opt){
    commit(types.ADD_LINK_ITEM,opt);
    dispatch('uploadAppData');
}
//删除Link链接
export const deleteLinkItem = function({commit,dispatch},opt){
    commit(types.DELETE_LINK_ITEM,opt);
    dispatch('uploadAppData');
}
//更新Link链接
export const updateLinkItem = function({commit,dispatch},opt){
    commit(types.DELETE_LINK_ITEM,{listId:opt.listId,linkId:opt.link.id});
    commit(types.ADD_LINK_ITEM,{listId:opt.link.listName,linkId:opt.link.id,link:opt.link});
    dispatch('uploadAppData');
}


//------Diary
//添加Diary日记
export const addDiaryItem = function({commit,dispatch},value){
    commit(types.ADD_DIARY_ITEM,value);
    dispatch('uploadAppData');
}
//删除Diary日记
export const deleteDiaryItem = function({commit,dispatch},value){
    commit(types.DELETE_DIARY_ITEM,value);
    dispatch('uploadAppData');
}


//----task
//添加任务历史
export const addTaskHistory = function({commit,dispatch},value){
    commit(types.ADD_TASK_HISTORY,value);
    dispatch('uploadAppData');
}
//删除任务历史
export const deleteTaskHistory = function({commit,dispatch},value){
    commit(types.DELETE_TASK_HISTORY,value);
    dispatch('uploadAppData');
}
export const addTaskPreset = function({commit,dispatch},value){
    commit(types.ADD_TASK_PRESET,value);
    dispatch('uploadAppData');
}
export const deleteTaskPreset = function({commit,dispatch},value){
    commit(types.DELETE_TASK_PRESET,value);
    dispatch('uploadAppData');
}