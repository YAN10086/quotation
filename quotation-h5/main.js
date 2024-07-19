import App from './App'
import store from './store'

import request from "static/request.js";
import commonFun from "./commonFun.js"
import Vue from 'vue'


Vue.config.productionTip = false
App.mpType = 'app'

// 引入全局TuniaoUI
import TuniaoUI from 'tuniao-ui'
Vue.use(TuniaoUI);

// 引入TuniaoUI提供的vuex简写方法
let vuexStore = require('@/store/$t.mixin.js')
Vue.mixin(vuexStore)

// 引入TuniaoUI对小程序分享的mixin封装
let mpShare = require('tuniao-ui/libs/mixin/mpShare.js')
Vue.mixin(mpShare);


Vue.prototype.$request = request;
Vue.prototype.$commonFun = commonFun;
Vue.prototype.$store = store;
// let userInfo = {
// 		address: "广东省深圳市宝安区石岩街道上排新村北一巷104号",
// 		avatar: null,
// 		createDate: "1701657429727",
// 		enabled: "1",
// 		id: 5,
// 		loginDate: "1701657429727",
// 		nickName: "清风明月",
// 		openId: "o0JOS6-Ahf05ZUQ5l18AjFiT5mbU",
// 		person: "GT",
// 		sex: "1",
// 		tel: "13599875581",
// 		tenantCode: "GT001",
// 		tenantId: "1",
// 		tenantName: "原始渠道"
// 	}
// 	store.commit('$tStore', {
// 	  name: 'userInfo',
// 	  value: userInfo
// 	});


console.log("MAIN");


const app = new Vue({
  store,
  ...App
})


app.$mount()