<template>
    <div id="cardInfo">
        <div class="left" v-show="isCidGet">
            <div class="header">
                <kk-button @click="back">back</kk-button>
                <kk-button :disabled="!isChange" type="success" @click="saveCard">保存</kk-button>
                <kk-button type="danger" @click="handleDelete">删除</kk-button>
            </div>
            <div class="meta">
                <div class="metaItem title"><span class="key">标题</span><el-input @change="formChange" class="value" v-model="cardInfo.title"></el-input></div>
                <div class="metaItem desc"><span class="key">描述</span><el-input @change="formChange" class="value" v-model="cardInfo.description"></el-input></div>
                <div class="metaItem category">
                    <span class="key">分类</span>
                    <el-select @change="formChange" class="value" v-model="cardInfo.category">
                        <el-option 
                            v-for="(category,key) in categories" 
                            :key="key"
                            :label="category.name"
                            :value="key"
                            >
                        </el-option>
                    </el-select>
                </div>
            </div>
        </div>
        <div class="right">
            <div class="tags">
                <span class="key">标签</span>
                <span class="value">
                    <!-- <span v-for="tag in info.tags" :key="tag">{{tag}}</span> -->
                    <el-input
                        class="input-new-tag"
                        v-if="inputVisible"
                        v-model="inputValue"
                        ref="saveTagInput"
                        size="small"
                        @keyup.enter.native="handleInputConfirm"
                        @blur="handleInputConfirm"
                        >
                    </el-input>
                    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
                    <el-tag
                        :key="tag"
                        v-for="tag in cardInfo.tags"
                        closable
                        :disable-transitions="false"
                        @close="handleClose(tag)">
                        {{tag}}
                    </el-tag>
                </span>
            </div>
        </div>
        <div v-show="isCidGet" class="content">
            <mavon-editor
                v-model="cardInfo.content"
                toolbarsBackground="var(--bg)"
                previewBackground="var(--card-white)"
                codeStyle="monokai"
                @change="formChange"
                @save="saveCard"
            ></mavon-editor>
        </div>
        <div v-show="!isCidGet">当前卡片不存在</div>
    </div>
</template>

<script>
import "vditor/dist/index.css"
import { mapActions, mapGetters } from 'vuex';
import kkButton from '@/kk/kk-button.vue';

export default {
    data(){
        return{
            isCidGet:false,
            cid:"",
            cardInfo:{content:""},
            isChange:false,
            //tags
            inputVisible: false,
            inputValue: '',
            //categories
            categories:{}
        }
    },
    components:{kkButton},
    computed:{
        ...mapGetters(['CardData']),
    },
    methods:{
        ...mapActions(['updateCardInfo','deleteCardInfo']),
        saveCard(){
            this.updateCardInfo(this.cardInfo);
            //应该在保存成功之后再改
            this.isChange = false;
            this.$message({message:"保存成功",type:"success"})
        },
        handleDelete(){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '删除',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.deleteCardInfo(this.cardInfo);
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                this.back()
            }).catch(() => {
                this.$message({
                type: 'info',
                message: '已取消删除'
                });          
            });
        },
        back(){
            this.$router.back();
        },
        handleClose(tag) {
            this.cardInfo.tags.splice(this.cardInfo.tags.indexOf(tag), 1);
            this.formChange();
        },
        showInput() {
            this.inputVisible = true;
            this.$nextTick(() => {
            this.$refs.saveTagInput.$refs.input.focus();
            });
        },
        handleInputConfirm() {
            let inputValue = this.inputValue;
            if (inputValue) {
            this.cardInfo.tags.push(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = '';
            this.formChange();
        },
        initCardInfo(cid){
            if(this.CardData.cards[cid]){
                this.isCidGet = true;
            }
            this.cardInfo = this.CardData.cards[cid]?JSON.parse(JSON.stringify(this.CardData.cards[cid])):{content:""};
            this.categories = JSON.parse(JSON.stringify(this.CardData.categories));
            this.isChange=false;
        },
        formChange(){
            this.isChange=true;
        }
    },
    mounted(){
        this.cid = this.$route.query.cid;
        this.initCardInfo(this.cid);
    }
}
</script>

<style>
#AppCard{
    max-height: calc(100% + 21rem);
}
#AppCard #cardInfo{
    max-height: calc(100% - 9rem);
}
#AppCard #cardInfo .content{
    max-height: calc(100% - 12rem);
}
#AppCard #cardInfo .content .markdown-body{
    max-height: 100%;
}
#cardInfo .header,#cardInfo .meta,#cardInfo .content{
    padding: 1rem;
    background: var(--card-white);
}
#cardInfo{
    border-radius: 8px;
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
    flex: 1;
    flex-wrap: wrap;
}
#cardInfo .left{
    width: 50%;
}
#cardInfo .right{
    width: calc(50% - 1rem);
    display: flex;
    flex-direction: column;
}
#cardInfo .right .tags{
    flex: 1;
    padding: 1rem;
    background: var(--card-white);
    border-radius: 8px;
}

.el-tag {
    margin-left: 10px;
}
.button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
}
.input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
}

#cardInfo .header{
    display: flex;
    line-height: 1.5rem;
    align-items: center;
    border-radius: 8px;
}
#cardInfo .header .el-button{
    padding: 8px;
}
#cardInfo .header .title{
    flex: 1;
    text-align: center;
    color: red;
}
#cardInfo .meta{
    border-radius: 8px;
}
#cardInfo .meta .metaItem{
    display: flex;
    align-items: center;
    min-height: 2rem;
    line-height: 2rem;
    font-size: 0.8rem;
    margin: 0.2rem 0;
}
#cardInfo .meta .key{
    flex: 1;
    min-width: 4rem;
}
#cardInfo .meta .value{
    color: #aaa;
    width: auto;
    min-height: 1.5rem;
    min-width: min(10rem, calc(50%));
}
#cardInfo .meta .value input{
    outline: none;
    border: none;
    /* min-width: 10rem; */
    height: 2rem;
    line-height: 2rem;
    background: #eef4ff;
    transition: 0.3s;
}
#cardInfo .meta .tags .value input{
    min-width: 0;
}
#cardInfo .meta .value input:focus{
    box-shadow: 0 1px 0 var(--theme-color);
    padding-left: 1.5rem;
}
#cardInfo .meta .process .value{
    width:80%;
    display: flex;
    align-items: center;
}
#cardInfo .meta .process .value .el-progress{
    width: 100%;
}
#cardInfo .content{
    border-radius: 8px;
    width: 100%;
    margin-top: 1rem;
}


@media screen and (max-width:900px) {
    #cardInfo .left,
    #cardInfo .right{
        width: 100%;
    }
}
  /* vditor */
  #vditor{
      /* --toolbar-background-color: var(--theme-color);
      --toolbar-icon-color: #fff;
      --second-color: rgba(255,255,255,0.4);
      --panel-background-color: #edf4ff;
      --toolbar-icon-color: #333; */
      padding: 0;
  }
</style>