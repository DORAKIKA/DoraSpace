<template>
    <div class="link-item">
        <a @click="linkClick" class="link-a" :href="link.linkTo" target="_blank" slot="reference">
            <div class="avatar">
                <img v-if="link.icon" :src="link.icon" :alt="link.name">
                <img v-else-if="!link.icon" :src="`https://favicon.cccyun.cc/${link.linkTo}`" :alt="link.name">
            </div>
            <div class="content">
                <div class="name">{{link.name}}</div>
            </div>
        </a>
        <div @click="editLink(listId,linkId)" class="edit iconfont icon-xiugai"></div>
    </div>
</template>

<script>
export default {
    methods:{
        linkClick(){
            this.$store.commit('LinkClick',{linkId:this.linkId,listId:this.listId});
        }
    },
    props:['link','linkId','listId','editLink']
}
</script>

<style>
.link-item{
    position: relative;
    overflow: hidden;
    border-radius: 8px;
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.2);
    transition: 0.3s;
}
.link-item:hover{
    transform: perspective(300px) rotateX(7deg) scale(0.97);
    box-shadow: 0 16px 5px -10px rgba(255, 255, 255, 0.2);
}
.link-a{
    padding: 1rem;
    background: var(--card-inner);
    border-radius: 8px;
    display: block;
    color: var(--font-color);
    display: flex;
    align-items: center;
    height: 5rem;
}
.link-a:hover{
    background: var(--theme-color);
    color: #fff;
}
.link-item .avatar img{
    width: 2rem;
    height: 2rem;
    margin-right: 0.5rem;
    border-radius: 8px ;
}
.link-item .name{
    margin: 0 0 0.5rem;
}
.link-item .desc{
    font-size: 0.8rem;
}
.link-item .edit{
    display: none;
    position: absolute;
    top: calc(50% - 1rem);
    width: 2rem;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
    border-radius: 50%;
    cursor: pointer;
    color: #fff;
}
.link-item:hover .edit{
    display: block;
    box-shadow: -2px -2px 4px rgb(0 0 0 / 20%),
                2px 2px 4px rgb(255 255 255 / 20%),
                -160px -20px 0 15px rgba(255, 255, 255, 0.3),
                -40px 15px 0 5px rgba(255, 255, 255, 0.3);
}
.link-item .edit{
    right: 1rem;
}
.link-item .edit:hover{
    background: var(--theme-color);
    color: #fff;
}
</style>