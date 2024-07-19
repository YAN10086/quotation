import Vue from 'vue'
const commonFun = {
	getQueryVariable(variable) {
		var query = window.location.search.substring(1);
		var vars = query.split("&");
		for (var i = 0; i < vars.length; i++) {
			var pair = vars[i].split("=");
			if (pair[0] == variable) {
				return pair[1];
			}
		}
		return (false);
	},
	longtimeToStr(date,type) {
		var date = new Date(date);
		var Y = date.getFullYear() + "-";
		var M =
			(date.getMonth() + 1 < 10 ?
				"0" + (date.getMonth() + 1) :
				date.getMonth() + 1) + "-";
		var D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
		var h =
			(date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
		var m =
			(date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
			":";
		var s =
			date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
			if(type == 'ymd'){
				return Y + M + D;
			}
		return Y + M + D + h + m + s;
	},
	goBack() {
		uni.navigateBack({
			delta: 1
		});
	},
	hideTabBar() {
		uni.hideTabBar({
			animation: false
		});
	},
	//图片转base64
	uploadImgToBase64(file) {
		return new Promise((resolve, reject) => {
			const reader = new FileReader()
			reader.readAsDataURL(file)
			reader.onload = function() { // 图片转base64完成后返回reader对象
				resolve(reader)
			}
			reader.onerror = reject
		})
	},
	// Blob 转 Base64
	blobToDataURL(blob, callback) {
		let a = new FileReader();
		a.onload = function(e) {
			callback(e.target.result);
		}
		a.readAsDataURL(blob);
	},
	copyTxt(txt, name) { //传入要复制的内容
	console.log(txt,name);
		txt += "";
		if (txt == "null" || txt == "undefined" || txt == "") {
			return;
		}
		uni.setClipboardData({
			data: txt,
			success: function () {
				console.log('success');
				uni.showToast({
					title: `${name || '内容'}复制成功`,
					icon: 'success'
				});
			}
		});
		return;
		// #ifdef H5
		if (document.queryCommandSupported('copy')) {
			let textarea = document.createElement("textarea")
			textarea.value = txt
			textarea.readOnly = "readOnly"
			document.body.appendChild(textarea)
			textarea.select() // 选中文本内容
			textarea.setSelectionRange(0, txt.length)
			let result = document.execCommand("copy")
			textarea.remove()
			uni.showToast({
				title: `${name || '内容'}复制成功`,
				icon: 'success'
			});
		} else {
			uni.showToast({
				title: '您的浏览器不支持复制',
				icon: 'warning'
			});
		}

		// #endif  
	},
	back() {
		uni.navigateBack({
			delta: 1
		});
	},
	getLatestDate(){
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
	getNearNewPrice(recyclingPriceList,str){
		let priceList = recyclingPriceList;
		let dateList = commonFun.getLatestDate();	//获取近14天的日期
		if(str == "newPrice"){	//检查今天的日期是否更新
			dateList = [dateList[0]];
		}
		let price = 0;
		let flag = false;
		for(let d=0;d<dateList.length;d++){
			for(let p =0; p<priceList.length;p++){
				if(dateList[d] == priceList[p].date){	//找出距离今日最近的日期的价格
					price = priceList[p].price;
					flag = true;
					break;
				}
			}
			if(flag){
				break;
			}
		}
		return price;
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
}
export default commonFun;