// 用户配置
export const config = state => state.config;

//用户登录状态
export const isLogin = state => state.isLogin;

//自定义样式
export const customStyle = state => state.customStyle;



//DIARY INFO
//默认表情
export const diaryEmojis = state=>state.DiaryData.emojis;


//获取Card数据
export const CardData = state => state.CardData;
//获取Link数据
export const LinkData = state => state.LinkData;
//获取Diary数据
export const DiaryData = state => state.DiaryData;
//获取TODO数据
export const TaskData = state => state.TaskData;