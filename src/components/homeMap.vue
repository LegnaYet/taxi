<template>
    <div id="container"></div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader';
export default {
    name:"homeMap",
    data(){
        return{
            homeMap:null,
        }
    },
    mounted(){
        //DOM初始化完成进行地图初始化
        this.initMap();
    },
    methods:{
        initMap(){
            AMapLoader.load({
                key:"23bc7d5348b70f7cbe1a29a9f30009fb",             // 申请好的Web端开发者Key，首次调用 load 时必填
                version:"2.0",      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
                plugins:[''],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
            }).then((AMap)=>{
                this.map = new AMap.Map("container",{  //设置地图容器id
                    zoom: 11,//级别
                    mapStyle: 'amap://styles/blue', //设置地图的显示样式
                    center: [121.408369, 31.124939],//中心点坐标
                });
            }).catch(e=>{
                console.log(e);
            })
            window._AMapSecurityConfig = {
                securityJsCode:'e9653df2ab9b0dea3b535a368146ab41',
            }
        },
    },
}
</script>

<style  scoped>
#container{
    padding:0px;
    margin: 0px;
    width: 100%;
    height: 1000px;
}
</style>
