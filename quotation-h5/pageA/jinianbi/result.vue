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
	    <text class="tn-text-bold tn-text-xl tn-color-black">靓号查询</text>
	  </view>
	</tn-nav-bar>
	
	
	<view class="" :style="{paddingTop: vuex_custom_bar_height + 'px'}">
		<view style="width: 100%;text-align: right;color: #c8c8c8;padding-right: 10px;">* 结果仅供参考</view>
		
		<view class="top-result" v-if=" resultList.length - 1 > 0 && resultList[resultList.length - 1].allResult">
			{{resultList[resultList.length - 1].allResult}}
		</view>
		<view class="tn-margin wallpaper-shadow tn-padding" v-for="(item,index) in resultList" :key="index" style="position: relative;">
			<text class="tn-color-gray tn-padding-left-sm tn-padding-right-xs" style="position: absolute;top: 5px;right: 10px;">{{index + 1}}</text>
			<view class="tn-flex tn-flex-col-top">
				<view class="">
					<view class="logo-pic" style="background-color: #fff;width: 50px;height: 50px;display: flex;justify-content: center;align-items: center;">
						<text class="tn-icon-zodiac-long tn-color-red"  style="padding: 10rpx;font-size: 30px;"></text>
					</view>
				</view>
				<view class="tn-padding-left-sm" style="width: 100%;">
					<view class="tn-flex tn-flex-row-between tn-flex-col-between">
						<view class="justify-content-item">
							<text class="tn-color-wallpaper tn-text-lg tn-text-bold">{{item.bianhao}}</text>
						</view>
					</view>
					<view class=" tn-padding-top-xs">
						<text class="tn-color-gray">{{item.strResult}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
	
	<view class="tn-tabbar-height"></view>
	
  </view>
</template>

<script>
	let interstitialAd = null;
  import template_page_mixin from '@/libs/mixin/template_page_mixin.js'
  export default {
    name: 'TemplateProduct',
    mixins: [template_page_mixin],
    data(){
      return {
        cardCur: 0,
        swiperList: [{
          id: 0,
          type: 'image',
          title: '免费开源',
          name: '商业合作请联系作者',
          text: '微信：tnkewo',
          url: 'http://img.acewb.com/baojia/banner/adno3.jpg',
        }],
        current: 0,
		bianhao:'',
		radio:'',
		list: [{
			name: '单张',
			disabled: false
		  },
		  {
			name: '百连',
			disabled: false
		  },
		  {
			name: '千连',
			disabled: false
		  }
		],
		// tn-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
		radioValue:'单张',
		resultList:[]
      }
    },
	onLoad(options) {
		this.getLhList(options);
		if (wx.createInterstitialAd) {
		  interstitialAd = wx.createInterstitialAd({
		    adUnitId: 'adunit-104702368d68a9e2'
		  })
		  interstitialAd.onLoad(() => {})
		  interstitialAd.onError((err) => {
		    console.error('插屏广告加载失败', err)
		  })
		  interstitialAd.onClose(() => {})
		}
		
		// 在适合的场景显示插屏广告
		if (interstitialAd) {
		  interstitialAd.show().catch((err) => {
		    console.error('插屏广告显示失败', err)
		  })
		}
	},
    methods: {
		getLhList(options){
			uni.showLoading({
				title:'加载中'
			})
			let pdata = {
				url: '/jinianbi/getLhList',
				data: {
					bianhao:options.bianhao,
					flag: options.flag,
				},
				method: 'POST'
			}
			this.$request(pdata).then((res) => {
				console.log("getLhList", res);
				this.resultList = res.data.data;
				uni.hideLoading();
			});
		},
		radioChange(e) {
			console.log(e);
		  },
      // cardSwiper
      cardSwiper(e) {
        this.cardCur = e.detail.current
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
  
  .message {
  	max-height: 100vh;
  }
  
  /* 自定义导航栏内容 start */
  .custom-nav {
  	height: 100%;
  
  	&__back {
  		margin: auto 30rpx;
  		font-size: 40rpx;
  		margin-right: 10rpx;
  		flex-basis: 5%;
  		width: 100rpx;
  		position: absolute;
  	}
  }
  
  /* 自定义导航栏内容 end */
  
  /* 底部安全边距 start*/
  .tn-tabbar-height {
  	min-height: 20rpx;
  	height: calc(40rpx + env(safe-area-inset-bottom) / 2);
  	height: calc(40rpx + constant(safe-area-inset-bottom));
  }
  
  
  .tn-color-wallpaper {
  	color: #1D2541;
  }
  
  /* 页面阴影 start*/
  .wallpaper-shadow {
  	border-radius: 15rpx;
  	box-shadow: 0rpx 0rpx 50rpx 0rpx rgba(0, 0, 0, 0.07);
  }
  
  
  
  /* 图标容器15 start */
  .icon15 {
  	&__item {
  		width: 30%;
  		background-color: #FFFFFF;
  		border-radius: 10rpx;
  		padding: 30rpx;
  		margin: 20rpx 10rpx;
  		transform: scale(1);
  		transition: transform 0.3s linear;
  		transform-origin: center center;
  
  		&--icon {
  			width: 105rpx;
  			height: 105rpx;
  			font-size: 60rpx;
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
  	border: 1rpx solid rgba(255, 255, 255, 0.05);
  	box-shadow: 0rpx 0rpx 80rpx 0rpx rgba(0, 0, 0, 0.05);
  	border-radius: 50%;
  	overflow: hidden;
  	// background-color: #FFFFFF;
	
	width: 100rpx;
	height: 100rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	background: repeating-linear-gradient(45deg,#fa709a,#fee140);
		
		
  }
  .xt{
  	background-image:url('http://img.acewb.com/baojia/imgs/xsgs.png');
  }
  .td{
  	background-image:url('http://img.acewb.com/baojia/imgs/gonggao.png')
  }
  .bg-blue{
  	background-color: #85e7ff;
  }
  .color-blue {
  	color: #2f90ff;
  }
  .top-result{
	  width: 90%;
	  margin-left: 5%;
	  background-color: #fff;
	  border-radius: 5px;
	  padding: 10px 10px;
	  box-shadow: 0px 0px 27px 0px rgba(0, 0, 0, 0.07);
	  margin-top: 10px;
	  letter-spacing: 0.5px;
	  line-height: 45rpx;
  }
</style>
