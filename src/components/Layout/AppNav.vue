<template>
  <div id="nav">
      <transition-group name="float">
      
        <div
            v-show="showNavItem"
            v-for="item in items"
            :key="item.id"
            :data-index="item.id"
            @click="changeApp"
            >
                <el-tooltip placement="left" :content="item.name">
                    <div class="nav-item"><i :class="item.icon"></i></div>
                </el-tooltip>
        </div>
      </transition-group>
      <button class="nav-button" @click="toggleNav"><i class="iconfont icon-gouwudai"></i></button>
  </div>
</template>

<script>
export default {
    data(){
        return{
            showNavItem: false,
            items:[
                {id:'AppCard',name:'Card',icon:'iconfont icon-cards'},
                {id:'AppSetting',name:'Setting',icon:'iconfont icon-shezhi'},
            ],
        }
    },
    methods:{
        toggleNav(){
            this.showNavItem = !this.showNavItem;
        },
        changeApp(e){
            this.$bus.$emit("switchPage",e.currentTarget.dataset.index);
        }
    }
}
</script>

<style>
#nav{
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
#nav .nav-button{
    width: 3rem;
    height: 3rem;
    background-color: var(--theme-color);
    line-height: 3rem;
    text-align: center;
    color: #fff;
    transition: 0.3s;
    border-radius: 50%;
    border: none;
    box-shadow: 0 0 0 0.3rem rgba(0, 0, 0, 0.2) inset,
                0 0 0 0.3rem #fff;
}
#nav .nav-button:hover{
    box-shadow: 0 0 0 0.5rem rgba(0, 0, 0, 0.2) inset,
                0 0 0 0.3rem #fff;
}
#nav .nav-button:active{
    box-shadow: 0 0 0 1rem rgba(0, 0, 0, 0.2) inset,
                0 0 0 0.3rem #fff;
}
#nav .nav-button i{
    font-size: 1.5rem;
}
#nav .nav-item{
    width: 2.6rem;
    height: 2.6rem;
    background: var(--theme-color);
    margin: 1rem 0;
    color: #fff;
    line-height: 2.6rem;
    text-align: center;
    border-radius: 50%;
    box-shadow: 0 0 0 0.25rem rgba(0, 0, 0, 0.2) inset,
                0 0 0 0.25rem #fff;
}
#nav .nav-item i{
    font-size: 1.2rem;
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
    transition: 0.3s;
}
</style>