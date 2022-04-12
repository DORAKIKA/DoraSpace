<template>
  <div id="DiaryEmoji">

  </div>
</template>

<script>
import * as echarts from 'echarts';
import { mapState } from 'vuex'
export default {
    data(){
        return {
            emojiChart: undefined,
        }
    },
    computed:{
        ...mapState(['DiaryInfo']),
    },
    methods:{
        setEmojiData(){
            if(this.emojiChart){
                this.emojiChart.dispose();
            }
            this.emojiChart = echarts.init(document.getElementById('DiaryEmoji'));

            let emojisInfo = {};
            this.DiaryInfo.diaries.forEach(diary => {
                if(emojisInfo[diary.mood]){
                    emojisInfo[diary.mood] += 1;
                }else{
                    emojisInfo[diary.mood] = 1;
                }
            });
            let emojisValue = [];
            for(let p in emojisInfo){
                let emojiValue = {
                    name: p,
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show: true,
                        formatter: '{a}'
                    },
                    emphasis:{
                        focus: 'series',
                    },
                    data: [emojisInfo[p]]
                };
                emojisValue.push(emojiValue);
            }
            this.emojiChart.setOption({
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                    // Use axis to trigger tooltip
                    type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: 'center',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    show: false
                },
                yAxis: {
                    type: 'category',
                    data: ['全部']
                },
                series: emojisValue
            })
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
}
</style>