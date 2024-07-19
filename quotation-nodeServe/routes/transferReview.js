var express = require("express");
var router = express.Router();
var commonJs = require("../commonJs");
var connection = require("../mysql");

//查询
router.post("/selectTransferReview", function (req, res, next) {
  let reqdata = req.body;
  console.log("插入参数***********", reqdata); //查询参数
  let sqlCondition = ""; //查询条件
  let sqlCondition2 = ""; //查询条件
  if (reqdata.status) {
    //状态
    sqlCondition += `o.status = '${reqdata.status}'`;
  }

  if (reqdata.userName) {
    //用户名
    sqlCondition += (sqlCondition ? " and " : "") + `o.userName ='${reqdata.userName}'`;
  }

  if (reqdata.goodsId) {
    //商品ID
    sqlCondition2 += `o.goodsId ='${reqdata.goodsId}'`;
  }

  if (sqlCondition) {
    sqlCondition += `and o.enabled = '1'`;
  } else {
    sqlCondition += `o.enabled = '1'`;
  }
  let page = (reqdata.page - 1) * reqdata.pageSize; //查询起始
  //查询分页数据
  let counSqlCondition = sqlCondition;
  counSqlCondition = counSqlCondition.replace(/o./g, "");
  //查询总数
  let sql_text_count = `SELECT COUNT(*) as totalCount from transferReview ` + `WHERE ${counSqlCondition}`;

  //   `SELECT o.*, g.gName, g.price, g.coverImg, o2.id ,o2.trans
  // FROM transferReview o
  // LEFT JOIN goods g ON o.goodsId = g.id
  // INNER JOIN orders o2 ON o.ordersId = o2.id;`

  let sql_text = `SELECT o.*, g.gName, g.price, g.coverImg, o2.id ,o2.trans  
    FROM transferReview o  
    LEFT JOIN goods g ON o.goodsId = g.id   
    INNER JOIN orders o2 ON o.ordersId = o2.id  WHERE ${sqlCondition}
ORDER BY o.id DESC  limit ${page} ,${reqdata.pageSize}`;

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

//修改订单信息
router.post("/updateOrderInfo", function (req, res, next) {
  let reqdata = req.body;
  console.log("插入参数***********", reqdata); //查询参数
  let sqlCondition = ""; //查询条件
  if (reqdata.rejectInfo) {
    //商家备注
    sqlCondition += `rejectInfo ='${reqdata.rejectInfo}'`;
  }
  if (reqdata.status) {
    //订单状态
    sqlCondition += (sqlCondition ? " , " : "") + `status ='${reqdata.status}'`;
  }
  if (reqdata.shippingAddress) {
    //发货地址(云盘地址)
    sqlCondition += (sqlCondition ? " , " : "") + `shippingAddress ='${reqdata.shippingAddress}'`;
  }

  let sql_text = "UPDATE orders SET " + sqlCondition + `WHERE id='${reqdata.id}'`;

  if (sqlCondition) {
    sql_text += `and enabled = '1'`;
  }

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

/**
 * 提交订单
 */
router.post("/addTransferReview", function (req, res, next) {
  var reqdata = req.body;
  console.log("插入参数***********", reqdata); //查询参数
  var create_date = +new Date();
  var sql_text =
    "INSERT INTO transferReview " +
    `(goodsId,userName,touserName,ordersId,status,updateDate,createDate,enabled) 
            VALUES
            ('${reqdata.goodsId}','${reqdata.userName}','${reqdata.touserName}','${reqdata.ordersId}','${reqdata.status}', '${create_date}','${create_date}',1)`;
  connection.query(sql_text, function (error, results, fields) {
    console.log("sql_text", sql_text, results);
    if (results) {
      objdata = commonJs.backData(200, "转赠成功", {});
    } else {
      objdata = commonJs.backData(500, "转赠失败", error);
    }
    res.send(objdata);
  });
});

router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

module.exports = router;
