const state = {
    config:{
        themeColor:"#386ade",
        isDark:false,
        customStyle: false,
        Nav:{
            panel: {id:'AppPanel',name:'Panel',icon:'iconfont icon-bodongtu',link:'/Panel',show:true},
            card: {id:'AppCard',name:'Card',icon:'iconfont icon-cards',link:'/Card',show:true},
            link: {id:'AppLink',name:'Link',icon:'iconfont icon-link',link:'/Link',show:true},
            diary: {id:'AppDiary',name:"Diary",icon:'iconfont icon-rili',link:'/Diary',show:true},
            setting: {id:'AppSetting',name:'Setting',icon:'iconfont icon-shezhi',link:'/Setting',show:true},
        },
        Panel:{
            showBilibiliHot: true,
            showWeiboHot: false,
            showZhihuHot: false,
            showHitokoto: true,
        },
        Card:{
            categoryExtended: true,
        },
        Link:{
            showLinkChart: true,
            chartLimit: 10,
            showNav: true,
        }
    },
    isLogin: true,
    https: window.location.origin[4]==='s'?'https':'http',
    origin: window.location.origin,
    customStyle: '',
    DiaryInfo: {
        diaries:[
            {mood: '😁',date:'2022/04/01 20:01',content:'欢迎使用DoraSpace！'},
        ],
        emojis:'😁,🥰,🥳;😑,🙄,😪,🤒,😕;🤢,😭,😞,😡,🤡',
    },

    CardData:{},
    LinkData:{},
    DiaryData:{
        diaries:[
            {mood: '😁',date:'2022/04/01 20:01',content:'欢迎使用DoraSpace！'},
        ],
        emojis:'😁,🥰,🥳;😑,🙄,😪,🤒,😕;🤢,😭,😞,😡,🤡',
    },
    SettingData:{},
}
export default state;