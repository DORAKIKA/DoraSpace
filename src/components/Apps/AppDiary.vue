<template>
    <div id="AppDiary">
        <div class="diaryContainer">
            <div class="timeLineItem" v-for="diary in formatDiaries" :key="diary.date">
                <div class="style">
                    <div class="dot"></div>
                    <div class="line"></div>
                </div>
                <div class="container">
                    <div class="time">{{diary.date}}</div>
                    <div class="content">{{diary.content}}</div>
                    <div class="mood">{{diary.mood}}</div>
                </div>
            </div>
        </div>
        <div class="diaryEditor">
            <el-radio-group v-model="inputMood">
                <el-radio v-for="emoji in emojis" :key="emoji" :label="emoji"></el-radio>
            </el-radio-group>
            <el-input type="textarea" v-model="inputContent"></el-input>
            <el-button @click="push" icon="el-icon-s-promotion"></el-button>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data(){
        return {
            inputMood:"",
            inputContent:"",
            emojis:['😁','🥰','😑','🙄','😪','🤒','🤢','🥳','😕','😭','😞','😡','🤡']
        }
    },
    computed:{
        ...mapState(['DiaryInfo']),
        formatDiaries(){
            let formatDiaries = [];
            for(let i = this.DiaryInfo.diaries.length-1; i >= 0; i--){
                formatDiaries.push(this.DiaryInfo.diaries[i]);
            }
            return formatDiaries;
        }
    },
    methods:{
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
                mood: this.inputMood,
                content: this.inputContent,
                date: new Date().toLocaleString(),
            }
            this.$store.dispatch('addDiary',diary);
            this.inputContent = '';
        },
        onLogin(){
            this.$store.dispatch('getDiaryData');
        }
    },
    mounted(){
        this.$bus.$on('onLogin',this.onLogin);
        this.onLogin();
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
    padding: 1rem;
    width: calc(60% - 1rem);
    background: var(--card-white);
    border-radius: 8px;
    overflow: scroll;
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
    text-align: center;
    background: var(--card-inner);
    border-radius: 8px;
}

#AppDiary .diaryEditor{
    width: 40%;
    padding: 1rem;
    background: var(--card-white);
    border-radius: 8px;
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
    border: 1px solid var(--card-inner)
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