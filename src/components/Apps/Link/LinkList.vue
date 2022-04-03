<template>
  <div class="link-list">
      <div class="list-name ">
          {{listId}}
        </div>
      <div class="link-container">
        <LinkItem
            v-for="(link,id) in list"
            :key="id"
            :link="link"
            :listId="listId"
            :linkId="id"
            :editLink="editLink"
        ></LinkItem>
      </div>
  </div>
</template>

<script>
import LinkItem from './LinkItem.vue';
export default {
data(){
    return {
    }
},
components:{
    LinkItem,
},
props:['list','listId','editLink']
}
</script>

<style>
.link-list{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.link-list .list-name{
    margin: 0.5rem;
    padding: 0 0.5rem;
    height: 2rem;
    line-height: 2rem;
    font-size: 1.5rem;
    border-radius: 0.5rem;
    text-align: center;
    font-weight: bold;
}
.link-container{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
}
.link-item{
    width: calc((100% - 4rem) / 4);
    margin: 0.5rem;
}


@media screen and (max-width:900px) {
    .link-item{
        width: calc((100% - 3rem) / 3);
    }
}
@media screen and (max-width:600px) {
    .link-item{
        width: calc((100% - 2rem) / 2);
    }
}
</style>