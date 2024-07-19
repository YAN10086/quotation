<template>
	<view class="pages-a">
		<!-- 顶部自定义导航 -->
		<tn-nav-bar :isBack="false" :bottomShadow="false" backgroundColor="none">
		  <view class="custom-nav tn-flex tn-flex-col-center tn-flex-row-left">
		    <view class="custom-nav__back">
		      <text class="tn-text-bold tn-text-xl tn-color-black">首页</text>
		    </view>
		  </view>
		</tn-nav-bar>
		
		<!-- 顶部自定义导航 -->
		<tn-toast ref="toast"></tn-toast>
		<view class="" :style="{paddingTop: vuex_custom_bar_height + 'px'}">
			<view class="tn-color-gray--dark"
				style="margin: 20rpx 30rpx 0 30rpx;border-radius: 100rpx;padding-left: 6rpx;background-color: rgba(248, 247, 248, 0.9);"
				@click="tn('/pageA/search/search')">
				<tn-notice-bar :list="searlist" mode="vertical" leftIconName="search" :duration="6000"></tn-notice-bar>
			</view>
			
			<view style="width: 90%;margin-left: 5%;margin-top:10px;">
				<tn-notice-bar :speed="140" @close="closeNotice" :closeBtn="true" :autoHidden="true" :list="noticeList" mode="horizontal" backgroundColor="#fab651" fontColor="#FFFFFF" :radius="10" ></tn-notice-bar>
			</view>
				
			
				<swiper class="card-swiper" :circular="true" :autoplay="true" duration="500" interval="8000"
					@change="cardSwiper">
					<swiper-item v-for="(item,index) in swiperList" :key="index" :class="cardCur==index?'cur':''">
						<view class="swiper-item image-banner"
							:style="'background-image:url('+ item.url + ');background-size: cover;border-radius: 15rpx;'">
						</view>
						<view class="swiper-item-text">
							<view class="tn-text-bold tn-color-white" style="font-size: 50rpx;">{{item.title}}</view>
							<view class="tn-color-white tn-padding-top" style="font-size: 30rpx;">{{item.name}}</view>
						</view>
					</swiper-item>
				</swiper>
				<view class="indication">
					<block v-for="(item,index) in swiperList" :key="index">
						<view class="spot" :class="cardCur==index?'active':''"></view>
					</block>
				</view>
			</view>


			<!-- 方式5，图片形式，安卓手机 start-->
			<view class="tn-flex tn-flex-wrap tn-padding-top home-shadow">
				<block v-for="(item, index) in icons1" :key="index">
					<view class="tn-margin-bottom tn-margin-top-sm" style="width: 25%;" @click="clickMenu(item)">
						<view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
							<view class="icon5__item--icon tn-flex tn-flex-row-center tn-flex-col-center"
								:style="'background-image:url('+ item.icon +');background-size:100% 100%;background-size: cover;'">
							</view>
							<view class="tn-color-black tn-text-center">
								<text class="tn-text-ellipsis">{{ item.title }}</text>
							</view>
						</view>
					</view>
				</block>
			</view>
			<!-- 方式5 end-->
			<view class="custom-nav__back" @tap="clickInfo">
				<text class="tn-text-bold tn-text-xl tn-color-black">热度查询</text>
			</view>
			<view class="">
				<view class="">
					<view class="" style="padding: 30rpx 20rpx;">
						<tn-waterfall ref="waterfall" v-model="list" @finish="handleWaterFallFinish">
							<template v-slot:left="{ leftList }">
								<view v-for="(item, index) in leftList" :key="item.id" class="wallpaper__item"
									@click="toDetail(item)">
									<view class="item__image">
										<tn-lazy-load :threshold="6000" height="100%" :image="item.goodsCover"
											:index="item.id" imgMode="widthFix"></tn-lazy-load>
									</view>
									<view class="item__data">
										<view class="item__title-container">
											<text class="item__title tn-color-black">{{ item.goodsName }}</text>
										</view>
										<view v-if="tags && tags.length > 0" class="item__tags-container">
											<view v-for="(tagItem, tagIndex) in tags" :key="tagIndex"
												class="item__tag">{{ tagItem }}</view>
										</view>

										<view class="tn-flex tn-flex-row-between tn-flex-col-center tn-padding-top-xs">
											<view class="justify-content-item">
												<view class="tn-flex tn-flex-col-center tn-flex-row-left">
													<view class="logo-pic">
														<view class="logo-image">
															<view class=""
																:style="'background-image:url('+ userImage +');width: 40rpx;height: 40rpx;background-size: cover;'">
															</view>
														</view>
													</view>
													<view class="tn-padding-left-xs">
														<text
															class="tn-color-gray tn-text-sm">￥{{ item.nearPrice}}</text>
													</view>

												</view>
											</view>
											<view class="justify-content-item">
												<text class="tn-icon-eye tn-color-gray tn-padding-right-xs"></text>
												<text class="tn-color-gray">{{ item.visitCount }}</text>
											</view>
										</view>
									</view>
								</view>
							</template>
							<template v-slot:right="{ rightList }">
								<view class="tn-color-black tn-text-bold tn-bg-yellow home-shadow"
									style="height: 160rpx;margin: 0 10rpx 20rpx 10rpx;border-radius: 10rpx;"
									@click="tn('/pageB/activity/activity')">
									<view class="tn-padding-left tn-padding-top-lg">
										我的 · 收藏
									</view>
									<view class="tn-padding-left tn-padding-top-xs">
										收藏的商品行情
										<text class="tn-icon-right tn-padding-left-xs"></text>
									</view>
								</view>
								<view v-for="(item, index) in rightList" :key="item.id" class="wallpaper__item"
									@click="toDetail(item)">
									<view class="item__image">
										<tn-lazy-load :threshold="6000" height="100%" :image="item.goodsCover"
											:index="item.id" imgMode="widthFix"></tn-lazy-load>
									</view>
									<view class="item__data">
										<view class="item__title-container">
											<text class="item__title tn-color-black">{{ item.goodsName }}</text>
										</view>
										<view class="item__tags-container">
											<view v-for="(tagItem, tagIndex) in tags" :key="tagIndex"
												class="item__tag">{{ tagItem }}</view>
										</view>
										<view class="tn-flex tn-flex-row-between tn-flex-col-center tn-padding-top-xs">
											<view class="justify-content-item">
												<view class="tn-flex tn-flex-col-center tn-flex-row-left">
													<view class="logo-pic">
														<view class="logo-image">
															<view class=""
																:style="'background-image:url('+ userImage +');width: 40rpx;height: 40rpx;background-size: cover;'">
															</view>
														</view>
													</view>
													<view class="tn-padding-left-xs">
														<text
															class="tn-color-gray tn-text-sm">￥{{ item.nearPrice }}</text>
													</view>

												</view>
											</view>
											<view class="justify-content-item">
												<text class="tn-icon-eye tn-color-gray tn-padding-right-xs"></text>
												<text class="tn-color-gray">{{ item.visitCount }}</text>
											</view>
										</view>
									</view>
								</view>
							</template>
						</tn-waterfall>
					</view>
					<tn-load-more :loadText="loadText"></tn-load-more>
				</view>
			</view>

		</view>
</template>

<script>
	export default {
		name: 'PagesA',
		data() {
			return {
				noticeList: [
				],
				 loadText: {
					loadmore: '已经到底了',
					loading: '快速加载中...',
					nomore: '已经没有了啊'
				  },
				icons1: [{
						icon: "http://img.acewb.com/baojia/imgs/huazhuangpin.png",
						title: "美妆行情",
						url: "/pageB/wallpaper/wallpaper"
					},
					{
						icon: "http://img.acewb.com/baojia/imgs/shouji.png",
						title: "数码行情",
						url: "/pageB/wallpaper/wallpaper"
					},
					{
						icon: "http://img.acewb.com/baojia/imgs/jiushui.png",
						title: "酒水行情",
						url: "/pageB/wallpaper/wallpaper"
					},
					{
						icon: "http://img.acewb.com/baojia/imgs/icon-test.png",
						title: "戴森游戏机",
						url: "/pageB/wallpaper/wallpaper"
					}
				],
				searlist: [
					'美妆行情参考',
					'酒水行情参考',
					'数码行情参考',
					'戴森游戏机行情参考'
				],
				cardCur: 0,
				isAndroid: true,
				swiperList: [],
				current: 0,
				scrollList: [{
						name: '推荐'
					},
					{
						name: '最新'
					},
					{
						name: '热门'
					}
				],
				userImage:'http://img.acewb.com/baojia/imgs/my-66.png',
				tags: [],
				/* 瀑布流*/
				list: [],
			}
		},
		created() {
			const systemInfo = uni.getSystemInfoSync()
			if (systemInfo.system.toLocaleLowerCase().includes('ios')) {
				this.isAndroid = false
			} else {
				this.isAndroid = true
			}
			
			if(!this.$store.state.userInfo){
				uni.showToast({
					title: '自动登录中',
					icon:'none',
					duration: 2000
				});
				setTimeout(()=>{
					uni.navigateTo({
						url:'/pageA/login/login'
					})
				},1000);
				return;
			}
			
			this.selectRecommendGoods();
			this.selectBanner();
			this.selectNoticeList();
			/* 瀑布流*/
			// this.getRandomData();
		},
		methods: {
			closeNotice(){
				this.noticeList = [];
			},
			getNearPrice(item){
				let priceList = JSON.parse(item.recyclingPriceList);
				let price = this.$commonFun.getNearNewPrice(priceList);
				return price;
			},
			clickInfo(){
				
			},
			toDetail(item){
				uni.navigateTo({
					url:'/pageA/photo/photo?id='+item.id
				})
			},
			clickMenu(item) {
				console.log(item);
				this.$emit('changeTabbar', 1);
				return;
				if (item.title == '美妆行情') {
					this.$emit('changeTabbar', 1);
				} else if (item.title == '数码行情') {
					this.$emit('changeTabbar', 1);
				}else{
					this.$refs.toast.show({
						title: '',
						content: item.title + '暂未开放',
						icon: 'tips',
						duration: 1500
					})
				}
			},
			selectBanner() {
				let pdata = {
					url: '/sys/getBanner',
					data: {
						tenantId: this.userInfo.tenantId,
					},
					method: 'POST'
				}
				this.$request(pdata).then((res) => {
					console.log("getNotice", res);
					this.swiperList = res.data.data;
				});
			},
			selectNoticeList() {
				let pdata = {
					url: '/sys/getNoticeBar',
					data: {
						tenantId: this.userInfo.tenantId,
					},
					method: 'POST'
				}
				this.$request(pdata).then((res) => {
					console.log("getNoticeBar", res);
					if(res.data.data.length > 0){
						this.noticeList = [res.data.data[0].text];
					}
				});
			},
			selectRecommendGoods(){
				let pdata = {
					url: '/goods/selectRecommendGoods',
					data: {
						page:1,
						pageSize:10,
						tenantId:this.userInfo.tenantId
					},
					method: 'POST'
				}
				this.$request(pdata).then((res) => {
					console.log("selectRecommendGoods", res);
					let {list} = res.data.data;
					for(let p=0;p<list.length;p++){
						let priceList = JSON.parse(list[p].recyclingPriceList);
						let price = this.$commonFun.getNearNewPrice(priceList);
						list[p].nearPrice = price;
					}
					this.list = list;
				});
			},
			// cardSwiper
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},
			// tab选项卡切换
			tabChange(index) {
				this.current = index
			},
			// 跳转
			tn(e) {
				uni.navigateTo({
					url: e,
				});
			},
			handleWaterFallFinish() {
				console.log("1");
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pages-a {
		max-height: 100vh;
	}


	/* 自定义导航栏内容 start */
	.custom-nav {
		height: 100%;

		&__back {
			margin: auto 5rpx;
			font-size: 50rpx;
			margin-right: 10rpx;
			margin-left: 30rpx;
			flex-basis: 5%;
		}
	}

	/* 底部安全边距 start*/
	.tn-tabbar-height {
		min-height: 120rpx;
		height: calc(140rpx + env(safe-area-inset-bottom) / 2);
		height: calc(140rpx + constant(safe-area-inset-bottom));
	}

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

	/* 轮播视觉差 start */
	.card-swiper {
		height: 330rpx !important;
	}

	.card-swiper swiper-item {
		width: 750rpx !important;
		left: 0rpx;
		box-sizing: border-box;
		padding: 40rpx 30rpx 30rpx 30rpx;
		overflow: initial;
	}

	.card-swiper swiper-item .swiper-item {
		width: 100%;
		display: block;
		height: 100%;
		border-radius: 15rpx;
		transform: scale(1);
		transition: all 0.2s ease-in 0s;
		will-change: transform;
		// overflow: hidden;
	}

	.card-swiper swiper-item.cur .swiper-item {
		transform: none;
		transition: all 0.2s ease-in 0s;
		will-change: transform;
	}

	.card-swiper swiper-item .swiper-item-text {
		margin-top: -220rpx;
		text-align: center;
		width: 100%;
		display: block;
		border-radius: 10rpx;
		transform: translate(100rpx, 0rpx) scale(0.9, 0.9);
		transition: all 0.6s ease 0s;
		will-change: transform;
		overflow: hidden;
	}

	.card-swiper swiper-item.cur .swiper-item-text {
		margin-top: -220rpx;
		width: 100%;
		transform: translate(0rpx, 0rpx) scale(0.9, 0.9);
		transition: all 0.6s ease 0s;
		will-change: transform;
	}

	.image-banner {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.image-banner image {
		width: 100%;
		height: 100%;
	}

	/* 轮播指示点 start*/
	.indication {
		z-index: 9999;
		width: 100%;
		height: 36rpx;
		position: absolute;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.spot {
		background-color: #FFFFFF;
		opacity: 0.6;
		width: 10rpx;
		height: 10rpx;
		border-radius: 20rpx;
		top: -70rpx;
		margin: 0 8rpx !important;
		position: relative;
	}

	.spot.active {
		opacity: 1;
		width: 30rpx;
		background-color: #FFFFFF;
	}


	/* 胶囊banner*/
	.image-capsule {
		padding: 100rpx 0rpx;
		font-size: 40rpx;
		font-weight: 300;
		position: relative;
	}

	.image-piccapsule {
		background-size: cover;
		background-repeat: no-repeat;
		// background-attachment:fixed;
		background-position: top;
		border-radius: 20rpx 20rpx 0 0;
	}

	/* 用户头像 start */
	.logo-image {
		width: 40rpx;
		height: 40rpx;
		position: relative;
	}

	.logo-pic {
		background-size: cover;
		background-repeat: no-repeat;
		// background-attachment:fixed;
		background-position: top;
		border: 1rpx solid rgba(255, 255, 255, 0.05);
		// box-shadow: 0rpx 0rpx 80rpx 0rpx rgba(0, 0, 0, 0.15);
		border-radius: 50%;
		overflow: hidden;
		// background-color: #FFFFFF;
	}

	/* 瀑布流*/
	.wallpaper__item {
		background-color: #FFFFFF;
		overflow: hidden;
		margin: 0 10rpx;
		margin-bottom: 40rpx;
		// box-shadow: 0rpx 0rpx 30rpx 0rpx rgba(0, 0, 0, 0.07);

		.item {

			/* 图片 start */
			&__image {
				width: 100%;
				height: auto;
				background-color: #FFFFFF;
				border: 1rpx solid #F8F7F8;
				border-radius: 10rpx;
				overflow: hidden;
			}

			/* 图片 end */

			/* 内容 start */
			&__data {
				padding: 14rpx 0rpx;
			}

			/* 标题 start */
			&__title-container {
				text-align: justify;
				line-height: 38rpx;
				vertical-align: middle;
			}

			&__title {
				font-size: 30rpx;
			}

			/* 标题 end */

			/* 标签 start */
			&__tags-container {
				display: flex;
				flex-direction: row;
				flex-wrap: nowrap;
				align-items: center;
				justify-content: flex-start;
			}

			&__tag {
				margin: 10rpx;
				color: #7C8191;
				background-color: #F3F2F7;
				padding: 4rpx 14rpx 6rpx;
				border-radius: 10rpx;
				font-size: 20rpx;

				&:first-child {
					margin-left: 0rpx !important;
				}
			}

			/* 标签 end */

			/* 内容 end */
		}
	}
</style>