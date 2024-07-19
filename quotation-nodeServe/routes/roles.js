/*
 * @Author: baiyf
 * @Date: 2021-11-02 13:06:23
 * @LastEditTime: 2023-10-08 10:58:07
 * @Description: file content
 */
var express = require("express");
var router = express.Router();
var connection = require("../mysql");
var commonJs = require("../commonJs");

//查询商品
router.post("/selectRoles", function (req, res, next) {
  let reqdata = req.body;
  console.log("插入参数***********", reqdata); //查询参数
  let sqlCondition = ""; //查询条件
  if (reqdata.roleName) {
    sqlCondition += `roleName LIKE '%${reqdata.roleName}%'`;
  }

  if (reqdata.merchantId) {
    //商品所属商家ID
    sqlCondition += (sqlCondition ? " and " : "") + `merchantId ='${reqdata.merchantId}'`;
  }

  if (sqlCondition) {
    sqlCondition += `and enabled = '1'`;
  } else {
    sqlCondition += `enabled = '1'`;
  }
  let page = (reqdata.page - 1) * reqdata.pageSize; //查询起始
  //查询分页数据
  let sql_text = `SELECT * FROM roles WHERE ${sqlCondition}  ORDER BY id DESC  limit ${page} ,${reqdata.pageSize}`;
  //查询总数
  let sql_text_count = `SELECT COUNT(*) as totalCount from roles WHERE ${sqlCondition}`;
  connection.query(sql_text, function (error, results, fields) {
    console.log("sql_text", sql_text, results);
    let objdata;
    let bData = {
      list: results || [],
    };
    connection.query(sql_text_count, function (error, resultsCount, fields) {
      console.log("sql_text_count", sql_text_count, resultsCount);
      bData.count = resultsCount ? resultsCount[0].totalCount : 0;
      if (resultsCount) {
        objdata = commonJs.backData(200, "查询成功", bData);
      } else {
        objdata = commonJs.backData(500, "网络异常500", error);
      }
      res.send(objdata);
    });
  });
});

//添加角色
router.post("/addRoles", function (req, res, next) {
  var reqdata = req.body;
  let nowDate = +new Date();
  console.log("插入参数***********", reqdata); //查询参数
  var sql_text =
    "INSERT INTO  roles" +
    `(roleName,roleExplain,merchantId,updateDate,enabled) 
                VALUES  
                ('${reqdata.roleName}','${reqdata.roleExplain}','${reqdata.gExplain || ""}','${nowDate}',1)`;
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
