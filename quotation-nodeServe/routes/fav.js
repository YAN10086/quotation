﻿/*
 * @Descripttion:收藏相关接口
 * @Author: baiyf
 * @Date: 2021-11-02 13:06:23
 * @LastEditTime: 2023-12-07 15:26:40
 */
var express = require("express");
var router = express.Router();
var connection = require("../mysql");
var commonJs = require("../commonJs");
var objdata = {};

//添加收藏
router.post("/addFav", function (req, res, next) {
  let reqdata = req.body;
  console.log("插入参数***********", reqdata); //查询参数
  let createDate = +new Date();
  let sql_text = "INSERT INTO  fav " + `(openId,goodsId,createDate,tenantId) VALUES ('${reqdata.openId}','${reqdata.goodsId}','${createDate}','${reqdata.tenantId}')`;
  connection.query(sql_text, function (error, results, fields) {
    console.log("sql_text", sql_text, results);
    if (results) {
      objdata = commonJs.backData(200, "操作成功", results);
    } else {
      objdata = commonJs.backData(500, "网络异常500", results);
    }
    res.send(objdata);
  });
});
//查询是否收藏
router.post("/checkFav", function (req, res, next) {
  let reqdata = req.body;
  console.log("插入参数***********", reqdata); //查询参数
  let sql_text = "SELECT * FROM fav " + ` WHERE openId='${reqdata.openId}' and goodsId='${reqdata.goodsId}' and tenantId='${reqdata.tenantId}' `;
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
//删除收藏
router.post("/delFav", function (req, res, next) {
  let reqdata = req.body;
  console.log("插入参数***********", reqdata); //查询参数
  let sql_text = "delete FROM fav" + ` WHERE openId='${reqdata.openId}' and goodsId='${reqdata.goodsId}' and tenantId ='${reqdata.tenantId}' `;
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

//联查收藏的商品
router.post("/selectFavGoods", function (req, res, next) {
  let reqdata = req.body;
  console.log("插入参数***********", reqdata); //查询参数
  let sql_text =
    "SELECT fav.*, goods.* FROM fav JOIN goods ON fav.goodsId = goods.id " + ` WHERE fav.openId ='${reqdata.openId}'  and fav.tenantId ='${reqdata.tenantId}' ORDER BY fav.id DESC`;
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
//根据userNmae查询用户。
router.post("/getUserInfo", function (req, res, next) {
  let reqdata = req.body;
  console.log("插入参数***********", reqdata); //查询参数

  let sql_text = "SELECT * FROM" + " `users`" + ` WHERE userName='${reqdata.userName}' and userType='${reqdata.userType}' and enabled = '1'`;

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

//查询用户列表
router.post("/listUser", function (req, res, next) {
  let reqdata = req.body;
  console.log("插入参数***********", reqdata); //查询参数
  let sqlCondition = ""; //查询条件
  if (reqdata.userName) {
    //用户名
    sqlCondition += `u.userName LIKE '%${reqdata.userName}%'`;
  }
  if (reqdata.userType) {
    sqlCondition += (sqlCondition ? " and " : "") + `u.userType ='${reqdata.userType}'`;
  }
  if (reqdata.enabled) {
    sqlCondition += (sqlCondition ? " and " : "") + `u.enabled ='${reqdata.enabled}'`;
  }

  if (!sqlCondition) {
    sqlCondition = `1 = 1`;
  }

  let page = (reqdata.page - 1) * reqdata.pageSize; //查询起始
  //查询分页数据
  let sql_text = `SELECT u.*, o.roleName
  FROM users u  
  LEFT JOIN roles o ON u.roleId = o.id  
  where ${sqlCondition}
  GROUP BY u.userName  DESC  limit ${page} ,${reqdata.pageSize}`;
  //查询总数
  let sql_text_count = `SELECT COUNT(*) as totalCount from users u  WHERE ${sqlCondition}`;

  connection.query(sql_text, function (error, results, fields) {
    console.log("sql_text", sql_text, results);
    let bData = {
      list: results || [],
    };
    connection.query(sql_text_count, function (error, resultsCount, fields) {
      console.log("sql_text_count", sql_text_count, resultsCount[0]);
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

/**
 * 注册用户
 */
router.post("/registerUser", function (req, res, next) {
  var reqdata = req.body;
  let sql_text2 = "SELECT * FROM" + " `users`" + ` WHERE userName='${reqdata.userName}' and enabled = '1'`;
  connection.query(sql_text2, function (error, rsult2, fields) {
    console.log("sql_text", sql_text2, res.length);
    if (rsult2.length == "0") {
      console.log("插入参数***********", reqdata); //查询参数
      let createDate = +new Date();
      let roleId;
      if (reqdata.userType == "1") {
        //普通用户
        roleId = 1;
      } else if (reqdata.userType == "3") {
        //画师
        roleId = 3;
      }
      var sql_text =
        "INSERT INTO users" +
        `(userName,userPwd,userType,roleId,createDate,enabled,merchantId) 
                        VALUES
    ('${reqdata.userName}','${reqdata.userPwd}','${reqdata.userType}',${roleId},'${createDate}','1','${reqdata.merchantId || ""}')`;
      connection.query(sql_text, function (error, results, fields) {
        console.log("sql_text2", sql_text, results);
        if (results) {
          objdata = commonJs.backData(200, "请求成功。", {});
        } else {
          objdata = commonJs.backData(500, "请求失败", error);
        }
        res.send(objdata);
      });
    } else {
      objdata = commonJs.backData(500, "该用户名已被注册", {});
      res.send(objdata);
    }
  });
});

//查询所有用户信息
router.get("/queryWx", function (req, res, next) {
  console.log("查询参数***********", req.body); //查询参数
  let reqdata = req.body;
  let sql_text = `SELECT * from goods`;
  console.log("sql_text", sql_text);
  connection.query(sql_text, function (error, results, fields) {
    let rdata = JSON.parse(JSON.stringify(results));
    objdata = commonJs.backData(200, "请求成功", rdata);
    res.send(objdata);
  });
});

module.exports = router;
