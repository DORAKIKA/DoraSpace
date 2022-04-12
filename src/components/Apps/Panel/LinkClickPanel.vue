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
        if(this.linkChart){
            this.linkChart.dispose();
        }
        this.linkChart = echarts.init(dom);
        this.linkChart.setOption({
            tooltip: {
                trigger: 'item'
            },
            legend: {
                top: '20',
                left: 'center',
                textStyle:{
                    color: 'var(--font-color)',
                }
            },
            series: [
                {
                    type: 'pie',
                    data: data,
                    center:['50%','60%'],
                    radius:['20%',"50%"],
                    // roseType:'area',
                    itemStyle: {
                        borderRadius: 4,
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
    },
    resize(){
        this.linkChart.resize();
    }

},
mounted(){
    window.addEventListener('resize',this.resize);

    this.$bus.$on('onLinkDataLoad',this.getTop10);
    this.$bus.$on('onDataLoad',this.getTop10);
    this.getTop10();
},
beforeDestroy(){
    if(this.linkChart){
        this.linkChart.dispose();
        this.linkChart = undefined;
    }
    console.log("destroy")
    this.$bus.$off('onLinkDataLoad',this.getTop10);
    window.removeEventListener('resize',this.resize);
}
}
</script>

<style>
#eCharts-linkClick{
    width:100%;
    height: 100%;
}
</style>