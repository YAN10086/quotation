<template>
  <view class="template-photo">
    <!-- 顶部自定义导航 -->
    <tn-nav-bar fixed alpha customBack>
      <view slot="back" class='tn-custom-nav-bar__back'
        @click="goBack">
        <text class='icon tn-icon-left'></text>
        <text class='icon tn-icon-home-capsule-fill'></text>
      </view>
    </tn-nav-bar>
     <tn-toast ref="toast"></tn-toast>
    <view :style="{paddingTop: vuex_custom_bar_height + 'px'}" class="goods-detail">		
		<image :src='goodsInfo.goodsCover' class="goods-cover" mode="aspectFit"></image>
		<view class="info-block">
			<view class="custom-nav__back">
				<text class="tn-text-bold tn-text-xl tn-color-black">商品信息
				<text style="display: inline-block;margin-left: 5px; font-size: 12px;color:#c6c6c6;opacity: 0.8;font-weight: 400;">图片仅供参考</text></text>
			</view>
			<view class="goods-cell">
				<view>商品名称：</view>
				<view class="gname" v-if="activeIndex == '1'"> {{goodsInfo.goodsName}}</view>
				<view class="gname" v-else> {{gname}}</view>
			</view>
			<view class="goods-cell">
				<view>今日报价：</view>
				<view v-if="goodsInfo.nowPrice =='0'" style="color:#c6c6c6">￥未更新</view>
				<view v-else style="color: #ff6000;font-weight: bold;">￥{{goodsInfo.nowPrice}}</view>
				<view style="margin-left: 30px;">查询次数：</view>
				<view>{{goodsInfo.visitCount*1+1}}次</view>
			</view>
		</view>
		<view class="info-block">
			<view class="custom-nav__back">
				<text class="tn-text-bold tn-text-xl tn-color-black">近期行情</text>
			</view>
			<view class="table-block">
				<view v-for="(item,index) in tableList" class="table-cell">
					<view>{{item.date}}</view>
					<view style="color:#ff6000">￥{{item.price}}</view>
				</view>
			</view>
		</view>
	</view>
    <!-- 底部tabbar start-->
    <view class="tabbar footerfixed dd-glass tn-color-white" style="border-radius: 100rpx;" v-if="activeIndex =='1'">
      <view class="action" @tap="clickFav">
        <view class="bar-icon">
          <view :class="favFlag ? 'tn-icon-like-fill fav' : 'tn-icon-like-lack'">
          </view>
        </view>
        <view class="" v-if="!favFlag">收藏</view>
		<view class="fav" v-else>已收藏</view>
      </view>
      <view class="action" >
        <button class="tn-flex-direction-column tn-flex-row-center tn-flex-col-center tn-button--clear-style" open-type="share">
          <view class="bar-icon">
            <view class="tn-icon-send">
            </view>
          </view>
          <view class="">分享</view>  
        </button>
      </view>
    </view>
    
  </view>
</template>

<script>
  import template_page_mixin from '@/libs/mixin/template_page_mixin.js'
  // import uniEcCanvas from '../components/uni-ec-canvas/uni-ec-canvas.vue'  
  export default {
    name: 'TemplatePhoto',
    mixins: [template_page_mixin],
    data(){
      return {
        show1: false,
		show2:false,
		goodsInfo:{},
		tableList:[],
		id:'',
		favFlag:false,
		activeIndex:'',
		gname:''
        }
    },
	components:{
		// uniEcCanvas
	},
	mounted(){
		
	},
	onLoad(op) {
		this.id = op.id;
		this.activeIndex = op.activeIndex;
		this.selectGoods(op.id);
		this.updateGoodsInfo(op.id);
		if(op.gname){
			this.gname = op.gname;
		}
		if(this.activeIndex == '1'){
			this.checkFav();
		}
	},
    methods: {
		checkFav(){
			let pdata = {
				url: '/fav/checkFav',
				data: {
					openId:this.userInfo.openId,
					goodsId:this.id,
					tenantId:this.userInfo.tenantId
				},
				method: 'POST'
			}
			this.$request(pdata).then((res) => {
				console.log("checkFav", res);
				if(res.data.data && res.data.data.length > 0 ){
					this.favFlag = true;
				}
			});	
		},
		clickFav(){
			if(this.favFlag){
				//取消收藏
				let pdata = {
					url: '/fav/delFav',
					data: {
						openId:this.userInfo.openId,
						goodsId:this.id,
						tenantId:this.userInfo.tenantId
					},
					method: 'POST'
				}
				this.$request(pdata).then((res) => {
					console.log("addFav", res);
					this.favFlag = false;
					this.$refs.toast.show({
						title: '',
						content: '取消收藏',
						icon: 'tips',
						duration: 1500
					})
				});
			}else{
				let pdata = {
					url: '/fav/addFav',
					data: {
						openId:this.userInfo.openId,
						goodsId:this.id,
						tenantId:this.userInfo.tenantId
					},
					method: 'POST'
				}
				this.$request(pdata).then((res) => {
					console.log("addFav", res);
					this.favFlag = true;
					this.$refs.toast.show({
						title: '',
						content: '已收藏',
						icon: 'tips',
						duration: 1500
					})
				});
			}
			
		},
		//查询商品基础信息
		selectGoods(id){
			let url = '/goods/selectGoods';
			if(this.activeIndex == '2'){
				url = '/digital/selectGoods'
			}
			if(this.activeIndex == '3'){
				url = '/daisen/selectGoods'
			}
			if(this.activeIndex == '4'){
				url = '/youxiji/selectGoods'
			}
			let pdata = {
				url: url,
				data: {
					page:1,
					pageSize:1,
					id:id
				},
				method: 'POST'
			}
			this.$request(pdata).then((res) => {
				console.log("selectGoods", res);
				let goodsInfo = res.data.data.list[0];
				
				//获取今日报价
				let priceList = JSON.parse(goodsInfo.recyclingPriceList); //获取价格字段
				let price = this.$commonFun.getNearNewPrice(priceList,'newPrice');
				goodsInfo.nowPrice = price;
				
				this.goodsInfo = goodsInfo;
				//处理日期
				let datesList  = this.$commonFun.getLatestDate();	//获取近七日日期
				let tableList = [];
				for(let d = 0;d<datesList.length;d++){
					let obj = {
						date : datesList[d],
						price:0
					}
					
					for(let p=0;p<priceList.length;p++){
						
						if(datesList[d] == priceList[p].date){
							obj.price = priceList[p].price; 
							break;
						}
					}
					tableList.push(obj);
				}
				this.tableList = tableList;
			});
		},
		//为商品累加查询次数
		updateGoodsInfo(id){
			let url = '/goods/updateGoodsInfo';
			if(this.activeIndex == '2'){
				url = '/digital/updateGoodsInfo'
			}
			if(this.activeIndex == '3'){
				url = '/daisen/updateGoodsInfo'
			}
			let pdata = {
				url: url,
				data: {
					id:id,
					visitCount:true,
					tenantId:this.userInfo.tenantId
				},
				method: 'POST'
			}
			this.$request(pdata).then((res) => {
				console.log("updateGoodsInfo", res);
			});
		},
      // 跳转
      tn(e) {
        uni.navigateTo({
          url: e,
        });
      },
      
      // 弹出压屏窗
      showLandscape() {
        this.openLandscape()
      },
      // 打开压屏窗
      openLandscape() {
        this.show1 = true
      },
      // 关闭压屏窗
      closeLandscape() {
        this.show1 = false
      },
    }
  }
</script>

<style lang="scss" scoped>
  .template-photo {
    margin: 0;
    width: 100%;
    height: 100vh;
    // overflow: hidden;
  }
  .uni-ec-canvas{
      width:300px;
      height:200px;
      display:block;
  }
  /* 胶囊*/
  .tn-custom-nav-bar__back {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    box-sizing: border-box;
    background-color: rgba(0, 0, 0, 0.15);
    border-radius: 1000rpx;
    border: 1rpx solid rgba(255, 255, 255, 0.5);
    color: #FFFFFF;
    font-size: 18px;
    
    .icon {
      display: block;
      flex: 1;
      margin: auto;
      text-align: center;
    }
    
    &:before {
      content: " ";
      width: 1rpx;
      height: 110%;
      position: absolute;
      top: 22.5%;
      left: 0;
      right: 0;
      margin: auto;
      transform: scale(0.5);
      transform-origin: 0 0;
      pointer-events: none;
      box-sizing: border-box;
      opacity: 0.7;
      background-color: #FFFFFF;
    }
  }  

  /* 图标容器15 start */
  .icon15 {
    &__item {
      width: 30%;
      
      border-radius: 10rpx;
      padding: 30rpx;
      margin: 20rpx 10rpx;
      transform: scale(1);
      transition: transform 0.3s linear;
      transform-origin: center center;
      
      &--icon {
        width: 100rpx;
        height: 100rpx;
        font-size: 50rpx;
        border-radius: 50%;
        margin-bottom: 18rpx;
        position: relative;
        z-index: 1;
        
        &::after {
          content: " ";
          position: absolute;
          z-index: -1;
          width: 100%;
          height: 100%;
          left: 0;
          bottom: 0;
          border-radius: inherit;
          opacity: 1;
          transform: scale(1, 1);
          background-size: 100% 100%;
  
            
        }
      }
    }
  }
  
  /* 按钮 */
  .button-1 {
    background-color: rgba(0, 0, 0, 0.15);
    position: fixed;
    /* bottom:200rpx;
      right: 20rpx; */
    top: 25%;
    right: 30rpx;
    z-index: 1001;
    border-radius: 100px;
  }
  .button-2 {
    background-color: rgba(0, 0, 0, 0.15);
    position: fixed;
    /* bottom:200rpx;
      right: 20rpx; */
    top: 35%;
    right: 30rpx;
    z-index: 1001;
    border-radius: 100px;
  }
  .button-3 {
    background-color: rgba(0, 0, 0, 0.15);
    position: fixed;
    /* bottom:200rpx;
      right: 20rpx; */
    top: 45%;
    right: 30rpx;
    z-index: 1001;
    border-radius: 100px;
  }  
  
  /* 相册 start*/
  .slideshow {
    top: 0;
    position: absolute;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
  
  .slideshow-image {
    position: absolute;
    width: 60%;
    height: 250px;
    background: no-repeat 50% 50%;
    background-size: 100%;
    opacity: 1;
	left: 20%;
	top:5%;
  }

  

  
    
  /* 用户头像 start */
  .logo-image {
    width: 100rpx;
    height: 100rpx;
    position: relative;
  }
  
  .logo-pic {
    background-size: cover;
    background-repeat: no-repeat;
    // background-attachment:fixed;
    background-position: top;
    border: 6rpx solid rgba(255,255,255,0.25);
    box-shadow: 0rpx 0rpx 80rpx 0rpx rgba(0, 0, 0, 0.15);
    border-radius: 50%;
    overflow: hidden;
    // background-color: #FFFFFF;
  }
    
  /* 底部tabbar start*/
  /* 毛玻璃*/
  .dd-glass {
     width: 100%;
     backdrop-filter: blur(20rpx);
    -webkit-backdrop-filter: blur(20rpx);
  }
  
  .footerfixed{
   position: fixed;
   // margin: 20rpx;
   margin: 40rpx 5%;
   width: 90%;
   bottom: calc(env(safe-area-inset-bottom) / 2);;
   z-index: 999;
   // background-color: rgba(0, 0, 0, 0.15);
   // background-color: #ff6000;
   // background: linear-gradient(45deg, #ea9f31, #ea9f31);
   background-image: url('http://img.acewb.com/baojia/imgs/aa1.jpg');
   background-position: 28% 58%;
   background-size: cover;
   box-shadow: 0rpx 0rpx 30rpx 0rpx rgba(0, 0, 0, 0.07);
  }
  
  .tabbar {
    display: flex;
    align-items: center;
    min-height: 110rpx;
    justify-content: space-between;
  	padding: 0;
  	height: calc(110rpx + env(safe-area-inset-bottom) / 2);
  	// padding-bottom: calc(env(safe-area-inset-bottom) / 2);
  }
  
  .tabbar .action {
  	font-size: 22rpx;
  	position: relative;
  	flex: 1;
  	text-align: center;
  	padding: 0;
  	display: block;
  	height: auto;
  	line-height: 1;
  	margin: 0;
  	overflow: initial;
  }
  
  .tabbar .action .bar-icon {
  	width: 100rpx;
  	position: relative;
  	display: block;
  	height: auto;
  	margin: 0 auto 10rpx;
  	text-align: center;
  	font-size: 42rpx;
  }
  
  .tabbar .action .bar-icon image {
  	width: 50rpx;
  	height: 50rpx;
  	display: inline-block;
  }  
  .goods-cell{
	  display:flex;
	  align-items: center;
	  margin-top: 10px;
	  padding: 0% 5%;
  }
  .table-cell{
	  display:flex;
	  align-items: center;
	  justify-content: space-between;
	  margin-top: 10px;
	  padding: 0% 5%;
	  // padding: 0px 20px;
  }
  .custom-nav__back{
	  // padding: 10px 10px;
  }
  .info-block{
	  padding: 10px 10px;
  }
  .goods-detail{
	  display: flex;
	  flex-direction: column;
	  justify-content: center;
	  padding-bottom: 160px;
  }
  .goods-cover{
	  margin: 0 auto;
  }
  .fav{
	  color:#ff1665;
  }
  .gname{
	  color: #ff6000;
  }
</style>
