<template>
    <div class="linkClickPanel" id="eCharts-linkClick"></div>
</template>

<script>
import * as echarts from 'echarts';
import { mapState } from 'vuex';
export default {
data(){
    return{
        linkChart:'',
    }
},
computed:{
    ...mapState(['LinkInfo','AppInfo'])
},
methods:{
    drawChart(data){
        let dom = document.getElementById('eCharts-linkClick');
        if(!this.linkChart){
            this.linkChart = echarts.init(dom);
        }
        this.linkChart.setOption({
            title: {
                text: '访问统计',
                left: '16',
                top: '16'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                top: '40',
                left: 'center'
            },
            series: [
                {
                    type: 'pie',
                    data: data,
                    center:['50%','60%'],
                    radius:['20%',"50%"],
                    // roseType:'area',
                    itemStyle: {
                        borderRadius: 6,
                        borderColor: '#fff',
                        borderWidth: 1
                    },
                }
            ]
        });

    }, 
    getTop10(){
        let links = [];
        for(let listId in this.$store.state.LinkInfo.links){
            for(let linkId in this.$store.state.LinkInfo.links[listId]){
                let link = {};
                link.value = this.$store.state.LinkInfo.links[listId][linkId].click?this.$store.state.LinkInfo.links[listId][linkId].click:0;
                link.name = this.$store.state.LinkInfo.links[listId][linkId].name;
                if(link.value){
                    links.push(link);
                }
            }
        }
        links.sort((a,b)=>{
            return b.value - a.value;
        });
        let drawLinks = links.splice(0,this.AppInfo.config.Link.chartLimit);
        this.drawChart(drawLinks);
        return null;
    }

},
mounted(){
    window.addEventListener('resize',()=>{
        this.linkChart.resize();
    })
    this.getTop10();
    this.$bus.$on('onLinkDataLoad',this.getTop10);
},
beforeDestroy(){
    this.$bus.$off('onLinkDataLoad',this.getTop10);
}
}
</script>

<style>
#eCharts-linkClick{
    width:100px;
    height: 400px;
}
</style>