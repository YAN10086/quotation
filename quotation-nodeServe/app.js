/*
 * @Descripttion:
 * @Author: baiyf
 * @Date: 2021-11-02 13:06:00
 * @LastEditTime: 2024-04-07 23:58:30
 */

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyParser = require("body-parser");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var adminUsersRouter = require("./routes/adminUsers");
var orderRouter = require("./routes/order");
var goodsRouter = require("./routes/goods");
var rolesRouter = require("./routes/roles");
var financeRouter = require("./routes/finance");
var authsRouter = require("./routes/auths");
var uploadRouter = require("./routes/upload");
var transferReviewRouter = require("./routes/transferReview");
var payRouter = require("./routes/pay");
var vipCenterRouter = require("./routes/vipCenter");
var favRouter = require("./routes/fav");
var sysRouter = require("./routes/sys");
var tenantsRouter = require("./routes/tenants");
var noticeRouter = require("./routes/notice");
var queRouter = require("./routes/que");
var subscribeRouter = require("./routes/subscribe");
var digitalRouter = require("./routes/digital");
var daisenRouter = require("./routes/daisen");
var youxijiRouter = require("./routes/youxiji");
var jinianbiRouter = require("./routes/jinianbi");
var articleRouter = require("./routes/article");
var ziyuanRouter = require("./routes/ziyuan");
var app = express();

//设置跨域访问
app.all("*", function (req, res, next) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin", "*");
  //允许的header类型
  res.header("Access-Control-Allow-Headers", "content-type");
  //跨域允许的请求方式
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() == "options") res.send(200); //让options尝试请求快速结束
  else next();
});

// jade模板解析
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

//html模板解析
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.use(logger("dev"));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// 挂载接口
app.use("/index", indexRouter);
app.use("/users", usersRouter);
app.use("/adminUsers", adminUsersRouter);
app.use("/order", orderRouter);
app.use("/goods", goodsRouter);
app.use("/roles", rolesRouter);
app.use("/finance", financeRouter);
app.use("/auths", authsRouter);
app.use("/upload", uploadRouter);
app.use("/transferReview", transferReviewRouter);
app.use("/pay", payRouter);
app.use("/vipCenter", vipCenterRouter);
app.use("/fav", favRouter);
app.use("/sys", sysRouter);
app.use("/tenants", tenantsRouter);
app.use("/notice", noticeRouter);
app.use("/que", queRouter);
app.use("/subscribe", subscribeRouter);
app.use("/digital", digitalRouter);
app.use("/daisen", daisenRouter);
app.use("/youxiji", youxijiRouter);
app.use("/jinianbi", jinianbiRouter);
app.use("/article", articleRouter);
app.use("/ziyuan", ziyuanRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
