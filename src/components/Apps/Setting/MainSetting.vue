<template>
  <div class="MainSetting">
    <div class="group-name">用户设置</div>
    <div class="group">
        <div class="item">
        <div class="key">账号</div>
        <div class="value"><el-button @click="goLogin" type="danger" plain>更换账号</el-button></div>
        </div>
        <!-- 主题色 -->
        <div class="item">
        <div class="key">主题色</div>
        <div class="value">
            <div class="themeColor">
            <button 
                v-for="color in themeColors"
                :key="color"
                @click.prevent="changeThemeColor(color)" 
                :class="AppInfo.config.themeColor===color?'checked':''"
                :style="`background:${color}`">
            </button>
            </div>
        </div>
        </div>
        <!-- 夜间切换 -->
        <div class="item">
        <div class="key">夜间模式</div>
        <div class="value">
            <el-switch
            v-model="AppInfo.config.isDark"
            active-color="var(--theme-color)"
            inactive-color="var(--theme-color)">
            </el-switch>
        </div>
        </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data(){
        return{
            
            themeColors:["#386ade","#ff6755","#61649f","#18e7ae"],
        }
    },
    computed:{
        ...mapState(['AppInfo'])
    },
    methods:{
        changeThemeColor(value){
            this.AppInfo.config.themeColor = value;
        },
        goLogin(){
            this.$router.replace({
                path: '/Login',
            })
        }
    }
}
</script>

<style>

</style>