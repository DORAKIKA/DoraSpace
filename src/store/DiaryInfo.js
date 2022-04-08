// const axios = require("axios").default;
// const http = require("../http/index").default;
// import Vue from 'vue';
export default {
    actions:{
        addDiary(context,value){
            context.commit('AddDiary',value);
        }
    },
    mutations:{
        AddDiary(state,value){
            state.diaries.push(value)
        }
    },
    state:{
        diaries:[
            {mood: '1',date:'2022/04/01 20:01',content:'愚人节快乐！'},
            {mood: '2',date:'2022/04/03 20:01',content:'热起来了啊！'},
            {mood: '3',date:'2022/04/06 20:01',content:'加油，继续写博客'},
            {mood: '4',date:'2022/04/07 20:01',content:'累死了！'},
            {mood: '5',date:'2022/04/08 20:01',content:'今天天气真好！'},
        ]
    }
}