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
	
	
    
    <view class="tn-margin-top tn-margin-bottom" :style="{paddingTop: vuex_custom_bar_height + 'px'}">
      <swiper class="card-swiper" :circular="true"
        :autoplay="true" duration="500" interval="5000" @change="cardSwiper"> 
        <swiper-item v-for="(item,index) in swiperList" :key="index" :class="cardCur==index?'cur':''">
          <view class="swiper-item image-banner" style="position: relative;">
            <image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
		  <view class="swiper-item-text">
		  	<view class="tn-text-bold tn-color-white" style="font-size: 50rpx;">龙钞靓号查询</view>
		  	<view class="tn-color-white tn-padding-top" style="font-size: 30rpx;">祝君好运 喜气连连</view>
		  </view>
          </view>
        </swiper-item>
      </swiper>
    </view>
    
	<view style="display: flex; flex-direction: column;justify-content: center;align-items: center;">
		<view style="display: flex;align-items: center;">
			<view style="display: flex;align-items: center;justify-content: center; border: 1px solid #dcdfe6;height: 60rpx;width: 140rpx;
			    background: #e1e1e1;
			    color: #FF5722;
			    font-weight: bold;
				">
				<!-- <text class="tn-icon-zodiac-long"></text> -->
				<view>冠号：J</view>
			</view>
			<view style="margin-left: 20rpx;width: 500rpx;">
				<tn-input v-model="bianhao" placeholder="请输入9位数字" :border="true" type="number" :height="60" :maxLength="9"/>
			</view>
		</view>
		
		<view style="display: flex;align-items: center;margin-top: 20px;">
		  <view style="display: flex;align-items: center;justify-content: center; border: 1px solid #dcdfe6;height: 60rpx;width: 140rpx;">
		  	<view>规格</view>
		  </view>
		  <tn-radio-group v-model="radioValue" style="margin-left: 20rpx;width:500rpx;">
		        <tn-radio @change="radioChange" v-for="(item, index) in list" :key="index" :name="item.name" activeColor="#ff9800"
		          :disabled="item.disabled">
		        <view style="font-size: 25rpx;letter-spacing: 1px;">{{item.name}}</view>
		        </tn-radio>
		      </tn-radio-group>
		</view>
		
		<view style="width: 85%;margin-top: 30px;">
			<tn-button shape="round" backgroundColor="#ff9800" fontColor="tn-color-white"  @tap="selectInfo" width="100%">立 即 查 询</tn-button>
		</view>
	</view>
    <tn-toast ref="toast"></tn-toast>
	
	<ad unit-id="adunit-6f683c6d76dc9505" style="width: 90%;position: fixed;bottom: 5px;left: 5%;border-radius: 10px;"></ad>
  </view>
</template>

<script>
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
          url: 'http://img.acewb.com/baojia/banner/adno3-2.jpg',
        }],
        current: 0,
		bianhao:'',
		radio:'',
		list: [{
			name: '单张',
			disabled: false
		  },
		  {
		  	name: '标十',
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
		radioValue:'单张'
      }
    },
	onShareAppMessage() {
	  return {
		  title: `查询龙钞靓号！祝君好运！`,
		  // 分享的路径，默认为当前页面
		  path: '/pageA/jinianbi/jinianbi',
		  // 分享时显示的图片，默认为当前页面截图
		  imageUrl: '',
		  // 当前页面是否可以分享
		  share: true
	  }
	},
    methods: {
		selectInfo(){
			if(!this.bianhao || this.bianhao.length < 9){
				this.$refs.toast.show({
				  title: '',
				  content: '请输入正确的编号',
				  icon: 'warning',
				  image: '',
				  duration: 1500
				});
				return;
			}
			let flag = '1';
			if(this.radioValue == '单张'){
				flag = '1';
			}else if(this.radioValue == '标十'){
				flag = '2';
			}else if(this.radioValue == '百连'){
				flag = '3';
			}if(this.radioValue == '千连'){
				flag = '4';
			} 
			uni.navigateTo({
				url:`/pageA/jinianbi/result?bianhao=${this.bianhao}&flag=${flag}`
			})
			console.log(this.bianhao,this.radioValue);
		},
		radioChange(e) {
			console.log(e);
		  },
      // cardSwiper
      cardSwiper(e) {
        this.cardCur = e.detail.current
      },
      // 跳转
      tn(e) {
      	uni.navigateTo({
      		url: e,
      	});
      },
      // tab选项卡切换
      tabChange(index) {
        this.current = index
      },
      getRandomCoolBg() {
        return this.$t.colorUtils.getRandomCoolBgClass()
      }
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
</style>
