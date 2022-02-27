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
    baseUrl = 'http://localhost:28080/taxi-app';
    baseImgPath = 'http://47.100.200.255:18880/test';
} else {
    baseUrl = 'https://api.maoma.cc'
    baseImgPath = 'http://47.100.200.255:18880/test';
}

export {
    baseUrl,
    routerMode,
    baseImgPath
}
