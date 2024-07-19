<template>
  <view class="template-product tn-safe-area-inset-bottom">
    <!-- 顶部自定义导航 -->
 <!--   <tn-nav-bar fixed customBack :bottomShadow="false" backgroundColor="#FFFFFF">
      <view slot="back" class='tn-custom-nav-bar__back'
        @click="goBack">
        <text class='icon tn-icon-left'></text>
        <text class='icon tn-icon-home-capsule-fill'></text>
      </view>
    </tn-nav-bar> -->
	
	<!-- 顶部自定义导航 -->
	<tn-nav-bar fixed customBack :bottomShadow="false" backgroundColor="#FFFFFF">
	  <view slot="back" class='tn-custom-nav-bar__back'
	    @click="goBack">
	    <text class='icon tn-icon-left'></text>
	    <text class='icon tn-icon-home-capsule-fill'></text>
	  </view>
	  <view class="tn-flex tn-flex-col-center tn-flex-row-center ">
	    <text class="tn-text-bold tn-text-xl tn-color-black">葫芦娃预约</text>
	  </view>
	</tn-nav-bar>
	
	
    
    <view class="tn-margin-top tn-margin-bottom" :style="{paddingTop: vuex_custom_bar_height + 'px'}">
		
		<view style="width: 94%;margin-left: 3%;">
			<tn-notice-bar  :radius="10" :list="listBar" mode="horizontal"  backgroundColor="#f7b554" fontColor="#FFFFFF" :speed="100"></tn-notice-bar>
		</view>
		 
      <view style="display: flex;flex-wrap: wrap;">
		  <view v-for="(item,index) in list" :key="index" @click="toDetail(item)" style="width: 25%;text-align: center;margin-top: 50rpx;position: relative;">
			  <image :src="item.img" style="width: 70rpx;height: 70rpx;"></image>
			  <view style="font-size: 24rpx;">{{item.cname}}</view>
			  <view v-if="item.state == '2'" style="position: absolute;top: -20rpx;right: 30rpx;font-size: 20rpx;color:red">预约</view>
			   <view v-else style="position: absolute;top: -20rpx;right: 40rpx;font-size: 20rpx;">0</view>
			  <!-- <view>放量：{{item.num}}</view> -->
		  </view>
	  </view>
    </view>
    
	<view style="display: flex; flex-direction: column;justify-content: center;align-items: center;">
		<view style="width: 85%;margin-top: 30px;letter-spacing: 4rpx;">
			<tn-button shape="round" size="lg" backgroundColor="#ff9800" fontColor="tn-color-white"  @tap="selectInfo" width="100%">订阅葫芦娃预约提醒</tn-button>
		</view>
	</view>
	<view class="hlw-tips" v-html="tips">
	</view>
	<view class="jieshao" @tap="showTips">
		<view class="tn-icon-help"></view>
		<view style="margin-left: 1px;">玩法介绍</view>
	</view>
	
    <tn-toast ref="toast"></tn-toast>
	 <tn-popup v-model="flag"  mode="bottom" length="60%" :borderRadius="20">
	      <view style="display: flex; flex-direction: column;width: 90%;margin: 10px 5%">
			  <view style="font-size: 20px;font-weight: bold;width: 100%;text-align: center;margin-bottom: 10px;">玩法攻略</view>
			  <view style="line-height: 48rpx;font-size: 25rpx;">
				  <view> 1、为何存在此类项目？这是部分地区为推动农业发展开展的一系列活动，结合茅台品牌效应，以提升农产品销售。</view>
					 
				  <view> 2、这些小程序，因为外观UI非常相似，所以就被广大网友戏称为葫芦娃特产平台。分别如页面所示。</view>
				  
				  <view> 3、这些小程序会不定期开放预约申购，成功中签的用户可以在平台上购买指定的特产。购买特产后会获得积分，利用这些积分可以以较低的价格换购两瓶茅台酒。</view>
				  
				  <view> 4、由于茅台酒的独特硬通货价值，这套流程操作下来具有很大的利润空间，<text style="color:red">总利润通常在1000+</text>，非常可观。</view>
				  
				  <view> 5、整个操作流程就是注册+预约+等待中签，然后购买特产（买特产送积分）用送的积分购买茅台。</view>
				  
				  <view> 6、如有不懂或中签后不知如何操作，请联系微信b960519152答疑解惑。注：该活动信息采集于互联网，本站不承担任何法律责任。如您发现异常，请停止操作。</view>

			  </view>
		  </view>
	</tn-popup>
		
	<ad unit-id="adunit-fcfb576bb63c0f03" style="width: 90%;position: fixed;bottom: 5px;left: 5%;border-radius: 10px;"></ad>
  </view>
</template>

<script>
  import template_page_mixin from '@/libs/mixin/template_page_mixin.js'
  export default {
    name: 'TemplateProduct',
    mixins: [template_page_mixin],
    data(){
      return {
		list: [],
		listBar:[],
		tips:`1、当图标右上角出现'<span style=color:red>预约</span>'字样时代表该小程序已开放预约，点击图标，即可直达预约界面。<br>
		2、系统限制不能长期推送预约提醒，<span style=color:red>每点击按钮订阅一次，可以接收一次通知。建议亲们多点几次订阅按钮，点点更健康！</span>`,
		flag:false
      }
    },
	onShareAppMessage() {
	  return {
		  title: `葫芦娃开门早知道！`,
		  // 分享的路径，默认为当前页面
		  path: '/pageA/hlw/hlw',
		  // 分享时显示的图片，默认为当前页面截图
		  imageUrl: '',
		  // 当前页面是否可以分享
		  share: true
	  }
	},
	mounted() {
		this.selectHLW();
	},
    methods: {
		selectInfo(){
			// 点击后，会弹窗一个授权窗口，同意之后就可以进行测试订阅消息推送了
			uni.requestSubscribeMessage({
				// 模板id：可以在微信公众平台 -> 功能 -> 订阅信息进行选择
				tmplIds: ['aAry_ymPqBTqQOKmVYx-CYqLhMIzC4iOLlDadkvpmiU'],
				success: res => {
					this.$refs.toast.show({
					  title: '',
					  content: '订阅成功！开放预约时会在当天推送消息，请注意查收。',
					  icon: 'success',
					  image: '',
					  duration: 2500
					});
				},
				fail: err => {
					console.log('err',err);
				}
			})
		},
		showTips(){
			this.flag = true;
		},
		toDetail(item){
			console.log(item);
			if(item.state == '2'){
				uni.openEmbeddedMiniProgram({
					extraData: {
						'data1': 'test'
					},
					shortLink:item.shortLink,
					success(res) {
						// 打开成功
					}
				})
			}else{
				this.$refs.toast.show({
				  title: '',
				  content: '还没开门，再等等吧',
				  icon: 'warning',
				  image: '',
				  duration: 1500
				});
			}
			
		},
      selectHLW() {
      	let pdata = {
      		url: '/users/selectHLW',
      		data: {	},
      		method: 'POST'
      	}
      	this.$request(pdata).then((res) => {
      		console.log("selectHLW", res);
			let {data} = res.data;
			this.list = data;
			
			let flag = data.filter((item,index)=>{
				return item.state == '2';
			})
			if(flag.length > 0){				
				let nowDate = this.$commonFun.getFormatDate(null, "yyyy-MM-dd");
				this.listBar = [`本期葫芦娃开放预约时间为${nowDate} 00:05 ~ 23:50，请在当天尽快完成预约！`]
			}
      	});
      },
    }
  }
</script>

<style lang="scss" scoped>
  .template-product{
  }
  .tn-tabbar-height {
  	min-height: 120rpx;
  	height: calc(140rpx + env(safe-area-inset-bottom) / 2);
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
  
  /* 轮播视觉差 start */
  .card-swiper {
    height: 220rpx !important;
  }
    
  .card-swiper swiper-item {
    width: 750rpx !important;
    left: 0rpx;
    box-sizing: border-box;
    padding: 0rpx 30rpx 0rpx 30rpx;
    overflow: initial;
  }
    
  .card-swiper swiper-item .swiper-item {
    width: 100%;
    display: block;
    height: 100%;
    transform: scale(1);
    transition: all 0.2s ease-in 0s;
    border-radius: 10rpx;
    overflow: hidden;
  }
    
  .card-swiper swiper-item.cur .swiper-item {
    transform: none;
    transition: all 0.2s ease-in 0s;
  }
  
  .image-banner{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .image-banner image{
    width: 100%;
    height: 100%;
  }
  
  /* 轮播指示点 start*/
  .indication{
    z-index: 9999;
    width: 100%;
    height: 36rpx;
    position: absolute;
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:center;
  }
  
  .spot{
    background-color: #FFFFFF;
    opacity: 0.6;
    width: 10rpx;
    height: 10rpx;
    border-radius: 20rpx;
    top: -40rpx;
    margin: 0 8rpx !important;
    position: relative;
  }
  
  .spot.active{
    opacity: 0.8;
    width: 20rpx;
    background-color: #FFFFFF;
  }
  
  /* 间隔线 start*/
  .tn-strip-bottom {
   width: 100%;
   border-bottom: 20rpx solid rgba(241, 241, 241, 0.8);
  }
   /* 间隔线 end*/
  /* 标题 start */
  .nav_title {
    -webkit-background-clip: text;
    color: transparent;
    
    &--wrap {
      position: relative;
      display: flex;
      height: 120rpx;
      font-size: 46rpx;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      background-image: url(https://tnuiimage.tnkjapp.com/title_bg/title44.png);
      background-size: cover;
    }
  }
  /* 标题 end */
  
  
  /* 标签内容 start*/
  .tn-tag-content {
    &__item {
      display: inline-block;
      line-height: 45rpx;
      padding: 10rpx 30rpx;
      margin: 20rpx 20rpx 5rpx 0rpx;
      
      &--prefix {
        padding-right: 10rpx;
      }  
    }
  }
  /* 标签内容 end*/
  
  /* 内容图 start */
  .content-backgroup {
    z-index: -1;
  
    .backgroud-image {
      border-radius: 15rpx;
      width: 100%;
    }
  }
  /* 内容图 end */
  
  /* 商家商品 start*/
  .tn-blogger-content {
    &__wrap {
      box-shadow: 0rpx 0rpx 50rpx 0rpx rgba(0, 0, 0, 0.07);
      border-radius: 20rpx;
      margin: 15rpx;
    }
    
    &__info {
      &__btn {
        margin-right: -12rpx;
        opacity: 0.5;
      }
    }
    
    &__label {
      &__item {
        line-height: 45rpx;
        padding: 0 10rpx;
        margin: 5rpx 18rpx 0 0;
        
        &--prefix {
          color: #E83A30;
          padding-right: 10rpx;
        }
      }
      
      &__desc {
        line-height: 35rpx;
      }
    }
    
    &__main-image {
      border-radius: 16rpx 16rpx 0 0;
      
      &--1 {
        max-width: 690rpx;
        min-width: 690rpx;
        max-height: 400rpx;
        min-height: 400rpx;
      }
      
      &--2 {
        max-width: 260rpx;
        max-height: 260rpx;
      }
      
      &--3 {
        height: 212rpx;
        width: 100%;
      }
    }
    
    &__count-icon {
      font-size: 24rpx;
      padding-right: 5rpx;
    }
  }
  
  .image-book{
    padding: 150rpx 0rpx;
    font-size: 16rpx;
    font-weight: 300;
    position: relative;
  }
  .image-picbook{
    background-size: cover;
    background-repeat:no-repeat;
    // background-attachment:fixed;
    background-position:top;
    border-radius: 15rpx 15rpx 0 0;
  }
  
  .website-shadow {
    border-radius: 15rpx;
    box-shadow: 0rpx 0rpx 50rpx 0rpx rgba(0, 0, 0, 0.07);
  }
  .swiper-item-text{
	  position: absolute;
	  top: 0px;
	  width: 100%;
	  height: 120px;
	  display: flex;
	  flex-direction: column;
	  justify-content: center;
	  align-items: center;
	  letter-spacing: 1px;
  }
  .hlw-tips{
	  background: #f0f0f0;
	      width: 90%;
	      margin-left: 5%;
	      margin-top: 40rpx;
	      border-radius: 10rpx;
	      padding: 20rpx;
	      font-size: 25rpx;
	      letter-spacing: 2px;
		      line-height: 45rpx;

  }
  .jieshao{
	      width: 90%;
	      margin-left: 5%;
	      margin-top: 5px;
	      letter-spacing: 1px;
	      font-size: 13px;
		  display: flex;
		  justify-content: flex-end;
		  align-items: center;
		      color: #a8acb0;
  }
</style>
