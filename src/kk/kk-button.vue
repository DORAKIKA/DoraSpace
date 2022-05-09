<template>
    <button
        class="kk-button"
        :class="`${types} kk-button-${size}`"
        @click="$emit('click')"
    >
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'kk-button',
    props: ['type','size'],
    computed:{
        types(){
            if(!this.type)return;
            let t = this.type.split(' ');
            let res = ""
            for(let i = 0; i < t.length; i++){
                if(t[i])res += ' kk-button-'+t[i];
            }
            return res;
        }
    }
}
</script>

<style>
.kk-button{
    border-radius: 8px;
    padding: 8px;
    margin: 4px;
    border: none;
    background: #00a8f3;
    color: #fff;
    border: 4px solid #fff;
    /* min-width: 48px; */
    box-sizing: border-box;
    cursor: pointer;
    transition: 0.3s;
}
.kk-button:hover{
    box-shadow: 0 0 0 4px #fe3a2f;
}
.kk-button-mini{
    font-size: 12px;
    padding: 4px;
    width: 32px;
    height: 32px;
}
.kk-button-circle{
    border-radius: 32px;
}
.kk-button-danger{
    background: #fe3a2f;
}
</style>