import fetch from '@/config/fetch'
/**
 * 退出
 */

export const signout = () => fetch('/admin/signout');

/**
 * 登录
 */
export const login = data => fetch('/login/login', data, 'POST');
