<!--
 * @Author: baiyf
 * @Date: 2023-03-28 21:48:35
 * @LastEditTime: 2023-04-13 23:01:01
 * @Description: file content
-->
<template>
  <div class="right-main analy-view">
    <div class="m-l">
      <div class="card-block">
        <div class="card-info">
          <span class="n-count">1000</span>
          <span class="n-text">订单总数</span>
        </div>
        <div class="card-info">
          <span class="n-count">1000</span>
          <span class="n-text">订单总额</span>
        </div>
        <div class="card-info">
          <span class="n-count">1000</span>
          <span class="n-text">待发货订单</span>
        </div>
      </div>
      <div class="card-block">
        <div class="card-info">
          <span class="n-count">1000</span>
          <span class="n-text">总用户数</span>
        </div>
        <div class="card-info">
          <span class="n-count">1000</span>
          <span class="n-text">异常人数</span>
        </div>
        <div class="card-info">
          <span class="n-count">1000</span>
          <span class="n-text">异常订单</span>
        </div>
      </div>
      <div class="ec-block">
        <ec-bar :id="'ecbar'"></ec-bar>
      </div>
      <div class="ec-block">
        <ec-bar :id="'ecline'"></ec-bar>
      </div>
    </div>
    <div class="m-r">
      <div class="m-r-block">
        <div class="m-r-title">热销商品</div>
        <div class="m-header">
          <div class="h-i1">商品封面</div>
          <div class="h-i2">商品名称</div>
          <div class="h-i3">总销量</div>
        </div>
        <div class="phb-block">
          <div class="phb-info" v-for="(item, index) in 5">
            <div class="i-left">
              <img src="http://hcxlyun.cn/tablebg/sas_logo.jpg" />
            </div>
            <div class="i-center">商品名称名称商品名称名称名称商商品名称名称名</div>
            <div class="i-right">已售259</div>
          </div>
        </div>
      </div>

      <div class="m-r-block m2">
        <div class="m-r-title">用户消费情况</div>
        <div class="m-header">
          <div class="h-i1">头像</div>
          <div class="h-i2">用户名</div>
          <div class="h-i3">累计金额</div>
        </div>
        <div class="phb-block">
          <div class="phb-info" v-for="(item, index) in 5">
            <div class="i-left">
              <img src="../../static/image/d-ulogo.jpg" />
            </div>
            <div class="i-center">ZHK9619152</div>
            <div class="i-right">￥8598</div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import ecbar from '@/components/ecBar';
export default {
  name: "businessOverview",
  data() {
    return {
      msg: "开发中>>>"
    };
  },
  components: {
    'ec-bar': ecbar
  },
  mounted() {
    console.log('生命周期');
    let echarts = require('echarts');
    console.log('echarts', echarts.version);
  },
  methods: {
    // request(method, url, body, loadingMsg)
    getData() {
      this.$api.get("http://ns.acewb.com/upload/listOrders", {}).then(
        res => {
          console.log("res", res);
        },
        err => {
          console.log("err", err);
        }
      );
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.analy-view {
  display: flex;
}

.m-l {
  width: 65%;
}

.m-r {
  width: 35%;
  padding: 0px 0px 0px 10px;
}

.m-r-block {
  background: #fff;
  padding-bottom: 7px;
}

.m2 {
  margin-top: 10px;
}

.card-block {
  border-radius: 10px;
  padding: 0px 0px 10px 0px;
  display: flex;
  justify-content: space-between;
}

.card-info {
  display: flex;
  flex-direction: column;
  width: 32%;
  justify-content: center;
  align-items: center;
  height: 150px;
  background: #fff;
}

.n-count {
  font-size: 22px;
  font-weight: bold;
}

.n-text {
  margin-top: 15px;
}

.ec-block {
  background-color: #fff;
  padding: 10px;
  margin-top: 10px;

}

.m-r-title {
  font-size: 18px;
  font-weight: bold;
  padding-left: 10px;
  padding-top: 10px;
}

.phb-info {
  display: flex;
  margin-top: 10px;
  align-items: center;
  color: #ababab;
}

.i-left {
  width: 30%;
  text-align: center;
}

.i-center {
  width: 45%;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 15px;
  white-space: nowrap;
  text-align: center;
}

.i-right {
  width: 25%;
  text-align: center;
}

.i-left img {
  width: 40px;
  border-radius: 10px;
}

.m-header {
  display: flex;
  align-items: center;
  margin: 15px 0px;
  font-weight: bold;
}

.h-i1 {
  width: 30%;
  text-align: center;
}

.h-i2 {
  width: 45%;
  text-align: center;
}

.h-i3 {
  width: 25%;
  text-align: center;
}
</style>
