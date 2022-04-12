const axios = require("axios").default;
const http = require("../http/index").default;
import Vue from 'vue';
// import Vue from 'vue';
export default {
    actions:{
        addDiary(context,value){
            context.commit('AddDiary',value);
        },
        deleteDiary(context,value){
            context.commit('DeleteDiary',value);
        },
        getDiaryData(context){
            if(!this.state.AppInfo.isLogin) return;
            let userAuth = localStorage.getItem('userAuth');

            http.get(`${this.state.AppInfo.https}://api.dorakika.cn/jianguoyun?target=DoraSpace/diaryInfo.json`,{
                headers:{
                    'Authorization': `Basic ${userAuth}`
                }
            }).then(
                (res)=>{
                    if(res.data.code === 404){
                        console.log(res);
                    }else if(res.data.code){
                        context.commit('SetEmojis',res.data.data.emojis);
                        context.commit('SetDiaries',res.data.data.diaries);
                        this.$bus.$emit('onDiaryDataLoad');
                    }
                },
                (error)=>{
                    if(error.status === 404){
                        http.get('https://doraspace-1303371957.cos.ap-nanjing.myqcloud.com/diaryInfo.json')
                        .then((res)=>{
                            console.log(res)
                            context.commit('SetDiaries',res.data);
                            this.$bus.$emit('onDiaryDataLoad');
                        })
                    }
                }
            )
        },
        uploadDiaryData(context){
            if(!this.state.AppInfo.isLogin) return;
            let userAuth = localStorage.getItem('userAuth');
            var data = JSON.stringify({
                emojis: context.state.emojis,
                diaries:context.state.diaries
            });
            var config = {
                method: 'put',
                url: `${this.state.AppInfo.https}://api.dorakika.cn/jianguoyun?target=DoraSpace/diaryInfo.json`,
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
    },
    mutations:{
        AddDiary(state,value){
            state.diaries.push(value);
            this.dispatch('uploadDiaryData');
        },
        DeleteDiary(state,value){
            for(let i = 0; i < state.diaries.length; i++){
                if(state.diaries[i].date === value){
                    Vue.delete(state.diaries,i);
                    this.dispatch('uploadDiaryData');
                    break;
                }
            }
        },
        SetDiaries(state,value){
            state.diaries = value;
        },
        SetEmojis(state,value){
            state.emojis = value;
        }
    },
    state:{
        diaries:[
            {mood: '😁',date:'2022/04/01 20:01',content:'欢迎使用DoraSpace！'},
        ],
        emojis:'😁,🥰,😑,🙄,😪,🤒,🤢,🥳,😕,😭,😞,😡,🤡',
    }
}