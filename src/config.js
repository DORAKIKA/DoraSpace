export const config = {
    themeColor:"#386ade",
    isDark:false,
    customStyle: false,
    Nav:{
        panel: {id:'AppPanel',name:'面板',icon:'iconfont icon-bodongtu',link:'/Panel',show:true},
        card: {id:'AppCard',name:'卡片',icon:'iconfont icon-cards',link:'/Card',show:true},
        task: {id:'AppTask',name:'任务',icon:'iconfont icon-jishi',link:'/Task',show:true},
        link: {id:'AppLink',name:'链接',icon:'iconfont icon-link',link:'/Link',show:true},
        diary: {id:'AppDiary',name:"日记",icon:'iconfont icon-rili',link:'/Diary',show:true},
        setting: {id:'AppSetting',name:'设置',icon:'iconfont icon-shezhi',link:'/Setting',show:true},
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
        chartLimit: 8,
        showNav: false,
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