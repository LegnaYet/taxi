<template>
    <div  id="app" >
        <div>
            <div class="home">
                <div class="nav-bar">
                    <span class="nav-bar-title" style="cursor: pointer" @click="backMap">扬招站设备管理平台</span>
                    <div class="item">
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAABDklEQVRoQ+1Y2w3CMAxM97khYDLYDIbwPqBI/UBVQ2LOxkrrfCdn36ORm6VMvpbJ+y9JINrBdCAdIBXICJEC0sfTAVpCEqDrAIALWYM+LiLPFsgIgUcpJZSEiDT7PAWBUPVrdKgI0QF2BuhGyLk+Da8mAOBOV1UCiEiz5q8EbsoeqO3ULbStDKA2/1cXTAlQUjocVkfIoQcK8vgEANRRInSJyPX0s9C8DoR2PlD8+B/xgAihW9QOrLPQ1KNEHSOmJvDZ/DcHX2u21C5vM2k6jYYGfqc4rU40oS6BfFYxsIj6H1iHudCXCZZAaPP5rGIQYVeI7i3kWt0APAkYiEhBpAOUfAaH0wEDESmI6R14A9/oRTG1sH31AAAAAElFTkSuQmCC">
                        <span @mouseover="highlight(1)" @mouseout="offHighlight(1)" :style="{ color: title1Color}" @click="getDevice(1)" id="deviceCount">设备总数：{{ deviceCount }}</span>
                    </div>
                    <div class="item">
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAACdklEQVRoQ+3XS6hNcRTH8c+dSZgxIKI8izAwQEpCIUmECOURSYokA+Q5EDKQlLdSBh4hRSFSFCYiyiPyiEiKSGZa9Ve3q+vs7t4bu/aanFtn3fVf3/Vb/7X+p0nFrani+asB/rWCtQK1AjkrULdQzgLm/vdagVZKuBHtsSZ3iRsEKEOBYbiTzm2HH2VClAGwDltS0n3xtGoANzAqJT0WV6sEMAj3myW8AEeqBLAaO3AK0xGXeVOVAG5hOFZiNw5hUVUA+uBJSnYaTuMyxlcFYDn24CI24C4eo39VAO5hMBbjHD7gOzrjW4KIO9EJq4qCKmoPdMerlFRHfMUbdEO/1FoD8Cj5LMThIiCKAoiK7krtMzEldhMjMAbXMB9H03dx2Uf+TwCxbXtjRboHkdsJzMJcHMc+LG2W9BSczwtRhAJd8D4lEq0UrRO2PT3m1qa/n6MXrmN02tCxqXNZEQDrsblF+0RSy7A3KbITL/EOs1NLhU9MqJhUbbYsACH7zD+cEA+2ri3aJ9wn4QLOJLgDOIupCSBUCDUaWeyWJa05ZQF4gZ6NTkEssmfN/AbiAW7jdXpaxEt1G+bhWIaYv1yGIsb0b5YFICZJo236ECdbRI95/yndjw5p/k/ApeQ3J0E34niL/XkUaHTAn77/dXHD5yNiF8RnYZZFgTyHxfyPXg+L+zA5T7C2tlCeM2NxxQILi2m1NU+wfwEQvwXiYRc2DleqBhBvnoP4jB74UjWA2LTxmyAm1Iyik494ZV/iOGNIazO8CKC/AVBEnq3GqAFKLW+G4LUCGYpUqkutQKnlzRC8ViBDkUp1qRUotbwZgtcKZChSqS4/AWSLZDEOnT+rAAAAAElFTkSuQmCC">
                        <span @mouseover="highlight(2)" @mouseout="offHighlight(2)" :style="{ color: title2Color}" @click="getDevice(2)" id="onlineCount">在线数量：{{ onlineCount }}</span>
                    </div>
                    <div class="item">
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAACo0lEQVRoQ+2a8VFUQQzGv6sAOkAqACsAKlAqADrQCpQKoAO0AqUCtAKlAqACtQKdH7PL7IW3d+8lOWccX2b4445NNl+STTbZWyiftiWdSHotab+I/y7ps6SPkn5mbrnIFCbpUNInSYAYIpQ/lvQla99MACh/YxT7Wj4fmO+PskBkAXgh6Vtj+dsSQvdFcTyC1ffKZzyxmxFOWQDeS3pXlHsosW9jHRCchZ2y7lwSfCGaAgArcziH6FQS/4ewdC/GCTP+ILzzoSPvuoBdC24KAJSysbx2A+cCzk4FulLEEICepVsrO/UazdbzDmm4nqtHYRYAyt+N2IYssgmyWWxoDw7/EwgLoD2MqxScEnpTgP4esfitpMu6zgsgnD06io6Ru5S91gEALakPAnXN4yMMFVpCHXnTSGhDaxKAtmKS8nppNKTtADOHlaRRqQ0tNwCEjUptCWhsHUkDkKCbS8QMwGW2RKbZA4nGdIlK9QA5mWxEpmivFHRitJFe4vr90t51irA0ALbrqnWC3peGJkq9HiENQHvZ+1Ual3qxwoJbQQT0yzT/ltIA1GKGJ9ioXjP4HnC1qfHi6DVCqQC8ykX4ZgAR62XwpnqAjPNKkm28if86cfAqXedIGzvEbRayefvHioncWEC9gVeaB/75OoAlSZ10Znb0QVoltLzEQAwDLU0dsiuxV7koX1oIRRXx8s8AvJbL4kv1wEVznWbsUonpdKTpJy2fdUbuaQBsGuX+TlYaO5Jc55GlqVuzOA2AvfdXAMz+KWRRwgNDI/c0AChI18XUjElde3dvH/U8QAihp5mnEZAKwKNclGcGELVglH/2QNSCUf7/1wMUqdTfNjhd0Vb4Se8Dzv02yrYSAK8iVxvdPi58afg19Nr4Nx+0p8J59gD+B3Ji8DE7irNKAAAAAElFTkSuQmCC">
                        <span @mouseover="highlight(3)" @mouseout="offHighlight(3)" :style="{ color: title3Color}" @click="getOrder(1)"  id="orderCount">订单数量：{{ orderCount }}</span>
                    </div>
                    <div class="item" style="margin-left: 10px;">
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAABj0lEQVRoQ+2ZMUsDMRiGn27OHV2dXTvXzdVBf42rf0Z/RP0HCiKIODgoDg4KUgSFKh/cB8fRu+SSJpeEBDq0JL3n6fvlu7vejMzHLHN+ihZYActEEroGjraxDCVQjMDUZfYHeCVQBTz3UU2gXUIxNna33neaQPYCnuXstHynCTgReC6qAkWdB7LfxCIQY7Qv3OoeKGoPxCif7jFqCRV3LRSjjGoXkl9ZT1q1C3nWXO1CoUvoEjgbSCnpBAT+FLgAznskkhVQ+IcmgbucBBT+qYG/yamEFP4ZOAFuDV0qqRJS+BfgGLi3aLFBBWQDXllAyBSFf2v+9X60XBdMQOC1BZokFP4dWABSPrYjuICASB/vk1D4D+AQeLUlb+YFE5Dv1xT6JBT+CzgAJIGxI6jAkITCfwP7wOdY8hgJKFM3CXkvrx9gDqwd4WVZ8AS2SchnG2AP+PWAjyrQLqfeR0IOMtESaCdhaqtjPKILjIGzmestIOUw5ZBn1V5PKaeE12M7CaQAbmQIfbtoBPCdkL3APwlvtjFh9NGHAAAAAElFTkSuQmCC">
                        <span @mouseover="highlight(4)" @mouseout="offHighlight(4)" :style="{ color: title4Color}" @click="getOrder(2)"  id="responseCountCount">响应数量：{{ responseCountCount }}</span>
                    </div>
                    <div class="user"  style="position: absolute; right: 5%;">
                        <span class="el-icon-user-solid">管理员</span>
                        <span class="goBack" @click="logout" style="cursor: pointer">退出登录</span>
                    </div>
                </div>
            </div>
        </div>
        <home-map v-show="showMap"></home-map>
        <device v-show="showDevice"></device>
        <device-online  v-show="showDeviceOnline"></device-online>
        <order v-show="showOrder"></order>
        <order-rep v-show="showOrderRep"></order-rep>
    </div>
</template>

<script>
import { getDeviceData,getOrderData } from "@/api/getData";
import HomeMap from "../components/homeMap";
import Device from "../components/device";
import Order from "../components/order";
import DeviceOnline from "../components/deviceOnline";
import OrderRep from "../components/orderRep";
export default {
  name:"home",
  data() {
    return {
      components: {
          HomeMap,
          Order,
          Device
      },
      rules: {},
      showMap: false,
      showDevice: false,
      showDeviceOnline: false,
      showOrder: false,
      showOrderRep: false,
      deviceCount: 0,
      onlineCount: 0,
      orderCount: 0,
      responseCountCount: 0,
      title1Color: "#2e2e2e",
      title2Color: "#2e2e2e",
      title3Color: "#2e2e2e",
      title4Color: "#2e2e2e",
    };
  },
  mounted() {
      this.showMap = true;
      this.getPageData();
  },
  computed: {

  },
  methods: {
    backMap(){
        this.showMap = true;
    },
    logout(){
        this.$router.push("/login");
    },
    getDevice(type){
        this.showMap = false;
        this.showDevice = false;
        this.showDeviceOnline = false;
        this.showOrder = false;
        this.showOrderRep = false;
        if (type === 1){
            this.showDevice = true;
        }else if (type === 2){
            this.showDeviceOnline = true;
        }
    },
    getOrder(type){
        this.showMap = false;
        this.showDevice = false;
        this.showDeviceOnline = false;
        this.showOrder = false;
        this.showOrderRep = false;
        if (type === 1){
            this.showOrder = true;
        }else if (type === 2){
            this.showOrderRep = true;
        }
    },
    highlight(index){
        switch (index){
            case 1:
                this.title1Color = "#0EEA98";
                break;
            case 2:
                this.title2Color = "#0EEA98";
                break;
            case 3:
                this.title3Color = "#0EEA98";
                break;
            case 4:
                this.title4Color = "#0EEA98";
                break;
            default:
                break
        }

    },
    offHighlight(index){
        switch (index){
            case 1:
                this.title1Color = "#2e2e2e";
                break;
            case 2:
                this.title2Color = "#2e2e2e";
                break;
            case 3:
                this.title3Color = "#2e2e2e";
                break;
            case 4:
                this.title4Color = "#2e2e2e";
                break;
            default:
                break
        }
    },
    async getPageData() {

      const res1 = await getDeviceData();
      if (res1.code == "0000") {
          let results = res1.results;
          let online = results.online;
          let offline = results.offline;

          let onlineSize = online.length;
          let offlineSize = offline.length;
          this.onlineCount = onlineSize;
          this.deviceCount = onlineSize + offlineSize;
      }
      const res2 = await getOrderData();
      if (res2.code == "0000") {
          let results = res2.results;
          let repOrder = results.repOrder;
          let getOrder = results.getOrder;

          let repOrderSize = repOrder.length;
          let getOrderSize = getOrder.length;
          this.responseCountCount = repOrderSize;
          this.orderCount = getOrderSize;
      }
    },
  },
  watch: {
  },
  components: {
      OrderRep,
      DeviceOnline,
      Order,
      Device,
      HomeMap
  },
};
</script>

<style lang="less" scoped>
@import "../style/mixin";
html, body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
}

body {
    font-family: "PingFang SC", "Microsoft YaHei", "寰蒋闆呴粦", Arial, sans-serif, "榛戜綋" !important;
    background-color: #ffffff;
    color: #333333;
    font-size: 14px;
}
#container {
    width: 100%;
    height: 100%;
}
.home {
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: center;
    text-align: center;
}
.nav-bar {
    position: absolute;
    position: fixed;
    width: 100%;
    height: 50px;
    border-bottom: 2px solid rgba(95,95,95,.5);
    background-image: linear-gradient(90deg,rgba(79,153,184,.8),rgba(91,166,153,.8) 51%,rgba(75,143,131,.8) 75%);
    justify-content: center;
    z-index: 1;
}
.item {
    width: 10%;
    cursor: pointer;
    color: #2e2e2e;
    padding: 10px 0;
}
.item, .nav-bar {
    display: flex;
    align-items: center;
}
.nav-bar-title {
    position: absolute;
    left: 6%;
    font-size: 20px;
    color: #e8e8e8;
}
.nav-bar-title {
    position: absolute;
    left: 6%;
    font-size: 20px;
    color: #e8e8e8;
}
.item img {
    width: 20px;
    height: 20px;
}
.goBack {
    color: #e4e4e4;
    margin-left: 10px;
}
.el-icon-user-solid{
    font-family: element-icons!important;
    speak: none;
    font-style: normal;
    font-weight: 400;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    vertical-align: baseline;
    display: inline-block;
    -webkit-font-smoothing: antialiased;
}
</style>
