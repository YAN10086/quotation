/*
 * @Descripttion:
 * @Author: baiyf
 * @Date: 2023-03-27 14:30:06
 * @LastEditTime: 2024-04-05 21:11:02
 */

import axios from "axios";
import qs from "qs";

const errData = {
  code: "-1",
  msg: "网络错误"
};
//获取请求地址
function getApiPath(body) {
  let xhrUrl =
    process.env.NODE_ENV == "development"
      ? // ? "http://192.168.1.3:3000"
        "http://192.168.1.3:8888"
      : "https://----.com";
  return xhrUrl;
}
function request(method, url, body, loadingMsg) {
  console.log("请求-----------", body, url);
  method = method.toUpperCase();
  if (method === "GET" || !body) {
    body = {};
  }
  let apiPath = getApiPath();
  let xhrUrl = apiPath + url;
  //当传递完整url时，不再进行域名拼接
  if (url.indexOf("http://") != "-1" || url.indexOf("https://") != "-1") {
    xhrUrl = url;
  }
  return new Promise((resolve, reject) => {
    axios({
      method: method,
      url: xhrUrl,
      data: qs.stringify(body),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(
      res => {
        resolve(res);
      },
      error => {
        console.log("Promise-reject", error);
        reject(errData);
      }
    );
  });
}
export const basePath = getApiPath({});
export const get = (url, body, loadingMsg) =>
  request("GET", url, body, loadingMsg);
export const post = (url, body, loadingMsg) =>
  request("POST", url, body, loadingMsg);
