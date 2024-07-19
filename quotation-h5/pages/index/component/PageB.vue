<template>
  <view class="page-b">
    <tn-toast ref="toast"></tn-toast>
    <!-- 顶部自定义导航 -->
    <tn-nav-bar :isBack="false" :bottomShadow="false" backgroundColor="none">
      <view class="custom-nav tn-flex tn-flex-col-center tn-flex-row-left">
        <view class="custom-nav__back">
			<!-- <text class="tn-text-bold tn-text-xl tn-color-black">行情参考</text> -->
          <text :class="[activeIndex == '1' ? 'active-color' : '','tn-text-bold tn-text-xl tn-color-black top-menu']" @tap="clickMenu(1)">美妆</text>
		  <text :class="[activeIndex == '2' ? 'active-color' : '','tn-text-bold tn-text-xl tn-color-black top-menu']" @tap="clickMenu(2)">数码</text>
		  <text :class="[activeIndex == '3' ? 'active-color' : '','tn-text-bold tn-text-xl tn-color-black top-menu']" @tap="clickMenu(3)">戴森</text>
		  <text :class="[activeIndex == '4' ? 'active-color' : '','tn-text-bold tn-text-xl tn-color-black top-menu']" @tap="clickMenu(4)">游戏机</text>
		   <text :class="[activeIndex == '5' ? 'active-color' : '','tn-text-bold tn-text-xl tn-color-black top-menu']" @tap="clickMenu(5)">酒水</text>
			<!-- <text class="tn-text-bold tn-text-xl tn-color-black top-menu" style="position: relative;">
				<view style="width: 10px;height: 10px;border-radius: 50%;background-color: red;position: absolute;right: 5px;top:-21px"></view>
			</text> -->
		</view>
      </view>
    </tn-nav-bar>
    
    <view class="tn-classify__wrap" :style="{paddingTop: vuex_custom_bar_height + 'px'}">
      <!-- 搜索框 -->
      <view class="tn-classify__search--wrap" style="padding-right: 20rpx; margin-top: 20rpx;padding-bottom: 20rpx;display: flex;align-items: center;justify-content: center;">
        <view class="tn-color-gray--dark" style="width: 70%; margin: 0rpx 30rpx 0rpx 30rpx;border-radius: 100rpx;padding-left: 6rpx;background-color: rgba(248, 247, 248, 0.9);" @click="toSearch()">
          <tn-notice-bar :list="searlist" mode="vertical" leftIconName="search" :duration="6000"></tn-notice-bar>
        </view>
		<tn-button backgroundColor="#f7ab3c" fontColor="#ffffff" style="width: 300rpx;" @tap="showSubscribe"> 订阅价格更新</tn-button>
      </view>
      <!-- 分类列表和内容 -->
      <view class="tn-classify__container">
        <view class="tn-classify__container__wrap tn-flex tn-flex-nowrap tn-flex-row-around tn-bg-white">
          <!-- 左边容器 -->
          <scroll-view class="tn-classify__left-box left-width" :scroll-top="leftScrollViewTop" scroll-y scroll-with-animation :style="{height: scrollViewHeight + 'px'}">
            <view
              v-for="(item, index) in tabbar"
              :key="index"
              :id="`tabbar_item_${index}`"
              class="tn-classify__tabbar__item tn-flex tn-flex-col-center tn-flex-row-center"
              :class="[tabbarItemClass(index)]"
              @tap.stop="clickClassifyNav(index)">
              <view :class="['tn-classify__tabbar__item__title',activeIndex == '2' ? 'sm-menu-name': '']">{{ item.name }}</view>
            </view>
          </scroll-view>
          
          <!-- 右边容器 美妆 -->
          <scroll-view class="tn-classify__right-box" scroll-y :scroll-top="rightScrollViewTop" :style="{height: scrollViewHeight + 'px'}" v-if="activeIndex == '1'">
            <block v-if="classifyContent.subClassify && classifyContent.subClassify.length > 0">
              <view class="tn-classify__content">
                
                <!-- 分类内容子栏目 -->
                <view v-for="(item,index) in classifyContent.subClassify" :key="index" class="tn-classify__content__sub-classify">
                  <view class="tn-classify__content__sub-classify--title tn-text-lg tn-padding-top-sm">{{ item.title.name }}</view>
                  
                  <view class="tn-classify__content__sub-classify__content tn-flex tn-flex-wrap tn-flex-col-center tn-flex-row-left flex-imgs">
                    <view
                      v-for="(sub_item,sub_index) in item.classify"
                      :key="sub_index"
                      class="tn-classify__content__sub-classify__content__item tn-flex tn-flex-wrap tn-flex-row-center"
                    >
                      <view class="tn-classify__content__sub-classify__content__image tn-flex tn-flex-col-center tn-flex-row-center" @click="tn(sub_item)">
                        <image :src="sub_item.image" mode="aspectFill"></image>
                      </view>
                      <!-- 标题，有需要可以显示出来 -->
                      <view class="tn-classify__content__sub-classify__content__title tn-margin-top-xs tn-margin-bottom-sm">{{ sub_item.title }} </view>
                    </view>
                  </view>
                </view>
              </view>
              
            </block>
          </scroll-view>
		  
		   <!-- 右边容器 手机 -->
		  <scroll-view class="tn-classify__right-box" scroll-y :scroll-top="rightScrollViewTop" :style="{height: scrollViewHeight + 'px'}" v-if="activeIndex == '2'">
		    <block v-if="classifyContent.subClassify && classifyContent.subClassify.length > 0">
		      <view class="tn-classify__content">
		        <!-- 分类内容子栏目 -->
		        <view v-for="(item,index) in classifyContent.subClassify" :key="index" class="tn-classify__content__sub-classify">
		          <view class="tn-classify__content__sub-classify--title tn-text-lg tn-padding-top-sm">{{ item.title.name }}</view>
		          
		          <view class="tn-classify__content__sub-classify__content tn-flex tn-flex-wrap tn-flex-col-center tn-flex-row-left flex-imgs">
		            <view
		              v-for="(sub_item,sub_index) in item.classify"
		              :key="sub_index"
		              class="tn-classify__content__sub-classify__content__item tn-flex tn-flex-wrap sm-wrap"
					  style="width: 100%;"
		            >
		              <!-- <view class="tn-classify__content__sub-classify__content__image tn-flex tn-flex-col-center tn-flex-row-center" @click="tn(sub_item)">
		                <image :src="sub_item.image" mode="aspectFill"></image>
		              </view> -->
		              <!-- 标题，有需要可以显示出来 -->
		              <view class="tn-classify__content__sub-classify__content__title tn-margin-top-xs tn-margin-bottom-sm sm-view"  @click="tn(sub_item)" style="display: flex;width: 100%;justify-content: space-between;padding-right: 10px;">
						  <view>{{ sub_item.title }}</view>
						  <view v-if="sub_item.nowPrice =='0'" style="color:#c6c6c6">未更新 ></view>
						  <view v-else style="color: #ff6000;">￥{{sub_item.nowPrice}} ></view>
						  
					  </view>
					 
					  <view v-if="sub_item.dis == '1'" class="dis-bt">x</view>
		            </view>
		          </view>
		        </view>
		      </view>
		      
		    </block>
		  </scroll-view>
		  
		  
		  <!-- 右边容器  戴森-->
		  <scroll-view class="tn-classify__right-box" scroll-y :scroll-top="rightScrollViewTop" :style="{height: scrollViewHeight + 'px'}" v-if="activeIndex == '3'">
		    <block v-if="classifyContent.subClassify && classifyContent.subClassify.length > 0">
		      <view class="tn-classify__content">
		        <!-- 分类内容子栏目 -->
		        <view v-for="(item,index) in classifyContent.subClassify" :key="index" class="tn-classify__content__sub-classify">
		          <view class="tn-classify__content__sub-classify--title tn-text-lg tn-padding-top-sm">{{ item.title.name }}</view>
		          
		          <view class="tn-classify__content__sub-classify__content tn-flex tn-flex-wrap tn-flex-col-center tn-flex-row-left flex-imgs">
		            <view
		              v-for="(sub_item,sub_index) in item.classify"
		              :key="sub_index"
		              class="tn-classify__content__sub-classify__content__item tn-flex tn-flex-wrap sm-wrap"
		  					  style="width: 100%;"
		            >
		              <!-- 标题，有需要可以显示出来 -->
		              <view class="tn-classify__content__sub-classify__content__title tn-margin-top-xs tn-margin-bottom-sm sm-view"  @click="tn(sub_item)" style="display: flex;width: 100%;justify-content: space-between;padding-right: 10px;">
		  						  <view>{{ sub_item.title }}</view>
		  						  <view v-if="sub_item.nowPrice =='0'" style="color:#c6c6c6">未更新 ></view>
		  						  <view v-else style="color: #ff6000;">￥{{sub_item.nowPrice}} ></view>
		  						  
		  					  </view>
		  					 
		  					  <view v-if="sub_item.dis == '1'" class="dis-bt">x</view>
		            </view>
		          </view>
		        </view>
		      </view>
		      
		    </block>
		  </scroll-view>
		  
		  
		  <!-- 右边容器  游戏机-->
		  <scroll-view class="tn-classify__right-box" scroll-y :scroll-top="rightScrollViewTop" :style="{height: scrollViewHeight + 'px'}" v-if="activeIndex == '4'">
		    <block v-if="classifyContent.subClassify && classifyContent.subClassify.length > 0">
		      <view class="tn-classify__content">
		        <!-- 分类内容子栏目 -->
		        <view v-for="(item,index) in classifyContent.subClassify" :key="index" class="tn-classify__content__sub-classify">
		          <view class="tn-classify__content__sub-classify--title tn-text-lg tn-padding-top-sm">{{ item.title.name }}</view>
		          
		          <view class="tn-classify__content__sub-classify__content tn-flex tn-flex-wrap tn-flex-col-center tn-flex-row-left flex-imgs">
		            <view
		              v-for="(sub_item,sub_index) in item.classify"
		              :key="sub_index"
		              class="tn-classify__content__sub-classify__content__item tn-flex tn-flex-wrap sm-wrap"
		  					  style="width: 100%;"
		            >
		              <!-- 标题，有需要可以显示出来 -->
		              <view class="tn-classify__content__sub-classify__content__title tn-margin-top-xs tn-margin-bottom-sm sm-view"  @click="tn(sub_item)" style="display: flex;width: 100%;justify-content: space-between;padding-right: 10px;">
		  						  <view>{{ sub_item.title }}</view>
		  						  <view v-if="sub_item.nowPrice =='0'" style="color:#c6c6c6">未更新 ></view>
		  						  <view v-else style="color: #ff6000;">￥{{sub_item.nowPrice}} ></view>
		  						  
		  					  </view>
		  					 
		  					  <view v-if="sub_item.dis == '1'" class="dis-bt">x</view>
		            </view>
		          </view>
		        </view>
		      </view>
		      
		    </block>
		  </scroll-view>
		  
		  
        </view>
      </view>
    </view>
	
	<tn-popup mode="center" v-model="show" width="85%">
	  <view class="content">
		  <view style="margin: 10px;text-align: center;font-size: 18px;font-weight: bold;letter-spacing: 1px;color:#ff6000">酒水行情报价</view>
		  <view class="dx-img">
			  <image  mode="aspectFit"  src='http://img.acewb.com/baojia/jiushui/dx_20240317170601.jpg' show-menu-by-longpress="true"></image>
		  </view>
	   <view class="confrim-btn" style="padding: 10px;letter-spacing: 1px;">
	      <!-- <tn-button backgroundColor="#01BEFF" fontColor="#080808">自定义颜色按钮</tn-button> -->
		  <view>酒水报价<text style="color:#ff6000">长按识别上方二维码</text>，登录查看。</view>
	    </view>
	  </view>
	</tn-popup>
	
	
  </view>
</template>

<script>
  export default {
    name: 'templateShopClassify',
    data() {
      return {
        searlist: [
          'SKII神仙水330ML',
          'CPB长管隔离37ML',
          '黛珂美白AQ水乳套',
          '资生堂悦微水乳套装（滋润）'
        ],
        // 侧边栏分类数据
        tabbar: [],
        // 分类里面的内容信息
        classifyContent: {
          // 每个子栏目下的内容
          subClassify: [
            {
              title: '',
              classify: []
            }
          ]
        },
        // 分类菜单item的信息
        tabbarItemInfo: [],
        // scrollView的top值
        scrollViewBasicTop: 0,
        // scrollView的高度
        scrollViewHeight: 0,
        // 左边scrollView的滚动高度
        leftScrollViewTop: 0,
        // 右边scrollView的滚动高度
        rightScrollViewTop: 0,
        // 当前选中的tabbar序号
        currentTabbarIndex: 0,
		bid:'',
		activeIndex:1,
		show:false
      }
    },
    computed: {
      tabbarItemClass() {
        return index => {
          if (index === this.currentTabbarIndex) {
            return 'tn-classify__tabbar__item--active tn-bg-white'
          } else {
            let clazz = 'tn-bg-gray--light'
            if (this.currentTabbarIndex > 0 && index === this.currentTabbarIndex - 1) {
              clazz += ' tn-classify__tabbar__item--active--prev'
            }
            if (this.currentTabbarIndex < this.tabbar.length && index === this.currentTabbarIndex + 1) {
              clazz += ' tn-classify__tabbar__item--active--next'
            }
            return clazz
          }
        }
      }
    },
     mounted(op) {
	  console.log(111);
      this.initLoad();
    },
    methods: {
		showSubscribe(){
			uni.requestSubscribeMessage({
				// 模板id：可以在微信公众平台 -> 功能 -> 订阅信息进行选择
				tmplIds: ['b2UCojpbQaLYsLKan4yTIYdKvMHWtQa9VtZBVzBQrzk'],
				success: res => {
					console.log('res',res);
					 this.$refs.toast.show({
					 	title: '',
					 	content: '订阅成功',
					 	icon: 'success',
					 	duration: 2000
					 })
				},
				fail: err => {
					console.log('err',err);
				}
			})
		},
		initLoad(){
			this.$nextTick(() => {
				this.selectGoodsBrands();
				this.getScrollViewInfo();
				this.getTabbarItemRect();
			})
		},
		clickMenu(index){
			if(index == '5'){
				let url = 'http://img.acewb.com/baojia/jiushui/dx_20240317170601.jpg';
				this.show = true;
				return;
			}
			this.activeIndex = index;
			this.currentTabbarIndex = 0;
			this.bid = null;
			this.selectGoodsBrands();
		},
		selectGoodsByBid(){
			let url = '';
			if(this.activeIndex == '1'){	//美妆
				url = '/goods/selectGoodsByBid';
			}else if(this.activeIndex == '2'){	//数码
				url = '/digital/selectGoodsByBid';
			}else if(this.activeIndex == '3'){	//戴森
				url = '/daisen/selectGoodsByBid';	
			}else if(this.activeIndex == '4'){	//游戏机
				url = '/youxiji/selectGoodsByBid';
			}
			let pdata = {
				url: url,
				data: {
					bid:this.bid || this.tabbar[0].id,
					tenantId:this.userInfo.tenantId
				},
				method: 'POST'
			}
			this.$request(pdata).then((res) => {
				console.log("selectGoodsByBid", res);
				let rData = res.data.data;
				let datas = [];
				for(let p=0;p<rData.length;p++){
					let obj = {
						image: this.activeIndex == '1' ?  rData[p].goodsCover : '',
						title:rData[p].goodsName,
						bid:rData[p].bid,
						id:rData[p].id,
						recyclingPrice:rData[p].recyclingPrice,
						dis:rData[p].dis,
					}
					
					let priceList = JSON.parse(rData[p].recyclingPriceList); //获取价格字段
					let price = this.$commonFun.getNearNewPrice(priceList,'newPrice');
					obj.nowPrice = price;
					datas.push(obj);
				}
				let classifyContent =  {
				  subClassify: [
				    {
				      title:this.tabbar[this.currentTabbarIndex],
				      classify: datas
				    }
				  ]
				}
				this.classifyContent = classifyContent;
			});
		},
		selectGoodsBrands(){
			let pdata = {
				url: '/goods/selectGoodsBrands',
				data: {
					category:this.activeIndex
				},
				method: 'POST'
			}
			this.$request(pdata).then((res) => {
				console.log("res-------selectGoodsBrands------", res);
				this.tabbar = res.data.data;
				// this.currentTabbarIndex = this.tabbar[0].id;
				console.log('this.tabbar[0]',this.tabbar[0].id)
				this.selectGoodsByBid();
			});
		},
      // 跳转
      tn(e) {
		  console.log(e);
		  let gname = this.tabbar[this.currentTabbarIndex].name;
		  if(this.activeIndex == '2'){
			  gname =  '手机 ' + this.tabbar[this.currentTabbarIndex].name + ' '+e.title ;
		  }
		  if(this.activeIndex == '3'){
			  gname =  '戴森 ' + this.tabbar[this.currentTabbarIndex].name + e.title ;
		  }
		  if(this.activeIndex == '4'){
			  gname =  '游戏机 ' + this.tabbar[this.currentTabbarIndex].name + e.title ;
		  }
      	uni.navigateTo({
      		url: '/pageA/photo/photo?id='+e.id+'&activeIndex='+this.activeIndex+'&gname='+gname,
      	});
      },
      toSearch(){
		  uni.navigateTo({
		  	url: '/pageA/search/search'
		  });
	  },
      // 获取scrollView的高度信息
      getScrollViewInfo() {
        // 获取搜索栏的bottom信息，然后用整个屏幕的可用高度减去bottom的值即可获取scrollView的高度(防止双重滚动)
        this._tGetRect('.tn-classify__search--wrap').then((rect) => {
          // 如果获取失败重新获取
          if (!rect) {
            setTimeout(() => {
              this.getScrollViewInfo()
            }, 10)
            return
          }
          // 获取当前屏幕的可用高度
          const systemInfo = uni.getSystemInfoSync()
          this.scrollViewBasicTop = systemInfo.statusBarHeight + rect.bottom + uni.upx2px(10)
          this.scrollViewHeight = systemInfo.safeArea.height + systemInfo.statusBarHeight - rect.bottom - uni.upx2px(10) - 49
        })
      },
      // 获取分类菜单每个item的信息
      getTabbarItemRect() {
        let view = uni.createSelectorQuery().in(this)
        for (let i = 0; i < this.tabbar.length; i++) {
          view.select('#tabbar_item_' + i).boundingClientRect()
        }
        view.exec(res => {
          if (!res.length) {
            setTimeout(() => {
              this.getTabbarItemRect()
            }, 10)
            return
          }
          
          // 将每个分类item的相关信息
          res.map((item) => {
            this.tabbarItemInfo.push({
              top: item.top,
              height: item.height
            })
          })
        })
      },
      // 点击了分类导航
      clickClassifyNav(index) {
        if (this.currentTabbarIndex === index) {
          return
        }
        this.currentTabbarIndex = index
        this.handleLeftScrollView(index)
        this.switchClassifyContent();
		this.bid = this.tabbar[index].id;
		this.selectGoodsByBid();
      },
      // 点击分类后，处理scrollView滚动到居中位置
      handleLeftScrollView(index) {
        const tabbarItemTop = this.tabbarItemInfo[index].top - this.scrollViewBasicTop
        if (tabbarItemTop > this.scrollViewHeight / 2) {
          this.leftScrollViewTop = tabbarItemTop - (this.scrollViewHeight / 2) + this.tabbarItemInfo[index].height
        } else {
          this.leftScrollViewTop = 0
        }
      },
      // 切换对应分类的数据
      switchClassifyContent() {
        this.rightScrollViewTop = 1
        this.$nextTick(() => {
          this.rightScrollViewTop = 0
        })
        this.classifyContent.subClassify[0].title = this.tabbar[this.currentTabbarIndex]
      }
    }
  }
</script>

<style lang="scss" scoped>
  .page-b {
    max-height: 100vh;
    }
  
  /* 自定义导航栏内容 start */
  .custom-nav {
    height: 100%;
    
    &__back {
      margin: auto 30rpx;
      margin-right: 10rpx;
      flex-basis: 5%;
      width: 100rpx;
      position: absolute;
    }
  }

  
  .left-width {
    flex-basis: 28%;
  }
  
  /* 自定义导航栏内容 end */
  .tn-classify {
    
    /* 搜索栏 start */
    &__search {
      &--wrap {
      }
      
      &__box {
        flex: 1;
        text-align: center;
        padding: 20rpx 30rpx;
        margin: 0 30rpx;
        border-radius: 60rpx;
        font-size: 30rpx;
      }
      
      &__icon {
        padding-right: 10rpx;
      }
      &__text {
        padding-right: 10rpx;
      }
    }
    /* 搜索栏 end */
    
    /* 分类列表和内容 strat */
    &__container {
    }
    
    &__left-box {
      
    }
    
    &__right-box {
      background-color: #FFFFFF;
    }
    /* 分类列表和内容 end */
    
    /* 侧边导航 start */
    &__tabbar {
      &__item {
        height: 110rpx;
        
        &:first-child {
          border-top-right-radius: 0rpx;
        }
        
        &:last-child {
          border-bottom-right-radius: 0rpx;
        }
        
        &--active {
          background-color: #FFFFFF;
          position: relative;
          // font-weight: bold;
          color: #3668FC;
          
          &::before {
            content: '';
            position: absolute;
            width: 12rpx;
            height: 40rpx;
            top: 50%;
            left: 0;
            background-color: #3668FC;
            border-radius: 12rpx;
            transform: translateY(-50%) translateX(-50%);
          }
          
          &--prev {
            border-bottom-right-radius: 26rpx;
          }
          
          &--next {
            border-top-right-radius: 26rpx;
          }
        }
      }
    }
    /* 侧边导航 end */
    
    /* 分类内容 start */
    &__content {
      margin: 18rpx;
      
      /* 推荐商品 start */
      &__recomm {
        margin-bottom: 40rpx;
        
        &__swiper {
          
        }
      }
      /* 推荐商品 end */
      
      /* 子栏目 start */
      &__sub-classify {
        margin-bottom: 20rpx;
        padding-bottom: 40rpx;
        
        &--title {
          font-weight: bold;
          margin-bottom: 18rpx;
        }
        
        &__content {
          
          &__item {
            width: 50%;
          }
          
          &__image {
            background-color: rgba(188, 188, 188, 0.1);
            border-radius: 10rpx;
            margin: 10rpx 10rpx 0 10rpx;
            margin-left: 0;
            width: 100%;
            height: 340rpx;
            overflow: hidden;
            border: 1rpx solid rgba(0,0,0,0.02);
            
            image {
              width: 100%;
              height: 340rpx;
            }
          }
          
          &__title {
            margin-right: 10rpx;
          }
        }
      }
      /* 子栏目 end */
    }
    /* 分类内容 end */
  }
  .tn-classify__content__sub-classify__content__item{
	  width: 46%;
	  margin-left: 2%;
  }
  .flex-imgs{
	  justify-content: flex-start;
  }
  .top-menu{
	  display: inline-block;
	  margin-left: 20rpx;
  }
  .active-color{
	  color:#3668FC !important;
  }
  .sm-menu-name{
	  font-size: 20rpx;
  }
  /deep/ .left-width .uni-scroll-view-content{
	  background-color: #F8F7F8 !important;
  }
  .dis-bt{
	  border-bottom: 1px solid red;
	  opacity: 0;
	  color: #fff;
	  width: 100%;
	  margin: 0px 0px 0px 0px;
  }
  .sm-wrap:active{
	  // opacity: 0.5;
  }
  .dx-img{
	 width: 100%;
	  text-align: center;
  }
</style>
