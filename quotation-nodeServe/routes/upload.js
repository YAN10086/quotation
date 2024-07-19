/*
 * @Descripttion:
 * @Author: baiyf
 * @Date: 2023-03-22 10:58:00
 * @LastEditTime: 2023-12-07 11:27:24
 */
var express = require("express");
var router = express.Router();
var connection = require("../mysql");
var fs = require("fs");
var commonJs = require("../commonJs");
var qiniu = require("qiniu");

router.post("/getTk", function (req, res, next) {
  var accessKey = "U_mQ9CVE8wKoeO5M6QUqwFDMSXpNuDrv3TiKQ1kf";
  var secretKey = "FAHkDzsmSfLo06t16i3olb4GOc8VC9mPvZclmu_k";
  var bucket = "qn-cloud001";

  let mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
  let options = {
    scope: bucket,
    expires: 3600 * 24,
  };
  let putPolicy = new qiniu.rs.PutPolicy(options);
  let uploadToken = putPolicy.uploadToken(mac);
  if (uploadToken) {
    objdata = commonJs.backData(200, "查询成功", uploadToken);
  } else {
    objdata = commonJs.backData(500, "网络异常500", error);
  }
  res.send(objdata);
});

router.post("/testUpload", function (req, res, next) {
  let reqdata = req.body;
  console.log("参数解析", reqdata, req.file);
  res.send(reqdata);
  return;
  //需要填写你的 Access Key 和 Secret Key
  qiniu.conf.ACCESS_KEY = "U**************";
  qiniu.conf.SECRET_KEY = "FAH**********************************";

  //上传到七牛后保存的文件名
  key = +new Date();
  //构建上传策略函数
  function uptoken(bucket, key) {
    var putPolicy = new qiniu.rs.PutPolicy(bucket + ":" + key);
    return putPolicy.token();
  }
  //生成上传 Token
  let token = uptoken(bucket, key);
  //要上传文件的本地路径
  filePath = reqdata.filePath;
  //构造上传函数
  function uploadFile(uptoken, key, localFile) {
    var extra = new qiniu.io.PutExtra();
    qiniu.io.putFile(uptoken, key, localFile, extra, function (err, ret) {
      if (!err) {
        // 上传成功， 处理返回值
        console.log(ret.hash, ret.key, ret.persistentId);
        res.send(ret);
      } else {
        // 上传失败， 处理返回代码
        console.log(err);
        res.send(err);
      }
    });
  }
  //调用uploadFile上传
  uploadFile(token, key, filePath);
});

//查询
router.get("/listGoods", function (req, res, next) {
  var sql_text = "SELECT * from `goods`";
  connection.query(sql_text, function (error, results, fields) {
    res.send(results);
  });
});

//分页查询
router.get("/listOrders", function (req, res, next) {
  var sql_text = "SELECT id,userName,remarks FROM `order`";
  connection.query(sql_text, function (error, results, fields) {
    res.send(results);
  });
});

const basePath = "./public/static/videos/"; //规定保存文件的路径
router.post("/submitFile", (req, res) => {
  console.log("接受参数", req.body.fileName);
  var longtime = +new Date();
  //把接收到的内容写入文件，Buffer.from()接收一个数组作为参数
  fs.writeFile(basePath + (longtime + req.body.fileName), Buffer.from(req.body.arrayBuffer), (res) => {
    console.log("res", res);
    res.send({
      code: "500",
    });
  });
});

module.exports = router;
