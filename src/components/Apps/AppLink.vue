<template>
    <div id="AppLink">
        <div class="searchOrAdd">
            <i @click="search" class="el-icon-search"></i>
            <input placeholder="请输入链接Ctrl+Enter或右侧按钮添加链接、或输入内容Enter或左侧按钮进行搜索" v-model="inputContent" @keyup.enter.exact="search" @keyup.ctrl.enter="handleAdd"/>
            <i @click="handleAdd" class="el-icon-circle-plus-outline"></i>
        </div>
        <div class="container">
            <LinkNav v-if="this.$store.state.AppInfo.config.Link.showNav" :sortLinkInfo="sortLinkInfo"></LinkNav>
            <div class="listBox card">
                <div class="lists">
                    <LinkList
                        v-for="list in sortLinkInfo"
                        :key="list.id"
                        :list="list.links"
                        :listId="list.id"
                        :editLink="editLink"
                        >
                    </LinkList>
                </div>
                <AppFooter></AppFooter>
            </div>
        </div>
        <el-dialog class="editContainer" :title="editData.name" :visible.sync="isEdit" width="300px">
            <el-form :model="editData">
                <div class="item">
                    <div class="iconSelect">
                        <div class="selected" @click="showIconSelect = true">
                            <img class="iconSelected" :src="editData.icon?editData.icon:'https://doraspace-1303371957.cos.ap-nanjing.myqcloud.com/icon/linkIcon/disable.png'" alt="">
                        </div>
                        <el-dialog title="选择图标" :visible.sync="showIconSelect" append-to-body>
                            <div class="options">
                                <img class="option" @click="changeIcon('')" src="https://doraspace-1303371957.cos.ap-nanjing.myqcloud.com/icon/linkIcon/disable.png" alt="默认">
                                <img class="option" @click="changeIcon(icon.url)" v-for="icon in icons" :key="icon.url" :src="icon.url" :alt="icon.name">
                            </div>
                        </el-dialog>
                    </div>
                    <div class="value">
                        <el-input v-model="editData.icon" placeholder="图标链接"></el-input>
                    </div>
                </div>
                <div class="item">
                    <div class="key">标题</div> 
                    <el-input v-model="editData.name" placeholder="标题"></el-input>
                </div>
                <div class="item">
                    <div class="key">链接</div> 
                    <el-input v-model="editData.linkTo" placeholder="链接"></el-input>
                </div>
                <div class="item">
                    <div class="key">分类</div> 
                    <el-input v-model="editData.listName" placeholder="分类"></el-input>
                </div>
                <el-button @click="deleteLink" type="danger">删除</el-button>
                <el-button @click="saveLink" type="primary">保存</el-button>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import LinkNav from './Link/LinkNav.vue';
import LinkList from './Link/LinkList.vue';
import AppFooter from '../Layout/AppFooter.vue';
import { mapActions, mapState } from 'vuex';

export default {
    data(){
        return {
            inputContent:"",
            showIconSelect:false,
            isEdit:false,
            searchEngine:"https://www.baidu.com/s?ie=UTF-8&wd=",
            editData:{},
            editListId:"",
            editLinkId:"",
            icons:[
                {url:'https://doraspace-1303371957.cos.ap-nanjing.myqcloud.com/icon/linkIcon/1.png',name:"icon-1"},
                {url:'https://doraspace-1303371957.cos.ap-nanjing.myqcloud.com/icon/linkIcon/2.png',name:"icon-2"},
                {url:'https://doraspace-1303371957.cos.ap-nanjing.myqcloud.com/icon/linkIcon/3.png',name:"icon-3"},
                {url:'https://doraspace-1303371957.cos.ap-nanjing.myqcloud.com/icon/linkIcon/4.png',name:"icon-4"},
                {url:'https://doraspace-1303371957.cos.ap-nanjing.myqcloud.com/icon/linkIcon/5.png',name:"icon-5"},
                {url:'https://doraspace-1303371957.cos.ap-nanjing.myqcloud.com/icon/linkIcon/6.png',name:"icon-6"},
                {url:'https://doraspace-1303371957.cos.ap-nanjing.myqcloud.com/icon/linkIcon/7.png',name:"icon-7"},
                {url:'https://doraspace-1303371957.cos.ap-nanjing.myqcloud.com/icon/linkIcon/8.png',name:"icon-8"},
                {url:'https://doraspace-1303371957.cos.ap-nanjing.myqcloud.com/icon/linkIcon/9.png',name:"icon-9"},
                {url:'https://doraspace-1303371957.cos.ap-nanjing.myqcloud.com/icon/linkIcon/10.png',name:"icon-10"},
                {url:'https://doraspace-1303371957.cos.ap-nanjing.myqcloud.com/icon/linkIcon/11.png',name:"icon-11"},
                {url:'https://doraspace-1303371957.cos.ap-nanjing.myqcloud.com/icon/linkIcon/12.png',name:"icon-12"},
                {url:'https://doraspace-1303371957.cos.ap-nanjing.myqcloud.com/icon/linkIcon/13.png',name:"icon-13"},
                {url:'https://doraspace-1303371957.cos.ap-nanjing.myqcloud.com/icon/linkIcon/14.png',name:"icon-14"},
                {url:'https://doraspace-1303371957.cos.ap-nanjing.myqcloud.com/icon/linkIcon/15.png',name:"icon-15"},
                {url:'https://doraspace-1303371957.cos.ap-nanjing.myqcloud.com/icon/linkIcon/16.png',name:"icon-16"},
                {url:'https://doraspace-1303371957.cos.ap-nanjing.myqcloud.com/icon/linkIcon/17.png',name:"icon-17"},
                {url:'https://doraspace-1303371957.cos.ap-nanjing.myqcloud.com/icon/linkIcon/18.png',name:"icon-18"},
                {url:'https://doraspace-1303371957.cos.ap-nanjing.myqcloud.com/icon/linkIcon/19.png',name:"icon-19"},
                {url:'https://doraspace-1303371957.cos.ap-nanjing.myqcloud.com/icon/linkIcon/20.png',name:"icon-20"},
                {url:'https://doraspace-1303371957.cos.ap-nanjing.myqcloud.com/icon/linkIcon/21.png',name:"icon-21"},
                {url:'https://doraspace-1303371957.cos.ap-nanjing.myqcloud.com/icon/linkIcon/22.png',name:"icon-22"},
                {url:'https://doraspace-1303371957.cos.ap-nanjing.myqcloud.com/icon/linkIcon/23.png',name:"icon-23"},
                {url:'https://doraspace-1303371957.cos.ap-nanjing.myqcloud.com/icon/linkIcon/24.png',name:"icon-24"},
                {url:'https://doraspace-1303371957.cos.ap-nanjing.myqcloud.com/icon/linkIcon/25.png',name:"icon-25"},
                {url:'https://doraspace-1303371957.cos.ap-nanjing.myqcloud.com/icon/linkIcon/26.png',name:"icon-26"},
                {url:'https://doraspace-1303371957.cos.ap-nanjing.myqcloud.com/icon/linkIcon/27.png',name:"icon-27"},
                {url:'https://doraspace-1303371957.cos.ap-nanjing.myqcloud.com/icon/linkIcon/28.png',name:"icon-28"},
            ]
        }
    },
    computed:{
        ...mapState(['isLogin','LinkData']),
        sortLinkInfo(){
            let res = [];
            for(let key in this.LinkData){
                let list = {};
                list.id = key;
                // list.links = this.LinkData[key];
                list.links = []
                list.clicks = 0;
                for(let linkId in this.LinkData[key]){
                    list.clicks += this.LinkData[key][linkId].click ? this.LinkData[key][linkId].click : 0;
                    list.links.push(this.LinkData[key][linkId]);
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
        ...mapActions(['addLinkItem','deleteLinkItem','updateLinkItem']),
        changeIcon(url){
            this.editData.icon = url?url:"";
            this.showIconSelect = false;
        },
        search(){
            window.open(this.searchEngine+this.inputContent)
            console.log("search");
            this.inputContent = "";
        },
        handleAdd(){
            let linkId = 'link'+new Date().getTime();
            let inputArr = this.inputContent.split(' ');
            let listId = inputArr[2]?inputArr[2]:'未分类';
            this.addLinkItem({listId,linkId,link:{
                    id:linkId,
                    listName:listId,
                    name:inputArr[1]?inputArr[1]:inputArr[0],
                    icon:"",
                    linkTo:inputArr[0],
                    click:0
                },$bus:this.$bus});
            this.inputContent = "";
        },
        editLink(listId,linkId){
            this.editListId = listId;
            this.editLinkId = linkId;
            this.editData = JSON.parse(JSON.stringify(this.LinkData[listId][linkId]));
            this.isEdit = true;
        },
        deleteLink(){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.deleteLinkItem({listId:this.editListId,linkId:this.editLinkId});
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
            this.updateLinkItem({listId:this.editListId,link:this.editData});
            this.$message({
                type: 'success',
                message: '保存成功!'
            });
            this.isEdit = false;
        },
        checkLogin(){
            if(!this.isLogin){
                this.$router.replace({
                    path: '/Login',
                })
            }
        }
    },
    components:{
        LinkList,
        LinkNav,
        AppFooter,
    },
    mounted(){
        this.checkLogin();
    }
}
</script>

<style>
#AppLink{
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    height: 100%;
}
#AppLink .searchOrAdd{
    width: 100%;
    height: 3rem;
    display: flex;
    justify-content: center;
    border-radius: 0.5rem;
    position: relative;
}
#AppLink .container{
    flex: 1;
    width: 100%;
    height: calc(100% - 3rem);
    display: flex;
    justify-content: space-between;
}
#AppLink .listBox{
    /* width: calc(100% - 200px - 1rem); */
    flex: 1;
    min-height: calc(100% - 2rem);
    overflow: scroll;
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
#AppLink .listBox::-webkit-scrollbar{
    height: 0;
    width: 4px;
    border: none;
}
#AppLink .LinkNav{
    width: 200px;
    background: var(--card-white);
    border-radius: 8px;
    margin: 1rem 1rem 0 0;
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
#AppLink .item .iconSelected{
    width: 2rem;
    height: 2rem;
}
#AppLink .item .iconSelect{
    width: 2rem;
    min-width: 2rem;
}
.el-dialog .option{
    width: 2rem;
    height: 2rem;
    margin: 8px;
}
</style>