/*
 * @Descripttion:收藏相关接口
 * @Author: baiyf
 * @Date: 2021-11-02 13:06:23
 * @LastEditTime: 2024-01-12 01:16:40
 */
var express = require("express");
var router = express.Router();
var connection = require("../mysql");
var commonJs = require("../commonJs");
var objdata = {};

router.post("/getLhList", function (req, res, next) {
  let reqdata = req.body;
  console.log("插入参数***********", reqdata); //查询参数

  let countNum = 1;

  let list = [];
  if (reqdata.flag == "1") {
    countNum = 1;
  } else if (reqdata.flag == "2") {
    countNum = 10;
  } else if (reqdata.flag == "3") {
    countNum = 100;
  } else if (reqdata.flag == "4") {
    countNum = 1000;
  }

  function addOneToString(str, i) {
    // 将字符串转换为数字
    let num = Number(str);
    // 加一
    num += i;
    // 将数字转换回字符串，并使用padStart方法确保它保持原有的格式
    return String(num).padStart(str.length, "0");
  }

  for (let p = 0; p < countNum; p++) {
    // let strResult = commonJs.checkNum(String(reqdata.bianhao + p * 1));
    let strNum = addOneToString(String(reqdata.bianhao), p * 1);
    let strResult = commonJs.checkNum(strNum);
    list.push({
      bianhao: strNum,
      strResult: strResult,
    });
  }

  objdata = commonJs.backData(200, "查询成功", list);
  res.send(objdata);
});

module.exports = router;
