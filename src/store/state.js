import {config, DefaultTodo} from '../config';
const state = {
    config: config,
    isLogin: true,
    https: window.location.origin[4]==='s'?'https':'http',
    origin: window.location.origin,
    customStyle: '',

    CardData:{},
    LinkData:{},
    DiaryData:{
        diaries:[
            {mood: 'π',date:'2022/04/01 20:01',content:'ζ¬’θΏδ½Ώη¨DoraSpaceοΌ'},
        ],
        emojis:'π,π₯°,π₯³;π,π,πͺ,π€,π;π€’,π­,π,π‘,π€‘',
    },
    SettingData:{},
    TaskData:DefaultTodo,
}
export default state;