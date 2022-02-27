<template>
    <div>
        <div id="container"></div>
        <div class="messageBox" style=""  v-show="showBar">
            <div class="el-row">
                <div class="el-col el-col-23" style="margin-bottom: 5px; font-size: 16px;">
                    <span style="color: rgb(50, 156, 235); cursor: pointer; font-size: larger;">点位信息</span>
                </div>
                <div class="el-col el-col-1">
                    <div class="close" @click="showBar = false" style="cursor: pointer">X</div>
                </div>
            </div>
            <div class="el-row">
                <div class="el-col el-col-12">设备名称： {{ showData.position }}</div>
                <div class="el-col el-col-12">设备号： {{ showData.deviceId }}</div>
            </div>
            <div class="el-row">
                <div class="el-col el-col-12">
                    <span>呼叫数：{{ showData.getOrder.length }}</span>
                </div>
                <div class="el-col el-col-12">响应数： {{ showData.repOrder.length }}</div>
            </div>
            <div class="el-row">
                <div class="el-col el-col-8">温度： {{ showData.temp }}</div>
                <div class="el-col el-col-8">湿度： {{ showData.hum }}</div>
                <div class="el-col el-col-8">电压： {{ showData.mbat }}</div>
            </div>
            <div class="el-row">
                <div class="el-col el-col-24">设备地址： {{ showData.position }}</div>
            </div>
            <div></div>
        </div>
    </div>

</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader';
import {getDeviceData} from "@/api/getData";

export default {
    name: "homeMap",
    data() {
        return {
            showData: {
                temp:"",
                hum:"",
                mbat:"",
                repOrder:[],
                getOrder:[],
                deviceId:[],
                position:[],
            },
            homeMap: null,
            showBar: false,
        }
    },
    mounted() {
        //DOM初始化完成进行地图初始化
        this.initMap();
        this.getPageData();
    },
    methods: {
        initMap() {
            AMapLoader.load({
                key: "23bc7d5348b70f7cbe1a29a9f30009fb",             // 申请好的Web端开发者Key，首次调用 load 时必填
                version: "2.0",      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
                plugins: [''],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
            }).then((AMap) => {
                this.homeMap = new AMap.Map("container", {  //设置地图容器id
                    zoom: 11,//级别
                    mapStyle: 'amap://styles/blue', //设置地图的显示样式
                    center: [121.408369, 31.124939],//中心点坐标
                });
            }).catch(e => {
                console.log(e);
            })
            window._AMapSecurityConfig = {
                securityJsCode: 'e9653df2ab9b0dea3b535a368146ab41',
            }
        },

        async getPageData() {
            const res = await getDeviceData();
            if (res.code == "0000") {

                let results = res.results;
                let onlines = results.online;
                let offlines = results.offline;
                var img = new AMap.Icon({
                    // 图标尺寸
                    size: new AMap.Size(20, 20),
                    // 图标的取图地址
                    image: require("../assets/img/location.png"),
                    // 图标所用图片大小
                    imageSize: new AMap.Size(20, 20),
                });

                let that = this;

                for (let i = 0; i < onlines.length; i++) {
                    let device = onlines[i];
                    let split = device.location.split(",");
                    let marker = new AMap.Marker({
                        position: new AMap.LngLat(parseFloat(split[0]), parseFloat(split[1])),
                        title: device.deviceId,
                        icon: img
                    });
                    marker.on("click", function () {
                        that.showBar = true;
                    }, null);

                    this.homeMap.add(marker);
                }
                for (let i = 0; i < offlines.length; i++) {
                    let device = offlines[i];
                    let split = device.location.split(",");
                    let marker = new AMap.Marker({
                        position: new AMap.LngLat(parseFloat(split[0]), parseFloat(split[1])),
                        title: device.deviceId,
                        icon: img
                    });
                    marker.on("click", function () {
                        that.showBar = true;
                        that.showData = device;
                    }, null);

                    this.homeMap.add(marker);
                }
            }
        },
    },
}
</script>

<style scoped>
#container {
    padding: 0px;
    margin: 0px;
    width: 100%;
    height: 1000px;
}
.close {
    cursor: pointer;
    right: 0;
}
.messageBox {
    width: 670px;
    height: 160px;
    box-shadow: 0 2px 5px 4px rgb(5 252 252 / 20%);
    background: linear-gradient(125deg,#015a69,#003743 5%,#438172 80%);
    color: #eee;
    border-radius: 10px 10px 0 0;
    padding: 10px 20px 0 40px;
    z-index: 10;
    bottom: 0;
    left: 0;
    right: 0;
    line-height: 30px;
    position: fixed;
    margin: 0 auto;
}
</style>
