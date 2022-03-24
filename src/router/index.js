import VueRouter from "vue-router";

//
import AppCard from '../components/Apps/AppCard.vue';
import AppSetting from '../components/Apps/AppSetting.vue';

import CardCategory from '../components/Apps/Card/CardCategory.vue'
import CardPanel from '../components/Apps/Card/CardPanel.vue'
import CardTag from '../components/Apps/Card/CardTag.vue'
import CardReview from '../components/Apps/Card/CardReview.vue'
import CardInfo from '../components/Apps/Card/CardInfo.vue'

export default new VueRouter({
    routes:[
        {
            path: '/',
            component: AppCard,
            children:[
                {
                    path:'',
                    component: CardPanel
                }
            ]
        },
        {
            path:'/Card',
            component: AppCard,
            children: [
                {
                    path: '',
                    component: CardPanel,
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
            path:'/Setting',
            component: AppSetting,
        }
    ]
})