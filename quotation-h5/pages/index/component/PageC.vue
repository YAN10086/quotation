<template>
	<view class="message tn-safe-area-inset-bottom">

		<!-- 顶部自定义导航 -->
		<tn-nav-bar :isBack="false" :bottomShadow="false" backgroundColor="#FFFFFF">
			<view class="custom-nav tn-flex tn-flex-col-center tn-flex-row-left" @click="tn('/minePages/message')">
				<view class="custom-nav__back">
					<text class="tn-text-bold tn-text-xl tn-color-black">{{xianbaoInfo.enabled == '1' ? '线报交流' : '合作交流'}}</text>
					<text class="tn-text-bold tn-text-xl  title-mar hlw" @tap="toDetail(1)" v-if="xianbaoInfo.enabled == '1'">葫芦娃茅台</text>
					<text class="tn-text-bold tn-text-xl  title-mar hlw" @tap="toDetail(2)" v-if="xianbaoInfo.enabled == '1'">纪念币</text>
					<!-- <text class="tn-text-bold tn-text-xl  title-mar xm" @tap="toDetail(2)">项目分享</text> -->
				</view>
			</view>
		</tn-nav-bar>
		<view class="" :style="{paddingTop: vuex_custom_bar_height + 'px'}">

			
			<view class="tn-margin wallpaper-shadow tn-padding" v-if="xianbaoInfo.enabled == '1'">
				<view class="tn-flex" style="flex-direction: column;">
					<view style="font-weight: bold;font-size: 32rpx;letter-spacing: 1rpx;">{{xianbaoInfo.jijianTitle}}</view>
					<view style="color: gray;margin: 10px 5px;letter-spacing: 1px;">{{xianbaoInfo.jijianUserInfo}}</view>
					<view style="color: gray;margin: 0px 5px;letter-spacing: 1px">{{xianbaoInfo.jijianAddress}}</view>
				</view>
				<view style="width: 100%;display: flex;justify-content:flex-end;" >
					<tn-button backgroundColor="#55bbea" fontColor="#fff" @tap="copyInfo">复制信息</tn-button>
				</view>
			</view>
			
			
			<view class="tn-margin wallpaper-shadow tn-padding" v-if="xianbaoInfo.enabled == '1'">
				<view class="tn-flex" style="flex-direction: column;">
					<view style="font-weight: bold;font-size: 32rpx;letter-spacing: 1rpx;">{{xianbaoInfo.qunTitle}}</view>
					<view style="margin: 10rpx auto;">
						<image :src="xianbaoInfo.qunImg" style="width: 380rpx;height: 380rpx;" show-menu-by-longpress="true"></image>
					</view>
					<view style="color: gray;text-align: center;">{{xianbaoInfo.qunText}}</view>
				</view>
			</view>
			
			<view class="tn-margin wallpaper-shadow tn-padding" v-if="xianbaoInfo.enabled == '1'">
				<view class="tn-flex" style="flex-direction: column;">
					<view style="font-weight: bold;font-size: 32rpx;letter-spacing: 1rpx;">{{xianbaoInfo.qunTitle2}}</view>
					<view style="margin: 10rpx auto;">
						<image :src="xianbaoInfo.qunImg2" style="width: 380rpx;height: 380rpx;" show-menu-by-longpress="true"></image>
					</view>
					<view style="color: gray;text-align: center;">{{xianbaoInfo.qunText2}}</view>
				</view>
			</view>
			
			<view class="tn-margin wallpaper-shadow tn-padding" >
				<view class="tn-flex" style="flex-direction: column;">
					<view style="font-weight: bold;font-size: 32rpx;letter-spacing: 1rpx;">{{xianbaoInfo.enabled == '1' ? xianbaoInfo.kefuTitle : '作者微信'}}</view>
					<view style="margin: 0 auto;">
						<image :src="xianbaoInfo.kefuImg"  style="width: 380rpx;height: 380rpx;" show-menu-by-longpress="true"></image>
					</view>
					<view style="color: gray;text-align: center;">{{xianbaoInfo.kefuText}}</view>
				</view>
			</view>
		</view>

		<view class="tn-tabbar-height"></view>

	</view>
</template>

<script>
	export default {
		name: 'Message',
		data() {
			return {
				xianbaoInfo:'',
				list: [{
				            name: '搜索行情',
							icon: 'search',
							selectIcon: 'search'
				          },
				          {
				            name: '选择商品',
				            icon: 'shop',
				            selectIcon: 'shop-fill'
				          },
				          {
				            name: '填写报单',
				            icon: 'edit-write',
				            selectIcon: 'edit-write-fill'
				          },
				          {
				            name: '等待打款',
				            icon: 'money',
				            selectIcon: 'money'
				          }
				        ]
			}
		},
		 mounted() {
			this.selectNotice();
		},
		methods: {
			copyInfo(){
				this.$commonFun.copyTxt(this.xianbaoInfo.jijianUserInfo + this.xianbaoInfo.jijianAddress);
			},
			copyText(item){
				this.$commonFun.copyTxt(item.text);
			},
			filterDate(v){
				return this.$commonFun.longtimeToStr(v*1);
			},
			// 跳转
			tn(e) {
				uni.navigateTo({
					url: e,
				});
			},
			toDetail(e){
				if(e == '1'){
					uni.navigateTo({ 
						url:'/pageA/hlw/hlw',
					});
				}
				if(e == '2'){
					uni.navigateTo({
						url:'/pageA/jinianbi/jinianbi'
					})
				}
			},
			selectNotice() {
				let pdata = {
					url: '/sys/getXianbao',
					data: {
						tenantId: this.userInfo.tenantId,
					},
					method: 'POST'
				}
				this.$request(pdata).then((res) => {
					console.log("getXianbao", res);
					this.xianbaoInfo = res.data.data[0];
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
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
	.title-mar{
		margin-left: 20rpx;
	}
	.hlw{
		color:red;
	}
	.xm{
		color:#17a31c;
	}
</style>