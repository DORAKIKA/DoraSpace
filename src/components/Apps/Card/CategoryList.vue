<template>
  <div class="cardCategoryList card" :class="{fold:isFold}">
      <div class="titleBar">
        <div class="name">{{category.name}}</div>
        <div class="desc">{{category.desc}}</div>
        <el-button @click="addCard(category.id)" type="primary" icon="el-icon-plus" circle></el-button>
        <el-button @click="editCategory(category)" type="primary" icon="el-icon-edit" circle></el-button>
        <el-button @click="toggleExtended" type="primary" icon="el-icon-arrow-down" circle></el-button>
        <el-button @click="handleDelete(category.id)" type="danger" icon="el-icon-delete" circle></el-button>
      </div>
      <div class="list">
          <CardItem v-for="cid in category.cards" :key="cid" :cid="cid" :bid="bid"></CardItem>
      </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import CardItem from './CardItem.vue'
export default {
    data(){
        return{
            name: "分类",
            color: "#386ade",
            description: "这是一个分类描述",
            isFold: true,
        }
    },
    computed:{
        ...mapGetters(['config','CardData']),
        category(){
            return this.CardData.categories[this.bid];
        }
    },
    methods:{
        ...mapActions(['addCard','deleteCategory']),
        toggleExtended(){
            this.isFold = !this.isFold;
        },
        handleDelete(id){
            this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
                confirmButtonText: '删除',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.deleteCategory(id);
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch((err) => {
                console.log(err)
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        }
    },
    components:{
        CardItem,
    },
    mounted(){
        this.isFold = this.config.Card?!this.config.Card.categoryExtended:true;
    },
    props:['bid','editCategory']
}
</script>

<style>
.cardCategoryList{
    width: 100%;
    padding: 1rem;
    margin-top: 1rem;
    transition: 0.3s;
}
.fold{
    height: 4rem;
    overflow: hidden;
}
.fold .el-icon-arrow-down{
    transform: rotate(90deg);
    color: greenyellow;
}
.cardCategoryList>.titleBar{
    width: 100%;
    height: 2rem;
    line-height: 2rem;
    display: flex;
    justify-content: space-between;
}
.cardCategoryList .titleBar .el-button{
    padding: 0;
    margin: 0 0.2rem;
    width: 2rem;
    height: 2rem;
}
.cardCategoryList>.titleBar>.name,
.cardCategoryList>.titleBar>.more{
    padding: 0 0.3rem;
    border-radius: 4px;
    background: var(--theme-color);
    color: #fff;
}
.cardCategoryList>.list{
    margin: 1rem 0 0 0;
    display: flex;
    flex-wrap: wrap;
}
.cardCategoryList>.titleBar>.desc{
    color: #666;
    font-size: 0.8rem;
    flex: 1;
    text-align: center;
}
</style>