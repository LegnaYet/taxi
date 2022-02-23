/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * baseImgPath: 图片存放地址
 *
 */
let baseUrl = '';
let routerMode = 'hash';
let baseImgPath;

if (process.env.NODE_ENV == 'development') {
    baseUrl = 'http://192.168.1.203:8080/cat-code'; //金超凡的ip
    // baseUrl = 'http://192.168.1.111:8080/cat-code'; //戴若琦的ip
    // baseUrl = 'http://api.maoma.cc'
    baseImgPath = '/img/';
} else {
    baseUrl = 'https://api.maoma.cc'
    baseImgPath = '/img/';
}

export {
    baseUrl,
    routerMode,
    baseImgPath
}