export const config = {
    themeColor:"#386ade",
    isDark:false,
    customStyle: false,
    Nav:{
        panel: {id:'AppPanel',name:'Panel',icon:'iconfont icon-bodongtu',link:'/Panel',show:true},
        card: {id:'AppCard',name:'Card',icon:'iconfont icon-cards',link:'/Card',show:true},
        todo: {id:'AppTodo',name:'Todo',icon:'iconfont icon-fill-task',link:'/Todo',show:true},
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
}

export const DefaultTodo = {
    presets: {
        'preset20220502':{
            id: 'preset20220502',
            content: 'LeetCode刷题',
            color: '#ffa116',
            onceTime: 25*60*1000,
        },
        'preset202205021':{
            id: 'preset202205021',
            content: '微信读书',
            color: '#30acfe',
            onceTime: 25*60*1000,
        },
    },
    history:{
        'preset20220502':{
            id: 'preset20220502',
            content: 'LeetCode刷题',
            color: '#ffa116',
            onceTime: 25*60*1000,
            history: {
                'taskH20220502':{
                    id: 'taskH20220502',
                    startTime: 1651459302265,
                    endTime: 1651461102265,
                    during: '30min',
                    remark: '完成了每日一题和几道训练题'
                }
            }
        },
        'preset202205021':{
            id: 'preset202205021',
            content: '微信读书',
            color: '#30acfe',
            onceTime: 25*60*1000,
        },
    }
}