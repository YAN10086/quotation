var express = require("express");
var router = express.Router();
var connection = require("../mysql");
var commonJs = require("../commonJs");
var request = require("request");
const nodemailer = require("nodemailer");

const crypto = require("crypto");
const app_id = "2110116752";
const key = "f3051b3366f3cd6b4a5f6f81c6b75467";

const transporter = nodemailer.createTransport({
  //node_modules/nodemailer/lib/well-known/services.json  查看相关的配置，如果使用qq邮箱，就查看qq邮箱的相关配置
  service: "qq", //类型qq邮箱
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: "",
    pass: "",
  },
});

// 邮箱验证码发送接口
router.post("/sendEmailVerificationCode", (req, res) => {
  const { email } = req.body; // 获取请求体中的邮箱地址
  console.log("获得参数", email);
  // 生成随机的 6 位验证码
  const generateCode = () => {
    return Math.random().toString(16).slice(-6).toUpperCase();
  };
  const verificationCode = generateCode();

  // 邮件发送的配置项
  const mailOptions = {
    from: "<3108654473@qq.com>", // 发送方邮箱和名称
    to: email, // 接收方的邮箱地址
    subject: "请查看您的验证码", // 邮件主题
    text: `您的验证码是：${verificationCode}，请不要泄露给他人。`, // 邮件内容
    html: `<p>您的验证码是：<strong>${verificationCode}</strong>，请不要泄露给他人。</p>`, // 邮件 HTML 内容
  };

  // 发送邮件
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(`邮件发送失败：${error.message}`);
      res.status(500).send("邮件发送失败，请稍后重试！");
    } else {
      console.log(`邮件发送成功：${info.response}`);
      objdata = commonJs.backData(200, "发送成功", { vcode: verificationCode });
      // res.send("邮件发送成功，请查收验证码！" + `${verificationCode}`);
      res.send(objdata);
    }
  });
});

router.get("/startPay", function (req, res, next) {
  console.log("进入~~~~~~~~~~~~~~~~··");
  let out_trade_no = +new Date();
  out_trade_no += "_960519152";
  const toQueryString = (obj) =>
    Object.keys(obj)
      .filter((key) => key !== "sign" && obj[key] !== undefined && obj[key] !== "")
      .sort()
      .map((key) => {
        if (/^http(s)?:\/\//.test(obj[key])) {
          return key + "=" + encodeURI(obj[key]);
        } else {
          return key + "=" + obj[key];
        }
      })
      .join("&");

  // md5
  const md5 = (str, encoding = "utf8") => crypto.createHash("md5").update(str, encoding).digest("hex");
  //金额
  let amount = parseInt("100");
  // 构造请求数据
  let params = {
    app_id: app_id,
    out_trade_no: out_trade_no,
    description: "0001商品",
    pay_type: "wechat",
    amount: amount,
    attach: "success_pay",
    // notify_url: "http://pay.acewb.com/pay/sendSuccess",
    notify_url: "http://pay.acewb.com/pay/startPay",
  };

  params = toQueryString(params);
  params += "&key=" + key;

  // 计算出最终签名
  const sign = md5(params).toUpperCase();
  let strjson = {
    app_id: app_id,
    out_trade_no: out_trade_no,
    description: "0001商品",
    pay_type: "wechat",
    amount: amount,
    attach: "success_pay",
    notify_url: "http://pay.acewb.com/pay/sendSuccess",
    sign: sign,
  };
  console.log("strjson", strjson);
  // res.send(sign);

  request.post(
    "https://open.h5zhifu.com/api/jsapi",
    {
      json: strjson,
    },
    (error, results, body) => {
      if (error) {
        console.log("error", error);
        console.log("results", results);
        console.log("body", body);
        res.send(error);
        return;
      } else {
        console.log(body);
        res.send(results);
      }
      //res.redirect('http://baidu.com');
    }
  );
});

//回调接口
router.post("/sendSuccess", function (req, res, next) {
  let rdata = req.body;
  let ntime = +new Date();
  var sql_text = `INSERT INTO users (userName,userPwd,enabled,createDate) VALUES('${ntime}','${rdata.out_trade_no}','1','${ntime}')`;

  console.log("sql_text", sql_text);
  connection.query(sql_text, function (error, results, fields) {
    console.log("results", results);
    res.send("success");
  });
});

module.exports = router;
