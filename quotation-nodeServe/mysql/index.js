/*
 * @Descripttion:
 * @Author: baiyf
 * @Date: 2021-11-02 13:06:00
 * @LastEditTime: 2024-06-26 23:26:25
 */
var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "",
  user: "",
  password: "",
  database: "",
});
connection.connect();

module.exports = connection;
