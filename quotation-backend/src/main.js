/*
 * @Author: baiyf
 * @Date: 2020-04-09 09:58:53
 * @LastEditTime: 2023-12-08 09:46:56
 * @Description: file content
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill";
import ElementUI from "element-ui"; //饿了么UI
import "element-ui/lib/theme-chalk/index.css"; //饿了么UI
import Vue from "vue";
import App from "./App";
import baseFun from "./baseFun"; // 引入公共方法函数
import getMenu from "./getMenu";
import { basePath, get, post } from "./request";
import router from "./router"; //路由
import store from "./store";

Vue.prototype.$baseFun = baseFun;
Vue.prototype.$api = { get, post, basePath };
Vue.prototype.$coverImg = "http://yunyueimg.acewb.com/";
Vue.prototype.$getMenu = getMenu;
Vue.config.productionTip = false;
Vue.use(ElementUI, { size: "small" }); //饿了么UI

if (sessionStorage.getItem("userObj")) {
  let userInfo = JSON.parse(sessionStorage.getItem("userObj"));
  Vue.prototype.$USER = userInfo;
  //   // 将当前的用户信息挂载到原型
  //   let userInfo = JSON.parse(sessionStorage.getItem("userObj"));
  //   let pdata = {
  //     userName: userInfo.userName,
  //     userPwd: userInfo.userPwd,
  //     code: userInfo.code,
  //     // userType: 2,
  //     userType: userInfo.userType
  //   };
  //   loadPage(pdata);
}
// async function loadPage(pdata) {
//   console.log("重新加载");
//   let rData = await getMenu(pdata);
//   let list = rData.data.list;
//   router.options.routes.push(...list);
//   router.addRoutes(list);
// }

router.beforeEach((to, from, next) => {
  let userObj = sessionStorage.getItem("userObj");
  console.log(to.meta.intercept);
  if (userObj) {
    // 本地有 token 去下一步
    next();
  } else {
    // 不是 login 页面我再去跳 ，是 login 就会死循环，因为login 也是页面就会被守卫
    if (to.path != "/login") {
      // 路由原信息为true 并且 不是 login 页面 去login 防止死循环
      next("/login");
    } else {
      next(); // vue3 从 next 换成了 return 执行下一步
    }
  }
});

new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
