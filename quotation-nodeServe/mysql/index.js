/*
 * @Descripttion:
 * @Author: baiyf
 * @Date: 2021-11-02 13:06:00
 * @LastEditTime: 2024-06-26 23:26:25
 */
var mysql = require("mysql");
var connection = mysql.createConnection({
  // host: "81.68.72.111",
  host: "49.235.174.186",
  user: "root",
  password: "13031303",
  database: "baojia",
});
connection.connect();

module.exports = connection;
