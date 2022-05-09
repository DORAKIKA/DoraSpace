<template>
    <div id="AppDiary">
        <div class="diaryContainer card">
            <div class="timeLineItem" v-for="diary in formatDiaries" :key="diary.date">
                <div class="style">
                    <div class="dot"></div>
                    <div class="line"></div>
                </div>
                <div class="container">
                    <div class="time">{{diary.date}}</div>
                    <div class="mood" @click="deleteDiary(diary.date)">{{diary.mood}}</div>
                    <div class="content">{{diary.content}}</div>
                </div>
            </div>
        </div>
        <div class="diaryEditor card">
            <el-radio-group v-model="inputMood">
                <el-radio v-for="emoji in emojis" :key="emoji[0]+'-'+emoji[1]" :label="emoji[0]+'-'+emoji[1]">{{emoji[0]}}</el-radio>
            </el-radio-group>
            <el-input type="textarea" v-model="inputContent"></el-input>
            <el-button @click="push" icon="el-icon-s-promotion"></el-button>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
    data(){
        return {
            inputMood:"",
            inputContent:"",
        }
    },
    computed:{
        ...mapState(['isLogin']),
        ...mapGetters(['DiaryData']),
        formatDiaries(){
            if(!this.DiaryData.diaries) return [];
            let formatDiaries = [];
            for(let i = this.DiaryData.diaries.length-1; i >= 0; i--){
                formatDiaries.push(this.DiaryData.diaries[i]);
            }
            return formatDiaries;
        },
        emojis(){
            if(!this.DiaryData.emojis) return [];
            let emojis = [];
            for(let i = 0; i <  this.DiaryData.emojis.split(';').length; i++){
                let group = this.DiaryData.emojis.split(';')[i];
                for(let emoji of group.split(',')){
                    emojis.push([emoji,i]);
                }
            }
            return emojis;
        }
    },
    methods:{
        ...mapActions(['addDiaryItem','deleteDiaryItem']),
        push(){
            if(!this.inputContent){
                this.$message({
                    showClose: true,
                    message: '大哥，写点东西吧！',
                    type: 'success'
                });
                return;
            }
            let diary = {
                mood: this.inputMood.split('-')[0],
                moodLv: this.inputMood.split('-')[1],
                content: this.inputContent,
                date: new Date().toLocaleString(),
            }
            this.addDiaryItem(diary);
            this.inputContent = '';
        },
        checkLogin(){
            if(!this.isLogin){
                this.$router.replace({
                path: '/Login',
                })
            }
        },
        deleteDiary(date){
            this.$confirm('是否删除此条日记', '提示', {
                confirmButtonText: '删除',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.deleteDiaryItem(date);
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
    mounted(){
        this.checkLogin();
    }
}
</script>

<style>
#AppDiary{
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    height: 100%;
    overflow: scroll;
}
#AppDiary .diaryContainer{
    padding: 2rem 1rem;
    width: calc(60% - 1rem);
    overflow: scroll;
}
#AppDiary::-webkit-scrollbar,
#AppDiary .diaryContainer::-webkit-scrollbar{
    width: 0;
    height: 0;
}
#AppDiary .diaryContainer .diary{
    padding: 1rem;
    border-radius: 8px;
    background: var(--card-inner);
}

#AppDiary .diaryContainer .timeLineItem{
    display: flex;
}
#AppDiary .diaryContainer .timeLineItem .style{
    width: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
#AppDiary .diaryContainer .timeLineItem .style .dot{
    width: 16px;
    height: 16px;
    background: var(--theme-color);
    border-radius: 50%;
    box-shadow: 0 0 0 4px var(--card-white) inset;
    transition: 0.3s;
}
#AppDiary .diaryContainer .timeLineItem:hover .style .dot{
    box-shadow: 0 0 0 4px var(--over60) inset;
}
#AppDiary .diaryContainer .timeLineItem .style .line{
    flex: 1;
    width: 2px;
    height: 100%;
    background: var(--theme-color);
}
#AppDiary .diaryContainer .timeLineItem .container{
    padding-left: 0.5rem;
    margin-bottom: 1rem;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
}
#AppDiary .diaryContainer .timeLineItem .container .time{
    font-size: 0.8rem;
    opacity: 0.8;
    width: 100%;
    height: 16px;
    line-height: 16px;
    margin-bottom: 0.5rem;
}
#AppDiary .diaryContainer .timeLineItem .container .content{
    padding: 1rem;
    max-width: calc(100% - 4rem);
    border-radius: 8px;
    background: var(--card-inner);
}
#AppDiary .diaryContainer .timeLineItem .container .content:hover{
    background: var(--theme-color);
    color: #fff;
}
#AppDiary .diaryContainer .timeLineItem .container .mood{
    margin: 0.5rem;
    padding: 0.5rem;
    width: 3rem;
    height: 2.5rem;
    line-height: 1.5rem;
    text-align: center;
    background: var(--card-inner);
    border-radius: 8px;
    position: relative;
}#AppDiary .diaryContainer .timeLineItem .container .mood::before{
    content:'❌';
    display: block;
    position: absolute;
    width: 3rem;
    height: 2.5rem;
    line-height: 2.5rem;
    text-align: center;
    top: 0;
    left: 0;
    border-radius: 8px;
    opacity: 0;
    transition: 0.3s;
}
#AppDiary .diaryContainer .timeLineItem .container .mood:hover::before{
    opacity: 1;
    background: #f20;
    cursor: pointer;
}
#AppDiary .diaryEditor{
    width: 40%;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    position: relative;
}
#AppDiary .diaryEditor .el-radio{
    padding: 0.5rem;
    background: var(--card-inner);
    border-radius: 0.5rem;
    margin: 0.2rem;
}
#AppDiary .diaryEditor .el-radio.is-checked{
    background: var(--theme-color);
}
#AppDiary .diaryEditor .el-radio .el-radio__inner{
    display: none;
}
#AppDiary .diaryEditor .el-radio .el-radio__label{
    padding: 0;
}
#AppDiary .diaryEditor .el-textarea{
    flex: 1;
}
#AppDiary .diaryEditor .el-textarea textarea{
    height: 100%;
    background: var(--card-inner);
    border: 1px solid var(--card-inner);
    color: var(--font-color);
}
#AppDiary .diaryEditor .el-textarea textarea:focus{
    border: 1px solid var(--theme-color);
}
#AppDiary .diaryEditor>button{
    position: absolute;
    right: calc(1rem + 1px);
    bottom: calc(1rem + 1px);
    background: var(--card-white);
    border: 1px solid var(--card-inner);
}


@media screen and (max-width:900px) {
    #AppDiary{
        flex-direction: column-reverse;
        height: auto;
        overflow: unset;
    }
    #AppDiary .diaryContainer{
        width: 100%;
        overflow:unset;
        margin-top: 1rem;
    }
    #AppDiary .diaryEditor{
        width: 100%;
    }
}
</style>