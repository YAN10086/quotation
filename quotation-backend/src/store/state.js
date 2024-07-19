/*
 * @Author: baiyf
 * @Date: 2019-05-20 16:33:59
 * @Description:    Vuex 
 */

let state = {
    //从缓存中获取值就是为了防止在刷新时vuex数据丢失的问题
    myname: "baiyf",
    testFun: window.sessionStorage.getItem("testFun"),
    userType: window.sessionStorage.getItem("userType"),
}
export default state;