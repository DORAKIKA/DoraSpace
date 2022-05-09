<template>
  <div id="nav">
      <div class="nav-items">
            <router-link
                v-for="item in this.filterNavs"
                :key="item.id"
                class="nav-item"
                :to="item.link"
                active-class="active"
                :data-index="item.id"
                >
                <i :class="item.icon"></i>
                <span>{{item.name}}</span>
            </router-link>
      </div>
    <div class="nav-button" @click="switchDarkMode">
        <i class="iconfont icon-zhouyeliangduxuanze"></i>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    data(){
        return{
            showNavItem: false,
        }
    },
    computed:{
        ...mapGetters(['config']),
        filterNavs(){
            let navs = [];
            for(let name in this.config.Nav){
                if(this.config.Nav[name].show){
                    navs.push(this.config.Nav[name]);
                }
            }
            return navs;
        }
    },
    methods:{
        handleToggle(){
            this.hide = !this.hide;
        },
        go(url){
            if(this.$router.currentRoute.path !== url){
            this.$router.replace({
                path: url,
            })
            }
        },
        changePage(e){
            if(e.altKey){
                if(this.filterNavs[e.keyCode-49]){
                    this.go(this.filterNavs[e.keyCode-49].link);
                    return false;
                }
            }
        },
        ...mapActions(['switchDarkMode']),
    },
    mounted(){
        window.addEventListener('keydown',this.changePage)
    }
}
</script>

<style>
#nav{
    width: 68px;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 100;
    background: var(--card-white);
    border-right: 1px solid var(--bg);
    /* position: relative; */
    transition: 0.3s;
}
#nav .nav-items::-webkit-scrollbar{
    width: 0;
    height: 0;
}
#nav .nav-items{
    overflow-y: scroll;
    width: 58px;
}
#nav .nav-item{
    display: block;
    min-width: 58px;
    width: 58px;
    height: 58px;
    margin: 1rem 0 0;
    color: var(--font-color);
    line-height: 3rem;
    text-align: center;
    border-radius: 0.5rem;
    transition: 0.3s;
    display: flex;
    flex-direction: column;
    align-items: center;
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
    display: inline-block;
    width: 32px;
    height: 32px;
    line-height: 34px;
    font-size: 1.2rem;
}
#nav .nav-item span{
    display: inline-block;
    height: 26px;
    line-height: 26px;
    font-size: 12px;
}

#nav .nav-button{
    display: block;
    min-width: 58px;
    width: 58px;
    height: 58px;
    margin: 1rem 0 0;
    color: var(--font-color);
    line-height: 58px;
    text-align: center;
    border-radius: 0.5rem;
    transition: 0.3s;
    font-size: 1.2rem;
}
#nav .nav-button:hover{
    color: var(--theme-color);
    background: var(--card-inner);
}


@media screen and (max-width:900px) {
  /* #nav{
      width: 100%;
      justify-content: flex-start;
      flex-direction: row;
      border-top: 1px solid var(--bg);
  }
  #nav .nav-item{
      margin: 0.5rem;
  } */
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