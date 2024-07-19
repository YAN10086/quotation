/*
 * @Descripttion:
 * @Author: baiyf
 * @Date: 2021-11-02 13:06:23
 * @LastEditTime: 2023-12-08 09:39:56
 */
var express = require("express");
var router = express.Router();
var connection = require("../mysql");

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

/**
 * 微信支付页面
 */
router.get("/wxjspay", function (req, res, next) {
  res.render("wxjspay", { title: "Express" });
});

module.exports = router;
