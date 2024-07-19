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
	    <text class="tn-text-bold tn-text-xl tn-color-black">随笔详情</text>
	  </view>
	</tn-nav-bar>
	
	
    
    <view class="tn-margin-top tn-margin-bottom" :style="{paddingTop: vuex_custom_bar_height + 'px'}">
		
		<view style="padding: 0px 10rpx;">
			
			<view style="font-size: 19px;font-weight: bold;padding: 5px;">{{info.title}}</view>
			<view class="w-content" v-if="info.content2" v-html="info.content2"></view>
			<view class="w-content" v-html="info.content"></view>
			
		</view>
    </view>
    
	
	
	
    <tn-toast ref="toast"></tn-toast>
	<ad unit-id="adunit-fcfb576bb63c0f03" style="width: 90%;margin-left: 5%; border-radius: 10px;"></ad>
  </view>
</template>

<script>
  import template_page_mixin from '@/libs/mixin/template_page_mixin.js'
  export default {
		name: 'TemplateProduct',
		mixins: [template_page_mixin],
		options: { styleIsolation: 'shared' },//解决/deep/不生效**
		data(){
		  return {
			info:''
		  }
		},
		onShareAppMessage() {
		  return {
			  title: this.info.title,
			  // 分享的路径，默认为当前页面
			  path: '/pageA/articleView/articleView',
			  // 分享时显示的图片，默认为当前页面截图
			  imageUrl: '',
			  // 当前页面是否可以分享
			  share: true
		  }
		},
		onLoad(op) {
			this.selectArticle(op.id);
		},
		methods: {
			showTips(){
				this.flag = true;
			},
		  selectArticle(id) {
			let pdata = {
				url: '/article/selectArticle',
				data: {
					page: 1,
					pageSize: 500,
					tenantId: this.userInfo.tenantId,
					enabled:1,
					id:id
				},
				method: 'POST'
			}
			this.$request(pdata).then((res) => {
				console.log("selectArticle", res);
				this.info = res.data.data.list[0];
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
  /deep/ .w-content{
	  margin-top: 20px;
	  p{
		  line-height: 54rpx !important;
		   padding: 0px 10rpx;
	  }
	  section{
		   line-height: 54rpx !important;
		   padding: 0px 10rpx;
	  }
  }
</style>
