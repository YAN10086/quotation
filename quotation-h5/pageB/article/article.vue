<template>
  <view class="tn-safe-area-inset-bottom">
    <!-- 顶部自定义导航 -->
    <tn-nav-bar fixed alpha customBack>
      <view slot="back" class='tn-custom-nav-bar__back'
        @click="goBack">
        <text class='icon tn-icon-left'></text>
        <text class='icon tn-icon-home-capsule-fill'></text>
      </view>
    </tn-nav-bar>
    
   
    
    
    <!-- 不建议写时间，因为写了时间，你就要经常更新文章了鸭-->
    <view class="tn-margin-bottom-lg" :style="{paddingTop: vuex_custom_bar_height + 'px'}">
		<tn-collapse>
         <tn-collapse-item v-for="(item, index) in list" :key="index" :title="item.question" :disabled="item.disabled">
           <view class="collapse-item-content">
             {{ item.answer }}
           </view>
         </tn-collapse-item>
       </tn-collapse>
    </view>
    
		<ad unit-id="adunit-e902b32b6cbcf192" style="width: 90%;position: fixed;bottom: 5px;left: 5%;border-radius: 10px;"></ad>
  </view>
</template>
<script>
  import template_page_mixin from '@/libs/mixin/template_page_mixin.js'
  export default {
    name: 'TemplateArticle',
    mixins: [template_page_mixin],
    data(){
      return {
        list: []
      }
    },
	onLoad() {
		// 在页面onLoad回调事件中创建插屏广告实例
		
	},
	mounted(){
		this.selectQue();
	},
    methods: {
      selectQue(){
		  let pdata = {
		  	url: '/que/selectQue',
		  	data: {
		  		page:1,
		  		pageSize:100,
				tenantId:this.userInfo.tenantId
		  	},
		  	method: 'POST'
		  }
		  this.$request(pdata).then((res) => {
		  	console.log("selectQue", res);
			this.list = res.data.data.list;
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
  .tn-safe-area-inset-bottom{
	  height: 100vh;
	  background: #f4f4f4;
  }
  .tn-collapse-class {
	  width: 90%;
	  margin-left: 5%;
	  margin-top: 20px;
  }
</style>
