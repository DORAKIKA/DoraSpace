<template>
  <div>
    <div @click="handleAdd" class="addCategory card" title="添加分类">+</div>
    <CategoryList :editCategory="editCategory" v-for="(category,bid) in this.categories" :key="bid" :category="category" :bid="bid"></CategoryList>
    <el-dialog @close="closeDialog" class="categoryEdit" title="分类信息" :visible="isEditCategory || isCreateCategory">
      <div class="container">
        <div class="info">
          <div class="item">
            <div class="key">类名</div>
            <div class="value"><el-input v-model="activeCategory.name"></el-input></div>
          </div>
          <div class="item">
            <div class="key">简介</div>
            <div class="value"><el-input v-model="activeCategory.desc"></el-input></div>
          </div>
        </div>
        <div class="title">
          <el-button @click="cancelEdit">取消</el-button>
          <el-button @click="handleSave">保存</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import CategoryList from './CategoryList.vue'
export default {
  data(){
    return {
      isEditCategory: false,
      isCreateCategory: false,
      activeCategory: {},
      // categories:{},
    }
  },
  computed:{
    ...mapGetters(['CardData']),
    categories(){
      return this.CardData.categories?this.CardData.categories:{};
    }
  },
  components:{
    CategoryList
  },
  methods:{
    ...mapActions(['updateCategory','addCategory']),
    closeDialog(){
      this.isEditCategory = false;
      this.isCreateCategory = false;
    },
    handleAdd(){
      this.activeCategory = {
        id: "Category"+new Date().getTime(),
        cards:[],
        name:"",
        desc:"",
      }
      this.isCreateCategory = true;
    },
    editCategory(category){
      this.activeCategory = JSON.parse(JSON.stringify(category));
      this.isEditCategory = true;
    },
    handleSave(){
      if(this.isEditCategory){
        this.updateCategory(JSON.parse(JSON.stringify(this.activeCategory)));
        this.isEditCategory = false;
      }else if(this.isCreateCategory){
        this.addCategory(JSON.parse(JSON.stringify(this.activeCategory)));
        this.isCreateCategory = false;
      }
    },
    cancelEdit(){
      this.isEditCategory = false;
      this.isCreateCategory = false;
      this.activeCategory = {};
    }
  },
  mounted(){
  }
}
</script>

<style>
.addCategory{
  padding: 1rem;
  margin-top: 1rem;
  text-align: center;
  cursor: pointer;
  transition: 0.3s;
}
.addCategory:hover{
  background: var(--theme-color);
  color: #fff;
}
.categoryEdit .el-dialog{
  background-color: var(--card-white);
  width: min-content;
}
.categoryEdit .container{
  width: 400px;
  padding: 1rem;
  border-radius: 8px;
  color: var(--font-color);
}
.categoryEdit .el-dialog__title{
  color: var(--font-color);
}
.categoryEdit .container .title{
  height: 3rem;
  line-height: 1.5rem;
  display: flex;
}
.categoryEdit .container .title span{
  flex: 1;
}
.categoryEdit .container .title .el-button{
  height: 2rem;
  line-height: 2rem;
  padding: 0 8px;
}
.categoryEdit .container .item{
  display: flex;
  line-height: 2rem;
  margin: 0.2rem 0;
}
.categoryEdit .container .item .key{
  flex: 1;
  color: var(--font-color);
  min-width: 4rem;
}
.categoryEdit .container .item .value{
  min-width: calc(100% - 4rem);
}
.categoryEdit .container .item .el-input input{
  outline: none;
  border: none;
  height: 2rem;
  line-height: 2rem;
  background: #eef4ff;
  transition: 0.3s;
}
.categoryEdit .container .item .el-input input:focus{
  background: var(--theme-color);
  color: #fff;
  padding-left: 2rem;
}
</style>