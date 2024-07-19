<template>
  <view class="page-e tn-safe-area-inset-bottom">
    
<!--    <view class="top-backgroup">
      <image src='https://resource.tuniaokj.com/images/my/my-bg4.png' mode='widthFix' class='backgroud-image'></image>
    </view> -->
        <tn-toast ref="toast"></tn-toast>
    <view class="tn-margin-left tn-margin-right" :style="{paddingTop: vuex_custom_bar_height + 'px'}">
      <!-- 图标logo/头像 -->
	  <!-- @click="tn('/pageA/set/set')" -->
      <view class="tn-flex tn-flex-row-between tn-flex-col-center tn-margin-bottom"  @click="tn('/pageA/set/set')">
        <view class="justify-content-item">
          <view class="tn-flex tn-flex-col-center tn-flex-row-left">
            <view class="logo-pic tn-shadow">
              <view class="logo-image">
                <view class="tn-shadow-blur ulogo" :style="{'background-image': userInfo.avatar ? 'url('+userInfo.avatar +')' : 'url(http://img.acewb.com/baojia/imgs/logo.jpg)'}">
                </view>
              </view>
            </view>
            <view class="tn-padding-right">
              <view class="tn-padding-right tn-padding-left-sm">
                <text class="tn-color-wallpaper tn-text-xl tn-text-bold">{{userInfo.nickName || '亿点通用户'}}</text>
              </view>
              <view class="tn-padding-right tn-padding-top-xs tn-padding-left-sm tn-text-ellipsis">
                <text class="tn-color-gray">{{userInfo.tenantName}}</text>
                <text class="tn-color-gray tn-padding-left-sm tn-text-sm">{{userInfo.tenantCode}}</text>
              </view>
            </view>

          </view>
        </view>
        <view class="justify-content-item">
          <view class="tn-icon-right tn-color-gray">
          </view>
        </view>
      </view>
    
      
      <view class="tn-margin-top-xl">
        <view class="button-number tn-flex tn-flex-row-between tn-flex-col-center tn-shadow-blur" style="background: linear-gradient(-120deg, #3E445A, #31374A, #2B3042, #262B3C);">
          
          <view class="tn-margin-left">
            <view class='title' style="color: #F1C68E;">
              <text class="tn-text-bold tn-text-xl">10 积分</text>
              <!-- <text class="tn-icon-vip-text tn-text-center" style="position: absolute;margin: -22rpx 0 0 0;font-size: 92rpx;"></text> -->
            </view>
            <view class='tn-color-white tn-text-sm tn-padding-top-sm'>邀请好友一起看行情</view>
          </view>
          <view class="tn-margin-right">
            <tn-button shape="round" backgroundColor="#F1C68E" fontColor="#634738" padding="10rpx 0" width="160rpx" shadow open-type="share">
              <!-- <text class="tn-icon-vip tn-padding-right-sm tn-text-lg"></text> -->
              <text class="tn-text-bold">分享好友</text>
            </tn-button>
          </view>
          
        </view>
      </view>  
      
      
      <!-- 方式20 start-->
      <view class="tn-flex">
        <view class="tn-flex-1 wallpaper-shadow tn-bg-white tn-bg-menu" style="margin: 50rpx 15rpx 0 0;padding: 30rpx 0;" @click="tn('/pageA/search/search')">
          <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
            <!-- <view class="icon20__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-shadow-blur tn-bg-orangered tn-color-white">
              <view class="tn-icon-computer-fill"></view>
            </view> -->  
            <view class="icon5__item--icon tn-flex tn-flex-row-center tn-flex-col-center" style="background-image:url('http://img.acewb.com/baojia/imgs/my-66.png');background-size:100% 100%;background-size: cover;">
            </view>
            <view class="tn-text-center" style="font-size: 30rpx;">
              <view class="tn-text-ellipsis">查询价格</view>
            </view>
          </view>
        </view>
        <view class="tn-flex-1 wallpaper-shadow tn-bg-white tn-bg-menu" style="margin: 50rpx 0 0 15rpx;padding: 30rpx 0;" @click="tn('/pageB/activity/activity')">
          <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
            <!-- <view class="icon20__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-shadow-blur tn-bg-purplered tn-color-white">
              <view class="tn-icon-moon-fill"></view>
            </view>  -->
            <view class="icon5__item--icon tn-flex tn-flex-row-center tn-flex-col-center" style="background-image:url('http://img.acewb.com/baojia/imgs/qiandao.png');background-size:100% 100%;background-size: cover;">
            </view>
            <view class="tn-text-center" style="font-size: 30rpx;">
              <view class="tn-text-ellipsis">我的收藏</view>
            </view>
          </view>
        </view>
      </view>

      <!-- 更多信息-->
      <!-- 方式12 start-->
      <view class="wallpaper-shadow tn-margin-top-lg tn-padding-top-sm tn-padding-bottom-sm tn-bg-white" v-if="false">

        <view class="tn-flex tn-flex-row-center tn-radius tn-padding-top">
          <view class="tn-padding-sm tn-margin-xs tn-radius" @click="tn('/pageB/task/task')">
            <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
              <view class="icon12__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-bg-grey--light">
                <view class="tn-icon-calendar tn-color-wallpaper"></view>
              </view>
              <view class="tn-text-center">
                <text class="tn-text-ellipsis">每日签到</text>
              </view>
            </view>
          </view>
          <view class="tn-padding-sm tn-margin-xs tn-radius" @click="tn('/pageB/integral/integral')">
            <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
              <view class="icon12__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-bg-grey--light">
                <view class="tn-icon-order tn-color-wallpaper"></view>
              </view>
              <view class="tn-text-center">
                <text class="tn-text-ellipsis">积分明细</text>
              </view>
            </view>
          </view>

          <view class="tn-padding-sm tn-margin-xs tn-radius" @click="tn('/pageA/set/set')">
            <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
              <view class="icon12__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-bg-grey--light">
                <view class="tn-icon-set tn-color-wallpaper"></view>
              </view>
              <view class="tn-text-center">
                <text class="tn-text-ellipsis">资料修改</text>
              </view>
            </view>
          </view>
		  <view class="tn-padding-sm tn-margin-xs tn-radius" @click="tn('/pageB/activity/activity')">
		    <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
		      <view class="icon12__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-bg-grey--light">
		        <view class="tn-icon-signpost tn-color-wallpaper"></view>
		      </view>
		      <view class="tn-text-center">
		        <text class="tn-text-ellipsis">我的收藏</text>
		      </view>
		    </view>
		  </view>
        </view>
      </view>


      <!-- 更多信息-->
      <view class="wallpaper-shadow tn-margin-top-lg tn-padding-top-sm tn-padding-bottom-sm">
        <tn-list-cell :hover="true" :unlined="true" :radius="true" :fontSize="30" @click="tn('/pageA/about/about')">
          <view class="tn-flex tn-flex-col-center">
            <view
              class="icon1__item--icon tn-flex tn-flex-row-center tn-flex-col-center" style="color: #7C8191;">
              <view class="tn-icon-science-fill"></view>
            </view>
            <view class="tn-margin-left-sm tn-flex-1">关于我们</view>
            <view class="tn-color-gray tn-icon-right"></view>
          </view>
        </tn-list-cell>
        <tn-list-cell :hover="true" :unlined="true" :radius="true" :fontSize="30" @click="tn('/pageB/article/article')">
          <view class="tn-flex tn-flex-col-center">
            <view
              class="icon1__item--icon tn-flex tn-flex-row-center tn-flex-col-center" style="color: #7C8191;">
              <view class="tn-icon-help"></view>
            </view>
            <view class="tn-margin-left-sm tn-flex-1">帮助中心</view>
            <view class="tn-color-gray tn-icon-right"></view>
          </view>
        </tn-list-cell>
		<tn-list-cell :hover="true" :unlined="true" :radius="true" :fontSize="30" @click="showAd">
		  <view class="tn-flex tn-flex-col-center">
		    <view
		      class="icon1__item--icon tn-flex tn-flex-row-center tn-flex-col-center" style="color: #7C8191;">
		      <view class="tn-icon-gift"></view>
		    </view>
		    <view class="tn-margin-left-sm tn-flex-1">赞赏支持</view>
		    <view class="tn-color-gray tn-icon-right"></view>
		  </view>
		</tn-list-cell>
		<!-- <tn-list-cell :hover="true" :unlined="true" :radius="true" :fontSize="30" @click="callPhoneNumber" data-number="18266666666">
		   <view class="tn-flex tn-flex-col-center">
		     <view
		       class="icon1__item--icon tn-flex tn-flex-row-center tn-flex-col-center" style="color: #7C8191;">
		       <view class="tn-icon-wechat-fill"></view>
		     </view>
		     <view class="tn-margin-left-sm tn-flex-1">试用系统</view>
		     <view
		       class="tn-margin-left-sm tn-color-wallpaper tn-text-sm tn-padding-left-xs tn-padding-right-xs tn-bg-gray--light tn-round">
		       b960519152</view>
		   </view>
		 </tn-list-cell> -->
      </view>
      
      <view class="wallpaper-shadow tn-margin-top-lg tn-margin-bottom-lg tn-padding-top-sm tn-padding-bottom-sm">
        <tn-list-cell :hover="true" :unlined="true" :radius="true" :fontSize="30">
          <button class="tn-flex tn-flex-col-center tn-button--clear-style" open-type="contact">
            <view
              class="icon1__item--icon tn-flex tn-flex-row-center tn-flex-col-center" style="color: #7C8191;">
              <view class="tn-icon-service-fill"></view>
            </view>
            <view class="tn-flex tn-flex-row-between" style="width: 100%;">
              <view class="tn-margin-left-sm">在线客服</view>
              <view class="tn-color-gray tn-icon-right"></view>
            </view>
          </button>
        </tn-list-cell>
        <tn-list-cell :hover="true" :unlined="true" :radius="true" :fontSize="30">
          <button class="tn-flex tn-flex-col-center tn-button--clear-style" open-type="feedback">
            <view
              class="icon1__item--icon tn-flex tn-flex-row-center tn-flex-col-center" style="color: #7C8191;">
              <view class="tn-icon-message-fill"></view>
            </view>
            <view class="tn-flex tn-flex-row-between" style="width: 100%;">
              <view class="tn-margin-left-sm">问题反馈</view>
              <view class="tn-color-gray tn-icon-right"></view>
            </view>
          </button>
        </tn-list-cell>
		<tn-list-cell :hover="true" :unlined="true" :radius="true" :fontSize="30" @tap="clearStorage">
		  <view class="tn-flex tn-flex-col-center">
		    <view
		      class="icon1__item--icon tn-flex tn-flex-row-center tn-flex-col-center" style="color: #7C8191;">
		      <view class="tn-icon-logout"></view>
		    </view>
		    <view class="tn-margin-left-sm tn-flex-1">清除缓存</view>
		    <view class="tn-color-gray tn-icon-right"></view>
		  </view>
		</tn-list-cell>
      </view>

    </view>
	<view class="b-tips">本系统由公众号[留白生财]提供技术支持</view>
    <view class='tn-tabbar-height'></view>
	<!-- 回到首页悬浮按钮-->
	<nav-index-button @showSubscribe="showSubscribe"></nav-index-button>
  </view>
</template>

<script>
	let videoAd = null;
  import NavIndexButton from '@/libs/components/nav-index-button-subscribe.vue'
  export default {
    name: 'Mine',
    data() {
      return {
      }
    },
	 components: { NavIndexButton },
	 created() {
	 	
	 },
    methods: {
		showAd(){
			if (wx.createRewardedVideoAd) {
			  videoAd = wx.createRewardedVideoAd({
			    adUnitId: 'adunit-752da0f5af187754'
			  })
			  videoAd.onLoad(() => {})
			  videoAd.onError((err) => {
			    console.error('激励视频光告加载失败', err)
			  })
			  videoAd.onClose((res) => {})
			}
			setTimeout(()=>{
				// 用户触发广告后，显示激励视频广告
				if (videoAd) {
				  videoAd.show().catch(() => {
				    // 失败重试
				    videoAd.load()
				      .then(() => videoAd.show())
				      .catch(err => {
				        console.error('激励视频 广告显示失败', err)
				      })
				  })
				}
			},1500)
			
		},
		showSubscribe(){
			this.$refs.toast.show({
				title: '',
				content: '订阅成功',
				icon: 'success',
				duration: 2000
			})
		},
		clearStorage(){
			// wx.navigateToMiniProgram({
			//   shortLink:'#小程序://空港乐购/9r9VgJ6jtJWjK4G',
			//   envVersion:'',
			//   extraData: {
			//     foo: 'bar'
			//   },
			//   // envVersion: 'develop',
			//   success(res) {
			//     // 打开成功
			// 	wx.showToast({
			// 	  title: '成功',
			// 	  icon: 'success',
			// 	  duration: 2000
			// 	})
			//   }
			// })
			// return;
			uni.clearStorageSync();
			this.$refs.toast.show({
				title: '',
				content:  '清除缓存!',
				icon: 'success',
				duration: 1500
			});
			setTimeout(()=>{
				uni.reLaunch({
					url:'../../pageA/login/login'
				})
			},1550)
		},
      // 跳转
      tn(e) {
        uni.navigateTo({
          url: e,
        });
      },
      //拨打固定电话
      callPhoneNumber() {
        // uni.makePhoneCall({
        //   phoneNumber: "18219128888",
        // });
		this.$commonFun.copyTxt('b960519152','微信');
      },
      // 复制开源地址
      copySource() {
        wx.vibrateShort();
        uni.setClipboardData({
          data: "https://ext.dcloud.net.cn/publisher?id=356088",
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  .page-e{
    max-height: 100vh;
  }
  /* 底部安全边距 start*/
  .tn-tabbar-height {
  	min-height: 20rpx;
  	height: calc(40rpx + env(safe-area-inset-bottom) / 2);
    height: calc(40rpx + constant(safe-area-inset-bottom));
  }
  
  .tn-color-wallpaper{
    color: #1D2541;
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

  /* 顶部背景图 start */
  .top-backgroup {
    height: 450rpx;
    z-index: -1;
  
    .backgroud-image {
      width: 100%;
      height: 450rpx;
      // z-index: -1;
    }
  }
  /* 顶部背景图 end */

  
  /* 图标容器5 start */
  .icon5 {
    &__item {
      // width: 30%;
      background-color: #FFFFFF;
      border-radius: 10rpx;
      padding: 0rpx;
      margin: 0rpx;
      transform: scale(1);
      transition: transform 0.3s linear;
      transform-origin: center center;
      
      &--icon {
        width: 96rpx;
        height: 96rpx;
        border-radius: 50%;
        margin-bottom: 18rpx;
        position: relative;
        z-index: 1;
      }
    }
  }  

  /* 用户头像 start */
  .logo-image {
    width: 110rpx;
    height: 110rpx;
    position: relative;
    overflow: hidden;
    border-radius: 50%;
  }

  .logo-pic {
    background-size: cover;
    background-repeat: no-repeat;
    // background-attachment:fixed;
    background-position: top;
    border: 8rpx solid rgba(255,255,255,0.05);
    box-shadow: 0rpx 0rpx 80rpx 0rpx rgba(0, 0, 0, 0.15);
    border-radius: 50%;
    overflow: hidden;
    // background-color: #FFFFFF;
  }

  /* 页面阴影 start*/
  .wallpaper-shadow {
    border-radius: 15rpx;
    box-shadow: 0rpx 0rpx 50rpx 0rpx rgba(0, 0, 0, 0.07);
  }

  /* 页面阴影 end*/
  
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
        width: 100rpx;
        height: 100rpx;
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
  
  /* 图标容器12 start */
  .tn-three{
      position: absolute;
      top: 50%;
      right: 50%;
      bottom: 50%;
      left: 50%;
      transform: translate(-38rpx, -16rpx) rotateX(30deg) rotateY(20deg) rotateZ(-30deg);
      text-shadow: -1rpx 2rpx 0 #f0f0f0, -2rpx 4rpx 0 #f0f0f0, -10rpx 20rpx 30rpx rgba(0, 0, 0, 0.2);
  }
  .icon20 {
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
        width: 100rpx;
        height: 100rpx;
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
          background-image: url(https://resource.tuniaokj.com/images/cool_bg_image/icon_bg.png);
        }
      }
    }
  }
  

/* 积分数字 */
  .button-number {
    width: 100%;
    height: 150rpx;
    border-radius: 15rpx;
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
      background-image: url(https://resource.tuniaokj.com/images/cool_bg_image/icon_bg.png);
    }    
  }
  

  /* 图标容器12 start */
  .icon12 {
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
        width: 15rpx;
        height: 15rpx;
        font-size: 50rpx;
        border-radius: 50%;
        margin-bottom: 38rpx;
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
  
  /* 图标容器1 start */
  .icon1 {
    &__item {
      // width: 30%;
      background-color: #FFFFFF;
      border-radius: 10rpx;
      padding: 30rpx;
      margin: 20rpx 10rpx;
      transform: scale(1);
      transition: transform 0.3s linear;
      transform-origin: center center;
  
      &--icon {
        width: 40rpx;
        height: 40rpx;
        font-size: 40rpx;
        border-radius: 50%;
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
          background-image: url(https://resource.tuniaokj.com/images/cool_bg_image/icon_bg.png);
        }
      }
    }
  }
  
  /* 图标容器1 end */
  .tn-bg-menu{
	  // background-image: url('https://resource.tuniaokj.com/images/my/my-bg4.png');
	  background-size: 100% 100%;
	 
  }
  .page-e{
	  background-image: url(https://resource.tuniaokj.com/images/my/my-bg4.png);
	  background-size: 100% 200px;
	  background-repeat: no-repeat;
  }
  .ulogo{
	  width: 110rpx;
	  height: 110rpx;
	  background-size: cover;
	  overflow: hidden;
  }
  .b-tips{
	  font-size: 24rpx;
	  text-align: center;
	  opacity: 0.5;
	  letter-spacing: 1rpx;
  }
</style>
