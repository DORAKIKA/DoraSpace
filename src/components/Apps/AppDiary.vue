<template>
    <div id="AppDiary">
        <div class="diaryContainer">
            <el-timeline>
                <el-timeline-item v-for="diary in DiaryInfo.diaries" :key="diary.date" :timestamp="diary.date" placement="top">
                    <div class="diary">
                        <div class="content">{{diary.content}}</div>
                        <div class="mood">{{diary.mood}}</div>
                    </div>
                </el-timeline-item>
            </el-timeline>
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
            
            return formatDiaries;
        }
    },
    methods:{
        push(){
            let diary = {
                mood: this.inputMood,
                content: this.inputContent,
                date: new Date().toLocaleString(),
            }
            this.$store.dispatch('addDiary',diary);
            this.inputContent = '';
        }
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
}
#AppDiary .diaryEditor>button{
    position: absolute;
    right: calc(1rem + 1px);
    bottom: calc(1rem + 1px);
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