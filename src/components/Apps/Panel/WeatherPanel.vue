<template>
  <div class="WeatherPanel">
      <div class="weatherIcon">
          <img class="weather_icon" :src="`/img/weather/${data.current.weather.ic}.png`" alt="">
          <span>{{data.current.weather.tp}}°C</span>
      </div>
      <div class="weatherBox">
        <!-- <div id="he-plugin-standard"></div> -->
      </div>
  </div>
</template>

<script>
const http = require('../../../http/index').default;
export default {
    data(){
        return{
            showWeather: false,
            data:{
                "city":"Wuhan",
                "state":"Hubei",
                "country":"China",
                "location":{
                    "type":"Point",
                    "coordinates":[114.4444954225,30.6332050564]
                },
                "current":{
                    "weather":{
                        "ts":"2022-04-17T12:00:00.000Z",
                        "tp":13,
                        "pr":1021,
                        "hu":70,
                        "ws":4.25,
                        "wd":261,
                        "ic":"04n"
                    },
                    "pollution":{
                        "ts":"2022-04-17T12:00:00.000Z",
                        "aqius":134,
                        "mainus":"p2",
                        "aqicn":70,
                        "maincn":"co"
                    }
                }
            },
        }
    },
    methods:{
        toggle(){
            this.showWeather = !this.showWeather;
        },
        getData(){
            http.get('https://api.airvisual.com/v2/nearest_city?key=120b3ddc-44e3-4c26-952c-6185fb69ff0d').then(
                (res)=>{
                    console.log(res);
                    this.data = res.data.data;
                },
                (error)=>{
                    console.log(error)
                }
            )
        }
    },
    mounted(){
        this.getData();
        // let WIDGET = {
        //     "CONFIG": {
        //         "layout": "1",
        //         "width": "450",
        //         "height": "150",
        //         "background": "1",
        //         "dataColor": "FFFFFF",
        //         "key": "a26aa58940e747d697e08bc44d7e28d6"
        //     }
        // }
        // let func = function (d) {
        //     window.WIDGET = WIDGET;
        //     var c = d.createElement('link')
        //     c.rel = 'stylesheet'
        //     c.href = 'https://widget.heweather.net/standard/static/css/he-standard.css?v=1.4.0'
        //     var s = d.createElement('script')
        //     s.src = 'https://widget.heweather.net/standard/static/js/he-standard.js?v=1.4.0'
        //     var sn = d.getElementsByTagName('script')[0]
        //     sn.parentNode.insertBefore(c, sn)
        //     sn.parentNode.insertBefore(s, sn)
        // }
        // func(document);
    }
}
</script>

<style>
.WeatherPanel{
    width: 100%;
    height: 100%;
}
.weatherIcon{
    width:100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 3rem;
    font-size: 1.25rem;
}
.weatherIcon .weather_icon{
    width: 3rem;
    height: 3rem;
    padding: 0.5rem;
}
.WeatherPanel:hover .weatherBox{
    display: block;
}
.weatherBox{
    display: none;
    position: absolute;
}

</style>