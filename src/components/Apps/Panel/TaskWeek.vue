<template>
  <div class="task-week" ref="echartTaskWeek">

  </div>
</template>

<script>
import * as echarts from 'echarts';
import { mapState } from 'vuex';
export default {
data(){
    return{
        taskChart:'',
    }
},
computed:{
    ...mapState(['TaskData','config'])
},
watch:{
    TaskData:function(){
        this.setData();
    }
},
methods:{
    getFormatData(){
        let series = [];
        if(!this.TaskData.history)return;
        let now = new Date(new Date().toLocaleDateString()).getTime()

        for(let key in this.TaskData.history){
            let h = this.TaskData.history[key].history;
            let data = {
                name:this.TaskData.history[key].content,
                type:"bar",
                barWidth: 8,
                stack: 'day',
                emphasis:{focus:'series'},
                data:[0,0,0,0,0,0,0],
                itemStyle: {
                    borderRadius: 4,
                    color: this.TaskData.history[key].color
                },
            }
            for(let tk in h){
                let index = ((now+24*60*60*1000-h[tk].endTime)/(24*60*60*1000))<<0;
                if(index > 6) continue;
                data.data[6-index] += ((h[tk].endTime - h[tk].startTime)/60000)<<0;
            }
            series.push(data);
        }

        return series;
    },
    setData(){
        let data = this.getFormatData();
        let dayS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        let day = new Date().getDay();
        day%=7;
        let showDays = dayS.splice(day);
        showDays = [...showDays,...dayS]
        let option;
        option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                type: 'shadow'
                },
                formatter:(p)=>{
                    let container = document.createElement('div');
                    for(let i = 0; i < p.length; i++){
                        let box = document.createElement('div');
                        box.style.display = 'flex';
                        box.style.alignItems = 'center'
                        box.style.margin = '4px'
                        box.style.height = '30px'
                        let color = document.createElement('div');
                        color.style.width = '8px';
                        color.style.height = '8px'
                        color.style.background = p[i].color;
                        color.style.borderRadius = '4px'
                        color.style.margin = '8px'
                        box.appendChild(color);
                        let text = document.createElement('div');
                        text.innerHTML = `${p[i].seriesName}:${p[i].data}min`
                        box.appendChild(text)
                        container.appendChild(box);
                    }
                    return container;
                }
            },
            legend: {
                top: '20',
                textStyle:{
                    color: 'a',
                }
            },
            grid: {
                left: '5%',
                right: '5%',
                bottom: '5%',
                containLabel: true
            },
            xAxis: [
                {
                type: 'category',
                data: showDays
                }
            ],
            yAxis: [
                {
                type: 'value',
                splitLine:false
                }
            ],
            series: data,
        };

        option && this.taskChart.setOption(option);

        return null;
    },
    resize(){
        if(this.taskChart.resize){
            this.taskChart.resize();
        }
    }

},
mounted(){
    this.taskChart = echarts.init(this.$refs.echartTaskWeek);
    this.setData()
    window.addEventListener('resize',this.resize)
},
created(){
    setTimeout(this.resize,1000);
},
beforeDestroy(){
    window.removeEventListener('resize',this.resize);
}
}
</script>

<style>
.task-week{
    width:100%;
    height: 100%;
}
</style>