/*
 * @Author: baiyf
 * @Date: 2023-10-09 14:03:27
 * @LastEditTime: 2023-12-17 19:15:20
 * @Description: file content
 */
// import store from "@/store";
// import Vue from "vue";
// import { basePath, get, post } from "@/request";
import Vue from "vue";
import { basePath, get, post } from "./request";

let $api = { get, post, basePath };
function getMenu(pdata) {
  console.log("---获取权限");
  return new Promise((resolve, reject) => {
    return $api.post("/users/adminUserLogin", pdata).then(
      res => {
        console.log("res", res);
        let list = [];
        if (res.data.code == "200") {
          if (res.data.data && res.data.data.length > 0) {
            let userObj = JSON.parse(JSON.stringify(res.data.data[0]));
            userObj.userType = 2;
            Vue.prototype.$USER = userObj;
            sessionStorage.setItem("userObj", JSON.stringify(userObj));
          }
          resolve(res);
        } else {
          resolve(res);
        }
      },
      err => {
        console.log("err", err);
        reject(err);
      }
    );
  });
}

export default getMenu;
