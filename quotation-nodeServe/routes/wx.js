/*
 * @Descripttion:
 * @Author: baiyf
 * @Date: 2021-11-02 13:06:23
 * @LastEditTime: 2023-11-29 15:16:26
 */
var express = require("express");
var router = express.Router();
var request = require("request");
var connection = require("../mysql");
var commonJs = require("../commonJs");
var crypto = require("crypto");

var token = "1huashengke1";
const APPID = "w/******";
const SECRET = "33*******5";

//根据code获取用户个人信息
router.get("/getUserInfo", function (req, res, next) {
  console.log("----------------------------开始根据code获取用户信息", req.query.code);
  let wxHttpUrl = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${APPID}&secret=${SECRET}&code=${req.query.code}&grant_type=authorization_code`;
  request(wxHttpUrl, { json: true }, (err, resToken, body) => {
    if (err) {
      return console.log("*************获取登录用的AccessToken失败", err);
    }
    console.log("********获取AccessToken成功", body);
    objdata = commonJs.backData(200, "查询成功", body);
    res.send(objdata);
    return;
    let pdata = {
      access_token: body.access_token,
      openid: body.openid,
    };
    getWxUserInfo(pdata).then((rdata) => {
      console.log("************rdatardatardata", rdata);
      if (rdata.code == "200") {
        insertUser(rdata.datas).then((rdata2) => {
          console.log("************rdata2rdata2rdata2", rdata2);
          res.send(rdata2);
          // res.render('home', { title: 'Express' });
        });
      } else {
        res.send({
          code: 500,
          msg: "授权失败",
        });
      }
    });
  });
});

router.get("/accessWx", function (req, res, next) {
  var signature = req.query.signature;
  var timestamp = req.query.timestamp;
  var nonce = req.query.nonce;
  var echostr = req.query.echostr;
  /*  加密/校验流程如下： */
  //1. 将token、timestamp、nonce三个参数进行字典序排序
  var array = new Array(token, timestamp, nonce);
  array.sort();
  var str = array.toString().replace(/,/g, "");
  console.log("array", array);
  //2. 将三个参数字符串拼接成一个字符串进行sha1加密
  var sha1Code = crypto.createHash("sha1");
  var code = sha1Code.update(str, "utf-8").digest("hex");
  console.log("sha1Code", sha1Code);
  //3. 开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
  if (code === signature) {
    res.send(echostr);
    console.log("echostr", echostr);
  } else {
    res.send("error");
  }
});

//根据code获取accessToken 用户授权的这个不需要缓存刷新
router.get("/getAccessToken", function (req, res, next) {
  console.log("----------------------------开始根据code获取用户登录用的accesstoken", req.query.code);
  let wxHttpUrl = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${APPID}&secret=${SECRET}&code=${req.query.code}&grant_type=authorization_code`;
  request(wxHttpUrl, { json: true }, (err, resToken, body) => {
    if (err) {
      return console.log("*************获取登录用的AccessToken失败", err);
    }
    console.log("********获取AccessToken成功", body);
    let pdata = {
      access_token: body.access_token,
      openid: body.openid,
    };
    getWxUserInfo(pdata).then((rdata) => {
      console.log("************rdatardatardata", rdata);
      if (rdata.code == "200") {
        insertUser(rdata.datas).then((rdata2) => {
          console.log("************rdata2rdata2rdata2", rdata2);
          res.send(rdata2);
          // res.render('home', { title: 'Express' });
        });
      } else {
        res.send({
          code: 500,
          msg: "授权失败",
        });
      }
    });
  });
});

//获取用户信息
function getWxUserInfo(pdata) {
  let accessToken = pdata.access_token;
  let openid = pdata.openid;
  let getUinfoUrl = `https://api.weixin.qq.com/sns/userinfo?access_token=${accessToken}&openid=${openid}&lang=zh_CN`;
  return new Promise((resolve, reject) => {
    request(getUinfoUrl, { json: true }, (err, resUserInfo, body) => {
      let objdata;
      if (err) {
        objdata = {
          code: 500,
        };
      } else {
        objdata = {
          code: 200,
          datas: body,
        };
      }
      resolve(objdata);
    });
  });
}
//插入用户
function insertUser(pdata) {
  //根据openid去查看此用户是否为新用户
  var sql_text = `SELECT * FROM wx_user  WHERE openid = '${pdata.openid}'`;
  return new Promise((resolve, reject) => {
    connection.query(sql_text, function (error, results, fields) {
      var objdata = {};
      console.log("*******************根据openid去查看此用户是否为新用户", results);
      let create_date = commonJs.getNowDate();
      if (results.length == "0") {
        //新用户，进行插入。
        sql_text = `INSERT INTO wx_user(openid,nickname,sex,province,city,country,headimgurl,privilege,unionid,create_date)  VALUES
                            ('${pdata.openid}','${pdata.nickname}','${pdata.sex}','${pdata.province}','${pdata.city}',
                            '${pdata.country}','${pdata.headimgurl}','${pdata.privilege}','${pdata.unionid | ""}','${create_date}')`;
        connection.query(sql_text, function (error, results, fields) {
          if (error) {
            objdata = {
              msg: "****插入用户失败",
              code: 500,
            };
          } else {
            objdata = {
              msg: "****插入用户成功",
              code: 200,
              datas: {
                uid: results.insertId,
              },
            };
          }
          resolve(objdata);
        });
      } else {
        let _results = JSON.parse(JSON.stringify(results));
        objdata = {
          msg: "****非新用户，无需插入",
          code: 200,
          datas: {
            uid: _results[0].id,
          },
        };
        resolve(objdata);
      }
    });
  });
}
module.exports = router;
