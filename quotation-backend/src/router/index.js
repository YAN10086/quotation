/*
 * @Descripttion:
 * @Author: baiyf
 * @Date: 2021-02-23 10:34:05
 * @LastEditTime: 2024-04-05 23:05:40
 */
import Vue from "vue";
import Router from "vue-router";
const Home = () => import("@/view/home"); //主页
// const login = () => import("@/view/login"); //登陆
// const role = () => import("@/view/role"); //角色
// const businessOverview = () => import("@/view/businessOverview"); //经营总览
// const vip = () => import("@/view/vip"); //会员系统
// const cosmetics = () => import("@/view/cosmetics"); //管理人员
// const vipCenter = () => import("@/view/vipCenter"); //会员你系统
// const order = () => import("@/view/order"); //订单系统
// const addOrder = () => import("@/view/addOrder"); //手动录入订单
// const goods = () => import("@/view/goods"); //商品管理
// const transferReview = () => import("@/view/transferReview"); //转赠查询

Vue.use(Router);
export default new Router({
  routes: [
    {
      path: "/",
      name: "login",
      component: resolve => require(["@/view/login"], resolve),
      hidden: true
    },
    {
      path: "/login",
      name: "login",
      component: resolve => require(["@/view/login"], resolve),
      hidden: true
    },
    {
      path: "",
      name: "公告管理",
      component: Home,
      leaf: true,
      iconCls: "el-icon-s-order",
      children: [
        {
          path: "/notice",
          component: resolve => require(["@/view/notice"], resolve)
        }
      ]
    },
    {
      path: "",
      name: "通知管理",
      component: Home,
      leaf: true,
      iconCls: "el-icon-bell",
      children: [
        {
          path: "/noticeBar",
          component: resolve => require(["@/view/noticeBar"], resolve)
        }
      ]
    },
    {
      path: "",
      name: "美妆管理",
      component: resolve => require(["@/view/home"], resolve),
      leaf: true,
      iconCls: "el-icon-s-custom",
      children: [
        {
          path: "/cosmetics",
          component: resolve => require(["@/view/cosmetics"], resolve)
        }
      ]
    },
    {
      path: "",
      name: "数码管理",
      component: resolve => require(["@/view/home"], resolve),
      leaf: true,
      iconCls: "el-icon-mobile-phone",
      children: [
        {
          path: "/digital",
          component: resolve => require(["@/view/digital"], resolve)
        }
      ]
    },
    {
      path: "",
      name: "戴森",
      component: resolve => require(["@/view/home"], resolve),
      leaf: true,
      iconCls: "el-icon-orange",
      children: [
        {
          path: "/daisen",
          component: resolve => require(["@/view/daisen"], resolve)
        }
      ]
    },
    {
      path: "",
      name: "游戏机",
      component: resolve => require(["@/view/home"], resolve),
      leaf: true,
      iconCls: "el-icon-sunny",
      children: [
        {
          path: "/youxiji",
          component: resolve => require(["@/view/youxiji"], resolve)
        }
      ]
    }
    // {
    //   path: "",
    //   name: "订单录入",
    //   component: Home,
    //   leaf: true,
    //   iconCls: "el-icon-plus",
    //   children: [
    //     {
    //       path: "/addOrder",
    //       component: addOrder
    //     }
    //   ]
    // },
    // {
    //   path: "",
    //   name: "商品管理",
    //   component: Home,
    //   leaf: true,
    //   iconCls: "el-icon-s-shop",
    //   children: [
    //     {
    //       path: "/goods",
    //       component: goods
    //     }
    //   ]
    // },
    // {
    //   path: "",
    //   name: "转赠查询",
    //   component: Home,
    //   leaf: true,
    //   iconCls: "el-icon-present",
    //   children: [
    //     {
    //       path: "/transferReview",
    //       component: transferReview
    //     }
    //   ]
    // }
    // {
    //   path: "",
    //   name: "个人中心",
    //   component: Home,
    //   leaf: false,
    //   iconCls: "el-icon-user-solid",
    //   children: [
    //     {
    //       path: "/userPage",
    //       component: userPage,
    //       name: "个人主页"
    //     }
    //   ]
    // }
  ]
});
