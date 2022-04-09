const axios = require("axios").default;
const http = require("../http/index").default;
// import Vue from 'vue';
export default {
    actions:{
        addDiary(context,value){
            context.commit('AddDiary',value);
        },
        getDiaryData(context){
            if(!this.state.AppInfo.isLogin) return;
            let userAuth = localStorage.getItem('userAuth');

            http.get(`${this.state.AppInfo.origin}/jianguo/DoraSpace/diaryInfo.json`,{
                headers:{
                    'Authorization': `Basic ${userAuth}`
                }
            }).then(
                (res)=>{
                    console.log(res);
                    context.commit('SetDiaries',res.data);
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
            var data = JSON.stringify(context.state.diaries);
            var config = {
                method: 'put',
                url: `${this.state.AppInfo.origin}/jianguo/DoraSpace/diaryInfo.json`,
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
        SetDiaries(state,value){
            state.diaries = value;
        }
    },
    state:{
        diaries:[
            {mood: '😁',date:'2022/04/01 20:01',content:'欢迎使用DoraSpace！'},
        ]
    }
}