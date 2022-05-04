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
            {mood: '😁',date:'2022/04/01 20:01',content:'欢迎使用DoraSpace！'},
        ],
        emojis:'😁,🥰,🥳;😑,🙄,😪,🤒,😕;🤢,😭,😞,😡,🤡',
    },
    SettingData:{},
    TodoData:DefaultTodo,
}
export default state;