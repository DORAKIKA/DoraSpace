<template>
  <el-aside width="fit-content">
      <h1 class="logo" @click="toggleHeader()">DS</h1>
      <el-menu
        ref="asideMenu"
        class="el-menu-vertical-demo"
        :collapse="headerExtended"
        default-active="AppPanel"
        @select="select"
        >
            <el-menu-item
                v-for="item in items"
                :key="item.id"
                :index="item.id"
                class="navItem"
            >
                <i :class="item.icon"></i>
                <span slot="title">{{item.name}}</span>
            </el-menu-item>
      </el-menu>
      <ul>
      </ul>
  </el-aside>
</template>

<script>
export default {
    data(){
        return{
            items:[
                {id:'AppPanel',name:'Panel',icon:'iconfont icon-hezi'},
                {id:'AppTodo',name:'Todo',icon:'iconfont icon-dui'},
                {id:'AppMemo',name:'Memo',icon:'iconfont icon-wenjian'},
                {id:'AppCard',name:'Card',icon:'iconfont icon-cards'},
                {id:'AppSetting',name:'Setting',icon:'iconfont icon-shezhi'},
            ],
            headerExtended: false,
        }
    },
    methods:{
        toggleHeader(){
            this.headerExtended = !this.headerExtended;
        },
        select(index){
            if(index === "AppSetting")return this.showSetting();
            this.switchPage(index);
        }
    },
    props:["switchPage","pageShow","showSetting"]
}
</script>

<style>
h1.logo{
    height: 3rem;
    text-align: center;
    line-height: 3rem;
    cursor: pointer;
    transition: 0.3s;
}
h1.logo:hover{
    color: var(--theme-color)
}
.el-aside{
    background-color: #fff;
}
ul.el-menu{
    border:none;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
}
.el-menu-item .iconfont{
    margin-right: 5px;
    width:24px;
    text-align: center;
    font-size: 18px;
    vertical-align: middle;
}
</style>