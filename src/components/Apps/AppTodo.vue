<template>
    <div id="AppTodo">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    methods:{
        goto(link){
            if(this.$router.currentRoute.path !== link){
            this.$router.replace({
                path: link,
            })
            }
        }
    }
}
</script>

<style>
    #AppTodo{
        display: flex;
        height: 100%;
    }
    #AppTodo .pages{
        padding-top: 1rem;
        width: 300px;
        height: 100%;
        background: var(--over80);
    }
    #AppTodo .pages .pageLink{
        padding-left: 1rem;
        line-height: 3rem;
    }
    #AppTodo .pages .pageLink:hover{
        background: var(--card-inner);
    }
    #AppTodo .todoContainer{
        flex: 1;
        padding: 2rem;
        overflow-y: scroll;
    }
</style>