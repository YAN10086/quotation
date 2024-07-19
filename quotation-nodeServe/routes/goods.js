/*
 * @Author: baiyf
 * @Date: 2021-11-02 13:06:23
 * @LastEditTime: 2024-04-05 21:10:26
 * @Description: file content
 */
var express = require("express");
var router = express.Router();
var connection = require("../mysql");
var commonJs = require("../commonJs");

//查询所有商品品牌
router.post("/selectGoodsBrands", function (req, res, next) {
  var reqdata = req.body;
  var sql_text = `SELECT * from brand WHERE category = '${reqdata.category || "1"}' and enabled = 1`;
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

//根据类型查询商品
router.post("/selectGoodsByBid", function (req, res, next) {
  var reqdata = req.body;
  var sql_text = `SELECT * from goods WHERE bid = '${reqdata.bid}' and  tenantId = '${reqdata.tenantId}' and enabled = 1`;
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

//查询商品
router.post("/selectGoods", function (req, res, next) {
  let reqdata = req.body;
  console.log("插入参数***********", reqdata); //查询参数
  let sqlCondition = ""; //查询条件
  if (reqdata.goodsName) {
    //商品名称
    sqlCondition += `goodsName LIKE '%${reqdata.goodsName}%'`;
  }

  if (reqdata.tenantId) {
    //商品所属商家ID
    sqlCondition += (sqlCondition ? " and " : "") + `tenantId ='${reqdata.tenantId}'`;
  }

  if (reqdata.id) {
    //商品ID
    sqlCondition += (sqlCondition ? " and " : "") + `id ='${reqdata.id}'`;
  }

  if (reqdata.bid) {
    //商品类目
    sqlCondition += (sqlCondition ? " and " : "") + `bid ='${reqdata.bid}'`;
  }

  if (sqlCondition) {
    sqlCondition += `and enabled = '1'`;
  } else {
    sqlCondition += `enabled = '1'`;
  }
  let page = (reqdata.page - 1) * reqdata.pageSize; //查询起始
  //查询分页数据
  let sql_text = `SELECT * FROM` + " `goods` " + `WHERE ${sqlCondition}  ORDER BY id   limit ${page} ,${reqdata.pageSize}`;
  //查询总数
  let sql_text_count = `SELECT COUNT(*) as totalCount from goods WHERE ${sqlCondition}`;
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

//查询商品一定时间内的价格
router.post("/selectGoodsByDate", function (req, res, next) {
  let reqdata = req.body;
  console.log("插入参数***********", reqdata); //查询参数
  let sqlCondition = ""; //查询条件
  if (reqdata.goodsName) {
    //商品名称
    sqlCondition += `goodsName LIKE '%${reqdata.goodsName}%'`;
  }

  if (reqdata.tenantId) {
    //商品所属商家ID
    sqlCondition += (sqlCondition ? " and " : "") + `tenantId ='${reqdata.tenantId}'`;
  }
  if (reqdata.goodsId) {
    //商品id
    sqlCondition += (sqlCondition ? " and " : "") + `goodsId ='${reqdata.goodsId}'`;
  }

  if (sqlCondition) {
    sqlCondition += ` and enabled = '1'`;
  } else {
    sqlCondition += `enabled = '1'`;
  }
  let page = (reqdata.page - 1) * reqdata.pageSize; //查询起始
  //查询分页数据
  let sql_text = `SELECT * FROM quotation WHERE ${sqlCondition} ORDER BY updateDate DESC  limit ${page} ,${reqdata.pageSize}`;
  //查询总数
  let sql_text_count = `SELECT COUNT(*) as totalCount FROM quotation WHERE ${sqlCondition}`;
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

//查询商品推荐
router.post("/selectRecommendGoods", function (req, res, next) {
  let reqdata = req.body;
  console.log("插入参数***********", reqdata); //查询参数
  let sqlCondition = ""; //查询条件

  if (reqdata.tenantId) {
    //商品所属商家ID
    sqlCondition += (sqlCondition ? " and " : "") + `tenantId ='${reqdata.tenantId}'`;
  }

  if (sqlCondition) {
    sqlCondition += ` and enabled = '1'`;
  } else {
    sqlCondition += `enabled = '1'`;
  }

  let page = (reqdata.page - 1) * reqdata.pageSize; //查询起始
  //查询分页数据
  let sql_text = `SELECT * FROM goods WHERE ${sqlCondition} ORDER BY visitCount DESC  limit ${page} ,${reqdata.pageSize}`;
  //查询总数
  let sql_text_count = `SELECT COUNT(*) as totalCount FROM goods WHERE ${sqlCondition}`;
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

//修改商品
router.post("/updateGoodsInfo", function (req, res, next) {
  let reqdata = req.body;
  console.log("插入参数***********", reqdata); //查询参数
  let sqlCondition = ""; //查询条件

  if (reqdata.enabled) {
    sqlCondition += (sqlCondition ? " , " : "") + `enabled ='${reqdata.enabled}'`;
  }
  if (reqdata.tenantId) {
    sqlCondition += (sqlCondition ? " , " : "") + `tenantId ='${reqdata.tenantId}'`;
  }
  if (reqdata.visitCount) {
    sqlCondition += (sqlCondition ? " , " : "") + `visitCount = visitCount+1`;
  }
  let sql_text = `UPDATE goods SET ${sqlCondition} WHERE id = ${reqdata.id}`;
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
 * 批量事务修改价格
 */
router.post("/updatePriceBatch", function (req, res, next) {
  var reqdata = req.body;
  let bodyLen = [];
  let success = true; //标记是否插入成功
  let updateDate = +new Date();
  //  [{"date":"2002-02-04","price":660},{"date":"2002-02-05","price":661}]
  console.log("插入参数***********", reqdata);
  let sql_text_p = "";
  if (reqdata.id) {
    //单个
    sql_text_p = `select * FROM goods WHERE id = '${reqdata.id}' and tenantId= '${reqdata.tenantId}'`;
  } else if (reqdata.bid) {
    //多品牌
    // sql_text_p = `select * FROM goods WHERE bid in (${reqdata.bid}) and tenantId= '${reqdata.tenantId}'`;
  } else if (reqdata.all) {
    //所有
    sql_text_p = `select * FROM goods WHERE   tenantId= '${reqdata.tenantId}'`;
  }
  connection.query(sql_text_p, function (error, results_p, fields) {
    console.log("sql_text_p", sql_text_p, results_p.length);
    //开始事务
    bodyLen = results_p;
    connection.beginTransaction((err) => {
      if (err) {
        console.error("2222222222222Failed to begin transaction:", err);
        objdata = commonJs.backData(500, "操作失败");
        res.send(objdata);
        return;
      }
      for (let i = 0; i < bodyLen.length; i++) {
        let priceList = bodyLen[i].recyclingPriceList;
        console.log("iiiiiiiiiiiiiiiiiiiii", i, priceList, bodyLen[i].goodsName);
        priceList = JSON.parse(priceList);
        console.log("**************", priceList, priceList.length);

        let nowDate;
        //获取指定日期
        if (reqdata.flagDate) {
          nowDate = reqdata.flagDate;
        } else {
          //获取今天的日期
          nowDate = commonJs.getFormatDate(null, "yyyy-MM-dd");
        }

        //设置今日的价格
        let price = 0;

        // 昨日定义：当前日期的前一天，如果前一天没有设置,则使用最近日期的
        if (reqdata.flag == "1") {
          //复用昨日的

          //查找距离今天最近的日期的价格
          price = commonJs.getNearNewPrice(priceList);
        } else if (reqdata.flag == "2") {
          //在昨日的基础上加

          price = commonJs.getNearNewPrice(priceList) * 1 + reqdata.num * 1;
        } else if (reqdata.flag == "3") {
          //昨日的基础上减
          if (commonJs.getNearNewPrice(priceList) * 1 - reqdata.num * 1 < 0) {
            price = 0;
          } else {
            price = commonJs.getNearNewPrice(priceList) * 1 - reqdata.num * 1;
          }
        } else if (reqdata.flag == "4") {
          //指定价格
          price = reqdata.price;
          //指定日期
          if (reqdata.selectDate) {
            nowDate = reqdata.selectDate;
          }
        }
        //判断当前设置价格的日期是否已经设置过了,如果设置过了则不再追加，而是进行修改;
        let flag = true;
        for (let h = 0; h < priceList.length; h++) {
          if (priceList[h].date == nowDate) {
            priceList[h].price = price;
            flag = false;
            console.log(nowDate, "日期已存在，不再进行push");
            break;
          }
        }
        if (flag) {
          priceList.push({
            date: nowDate,
            price: price,
          });
        }

        //添加判断，原有价格数组是否超过15条，如果是，则删除第一条
        if (priceList.length >= 15) {
          console.log("超过了15条！");
          //删除第一条
          priceList.shift();
          console.log("进行截断处理", priceList);
        }

        console.log("插入的值为：", priceList);
        //转换为json
        priceList = JSON.stringify(priceList);
        let sql_text = `UPDATE goods SET recyclingPriceList = '${priceList}' , updateDate = '${updateDate}' WHERE id = '${bodyLen[i].id}' and tenantId= '${bodyLen[i].tenantId}'`;

        connection.query(sql_text, (error, results, fields) => {
          // console.log("看看sql", sql_text);
          if (error) {
            console.error("5555555555555Failed to create orders5:", error);
            success = false; // 插入失败，设置success为false
            connection.rollback(() => {
              // 回滚事务
              console.error("3333333333333Failed to create orders:", error);
              objdata = commonJs.backData(500, "操作失败");
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
                objdata = commonJs.backData(500, "操作失败");
                res.send(objdata);
                return;
              }
              objdata = commonJs.backData(200, "查询成功");
              res.send(objdata);
            });
          }
        });
      }
    });
  });
});

//添加商品
router.post("/addGoods", function (req, res, next) {
  var reqdata = req.body;
  let nowDate = +new Date();
  console.log("插入参数***********", reqdata); //查询参数
  var sql_text =
    "INSERT INTO  `goods`" +
    `(gName,coverImg,gExplain,price,num,salesCount,authName,auth,delivery,endDate,address,tags,startDate,updateDate,enabled,merchantId) 
                VALUES
                ('${reqdata.gName}','${reqdata.coverImg}','${reqdata.gExplain}','${reqdata.price}','${reqdata.num}','${reqdata.salesCount || 0}'
                ,'${reqdata.authName}','${reqdata.auth}','${reqdata.delivery}','${reqdata.endDate}','${reqdata.address}','${reqdata.tags}'
                ,'${nowDate}','${nowDate}',1,'${reqdata.merchantId || ""}')`;
  connection.query(sql_text, function (error, results, fields) {
    console.log("sql_text", sql_text, results);
    if (results) {
      objdata = commonJs.backData(200, "请求成功。", {});
    } else {
      objdata = commonJs.backData(500, "请求失败", error);
    }
    res.send(objdata);
  });
});

//修改商品
router.post("/updateGoodsInfo", function (req, res, next) {
  let reqdata = req.body;
  console.log("插入参数***********", reqdata); //查询参数
  let sqlCondition = ""; //查询条件
  if (reqdata.gName) {
    //商品名称
    sqlCondition += `gName ='${reqdata.gName}'`;
  }
  if (reqdata.gExplain) {
    //商品说明
    sqlCondition += (sqlCondition ? " , " : "") + `gExplain ='${reqdata.gExplain}'`;
  }
  if (reqdata.price) {
    //原价
    sqlCondition += (sqlCondition ? " , " : "") + `price ='${reqdata.price}'`;
  }

  if (reqdata.auth) {
    //画师
    sqlCondition += (sqlCondition ? " , " : "") + `auth ='${reqdata.auth}'`;
  }
  if (reqdata.authName) {
    //画师
    sqlCondition += (sqlCondition ? " , " : "") + `authName ='${reqdata.authName}'`;
  }
  if (reqdata.delivery) {
    //是否参与折扣
    sqlCondition += (sqlCondition ? " , " : "") + `delivery ='${reqdata.delivery}'`;
  }
  if (reqdata.endDate) {
    //截止售卖日期
    sqlCondition += (sqlCondition ? " , " : "") + `endDate ='${reqdata.endDate}'`;
  }
  if (reqdata.address) {
    //发货链接
    sqlCondition += (sqlCondition ? " , " : "") + `address ='${reqdata.address}'`;
  }
  if (reqdata.coverImg) {
    //封面
    sqlCondition += (sqlCondition ? " , " : "") + `coverImg ='${reqdata.coverImg}'`;
  }
  if (reqdata.tags) {
    //标签
    sqlCondition += (sqlCondition ? " , " : "") + `tags ='${reqdata.tags}'`;
  }

  if (reqdata.num) {
    //库存
    sqlCondition += (sqlCondition ? " , " : "") + `num ='${reqdata.num}'`;
  }

  if (reqdata.enabled) {
    //enabled
    sqlCondition += (sqlCondition ? " , " : "") + `enabled ='${reqdata.enabled}'`;
  }

  let updateDate = +new Date();
  sqlCondition += (sqlCondition ? " , " : "") + `updateDate ='${updateDate}'`;

  let sql_text = "UPDATE" + " `goods` SET " + sqlCondition + `WHERE id='${reqdata.id}'`;

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

module.exports = router;
