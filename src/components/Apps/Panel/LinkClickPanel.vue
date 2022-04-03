<template>
    <div><div class="linkClickPanel" id="eCharts-linkClick"></div></div>
</template>

<script>
import * as echarts from 'echarts';
import { mapState } from 'vuex';
export default {
data(){
    return{
        linkChart:null,
    }
},
computed:{
    ...mapState(['LinkInfo'])
},
methods:{
    drawChart(data){
        let dom = document.getElementById('eCharts-linkClick');
        if(this.linkChart===null){
            this.linkChart = echarts.init(dom);
        }else{
            // this.linkChart = this.linkChart
        }
        this.linkChart.setOption({
            title: {
                text: '访问统计',
                left: 'center',
                top: 'center'
            },
            series: [
                {
                type: 'pie',
                data: data,
                radius:['40%',"70%"]
                // roseType:'area',
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
        this.drawChart(links.splice(0,10));
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
    width:100%;
    height: 300px;
}
@media screen and (max-width:600px){
    #eCharts-linkClick{
        /* transform: scale(0.5) */
    }
}
</style>