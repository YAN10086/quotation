/*
 * @Descripttion:收藏相关接口
 * @Author: baiyf
 * @Date: 2021-11-02 13:06:23
 * @LastEditTime: 2024-01-17 02:18:12
 */
var express = require("express");
var router = express.Router();
var connection = require("../mysql");
var commonJs = require("../commonJs");
var objdata = {};

//查询公告
router.post("/selectNotice", function (req, res, next) {
  let reqdata = req.body;
  console.log("插入参数***********", reqdata); //查询参数
  let sqlCondition = ""; //查询条件
  if (reqdata.goodsName) {
    //商品名称
    sqlCondition += `goodsName LIKE '%${reqdata.goodsName}%'`;
  }

  if (reqdata.tenantId) {
    if (!reqdata.fromAdmin) {
      sqlCondition += (sqlCondition ? " and " : "") + ` tenantId in (${reqdata.tenantId},960) `;
    } else {
      sqlCondition += (sqlCondition ? " and " : "") + ` tenantId = '${reqdata.tenantId}' `;
    }
  }

  if (reqdata.id) {
    //商品ID
    sqlCondition += (sqlCondition ? " and " : "") + `id = '${reqdata.id}'`;
  }

  if (sqlCondition) {
    sqlCondition += `and enabled = '1'`;
  } else {
    sqlCondition += `enabled = '1'`;
  }
  let page = (reqdata.page - 1) * reqdata.pageSize; //查询起始
  //查询分页数据
  let sql_text = `SELECT * FROM` + " `notice` " + `WHERE ${sqlCondition}  ORDER BY id   limit ${page} ,${reqdata.pageSize}`;
  //查询总数
  let sql_text_count = `SELECT COUNT(*) as totalCount from notice WHERE ${sqlCondition}`;
  connection.query(sql_text, function (error, results, fields) {
    console.log("sql_text", sql_text, results);
    let objdata;
    let bData = {
      list: results || [],
    };
    connection.query(sql_text_count, function (error, resultsCount, fields) {
      console.log("sql_text_count", sql_text_count, resultsCount);
      bData.count = resultsCount[0].totalCount;
      if (resultsCount) {
        objdata = commonJs.backData(200, "查询成功", bData);
      } else {
        objdata = commonJs.backData(500, "网络异常500", error);
      }
      res.send(objdata);
    });
  });
});

//删除
router.post("/delNotice", function (req, res, next) {
  let reqdata = req.body;
  console.log("插入参数***********", reqdata); //查询参数
  let sql_text = "delete FROM notice" + ` WHERE id ='${reqdata.id}' and tenantId='${reqdata.tenantId}' `;
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

//添加
router.post("/addNotice", function (req, res, next) {
  var reqdata = req.body;
  let nowDate = +new Date();
  console.log("插入参数***********", reqdata); //查询参数
  var sql_text =
    "INSERT INTO  notice" +
    `(text,tenantId,createDate,flag,type,enabled) 
                VALUES  
                ('${reqdata.text}','${reqdata.tenantId}','${nowDate}','${reqdata.flag}',2,1)`;
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

//修改
router.post("/updateNotice", function (req, res, next) {
  let reqdata = req.body;
  console.log("插入参数***********", reqdata); //查询参数
  let sqlCondition = ""; //查询条件
  if (reqdata.text) {
    sqlCondition += `text ='${reqdata.text}'`;
  }

  if (reqdata.flag) {
    //商品ID
    sqlCondition += (sqlCondition ? " , " : "") + `flag = '${reqdata.flag}'`;
  }
  let updateDate = +new Date();
  sqlCondition += (sqlCondition ? " , " : "") + `createDate ='${updateDate}'`;

  let sql_text = "UPDATE notice SET " + sqlCondition + ` WHERE id='${reqdata.id}'`;

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
