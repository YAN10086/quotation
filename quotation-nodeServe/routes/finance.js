/*
 * @Author: baiyf
 * @Date: 2021-11-02 13:06:23
 * @LastEditTime: 2023-10-29 22:36:14
 * @Description: file content
 */
var express = require("express");
var router = express.Router();
var connection = require("../mysql");
var commonJs = require("../commonJs");

//查询结算记录
router.post("/selectFinance", function (req, res, next) {
  let reqdata = req.body;
  console.log("插入参数***********", reqdata); //查询参数
  let sqlCondition = ""; //查询条件
  if (reqdata.userName) {
    sqlCondition += `userName = '${reqdata.userName}'`;
  }

  if (reqdata.merchantId) {
    //商品所属商家ID
    sqlCondition += (sqlCondition ? " and " : "") + `merchantId ='${reqdata.merchantId}'`;
  }

  if (reqdata.finishDate) {
    //商品所属商家ID
    sqlCondition += (sqlCondition ? " and " : "") + `finishDate ='${reqdata.finishDate}'`;
  }

  if (sqlCondition) {
    sqlCondition += `and enabled = '1'`;
  } else {
    sqlCondition += `enabled = '1'`;
  }

  var sql_text = `SELECT * from finance WHERE ${sqlCondition}`;
  connection.query(sql_text, function (error, results, fields) {
    console.log("sql_text", sql_text, results);
    if (results) {
      objdata = commonJs.backData(200, "请求成功。", results);
    } else {
      objdata = commonJs.backData(500, "请求失败", error);
    }
    res.send(objdata);
  });
});

//添加结算记录
router.post("/addFinance", function (req, res, next) {
  var reqdata = req.body;
  let nowDate = +new Date();
  console.log("插入参数***********", reqdata); //查询参数
  var sql_text =
    "INSERT INTO  finance" +
    `(allPrice,adminUser,userName,merchantId,finishDate,finishVoucher, updateDate,enabled) 
                VALUES  
                ('${reqdata.allPirce}','${reqdata.adminUser}','${reqdata.userName}','${reqdata.merchantId}','${reqdata.finishDate}',
                '${reqdata.finishVoucher}','${nowDate}',1)`;
  connection.query(sql_text, function (error, results, fields) {
    console.log("sql_text", sql_text, results);
    if (results) {
      objdata = commonJs.backData(200, "请求成功。", {});
    } else {
      objdata = commonJs.backData(500, "请求失败", error);
    }
    res.send(objdata);
  });
});

//修改角色
router.post("/updateRolesInfo", function (req, res, next) {
  let reqdata = req.body;
  console.log("插入参数***********", reqdata); //查询参数
  let sqlCondition = ""; //查询条件
  if (reqdata.roleName) {
    sqlCondition += `roleName ='${reqdata.roleName}'`;
  }
  if (reqdata.roleExplain) {
    sqlCondition += (sqlCondition ? " , " : "") + `roleExplain ='${reqdata.roleExplain}'`;
  }
  if (reqdata.buttons) {
    sqlCondition += (sqlCondition ? " , " : "") + `buttons ='${reqdata.buttons}'`;
  }

  if (reqdata.menus) {
    sqlCondition += (sqlCondition ? " , " : "") + `menus ='${reqdata.menus}'`;
  }

  let updateDate = +new Date();
  sqlCondition += (sqlCondition ? " , " : "") + `updateDate ='${updateDate}'`;

  let sql_text = "UPDATE roles SET " + sqlCondition + ` WHERE id='${reqdata.id}'`;

  connection.query(sql_text, function (error, results, fields) {
    console.log("sql_text", sql_text, results);
    if (results) {
      objdata = commonJs.backData(200, "查询成功", results);
    } else {
      objdata = commonJs.backData(500, "网络异常500", results);
    }
    res.send(objdata);
  });
});

module.exports = router;
