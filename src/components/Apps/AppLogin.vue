<template>
    <div id="login">
        <div class="loginBox">
            <input type="text" v-model="username">
            <input type="password" v-model="password">
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

</style>