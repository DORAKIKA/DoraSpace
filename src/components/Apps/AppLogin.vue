<template>
    <div id="login">
        <div class="loginBox">
            <div><span>登录</span><a href="https://help.jianguoyun.com/?p=2064" target="_blank" class="iconfont icon-yiwen"></a></div>
            <input type="text" v-model="username" placeholder="账号">
            <input type="password" v-model="password" placeholder="密码">
            <el-button @click="userLogin">登录</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            username: "",
            password: "",
        }
    },
    methods:{
        userLogin(){
            //setLocalStorge
            let userAuth = btoa(encodeURIComponent(`${this.username}:${this.password}`).replace(/%([0-9A-F]{2})/g, function(match, p1) {return String.fromCharCode('0x' + p1);}));
            localStorage.setItem('userAuth',userAuth)
            this.$store.dispatch('checkLogin',this);
        },
    }
}
</script>

<style>
#login{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
#login a{
    margin-left: 0.2rem;
    color: inherit;
}
.loginBox{
  width: 300px;
  padding: 1rem;
  background: var(--card-white);
  box-shadow:  2px 2px 8px var(--card-shadow);
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
#login .loginBox input{
  width: 100%;
  height: 2rem;
  padding: 0 1rem;
  border-radius: 4px;
  margin: 0.5rem 0;
  background: var(--card-inner);
  border: none;
  outline: none;
  box-shadow: 0 0 0 1rem rgba(255, 255, 255, 0) inset;
  transition: 0.3s;
}
#login .loginBox input:hover{
  box-shadow: 0 0 0 1rem rgba(255, 255, 255, 0.1) inset;
}
#login .loginBox input:focus{
  box-shadow: 0 0 0 1rem rgba(255, 255, 255, 0.2) inset;
}
#login .loginBox .el-button{
  width: 4rem;
  height: 2rem;
  line-height: 2rem;
  padding: 0;
  margin: 0.5rem 0;
  background: var(--bg);
  border: none;
}
</style>