import VueRouter from "vue-router";

//
import AppLogin from '../components/Apps/AppLogin.vue';
import AppCard from '../components/Apps/AppCard.vue';
import AppSetting from '../components/Apps/AppSetting.vue';
import AppPanel from '../components/Apps/AppPanel.vue';
import AppLink from '../components/Apps/AppLink.vue';
import AppDiary from '../components/Apps/AppDiary.vue';

import CardCategory from '../components/Apps/Card/CardCategory.vue'
import CardPanel from '../components/Apps/Card/CardPanel.vue'
import CardTag from '../components/Apps/Card/CardTag.vue'
import CardReview from '../components/Apps/Card/CardReview.vue'
import CardInfo from '../components/Apps/Card/CardInfo.vue'

export default new VueRouter({
    routes:[
        {
            path:'/',
            beforeEnter(to,from,next){
                next({path:"/Panel"})
            }
        },
        {
            path: '/Login',
            component: AppLogin,
            
        },
        {
            path: '/Panel',
            component: AppPanel,
        },
        {
            path:'/Card',
            component: AppCard,
            children: [
                {
                    path: '',
                    component: CardCategory,
                },
                {
                    path: 'panel',
                    component: CardPanel,
                },
                {
                    path: 'category',
                    component: CardCategory,
                },
                {
                    path: 'tag',
                    component: CardTag,
                },
                {
                    path: 'review',
                    component: CardReview,
                },
                {
                    path: 'cardInfo',
                    component: CardInfo,
                }
            ]
        },
        {
            path: '/Link',
            component: AppLink,
        },
        {
            path: '/Diary',
            component: AppDiary,
        },
        {
            path:'/Setting',
            component: AppSetting,
        }
    ]
})