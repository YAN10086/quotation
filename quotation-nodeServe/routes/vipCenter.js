/*
 * @Author: baiyf
 * @Date: 2021-11-02 13:06:23
 * @LastEditTime: 2023-05-26 21:35:38
 * @Description: file content
 */
var express = require("express");
var router = express.Router();
var connection = require("../mysql");
var commonJs = require("../commonJs");
//查询会员
router.post("/selectVips", function (req, res, next) {
  let reqdata = req.body;
  console.log("插入参数***********", reqdata); //查询参数
  let sqlCondition = ""; //查询条件
  if (reqdata.gName) {
    //商品名称
    sqlCondition += `gName LIKE '%${reqdata.gName}%'`;
  }
  if (sqlCondition) {
    sqlCondition += `and enabled = '1'`;
  } else {
    sqlCondition += `enabled = '1'`;
  }
  let page = (reqdata.page - 1) * reqdata.pageSize; //查询起始
  //查询分页数据
  let sql_text = `SELECT * FROM vip   WHERE ${sqlCondition}  ORDER BY price  limit ${page} ,${reqdata.pageSize}`;
  //查询总数
  let sql_text_count = `SELECT COUNT(*) as totalCount from vip WHERE ${sqlCondition}`;
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

//添加会员
router.post("/addVip", function (req, res, next) {
  var reqdata = req.body;
  console.log("插入参数***********", reqdata); //查询参数
  var sql_text =
    "INSERT INTO vip " +
    `(name,price,content,discount,enabled,merchantId) 
                VALUES
                ('${reqdata.name}','${reqdata.price}','${reqdata.content}','${reqdata.discount}',1,'${reqdata.merchantId}')`;
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
//修改会员
router.post("/updateVip", function (req, res, next) {
  let reqdata = req.body;
  console.log("插入参数***********", reqdata); //查询参数
  let sqlCondition = ""; //查询条件
  if (reqdata.name) {
    //商品名称
    sqlCondition += `name ='${reqdata.name}'`;
  }
  if (reqdata.price) {
    //商品说明
    sqlCondition += (sqlCondition ? " , " : "") + `price ='${reqdata.price}'`;
  }
  if (reqdata.content) {
    //原价
    sqlCondition += (sqlCondition ? " , " : "") + `content ='${reqdata.content}'`;
  }
  if (reqdata.discount) {
    //折扣
    sqlCondition += (sqlCondition ? " , " : "") + `discount ='${reqdata.discount}'`;
  }
  if (reqdata.enabled) {
    //enabled
    sqlCondition += (sqlCondition ? " , " : "") + `enabled ='${reqdata.enabled}'`;
  }
  let sql_text = "UPDATE vip SET " + sqlCondition + `WHERE id='${reqdata.id}'`;
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
