var commonJs = {
  backData: (code, msg, data) => {
    return {
      code: code || 1,
      msg: msg || "请求成功",
      data: data,
    };
  },
  getNowDate: () => {
    var timestamp = new Date().getTime();
    return timestamp;
  },
  getFormatDate: (paramDate, flagType) => {
    var date;
    if (paramDate) {
      date = new Date(paramDate);
    } else {
      date = new Date();
    }
    var seperator1 = "-";
    var seperator2 = ":";
    var seperator3 = "/";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }

    var y = date.getHours();
    var m = date.getMinutes();
    var d = date.getSeconds();
    function add0(v) {
      return v < 10 ? "0" + v : v;
    }
    if (flagType == "yyyy-MM-dd-HH-mm-ss") {
      return year + seperator1 + month + seperator1 + strDate + " " + add0(y) + seperator2 + add0(m) + seperator2 + add0(d);
    }
    if (flagType == "yyyy-MM-dd-HH-mm") {
      return year + seperator1 + month + seperator1 + strDate + " " + add0(y) + seperator2 + add0(m);
    }
    if (flagType == "yyyy-MM-dd") {
      return year + seperator1 + month + seperator1 + strDate;
    }
    if (flagType == "MM/dd") {
      return month + seperator3 + strDate;
    }
    if (flagType == "HH-mm") {
      return add0(y) + seperator2 + add0(m);
    }

    return year + seperator1 + month + seperator1 + strDate;
  },
  randomFrom(lowerValue, upperValue) {
    return Math.floor(Math.random() * (upperValue - lowerValue + 1) + lowerValue);
  },
  getLatestDate() {
    let dates = [];
    // 获取当前日期
    let now = new Date();
    // 循环获取最近 14 天的日期
    for (let i = 0; i < 14; i++) {
      // 获取当前日期的时间戳
      let timestamp = now.getTime();
      // 计算 i 天前的时间戳
      let dayTimestamp = 24 * 60 * 60 * 1000; // 一天的毫秒数
      let iDayAgoTimestamp = timestamp - i * dayTimestamp;
      // 转换为日期对象
      let date = new Date(iDayAgoTimestamp);
      // 格式化日期为 "yyyy-MM-dd" 的字符串并存入数组
      let year = date.getFullYear();
      let month = ("0" + (date.getMonth() + 1)).slice(-2);
      let day = ("0" + date.getDate()).slice(-2);
      dates.push(year + "-" + month + "-" + day);
    }
    return dates;
  },
  getNearNewPrice(recyclingPriceList, str) {
    let priceList = recyclingPriceList;
    let dateList = commonJs.getLatestDate(); //获取近七天的日期
    if (str == "newPrice") {
      //检查今天的日期是否更新
      dateList = [dateList[0]];
    }
    let price = 0;
    let flag = false;
    for (let d = 0; d < dateList.length; d++) {
      for (let p = 0; p < priceList.length; p++) {
        if (dateList[d] == priceList[p].date && priceList[p].price != "0") {
          //找出距离今日最近的日期的价格
          price = priceList[p].price;
          flag = true;
          break;
        }
      }
      if (flag) {
        break;
      }
    }
    return price;
  },
  lianxuDigits(num) {
    if (num == "1") {
      names = "豹子号";
    } else if (count == "4") {
      names = "豹子号";
    } else if (count == "5") {
      names = "豹子号";
    } else if (count == "6") {
      names = "豹子号";
    } else if (count == "7") {
      names = "豹子号";
    } else if (count == "8") {
      names = "豹子号";
    } else if (count == "9") {
      names = "豹子号";
    }
  },
  checkConsecutiveDigits(str) {
    // 将字符串转换为数组
    let arr = str.split("");

    // 初始化起始位置和连续数字的长度
    let start = arr.length - 1;
    let count = 1;
    let digit = arr[start];
    let names = "";
    // 从倒数第二个元素开始，向前遍历数组
    for (let i = arr.length - 2; i >= 0; i--) {
      if (arr[i] === digit) {
        count++;
      } else {
        // 如果找到不同的数字，更新起始位置并返回结果
        start = i + 1;
        break;
      }
    }

    if (count == "3") {
      names = "豹子号";
    } else if (count == "4") {
      names = "豹子号";
    } else if (count == "5") {
      names = "豹子号";
    } else if (count == "6") {
      names = "豹子号";
    } else if (count == "7") {
      names = "豹子号";
    } else if (count == "8") {
      names = "豹子号";
    } else if (count == "9") {
      names = "豹子号";
    }
    return { digit, count, start };
  },
  getPriceInfo(flag, strnum) {
    let priceInfo = {
      name: "",
      prcice: "",
    };

    //连续数字判断
    let numInfo = checkConsecutiveDigits(checkConsecutiveDigits(String(strnum)));

    //龙钞估值算法
    // 1>120 	2>120 	3>100 	4>100 	5>100 	6>300 	7>100 	8>500 	9>120
  },
  checkNum(e) {
    var n = [];
    e.slice(-8).match(/^(?:1976|1988|2000|2012|2024)(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])$/)
      ? n.push("龙年生日号")
      : e.slice(-8).match(/^(\d{4})(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])$/)
      ? n.push("生日号")
      : n;
    /5201314$/.test(e) ? n.push("顶级爱情号") : /520$|1314$/.test(e) ? n.push("爱情号") : n;
    /(\d)\1{7}$/.test(e)
      ? n.push("麒麟号")
      : /(\d)\1{6}$/.test(e)
      ? n.push("恐龙号")
      : /(\d)\1{5}$/.test(e)
      ? n.push("大象号")
      : /(\d)\1{4}$/.test(e)
      ? n.push("老虎号")
      : /(\d)\1{3}$/.test(e)
      ? n.push("狮子号")
      : /(\d)\1{2}$/.test(e)
      ? n.push("豹子号")
      : n;
    /^0000/.test(e) ? n.push("0000头") : n;
    /^1111/.test(e) ? n.push("火箭头") : n;
    /^[01689]+$/.test(e) ? n.push("倒置号") : n;
    /^[0689]+$/.test(e) ? n.push("圆圆号") : n;
    /2024$/.test(e) ? n.push("2024尾") : n;
    /^2024/.test(e) ? n.push("2024头") : n;
    var sz = new Set(e).size;
    sz === 4 ? n.push("龙四") : n;
    sz === 3 ? n.push("龙三") : n;
    sz === 2 ? n.push("龙二") : n;
    /^[08]+$/.test(e) ? n.push("08组合") : n;
    /^[68]+$/.test(e) ? n.push("68组合") : n;
    /^[168]+$/.test(e) ? n.push("168组合") : n;
    /^[01]+$/.test(e) ? n.push("二进制号") : n;
    /^\d+$/.test(e) ? e === e.split("").reverse().join("") && n.push("雷达号") : n;
    /(12345|23456|34567|45678|56789)/.test(e) ? n.push("顺子号") : n;
    /(54321|65432|76543|87654|98765)/.test(e) ? n.push("倒顺子") : n;
    /^(?!.*(.).*\1)[0-9]{7,}$/.test(e) ? e.length >= 7 && n.push("乱蛇号") : n;
    /^[^47]*$/.test(e) ? n.push("无47") : n;
    return n.length > 0 ? n.join(",") : "通货价";
  },
};

module.exports = commonJs;
