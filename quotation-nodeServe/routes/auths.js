/*
 * @Author: baiyf
 * @Date: 2021-11-02 13:06:23
 * @LastEditTime: 2023-10-23 00:42:03
 * @Description: file content
 */
var express = require("express");
var router = express.Router();
var connection = require("../mysql");
var commonJs = require("../commonJs");

//查询商品
router.post("/selectAuths", function (req, res, next) {
  let reqdata = req.body;
  console.log("插入参数***********", reqdata); //查询参数
  let sqlCondition = ""; //查询条件
  if (reqdata.roleName) {
    sqlCondition += `roleName LIKE '%${reqdata.roleName}%'`;
  }

  if (reqdata.merchantId) {
    //商品所属商家ID
    sqlCondition += (sqlCondition ? " and " : "") + `merchantId ='${reqdata.merchantId}'`;
  }

  if (sqlCondition) {
    sqlCondition += `and enabled = '1'`;
  } else {
    sqlCondition += `enabled = '1'`;
  }
  //查询分页数据
  let sql_text = `SELECT * FROM auths WHERE ${sqlCondition}  ORDER BY id`;
  connection.query(sql_text, function (error, results, fields) {
    console.log("sql_text", sql_text, results);
    let objdata;
    let bData = {
      list: results || [],
    };
    if (results) {
      objdata = commonJs.backData(200, "查询成功", bData);
    } else {
      objdata = commonJs.backData(500, "网络异常500", error);
    }
    res.send(objdata);
  });
});

//查询角色对应的权限
router.post("/getRoleAuths", function (req, res, next) {
  let reqdata = req.body;
  console.log("插入参数***********", reqdata); //查询参数

  let sql_text = ` SELECT * FROM roles  WHERE id='${reqdata.roleId}' `;

  connection.query(sql_text, function (error, results, fields) {
    if (results && results.length > 0) {
      let menus = results;
      console.log("resultsresults", results);
      let sql_text2 = `SELECT * FROM auths WHERE id IN ( ${menus} )`;
      connection.query(sql_text2, function (error, results2, fields) {
        console.log("sql_text2", sql_text2, results2.total_price);
        if (results2 && results2.length > 0) {
          results[0].authList = results2;
          objdata = commonJs.backData(200, "查询成功", results);
        } else {
          objdata = commonJs.backData(500, "账号或密码错误", results);
        }
        console.log("最终结果", results);
        res.send(objdata);
      });
    } else {
      objdata = commonJs.backData(500, "账号或密码错误", results);
      res.send(objdata);
    }
  });
});

//添加角色
router.post("/addRoles", function (req, res, next) {
  var reqdata = req.body;
  let nowDate = +new Date();
  console.log("插入参数***********", reqdata); //查询参数
  var sql_text =
    "INSERT INTO  roles" +
    `(roleName,roleExplain,merchantId,updateDate,enabled) 
                VALUES  
                ('${reqdata.roleName}','${reqdata.roleExplain}','${reqdata.gExplain || ""}','${nowDate}',1)`;
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

//修改角色
router.post("/updateRolesInfo", function (req, res, next) {
  let reqdata = req.body;
  console.log("插入参数***********", reqdata); //查询参数
  let sqlCondition = ""; //查询条件
  if (reqdata.roleName) {
    //商品名称
    sqlCondition += `roleName ='${reqdata.roleName}'`;
  }
  if (reqdata.roleExplain) {
    //商品说明
    sqlCondition += (sqlCondition ? " , " : "") + `roleExplain ='${reqdata.roleExplain}'`;
  }
  if (reqdata.price) {
    //原价
    sqlCondition += (sqlCondition ? " , " : "") + `price ='${reqdata.price}'`;
  }

  if (reqdata.enabled) {
    //enabled
    sqlCondition += (sqlCondition ? " , " : "") + `enabled ='${reqdata.enabled}'`;
  }

  let updateDate = +new Date();
  sqlCondition += (sqlCondition ? " , " : "") + `updateDate ='${updateDate}'`;

  let sql_text = "UPDATE roles SET " + sqlCondition + ` WHERE id='${reqdata.id}'`;

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
