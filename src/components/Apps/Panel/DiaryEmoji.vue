<template>
    <div id="DiaryEmoji">
        <div class="diaryInfo">{{emojiScore}}</div>
        <div id="DiaryEmojiChart"></div>
    </div>
</template>

<script>
import * as echarts from 'echarts';
import { mapState } from 'vuex'
export default {
    data(){
        return {
            emojiChart: undefined,
            emojiScore: 50,
        }
    },
    computed:{
        ...mapState(['DiaryInfo']),
        filterDiaries(){
            return this.DiaryInfo.diaries.filter(diary=>{
                let now = new Date().getTime();
                let time = new Date(diary.date.split(' ')[0]).getTime();
                console.log(diary.date,time,now)
                return (now-time)<7*24*60*60*1000
            })
        }
    },
    methods:{
        setEmojiData(){
            if(this.emojiChart){
                this.emojiChart.dispose();
            }
            this.emojiChart = echarts.init(document.getElementById('DiaryEmojiChart'));
            let options = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                    type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
                    }
                },
                grid: {
                    left: '16',
                    right: '16',
                    bottom: '16',
                    top: '16',
                    containLabel: false
                },
                xAxis: {
                    type: 'value',
                    show: false
                },
                yAxis: {
                    type: 'category',
                    data: ['Mood'],
                    show: false
                },
                series: [
                    {
                    name: '0',
                    type: 'bar',
                    stack: 'total',
                    emphasis: {
                        focus: 'series'
                    },
                    itemStyle: {
                        borderRadius: 4,
                    },
                    data: [0]
                    },
                    {
                    name: '1',
                    type: 'bar',
                    stack: 'total',
                    emphasis: {
                        focus: 'series'
                    },
                    itemStyle: {
                        borderRadius: 4,
                    },
                    data: [0]
                    },
                    {
                    name: '2',
                    type: 'bar',
                    stack: 'total',
                    emphasis: {
                        focus: 'series'
                    },
                    itemStyle: {
                        borderRadius: 4,
                    },
                    data: [0]
                    },
                ]
                };
            this.emojiScore = 50;
            this.filterDiaries.forEach(diary => {
                if(diary.moodLv){
                    options.series[diary.moodLv].data[0] += 1/this.filterDiaries.length;
                    this.emojiScore += 50*(diary.moodLv-1)/this.filterDiaries.length
                }else{
                    options.series[1].data[0] += 1/this.filterDiaries.length;
                }
            });
            this.emojiScore <<= 0;
            this.emojiChart.setOption(options)
        }
    },
    mounted(){
        window.addEventListener('resize',()=>{
            this.emojiChart.resize();
        })
        this.setEmojiData();
        this.$bus.$on('onDiaryDataLoad',this.setEmojiData);
    },
    beforeDestroy(){
        if(this.emojiChart){
            this.emojiChart.dispose();
        }
        this.$bus.$off('onDiaryDataLoad',this.setEmojiData);
    }
}
</script>

<style>
#DiaryEmoji{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
#DiaryEmoji .diaryInfo{
    padding: 0 16px;
    line-height: 48px;
    height: 48px;
}
#DiaryEmojiChart{
    width: 100%;
    height: calc(100% - 48px);
}
</style>