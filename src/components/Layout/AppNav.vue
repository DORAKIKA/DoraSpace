<template>
  <div id="nav">
    <el-tooltip
        :effect="$store.state.AppInfo.config.isDark?'light':'dark'"
        placement="left"
        :content="item.name"
        v-for="item in this.$store.state.AppInfo.navItems"
        :key="item.id"
    >
        <router-link
            class="nav-item"
            :to="item.link"
            active-class="active"
            :data-index="item.id"
            >
            <i :class="item.icon"></i>
        </router-link>
    </el-tooltip>
      <!-- <button class="nav-button" @click="toggleNav"><i class="iconfont icon-gouwudai"></i></button> -->
    <div class="nav-item" @click="$store.commit('ToggleDark')">
        <i class="iconfont icon-zhouyeliangduxuanze"></i>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            showNavItem: false,
            items:[
                {id:'AppPanel',name:'Panel',icon:'iconfont icon-bodongtu',link:'/Panel'},
                {id:'AppCard',name:'Card',icon:'iconfont icon-cards',link:'/Card'},
                {id:'AppLink',name:'Link',icon:'iconfont icon-link',link:'/Link'},
                {id:'AppDiary',name:"Diary",icon:'iconfont icon-rili',link:'/Diary'},
                {id:'AppSetting',name:'Setting',icon:'iconfont icon-shezhi',link:'/Setting'},
            ],
        }
    },
    methods:{
        toggleNav(){
            this.showNavItem = !this.showNavItem;
        },
    },
    mounted(){
    }
}
</script>

<style>
#nav{
    width: 4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 100;
    background: var(--card-white);
    border-right: 1px solid var(--bg);
    overflow: scroll;
}
#nav::-webkit-scrollbar{
    width: 0;
    height: 0;
}
#nav .nav-item{
    display: block;
    width: 3rem;
    height: 3rem;
    margin: 1rem 0 0;
    color: var(--font-color);
    line-height: 3rem;
    text-align: center;
    border-radius: 0.5rem;
    transition: 0.3s;
}
#nav .nav-item:hover{
    color: var(--theme-color);
    background: var(--card-inner);
}
#nav .nav-item.router-link-exact-active,
#nav .nav-item.active{
    background: var(--theme-color);
    color: #fff;
}
#nav .nav-item i{
    font-size: 1.2rem;
}

@media screen and (max-width:900px) {
  #nav{
      width: 100%;
      justify-content: space-around;
      flex-direction: row;
      border-top: 1px solid var(--bg);
  }
  #nav .nav-item{
      margin: 0.5rem;
  }
}

.float-enter,
.float-leave-to{
    transform: translateY(10%);
    opacity: 0;
}
.float-enter-to,.float-leave{
    transform: translateY(0);
    opacity: 1;
}
.float-enter-active,.float-leave-active{
    transition: 0.3s!important;
}
</style>