import fetch from '@/config/fetch'
/**
 * 退出
 */

export const signout = () => fetch('/admin/signout');

export const getDeviceData = () => fetch('/device/list');

export const getOrderData = () => fetch('/order/list');

/**
 * 登录
 */
export const login = data => fetch('/login/login', data, 'POST');

export const getDevicePageData = data => fetch('/device/page',data,"GET");

export const getOrderPageData = data => fetch('/order/page',data,"GET");

