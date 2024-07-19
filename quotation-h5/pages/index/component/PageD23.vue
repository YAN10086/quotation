<template>
	<view class="message tn-safe-area-inset-bottom">

		<!-- 顶部自定义导航 -->
		<tn-nav-bar :isBack="false" :bottomShadow="false" backgroundColor="#FFFFFF">
			<view class="custom-nav tn-flex tn-flex-col-center tn-flex-row-left" @click="tn('/minePages/message')">
				<view class="custom-nav__back">
					<text class="tn-text-bold tn-text-xl tn-color-black">随笔分享</text>
				</view>
			</view>
		</tn-nav-bar>
		<!-- 搜索框 -->
		<view class="custom-nav__search tn-flex tn-flex-col-center tn-flex-row-center" @click="tn('/homePages/search')">
		  <view class="custom-nav__search__box tn-flex tn-flex-col-center tn-flex-row-left" style="background-color: rgba(230,230,230,0.3);">
		    <view class="custom-nav__search__icon tn-icon-search tn-color-white"></view>
		    <view class="custom-nav__search__text tn-padding-left-xs tn-color-white">搜索 图鸟模板</view>
		  </view>
		</view>

		<view class="" :style="{paddingTop: vuex_custom_bar_height + 'px'}">
			<view class="tn-margin wallpaper-shadow tn-padding" v-for="(item,index) in noticeList" :key="index" @tap="toArticleView(item)">
				<view class="tn-flex tn-flex-col-top">
					
					<view class="tn-padding-left-sm" style="width: 100%;">
						<view class="tn-flex tn-flex-row-between tn-flex-col-between">
							<view class="justify-content-item">
								<text class="tn-color-wallpaper tn-text-lg tn-text-bold">{{item.title}}</text>
							</view>
							<!-- <view class="justify-content-item tn-round tn-text-xs tn-bg-red--light tn-color-red" style="padding: 10rpx 20rpx;">
                删 除
              </view> -->
						</view>
						<view class=" tn-padding-top-xs">
							<text class="tn-color-gray">{{item.text}}</text>
						</view>
					</view>
				</view>
				<view class="tn-flex tn-flex-row-between tn-flex-col-between tn-margin-top-sm">
					<view class="justify-content-item tn-color-gray tn-text-center tn-color-gray">
						<text class="tn-icon-time tn-padding-right-xs tn-padding-left-xs tn-text-df"></text>
						<text class="tn-text-sm">{{filterDate(item.createDate)}}</text>
					</view>
					<view :class="['justify-content-item tn-round tn-text-xs',item.type == '1' ? 'tn-bg-orange--light tn-color-orange' : 'bg-blue color-blue']"
						style="padding: 5rpx 15rpx;">
						<text class="tn-padding-right-xs">{{item.type}}</text>
					</view>
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
				noticeList:[]
			}
		},
		 mounted() {
			this.selectArticle();
		},
		methods: {
			toArticleView(item){
				console.log('item',item);
				uni.navigateTo({
					url:'/pageA/articleView/articleView?id='+item.id
				})
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
			selectArticle() {
				let pdata = {
					url: '/article/selectArticle',
					data: {
						page: 1,
						pageSize: 500,
						tenantId: this.userInfo.tenantId,
						listFlag:1,
						enabled:1
					},
					method: 'POST'
				}
				this.$request(pdata).then((res) => {
					console.log("selectArticle", res);
					this.noticeList = res.data.data.list;
					
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
</style>