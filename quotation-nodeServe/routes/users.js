/*
 * @Descripttion:
 * @Author: baiyf
 * @Date: 2021-11-02 13:06:23
 * @LastEditTime: 2024-04-06 22:28:38
 * 33914208a43d2344d42a122ba49db695
 */
var express = require("express");
var router = express.Router();
var request = require("request");
var connection = require("../mysql");
var commonJs = require("../commonJs");
var objdata = {};

const APPID = "wx576034558e505a0b";
const SECRET = "33914208a43d2344d42a122ba49db695";

//根据code获取授权信息
router.post("/getUserAuth", function (req, res, next) {
  let reqdata = req.body;
  let createDate = +new Date();
  console.log("----------------------------开始根据code获取用户信息", reqdata.code);
  let wxHttpUrl = `https://api.weixin.qq.com/sns/jscode2session?appid=${APPID}&secret=${SECRET}&js_code=${reqdata.code}&grant_type=authorization_code`;
  request(wxHttpUrl, { json: true }, (err, resToken, body) => {
    if (err) {
      return console.log("*************获取登录用的AccessToken失败", err);
    }
    let openId = body.openid;

    //查询用户是否已存在
    // let sql_text1 = `SELECT * FROM tenant_users where openId = '${openId}'`;
    let sql_text1 = `SELECT
    tenant_users.*, tenants.tenantName,tenants.tenantCode,tenants.person,tenants.tel,tenants.address
  FROM
    tenant_users    
  LEFT JOIN tenants ON tenant_users.tenantId = tenants.id WHERE tenant_users.openId = '${openId}' `;

    connection.query(sql_text1, function (error, results, fields) {
      console.log("查询用户是否存在", sql_text1, results);
      if (results && results.length > 0) {
        //存在
        console.log("用户存在", results);
        objdata = commonJs.backData(200, "查询成功", results);
        res.send(objdata);
      } else {
        //插入用户

        let sql_text2 = `INSERT INTO tenant_users(openid,tenantId,createDate)  VALUES
                            ('${openId}','${reqdata.tenantId}','${createDate}')`;
        connection.query(sql_text2, function (error2, results2, fields2) {
          console.log("用户不存在，插入用户", sql_text2, results2);
          //添加渠道信息 一并返回
          body.tenantName = reqdata.tenantName;
          body.tenantCode = reqdata.tenantCode;
          body.person = reqdata.person;
          body.tel = reqdata.tel;
          body.address = reqdata.address;
          body.tenantId = reqdata.tenantId;
          objdata = commonJs.backData(200, "插入成功", [body]);
          res.send(objdata);
        });
      }
    });
  });
});

//根据openid查询用户信息
router.post("/getUserInfo", function (req, res, next) {
  let reqdata = req.body;
  console.log("插入参数***********", reqdata); //查询参数
  // let sql_text = "SELECT * FROM tenant_users" + `WHERE openId='${reqdata.openId}' and enabled = '1'`;
  let sql_text = `SELECT
  tenant_users.*, tenants.tenantName,tenants.tenantCode,tenants.person,tenants.tel,tenants.address
FROM   
  tenant_users
LEFT JOIN tenants ON tenant_users.tenantId = tenants.id WHERE tenant_users.openId = '${reqdata.openId}' `;
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
  if (reqdata.nickName) {
    //密码
    sqlCondition += `nickName ='${reqdata.nickName}'`;
  }
  if (reqdata.avatar) {
    sqlCondition += (sqlCondition ? " , " : "") + `avatar ='${reqdata.avatar}'`;
  }
  if (reqdata.sex) {
    sqlCondition += (sqlCondition ? " , " : "") + `sex ='${reqdata.sex}'`;
  }
  if (reqdata.realName) {
    sqlCondition += (sqlCondition ? " , " : "") + `realName ='${reqdata.realName}'`;
  }
  if (reqdata.tenantId) {
    sqlCondition += (sqlCondition ? " , " : "") + `tenantId ='${reqdata.tenantId}'`;
  }
  let sql_text = `UPDATE tenant_users SET ${sqlCondition} WHERE openId ='${reqdata.openId}'`;
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

//根据userNmae/pwd登录
router.post("/adminUserLogin", function (req, res, next) {
  //根据类型查询商品
  var reqdata = req.body;
  // var sql_text = `SELECT * from tenant_admin WHERE userName = '${reqdata.userName}' and  userPwd = '${reqdata.userPwd}' and  code = '${reqdata.code}' and enabled = 1`;
  var sql_text = `
  SELECT tenant_admin.*, tenants.* FROM tenant_admin JOIN tenants ON tenant_admin.tenantId = tenants.id
   WHERE tenant_admin.userName = '${reqdata.userName}' and  tenant_admin.userPwd = '${reqdata.userPwd}' and  tenant_admin.code = '${reqdata.code}'`;
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

router.post("/pushToUser", function (req, res, next) {
  var reqdata = req.body;
  //获取token
  // config.app.appid 对应小程序的appid
  // config.app.secret 对应小程序的秘钥
  const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${SECRET}`;
  request(url, { json: true }, (err, resToken, body) => {
    console.log("body", body);
    if (err) {
      console.log("*************获取登录用的AccessToken失败", err);
      objdata = commonJs.backData(500, "操作失败");
      res.send(objdata);
    } else {
      let access_token = body.access_token;
      let nowDate = commonJs.getFormatDate(null, "yyyy-MM-dd-HH-mm");
      let nowDate2 = commonJs.getFormatDate(new Date() - 60 * 60 * 24 * 1000);
      var sql_text2 = `SELECT * from tenant_users WHERE tenantId = '${reqdata.tenantId}' and  enabled = '1'`;
      connection.query(sql_text2, function (error, results2, fields) {
        console.log("sql_text", sql_text2, results2);
        if (results2 && results2.length > 0) {
          for (let p = 0; p < results2.length; p++) {
            let messages = {
              touser: results2[p].openId, //给某用户推送的openid，这个得你获取到用户的openid，才可以进行推送
              template_id: "b2UCojpbQaLYsLKan4yTIYdKvMHWtQa9VtZBVzBQrzk", //订阅模板id
              page: "pages/index/index",
              data: {
                date2: {
                  value: nowDate, // 时间
                },
                thing4: {
                  value: `报价更新提醒`, //  温馨提示
                },
                thing5: {
                  value: `行情报价已更新，请查阅。`, //  报价项目
                },
                thing8: {
                  value: "留白撸货报价" || reqdata.tenantName, // 商家名称
                },
              },
            };
            let urls = `https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=${access_token}`;
            let options = {
              method: "post",
              url: urls,
              json: messages,
            };

            request(options, function (err, res2, body) {
              console.log("11111111111111111111", err, body);
              if (err) {
                console.log("0000000000000000000", err);
                if (p == results2.length - 1) {
                  objdata = commonJs.backData(500, "操作失败", body);
                  res.send(objdata);
                }
              } else {
                if (body.errcode !== 0) {
                  if (p == results2.length - 1) {
                    objdata = commonJs.backData(500, "操作失败");
                    res.send(objdata);
                  }
                } else {
                  console.log("推送成功", results2[p].openId);
                  if (p == results2.length - 1) {
                    objdata = commonJs.backData(200, "操作成功", body);
                    res.send(objdata);
                  }
                }
              }
            });
          }
        } else {
          objdata = commonJs.backData(500, "请求失败", error);
          res.send(objdata);
        }
      });
    }
  });
});

router.post("/pushToUserHLW", function (req, res, next) {
  var reqdata = req.body;
  //获取token
  // config.app.appid 对应小程序的appid
  // config.app.secret 对应小程序的秘钥
  const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${SECRET}`;
  request(url, { json: true }, (err, resToken, body) => {
    console.log("body", body);
    if (err) {
      console.log("*************获取登录用的AccessToken失败", err);
      objdata = commonJs.backData(500, "操作失败");
      res.send(objdata);
    } else {
      let access_token = body.access_token;
      let nowDate = commonJs.getFormatDate(null, "yyyy-MM-dd-HH-mm");
      let nowDate2 = commonJs.getFormatDate(new Date() - 60 * 60 * 24 * 1000);
      var sql_text2 = `SELECT * from tenant_users WHERE tenantId = '${reqdata.tenantId}' and  enabled = '1'`;
      connection.query(sql_text2, function (error, results2, fields) {
        console.log("sql_text", sql_text2, results2);
        if (results2 && results2.length > 0) {
          for (let p = 0; p < results2.length; p++) {
            let messages = {
              touser: results2[p].openId, //给某用户推送的openid，这个得你获取到用户的openid，才可以进行推送
              template_id: "aAry_ymPqBTqQOKmVYx-CYqLhMIzC4iOLlDadkvpmiU", //订阅模板id
              page: "pageA/hlw/hlw",
              data: {
                time2: {
                  value: nowDate, // 时间
                },
                thing1: {
                  value: `葫芦娃开放预约啦`, //  温馨提示
                },
                thing3: {
                  value: `点击前往预约，祝君好运`, //  报价项目
                },
              },
            };
            let urls = `https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=${access_token}`;
            let options = {
              method: "post",
              url: urls,
              json: messages,
            };

            request(options, function (err, res2, body) {
              console.log("11111111111111111111", err, body);
              if (err) {
                console.log("0000000000000000000", err);
                if (p == results2.length - 1) {
                  objdata = commonJs.backData(500, "操作失败", body);
                  res.send(objdata);
                }
              } else {
                if (body.errcode !== 0) {
                  if (p == results2.length - 1) {
                    objdata = commonJs.backData(500, "操作失败");
                    res.send(objdata);
                  }
                } else {
                  console.log("推送成功", results2[p].openId);
                  if (p == results2.length - 1) {
                    objdata = commonJs.backData(200, "操作成功", body);
                    res.send(objdata);
                  }
                }
              }
            });
          }
        } else {
          objdata = commonJs.backData(500, "请求失败", error);
          res.send(objdata);
        }
      });
    }
  });
});

//根据userNmae/pwd登录
router.post("/selectHLW", function (req, res, next) {
  //根据类型查询商品
  var reqdata = req.body;
  var sql_text = `SELECT * from hlw`;
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

module.exports = router;
