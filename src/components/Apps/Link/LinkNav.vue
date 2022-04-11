<template>
  <div class="LinkNav">
      <div class="nav-item"
        v-for="list in sortLinkInfo"
        :key="list.id"
        @click="scrollToList(list.id)"
      >
        {{list.id}}
      </div>
  </div>
</template>

<script>
export default {
    methods:{
        scrollToList(listId){
            let dom = document.getElementById('list-'+listId);
            if(dom){
                dom.scrollIntoView();
            }
        }
    },
    props:['sortLinkInfo']
}
</script>

<style>
.LinkNav{
    width: 300px;
    padding: 1rem;
}
.LinkNav .nav-item{
    line-height: 2rem;
    border-radius: 8px;
    padding-left: 0.5rem;
    cursor: pointer;
    transition: 0.3s;
}
.LinkNav .nav-item:hover{
    background: var(--theme-color);
    padding-left: 1rem;
}
@media screen and (max-width:900px){
    .LinkNav{
        display: none;
    }
}
</style>