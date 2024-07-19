/*
 * @Descripttion: 
 * @Author: baiyf
 * @Date: 2023-03-30 16:21:00
 * @LastEditTime: 2023-03-30 16:51:33
 */
const crypto = require('crypto')

function getSign(payInfoData) {

    // 商户号和通信密钥
    const app_id = '2110116752'
    const key = 'f3051b3366f3cd6b4a5f6f81c6b75467'

    // 排序后转换为字符串
    const toQueryString = (obj) => Object.keys(obj)
        .filter(key => key !== 'sign' && obj[key] !== undefined && obj[key] !== '')
        .sort()
        .map(key => {
            if (/^http(s)?:\/\//.test(obj[key])) { return key + '=' + encodeURI(obj[key]) }
            else { return key + '=' + obj[key] }
        })
        .join('&')

    // md5
    const md5 = (str, encoding = 'utf8') => crypto.createHash('md5').update(str, encoding).digest('hex')

    // 构造请求数据
    let params = payInfoData;

    params = toQueryString(params)
    params += '&key=' + key

    // 计算出最终签名
    const sign = md5(params).toUpperCase()
    console.log(sign);
    return sign;
}


module.exports = getSign;