/*
 * @Descripttion:
 * @Author: baiyf
 * @Date: 2021-11-02 13:06:23
 * @LastEditTime: 2023-10-30 01:24:54
 */
var express = require("express");
var router = express.Router();
var connection = require("../mysql");
var commonJs = require("../commonJs");
var objdata = {};

//根据userNmae/pwd登录
router.post("/userLogin", function (req, res, next) {
  let reqdata = req.body;
  console.log("插入参数***********", reqdata); //查询参数

  let sql_text = "SELECT * FROM users" + ` WHERE userName='${reqdata.userName}' and userPwd='${reqdata.userPwd}' and userType='${reqdata.userType}' `;

  // let sql_text3 = `SELECT * FROM auths WHERE id IN ( ${menus} )`;

  connection.query(sql_text, function (error, results, fields) {
    console.log("~~sql_text", sql_text, results.length);
    if (results && results.length > 0) {
      if (results[0].enabled != "1") {
        objdata = commonJs.backData(500, "该账户已被限制登录", {});
        res.send(objdata);
      } else {
        console.log("sql_text****************************", results);
        let sql_text2 = `SELECT * FROM roles  WHERE id=${results[0].roleId}`;

        connection.query(sql_text2, function (error, results2, fields) {
          let menus = results2[0].menus;
          menus = menus.split("@");
          menus = menus.join(",");
          let bts = results2[0].buttons;
          let sql_text3 = `SELECT * FROM auths WHERE id IN (${menus})`;

          connection.query(sql_text3, function (error, results3, fields) {
            console.log("sql_text3****************************", sql_text3, results3);
            if (results3 && results3.length > 0) {
              results[0].authList = results3;
              results[0].btList = bts;
              objdata = commonJs.backData(200, "查询成功", results);
            } else {
              objdata = commonJs.backData(500, "账号或密码错误", results);
            }
            console.log("最终结果", results);
            res.send(objdata);
          });
        });
      }
    } else {
      objdata = commonJs.backData(500, "账号或密码错误", results);
      res.send(objdata);
    }
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

//修改用户相关信息。
router.post("/updateUserInfo", function (req, res, next) {
  let reqdata = req.body;
  console.log("插入参数***********", reqdata); //查询参数
  let sqlCondition = ""; //查询条件
  if (reqdata.userPwd) {
    //密码
    sqlCondition += `userPwd ='${reqdata.userPwd}'`;
  }

  if (reqdata.verifyAnswers) {
    sqlCondition += (sqlCondition ? " , " : "") + `verifyAnswers ='${reqdata.verifyAnswers}'`;
  }
  if (reqdata.enabled) {
    sqlCondition += (sqlCondition ? " , " : "") + `enabled ='${reqdata.enabled}'`;
  }
  if (reqdata.platform) {
    sqlCondition += (sqlCondition ? " , " : "") + `platform ='${reqdata.platform}'`;
  }
  if (reqdata.pid) {
    sqlCondition += (sqlCondition ? " , " : "") + `pid ='${reqdata.pid}'`;
  }
  let sql_text = "UPDATE" + " `users` SET " + sqlCondition + `WHERE userName='${reqdata.userName}'`;
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
