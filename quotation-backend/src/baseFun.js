/*
 * @Author: baiyf
 * @Date: 2019-05-20 10:48:48
 * @Description: 公共函数方法
 */
import Vue from "vue";

var baseFun = {
  testFun: function() {},
  checkhaveIds(id) {
    console.log(id);
    let bts = Vue.prototype.$BTS;
    let list = [];
    list = bts.filter((item, index) => {
      return item == id;
    });
    if (list.length > 0) {
      return true;
    } else {
      return false;
    }
  },
  getQueryString: name => {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(decodeURI(r[2]));
    return null;
  },
  longtimeToStr(date, str) {
    var date = new Date(date * 1); //如果date为10位需要乘1000
    var Y = date.getFullYear() + "-";
    var M =
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1;
    if (str == "y-m") {
      return Y + M;
    }
    M = M + "-";
    var D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
    if (str == "y-m-d") {
      return Y + M + D;
    }
    var h =
      (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
    var m =
      (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
      ":";
    var s =
      date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    return Y + M + D + h + m + s;
  },
  currentTime(m) {
    const currentDate = new Date();
    const year = currentDate.getFullYear(); //获取当前年
    const month = m || String(currentDate.getMonth() + 1).padStart(2, "0"); //获取当前月
    const firstDay = "01"; //日
    return `${year}-${month}-${firstDay}`;
  },
  getLastDayOfNaturalMonth(m) {
    //下个月的1号减去1天
    const currentDate = new Date();
    const year = currentDate.getFullYear(); //获取当前年
    const month = m || String(currentDate.getMonth() + 2).padStart(2, "0"); //获取当前月
    const firstDay = "01"; //1号
    const firstDayOfNextMonth = `${year}-${month}-${firstDay}`;
    const lastDayOfMonth = new Date(
      new Date(firstDayOfNextMonth).getTime() - 86400000
    );
    return lastDayOfMonth.toISOString().split("T")[0];
  },
  // file转base64
  uploadImgToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function() {
        // 图片转base64完成后返回reader对象
        resolve(reader);
      };
      reader.onerror = reject;
    });
  },
  compressImg2(base64, multiple) {
    multiple = 0.5;
    // 第一个参数就是需要加密的base65，
    // 第二个是压缩系数 0-1，
    // 第三个压缩后的回调 用来获取处理后的 base64
    if (!base64) {
      return;
    }
    // const _this = this
    const length = base64.length / 1024;
    // 压缩方法
    let newImage = new Image();
    let quality = 0.6; // 压缩系数0-1之间
    newImage.src = base64;
    newImage.setAttribute("crossOrigin", "Anonymous"); // url为外域时需要
    let imgWidth, imgHeight;
    let w = undefined;
    return new Promise((reslove, reject) => {
      newImage.onload = function() {
        // 这里面的 this 指向 newImage
        // 通过改变图片宽高来实现压缩
        w = this.width * multiple;
        imgWidth = this.width;
        imgHeight = this.height;
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");
        if (Math.max(imgWidth, imgHeight) > w) {
          if (imgWidth > imgHeight) {
            canvas.width = w;
            // 等比例缩小
            canvas.height = w * (imgHeight / imgWidth);
          } else {
            canvas.height = w;
            // 等比例缩小
            canvas.width = w * (imgWidth / imgHeight);
          }
        } else {
          canvas.width = imgWidth;
          canvas.height = imgHeight;
          // quality 设置转换为base64编码后图片的质量，取值范围为0-1  没什么压缩效果
          // 还是得通过设置 canvas 的宽高来压缩
          quality = 0.6;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(this, 0, 0, canvas.width, canvas.height); //  // 这里面的 this 指向 newImage
        let smallBase64 = canvas.toDataURL("image/jpeg", quality); // 压缩语句
        // 如想确保图片压缩到自己想要的尺寸,如要求小于30，请加以下语句，quality初始值根据情况自定
        while (smallBase64.length / 1024 > 30) {
          quality -= 0.01;
          smallBase64 = canvas.toDataURL("image/jpeg", quality);
        }
        //防止最后一次压缩低于最低尺寸，只要quality递减合理，无需考虑
        // while (smallBase64.length / 1024 < 20) {
        //   quality += 0.001;
        //   smallBase64 = canvas.toDataURL("image/jpeg", quality);
        // }

        // 必须通过回调函数返回，否则无法及时拿到该值，回调函数异步执行
        console.log(`压缩前：${length}KB`);
        console.log(`压缩后：${smallBase64.length / 1024} KB`);
        reslove(smallBase64);
      };
    });
  },
  // base64压缩
  compressImg(base64, multiple) {
    console.log("开始压缩！");
    // 第一个参数就是需要加密的base65，
    // 第二个是压缩系数 0-1，
    // 第三个压缩后的回调 用来获取处理后的 base64
    if (!base64) {
      return;
    }
    const length = base64.length / 1024;
    // 压缩方法
    let newImage = new Image();
    let quality = 0.6; // 压缩系数0-1之间
    newImage.src = base64;
    newImage.setAttribute("crossOrigin", "Anonymous"); // url为外域时需要
    let imgWidth, imgHeight;
    let w = undefined;
    return new Promise((reslove, reject) => {
      newImage.onload = function() {
        // 这里面的 this 指向 newImage
        // 通过改变图片宽高来实现压缩
        w = this.width * multiple;
        imgWidth = this.width;
        imgHeight = this.height;
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");
        if (Math.max(imgWidth, imgHeight) > w) {
          if (imgWidth > imgHeight) {
            canvas.width = w;
            // 等比例缩小
            canvas.height = w * (imgHeight / imgWidth);
          } else {
            canvas.height = w;
            // 等比例缩小
            canvas.width = w * (imgWidth / imgHeight);
          }
        } else {
          canvas.width = imgWidth;
          canvas.height = imgHeight;
          // quality 设置转换为base64编码后图片的质量，取值范围为0-1  没什么压缩效果
          // 还是得通过设置 canvas 的宽高来压缩
          quality = 0.6;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(this, 0, 0, canvas.width, canvas.height); //  // 这里面的 this 指向 newImage
        let smallBase64 = canvas.toDataURL("image/jpeg", quality); // 压缩语句
        // 如想确保图片压缩到自己想要的尺寸,如要求在15-25kb之间，请加以下语句，quality初始值根据情况自定
        let k1 = 0.01;
        let k2 = 0.001;
        console.log("@@@@@@@@@@@@@@@@@@@@", smallBase64.length / 1024);
        if (smallBase64.length / 1024 > 10) {
          k1 = 1;
        }
        while (smallBase64.length / 1024 > 25) {
          quality -= k1;
          smallBase64 = canvas.toDataURL("image/jpeg", quality);
        }
        // 防止最后一次压缩低于最低尺寸，只要quality递减合理，无需考虑
        while (smallBase64.length / 1024 < 15) {
          quality += k1 / 10;
          smallBase64 = canvas.toDataURL("image/jpeg", quality);
        }

        // 必须通过回调函数返回，否则无法及时拿到该值，回调函数异步执行
        console.log(`压缩前：${length}KB`);
        console.log(`压缩后：${smallBase64.length / 1024} KB`);
        // return smallBase64;
        reslove(smallBase64);
      };
    });
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
    let dateList = baseFun.getLatestDate(); //获取近14天的日期
    if (str == "newPrice") {
      //检查今天的日期是否更新
      dateList = [dateList[0]];
    }
    let price = 0;
    let date = "";
    let flag = false;
    for (let d = 0; d < dateList.length; d++) {
      for (let p = 0; p < priceList.length; p++) {
        if (dateList[d] == priceList[p].date) {
          //找出距离今日最近的日期的价格
          price = priceList[p].price;
          date = priceList[p].date;
          flag = true;
          break;
        }
      }
      if (flag) {
        break;
      }
    }
    return { price, date };
  }
};

export default baseFun;
