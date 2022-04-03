<template>
    <div id="AppLink">
        <div class="searchOrAdd">
            <i @click="search" class="el-icon-search"></i>
            <input placeholder="请输入链接Ctrl+Enter或右侧按钮添加链接、或输入内容Enter或左侧按钮进行搜索" v-model="inputContent" @keyup.enter.exact="search" @keyup.ctrl.enter="addLink"/>
            <i @click="addLink" class="el-icon-circle-plus-outline"></i>
        </div>
        <!-- <LinkList
            v-for="(list,name) in LinkInfo.links"
            :key="name"
            :list="list"
            :listId="name"
            :editLink="editLink"
        ></LinkList> -->
        <LinkList
            v-for="list in sortLinkInfo"
            :key="list.id"
            :list="list.links"
            :listId="list.id"
            :editLink="editLink"
        >
        </LinkList>
        <el-dialog class="editContainer" :title="editData.name" :visible.sync="isEdit" width="300px">
            <el-form :model="editData">
                <div class="item">
                    <div class="key">标题</div> 
                    <el-input v-model="editData.name"></el-input>
                </div>
                <div class="item">
                    <div class="key">描述</div> 
                    <el-input v-model="editData.desc"></el-input>
                </div>
                <div class="item">
                    <div class="key">链接</div> 
                    <el-input v-model="editData.linkTo"></el-input>
                </div>
                <div class="item">
                    <div class="key">分类</div> 
                    <el-input v-model="editData.listName"></el-input>
                </div>
                <el-button @click="deleteLink" type="danger">删除</el-button>
                <el-button @click="saveLink" type="primary">保存</el-button>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import LinkList from './Link/LinkList.vue';
export default {
    data(){
        return {
            inputContent:"",
            isEdit:false,
            searchEngine:"https://www.baidu.com/s?ie=UTF-8&wd=",
            editData:{},
            editListId:"",
            editLinkId:"",
            LinkInfo:{},
        }
    },
    computed:{
        sortLinkInfo(){
            let res = [];
            for(let key in this.LinkInfo.links){
                let list = {};
                list.id = key;
                // list.links = this.LinkInfo[key];
                list.links = []
                list.clicks = 0;
                for(let linkId in this.LinkInfo.links[key]){
                    list.clicks += this.LinkInfo.links[key][linkId].click ? this.LinkInfo.links[key][linkId].click : 0;
                    list.links.push(this.LinkInfo.links[key][linkId]);
                }
                list.links.sort((a,b)=>{
                    let aClick = a.click?a.click:0;
                    let bClick = b.click?b.click:0;
                    return bClick-aClick;
                })
                
                res.push(list);
            }
            res.sort((a,b)=>{
                return b.clicks - a.clicks;
            });
            return res;
        }
    },
    methods:{
        search(){
            window.open(this.searchEngine+this.inputContent)
            console.log("search");
            this.inputContent = "";
        },
        addLink(){
            let linkId = 'link'+new Date().getTime();
            let listId = '未分类';
            this.$store.dispatch('addLink',{listId,linkId,link:{
                    id:linkId,
                    listName:listId,
                    name:this.inputContent,
                    desc:"",
                    linkTo:this.inputContent,
                    click:0
                },$bus:this.$bus});
            this.inputContent = "";
            console.log("addLink");
        },
        editLink(listId,linkId){
            this.editListId = listId;
            this.editLinkId = linkId;
            this.editData = JSON.parse(JSON.stringify(this.$store.state.LinkInfo.links[listId][linkId]));
            this.isEdit = true;
        },
        deleteLink(){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$store.dispatch('deleteLink',{listId:this.editListId,linkId:this.editLinkId});
                this.isEdit = false;
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        saveLink(){
            this.$store.dispatch('saveLink',{listId:this.editListId,link:this.editData});
            this.$message({
                type: 'success',
                message: '保存成功!'
            });
            this.isEdit = false;
        }
    },
    components:{
        LinkList,
    },
    mounted(){
        this.LinkInfo = this.$store.state.LinkInfo;
        this.$store.dispatch('getLinkData');
    }
}
</script>

<style>
#AppLink{
    padding: 1rem;
}
#AppLink .searchOrAdd{
    width: 100%;
    display: flex;
    justify-content: center;
    border-radius: 0.5rem;
    position: relative;
}
#AppLink .searchOrAdd input{
    outline: none;
    border: none;
    flex: 1;
    height: 3rem;
    padding: 0 3rem;
    border-radius: 0.5rem;
    transition: 0.3s;
    background: var(--card-white);
    color: var(--font-color);
    border: 1px solid var(--card-white);
}
#AppLink .searchOrAdd input:focus{
    border: 1px solid var(--theme-color);
}
#AppLink .searchOrAdd [class^="el-"]{
    position: absolute;
    width: 3rem;
    height: 3rem;
    text-align: center;
    line-height: 3rem;
}
#AppLink .searchOrAdd  [class^="el-"]:hover{
    cursor: pointer;
    color: var(--theme-color);
}
#AppLink .searchOrAdd .el-icon-search{
    left: 0;
}
#AppLink .searchOrAdd .el-icon-circle-plus-outline{
    right: 0;
}
#AppLink .el-dialog__body{
    padding-top: 0;
}
#AppLink .editContainer .el-form{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
#AppLink .editContainer .el-form .el-button{
    height: 2rem;
    line-height: 2rem;
    padding: 0 0.5rem;
    margin: 0.5rem 0;
}
#AppLink .editContainer .item{
    display: flex;
    margin: 0.2rem 0;
    width: 100%;
}
#AppLink .editContainer .item .key{
    min-width: 2rem;
    flex: 1;
    height: 2rem;
    line-height: 2rem;
    color: var(--font-color);
}
#AppLink .editContainer .item input{
    outline: none;
    border: none;
    min-width: 10rem;
    width: 100%;
    height: 2rem;
    line-height: 2rem;
    background: var(--theme-color);
    color: var(--font-color);
    transition: 0.3s;
    box-shadow: 0 0 0 1rem inset var(--over90);
}
#AppLink .editContainer .item input:focus{
    box-shadow: 0 0 0 1rem inset var(--over80);
    color: var(--theme-color);
}
#AppLink .el-dialog{
    background: var(--card-white);
}
#AppLink .el-dialog__title{
    color: var(--font-color);
}
</style>