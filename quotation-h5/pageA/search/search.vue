<template>
  <view class="tn-safe-area-inset-bottom">
    <!-- 顶部自定义导航 -->
    <tn-nav-bar fixed alpha customBack>
      <view slot="back" class='tn-custom-nav-bar__back'
        @click="goBack">
        <text class='icon tn-icon-left'></text>
        <text class='icon tn-icon-home-capsule-fill'></text>
		<view>
		</view>
      </view>
    </tn-nav-bar>
     <tn-toast ref="toast"></tn-toast>
    <view class="tn-search-fixed">
      <view class="tn-flex tn-flex-row-between tn-flex-col-center tn-margin" :style="{marginTop: vuex_custom_bar_height + 'px'}">
        <view class="justify-content-item align-content-item" style="width: 100vw;">
          <view class="tn-flex tn-flex-col-center" style="border-radius: 100rpx;padding: 10rpx 20rpx 10rpx 20rpx;width: 90%;background-color: rgba(248, 247, 248, 0.9);">
			<text class="tn-icon-search justify-content-item tn-padding-right-xs tn-color-gray tn-text-lg"></text>
            <input class="justify-content-item" v-model="goodsName" placeholder="查询美妆 | 请输入美妆名称" name="input" placeholder-style="color:#AAAAAA" style="width: 90%;"></input>
          </view>
        </view>
        
        <view class="align-content-item">
          <view class="justify-content-item tn-text-center">
            <tn-button backgroundColor="#3668fc" shape="round" padding="20rpx 20rpx" width="150rpx" @tap="searchGoods">
              <text class="tn-color-white">搜 索</text>
            </tn-button>

          </view>
        </view>
      </view>
    </view>
    
    <view class="" :style="{paddingTop: vuex_custom_bar_height*1+70 + 'px'}">
      <view class="tn-flex tn-flex-row-between tn-margin" >
        <view class="justify-content-item tn-text-bold">
          <text class="tn-text-df tn-color-black">最近搜索</text>
        </view>
       <!-- <view class="justify-content-item tn-text-df tn-color-grey">
          <text class="tn-padding-xs">删除</text>
          <text class="tn-icon-delete"></text>
        </view> -->
      </view>
    </view>
    
    <view class="">
      <view class="tn-tag-search tn-margin tn-text-justify">
        <view v-for="(item, index) in tagList" :key="index" class="tn-tag-search__item tn-margin-right tn-round tn-text-sm tn-bg-gray--light tn-color-gray" @tap="clickTags(item)">
          <text class="tn-tag-search__item--prefix">#</text> {{ item }}
        </view>
      </view>
    </view>
    
    <view class="tn-flex tn-flex-row-between tn-padding-top-xl tn-margin tn-padding-bottom">
      <view class="justify-content-item tn-text-bold">
        <text class="tn-text-df tn-color-black">搜索结果</text>
      </view>
     <!-- <view class="justify-content-item tn-text-df tn-color-grey">
        <text class="tn-padding-xs">筛选</text>
        <text class="tn-icon-filter"></text>
      </view> -->
    </view>
    
    
    <!-- 不建议写时间，因为写了时间，你就要经常更新文章了鸭-->
    <view class="tn-margin-bottom-lg">
      <block v-for="(item, index) in content" :key="index" >
        <view class="article-shadow tn-margin" @click="toDetail(item)">
          <view class="tn-flex">
            <view class="tn-margin-sm tn-padding-top-xs" style="width: 100%;">
              <view class="tn-text-lg tn-text-bold clamp-text-1 tn-text-justify">
                <text class="">{{ item.goodsName }}</text>
              </view>
              <view class="tn-padding-top-xs" style="min-height: 90rpx;">
                <text class="tn-text-df tn-color-gray clamp-text-2 tn-text-justify">
                  {{ item.goodsName }}
                </text>
              </view>
              <view class="tn-flex tn-flex-row-between tn-flex-col-between">
                <view   style="transform: translate(0rpx,6rpx);"
                  class="justify-content-item tn-tag-content__item tn-margin-right-xs tn-round tn-text-sm tn-text-bold" :class="[`tn-bg-red--light tn-color-red`]">
                  <text class="tn-tag-content__item--prefix">￥</text> {{getNewPrice(item)}}
                </view>
                <view class="justify-content-item tn-color-gray tn-text-center " style="padding-top: 15rpx;">
                  <text class="tn-icon-eye tn-padding-right-xs tn-text-lg"></text>
                  <text class="tn-padding-right tn-text-df">{{ item.visitCount }}</text>
                <!--  <text class="tn-icon-like-lack tn-padding-right-xs tn-text-lg"></text>
                  <text class="tn-text-df">{{ item.visitCount }}</text> -->
                </view>
              </view>
            </view>
            <view class="image-pic tn-margin-sm" :style="'background-image:url(' + item.goodsCover + ')'">
              <view class="image-article">
              </view>
            </view>
          </view>
        </view>
      </block>
    </view>
    
    
  </view>
</template>
<script>
  import template_page_mixin from '@/libs/mixin/template_page_mixin.js'
  export default {
    name: 'TemplateSearch',
    mixins: [template_page_mixin],
    data(){
      return {
        inputValue: '',
        goodsName:'',
        tagList: [ 
        ],
        content: [],
		searchHistory:[],
		 sex: '',
      }
    },
	onLoad() {
		let storageHistory = uni.getStorageSync('searchHistory');
		if(storageHistory && storageHistory.length > 0){
			this.tagList = storageHistory;
		}
	},
    methods: {
		getNewPrice(item){
			let priceList = JSON.parse(item.recyclingPriceList);
			let price = this.$commonFun.getNearNewPrice(priceList);
			return price;
		},
		clickTags(goodsName){
			this.goodsName = goodsName;
			this.searchGoods();
		},
      // 跳转
      toDetail(e) {
      	console.log(e);
		uni.navigateTo({
			url:'../../pageA/photo/photo?id='+e.id
		})
      },
	  handleGoods(){
		let storageHistory = uni.getStorageSync('searchHistory') || [];
		if(storageHistory.indexOf(this.goodsName)!='-1'){
			return;
		}
		 if(storageHistory.length > 6){
			 storageHistory.shift();
			 storageHistory.push(this.goodsName);
			 // storageHistory.reverse();
			 this.tagList = storageHistory;
		 }else{
			  storageHistory.push(this.goodsName);
			  // storageHistory.reverse();
			  this.tagList = storageHistory;
		 }
		 uni.setStorageSync('searchHistory',storageHistory);
	  },
	  searchGoods(){
		  if(!this.goodsName){
			  this.$refs.toast.show({
			  	title: '',
			  	content: '请输入关键词',
			  	icon: 'tips',
			  	duration: 1500
			  })
			  return;
		  }
		  let pdata = {
		  	url: '/goods/selectGoods',
		  	data: {
				goodsName: this.goodsName,
				page:1,
				pageSize:30
			},
		  	method: 'POST'
		  }
		  this.$request(pdata).then((res) => {
		  	console.log("res-------selectGoods------", res);
			let rList = res.data.data.list;
			this.content = rList;
			if(rList && rList.length>0){
				this.handleGoods();
			}
		  });
	  }
    }
  }
</script>

<style lang="scss" scoped>
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
  
  .tn-search-fixed{
    position: fixed;
    top: 50rpx;
    width: 100%;
    transition: all 0.25s ease-out;
    z-index: 1;
  }

  
  /* 搜索标签 start*/
  .tn-tag-search {
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
  
  /* 标题 start */
  .nav_title {
    -webkit-background-clip: text;
    color: transparent;
    
    &--wrap {
      position: relative;
      display: flex;
      height: 120rpx;
      font-size: 42rpx;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      background-image: url(https://resource.tuniaokj.com/images/title_bg/title00.png);
      background-size: cover;
    }
  }
  /* 标题 end */
  
  /* 富文本图示意 start */
  .news-img {
    z-index: -1;
    padding-bottom: 40rpx;
  
    image {
      width: 100%;
      margin: 20rpx 0;
      // height: 3373rpx;
      // z-index: -1;
    }
  }
  
  /* 资讯主图 start*/
  .image-article {
    border-radius: 8rpx;
    border: 1rpx solid #F8F7F8;
    width: 200rpx;
    height: 200rpx;
    position: relative;
  }
  
  .image-pic {
    background-size: cover;
    background-repeat: no-repeat;
    // background-attachment:fixed;
    background-position: top;
    border-radius: 10rpx;
  }
  
  .article-shadow {
    border-radius: 15rpx;
    box-shadow: 0rpx 0rpx 50rpx 0rpx rgba(0, 0, 0, 0.07);
  }
  
  /* 文字截取*/
  .clamp-text-1 {
    -webkit-line-clamp: 1;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  
  .clamp-text-2 {
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  
  /* 标签内容 start*/
  .tn-tag-content {
    &__item {
      display: inline-block;
      line-height: 35rpx;
      padding: 7rpx 25rpx 5rpx 25rpx;
  
      &--prefix {
        padding-right: 10rpx;
      }
    }
  }
  
  /* 标签内容 end*/
</style>
