
function optionXhr(){
	 // process.env.NODE_ENV 
	 console.log("process.env.NODE_ENV",process.env.NODE_ENV);
	  let backendUrl =  'http://192.168.1.3:8888'; 
	  // backendUrl =  'https://quotation.acewb.com'; 
	return backendUrl;
}
let backendUrl = optionXhr();

let loadingMsg = "";
const errData = {
	code: -1,
	msg: '网络错误error'
}
function unirequest(options) {
	let pData = options.data;
	loadingMsg = options.loadingMsg || '加载中';
	uni.showLoading({
		title: loadingMsg,
		mask: true
	});
	return new Promise((res, rej) => {
		console.log("options-----------",options);
		uni.request({
			url:  backendUrl + options.url,
			method: options.method || 'GET',
			data: pData,
			header: {
				'content-type': options.method == 'POST' ? 'application/x-www-form-urlencoded' :
				'', //自定义请求头信息
			},
			// header:headers,
			success(resdata) {
				res(resdata);
			},
			fail(err) {
				rej(errData);
			},
			complete() {
				uni.hideLoading();
			}
		})
	})
}

export default unirequest;