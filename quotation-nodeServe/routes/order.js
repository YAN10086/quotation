var express = require("express");
var router = express.Router();
var commonJs = require("../commonJs");
var connection = require("../mysql");

//查询订单
router.post("/selectOrderForBackend", function (req, res, next) {
  let reqdata = req.body;
  console.log("插入参数***********", reqdata); //查询参数
  let sqlCondition = ""; //查询条件
  let sqlCondition2 = ""; //查询条件
  if (reqdata.status) {
    //状态
    sqlCondition += `o.status = '${reqdata.status}'`;
  }
  if (reqdata.id) {
    //订单ID
    sqlCondition += (sqlCondition ? " and " : "") + `o.id ='${reqdata.id}'`;
  }
  if (reqdata.userName) {
    //用户名
    sqlCondition += (sqlCondition ? " and " : "") + `o.userName ='${reqdata.userName}'`;
  }

  if (reqdata.orderType) {
    //订单类型
    sqlCondition += (sqlCondition ? " and " : "") + `o.orderType ='${reqdata.orderType}'`;
  }
  if (reqdata.goodsId) {
    //订单类型
    sqlCondition += (sqlCondition ? " and " : "") + `o.goodsId ='${reqdata.goodsId}'`;
  }

  if (sqlCondition) {
    sqlCondition += ` and o.enabled = '1'`;
  } else {
    sqlCondition += ` o.enabled = '1'`;
  }
  let page = (reqdata.page - 1) * reqdata.pageSize; //查询起始
  //查询分页数据
  let counSqlCondition = sqlCondition;
  counSqlCondition = counSqlCondition.replace(/o./g, "");

  let sql_text_count = `
    SELECT
      COUNT(*) AS totalCount
      FROM
      orders AS o
      LEFT JOIN goods ON o.goodsId = goods.id
      LEFT JOIN users ON o.userName = users.userName  WHERE ${sqlCondition}`;
  console.log("~~~~sql_text_count~~~~~~~~~", sql_text_count);

  let sql_text = `
        SELECT
        o.id,
        o.goodsId,
        o.favorablePrice,
        o.orderType,
        o.shippingAddress,
        o.status,
        o.remarks,
        o.rejectInfo,
        o.updateDate,
        o.createDate,
        o.enabled,
        o.trans,
        g.gName,
        g.price,
        g.address,
        g.tags,
        u.userName,
        u.pid,
        u.platform
      FROM
        orders AS o
      JOIN goods AS g ON g.id = o.goodsId
      LEFT JOIN users AS u ON u.userName = o.userName  WHERE ${sqlCondition} `;
  sql_text += `ORDER BY o.id DESC limit ${page} ,${reqdata.pageSize}`;

  console.log("sql_text", sql_text);
  connection.query(sql_text, function (error, results, fields) {
    console.log("selectOrderForBackend~~~", results.length);
    for (let p = 0; p < results.length; p++) {
      if (results[p].status == "1") {
        results[p].address = "";
      }
    }
    let objdata;
    let bData = {
      list: results || [],
    };
    connection.query(sql_text_count, function (error, resultsCount, fields) {
      console.log("sql_text_count", sql_text_count, resultsCount[0].totalCount);
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

//查询订单
router.post("/selectOrder", function (req, res, next) {
  let reqdata = req.body;
  console.log("插入参数***********", reqdata); //查询参数
  let sqlCondition = ""; //查询条件
  let sqlCondition2 = ""; //查询条件
  if (reqdata.status) {
    //状态
    sqlCondition += `o.status = '${reqdata.status}'`;
  }
  if (reqdata.id) {
    //订单ID
    sqlCondition += (sqlCondition ? " and " : "") + `o.id ='${reqdata.id}'`;
  }
  if (reqdata.userName) {
    //用户名
    sqlCondition += (sqlCondition ? " and " : "") + `o.userName ='${reqdata.userName}'`;
  }
  if (reqdata.orderType) {
    //订单类型
    sqlCondition += (sqlCondition ? " and " : "") + `o.orderType ='${reqdata.orderType}'`;
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
  let sql_text_count = `SELECT COUNT(*) as totalCount from orders ` + `WHERE ${counSqlCondition}`;
  let sql_text =
    `SELECT o.*, g.gName, g.price,g.coverImg,g.address,g.tags FROM orders ` +
    `o 
LEFT JOIN` +
    "`goods`" +
    ` g ON o.goodsId = g.id WHERE ${sqlCondition}
ORDER BY o.id DESC  limit ${page} ,${reqdata.pageSize}`;

  connection.query(sql_text, function (error, results, fields) {
    console.log("sql_text", sql_text, results);
    let objdata;
    for (let p = 0; p < results.length; p++) {
      if (results[p].status == "1") {
        results[p].address = "";
      }
    }
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

//查询指定日期内的订单
router.post("/selectFinance", function (req, res, next) {
  let reqdata = req.body;
  console.log("插入参数***********", reqdata); //查询参数
  var sql_text = `SELECT o.*,  g.gName, g.price AS goodsPrice
  FROM orders AS o  
  JOIN goods AS g ON o.goodsId = g.id  
  WHERE g.authName = '${reqdata.authName}' AND o.enabled = 1 AND  DATE(FROM_UNIXTIME(o.createDate/1000)) BETWEEN '${reqdata.sDate}' AND '${reqdata.eDate}'`;

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

//修改订单信息
router.post("/updateOrderInfo", function (req, res, next) {
  let reqdata = req.body;
  console.log("插入参数***********", reqdata); //查询参数
  let uDate = +new Date();
  let sqlCondition = ""; //查询条件
  if (reqdata.rejectInfo) {
    //商家备注
    sqlCondition += `rejectInfo ='${reqdata.rejectInfo}'`;
  }
  if (reqdata.status) {
    //订单状态
    sqlCondition += (sqlCondition ? " , " : "") + `status ='${reqdata.status}'`;
  }

  if (reqdata.userName) {
    //用户名
    sqlCondition += (sqlCondition ? " , " : "") + `userName ='${reqdata.userName}'`;
  }
  if (reqdata.shippingAddress) {
    //发货地址(云盘地址)
    sqlCondition += (sqlCondition ? " , " : "") + `shippingAddress ='${reqdata.shippingAddress}'`;
  }
  if (reqdata.trans) {
    //转让状态
    sqlCondition += (sqlCondition ? " , " : "") + `trans ='${reqdata.trans}'`;
  }
  if (uDate) {
    //更新时间
    sqlCondition += (sqlCondition ? " , " : "") + `updateDate ='${uDate}'`;
  }
  let sql_text = "UPDATE orders SET " + sqlCondition + `WHERE id='${reqdata.id}'`;

  if (sqlCondition) {
    sql_text += `and enabled = '1'`;
  }

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

//批量发货
router.post("/toPass", function (req, res, next) {
  let reqdata = req.body;
  console.log("插入参数***********", reqdata); //查询参数
  let sql_text = `UPDATE orders SET status = 2 WHERE id IN (${reqdata.ids})`;
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

//查询个人消费记录
router.post("/selectVoucherForId", function (req, res, next) {
  let reqdata = req.body;
  console.log("插入参数***********", reqdata); //查询参数
  let sql_text = `SELECT voucher from orders WHERE id = '${reqdata.id}'`;
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

//查询个人消费记录
router.post("/selectUserPay", function (req, res, next) {
  let reqdata = req.body;
  console.log("插入参数***********", reqdata); //查询参数
  let sql_text = `SELECT SUM(favorablePrice) FROM orders WHERE userName = ${reqdata.userName}`;
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

/**
 * 提交订单
 */
router.post("/addOrder", function (req, res, next) {
  var reqdata = req.body;
  console.log("插入参数***********", reqdata); //查询参数
  var create_date = +new Date();
  var sql_text =
    "INSERT INTO orders " +
    `(goodsId,userName,orderType,favorablePrice,count,status,remarks,voucher,rejectInfo,merchantId,updateDate,createDate,enabled) 
            VALUES
            ('${reqdata.goodsId}','${reqdata.userName}','${reqdata.orderType}','${reqdata.favorablePrice}','${reqdata.count}','${reqdata.status}','${reqdata.remarks || ""}','${
      reqdata.voucher
    }','${reqdata.rejectInfo || ""}','${reqdata.merchantId}','${create_date}','${create_date}','${reqdata.enabled}')`;
  connection.query(sql_text, function (error, results, fields) {
    console.log("sql_text", sql_text, results);
    if (results) {
      objdata = commonJs.backData(200, "订单提交成功。", {});
    } else {
      objdata = commonJs.backData(500, "订单提交失败", error);
    }
    res.send(objdata);
  });
});

router.post("/addOrderForAdmin", function (req, res, next) {
  var reqdata = req.body;
  let bodyLen = Object.keys(reqdata);
  // console.log("--------------", ol);
  console.log("插入参数***********", reqdata[0], reqdata[0].goodsId);
  let success = true; //标记是否插入成功
  let create_date = +new Date();
  connection.beginTransaction((err) => {
    if (err) {
      console.error("2222222222222Failed to begin transaction:", err);
      objdata = commonJs.backData(500, "订单提交失败-2", err);
      res.send(objdata);
      return;
    }
    for (let i = 0; i < bodyLen.length; i++) {
      let sql_text = `INSERT INTO orders (goodsId,userName,orderType,favorablePrice,shippingAddress,count,status,voucher,rejectInfo,remarks,merchantId,updateDate,createDate,enabled) VALUES`;
      sql_text += `('${reqdata[i].goodsId}','${reqdata[i].userName}','${reqdata[i].orderType}','${reqdata[i].favorablePrice}','${reqdata[i].shippingAddress}','${reqdata[i].count}',`;
      sql_text += `'${reqdata[i].status}',${reqdata[i].voucher ? "'" + reqdata[i].voucher + "'" : null},'${reqdata[i].rejectInfo || ""}','${reqdata[i].remarks || ""}','${
        reqdata[i].merchantId
      }','${create_date}','${create_date}',1)`;
      console.log("插入语句", sql_text);
      connection.query(sql_text, (error, results, fields) => {
        if (error) {
          console.error("5555555555555Failed to create orders5:", error);
          success = false; // 插入失败，设置success为false
          connection.rollback(() => {
            // 回滚事务
            console.error("3333333333333Failed to create orders:", error);
            objdata = commonJs.backData(500, "订单提交失败-3", error);
            res.send(objdata);
          });
          return;
        }
        console.log("@@@@@@@@@@@@@@@@@@@22", i, success);
        if (i === bodyLen.length - 1 && success) {
          console.log("开始提交！！！！！！！", i, success);
          connection.commit((err) => {
            // 提交事务
            if (err) {
              console.error("44444444444Failed to commit transaction:", err);
              objdata = commonJs.backData(500, "订单提交失败-4", err);
              res.send(objdata);
              return;
            }
            objdata = commonJs.backData(200, "订单提交成功。", {});
            res.send(objdata);
          });
        }
      });
    }
  });
});

module.exports = router;
