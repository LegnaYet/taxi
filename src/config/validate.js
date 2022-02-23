/* 密码合法 */
export function validatePassword(rule, value, callback) {
    console.log(value);
    const passwrodRegex = /^(?=.*?[A-Z])(?=(.*?[a-z]))(?=.*?\d).*$/;
    if (passwrodRegex.test(value)) {
        callback();
    } else {
        callback(new Error('密码不合法'));
    }
}

/* 是否手机号码*/
export function validatePhone(rule, value, callback) {
    const reg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (value == '' || value == undefined || value == null) {
        console.log('输入');
        callback();
    } else {
        if ((!reg.test(value)) && value != '') {
            console.log('2');
            callback(new Error('请输入正确的电话号码'));
        } else {
            console.log('3');
            callback();
        }
    }
}