<!--
 * @Author: baiyf
 * @Date: 2023-03-28 21:48:35
 * @LastEditTime: 2024-04-05 23:14:53
 * @Description: file content
-->
<template>
  <div class="right-main">
    <div class="top-search">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="商品名称">
          <el-select
            v-model="cname"
            placeholder="请选择"
            @change="changeSelect"
          >
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品名称">
          <el-input v-model="gname" placeholder="请输入内容"></el-input>
        </el-form-item>

        <el-form-item class="search-bt-block">
          <el-button type="primary" @click="onSubmit" @keyup.enter="onSubmit"
            >查询{{ cname }}</el-button
          >
          <el-button type="primary" @click="resizeData">重置</el-button>
          <el-button type="primary" @click="batchUpdatePrice"
            >批量更新价格</el-button
          >
        </el-form-item>
      </el-form>
    </div>

    <div class="main-table">
      <el-table
        :data="tableData"
        border
        style="width: 100%;margin-top: 10px;"
        stripe
        v-loading="loadingTable"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
      >
        <el-table-column
          prop="goodsName"
          label="商品名称"
          width="auto"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column prop="goodsCover" label="商品主图" width="auto">
          <template slot-scope="scope">
            <img :src="scope.row.goodsCover" class="voucher-img" />
          </template>
        </el-table-column>
        <el-table-column prop="recyclingPrice" label="今日价格" width="auto">
          <template slot-scope="scope">
            <div v-html="getNearPrice(scope.row)"></div>
          </template>
        </el-table-column>

        <el-table-column prop="recyclingPrice" label="最新价格" width="auto">
          <template slot-scope="scope">
            <div v-html="getNearPrice2(scope.row)"></div>
          </template>
        </el-table-column>

        <el-table-column
          prop="visitCount"
          label="累计查询次数"
          width="auto"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="updateDate"
          label="最近一次价格更新时间"
          :formatter="fileterDateForCreateDate"
        >
        </el-table-column>
        <el-table-column label="操作" :resizable="false" width="350">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="updatePrice(scope.$index, scope.row)"
              class="el-table-column-bt"
              type="primary"
              >更新价格</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 30, 60]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        class="el-page"
      >
      </el-pagination>
    </div>

    <el-dialog
      :title="dname"
      :visible.sync="centerDialogVisible"
      width="720px"
      center
    >
      <div>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="font-weight:bold">设置今日价格</span>
            <i
              class="el-icon-warning-outline warn-color"
              @click="clickToast(1)"
              style="float: right; padding: 3px 0;font-size:18px"
            ></i>
          </div>
          <el-form
            ref="form"
            :model="form"
            label-width="100px"
            class="form-goods"
          >
            <el-form-item label="更新日期*">
              <el-date-picker
                v-model="selectDate"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>

            <el-form-item label="商品名称*">
              <el-input
                v-model="clickGoodsInfo.goodsName"
                class="min-input-width"
                :disabled="true"
              ></el-input>
            </el-form-item>
            <el-form-item label="商品价格*">
              <el-input
                v-model="nowPrice"
                class="min-input-width"
                type="number"
              ></el-input>
            </el-form-item>
          </el-form>
        </el-card>
        <br />
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="font-weight:bold">该商品近14日行情</span>
            <i
              class="el-icon-warning-outline warn-color"
              @click="clickToast(2)"
              style="float: right; padding: 3px 0;font-size:18px"
            ></i>
          </div>
          <div
            v-for="(item, index) in tableList"
            :key="index"
            class="text-price"
          >
            <span>{{ item.date }}</span>
            <span class="price">￥{{ item.price }}</span>
          </div>
        </el-card>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitGoods">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="批量更新商品价格"
      :visible.sync="centerDialogVisible2"
      width="720px"
      center
      v-loading="loading2"
      element-loading-text="等待中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="font-weight:bold">批量更新条件</span>
          <i
            @click="clickToast(3)"
            class="el-icon-warning-outline warn-color"
            style="float: right; padding: 3px 0;font-size:18px"
          ></i>
        </div>
        <el-form
          ref="form"
          :model="form"
          label-width="120px"
          class="form-goods"
        >
          <!-- <el-form-item label="选择商品范围：">
            <el-radio-group v-model="range">
              <el-radio :label="0">所有商品</el-radio>
              <el-radio :label="1">根据品牌筛选</el-radio>
            </el-radio-group>
          </el-form-item> -->
          <el-form-item label="指定日期：">
            <el-date-picker
              v-model="flagDate"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>

          <el-form-item label="复用昨日价格：">
            <el-radio-group v-model="yestdatyFlag">
              <el-radio :label="0">复用昨日价格</el-radio>
              <el-radio :label="1">在昨日基础上增加/减少金额</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="昨日基础上*：" v-if="yestdatyFlag == '1'">
            <el-radio-group v-model="numFlag">
              <el-radio :label="2">增加金额</el-radio>
              <el-radio :label="3">减少金额</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="增/减的金额*：" v-if="yestdatyFlag == '1'">
            <el-input
              v-model="pPrice"
              class="min-input-width"
              type="number"
            ></el-input>
          </el-form-item>
        </el-form>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="submitGoodsBatch">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "cosmetics",
  data() {
    return {
      menus: [],
      buttons: [],
      tableData: [],
      page: 1,
      pageSize: 10,
      currentPage: 1,
      total: 0,
      loadingTable: true,
      centerDialogVisible: false,
      dname: "",
      clickGoodsInfo: {},
      nowPrice: "",
      form: {
        name: "",
        content: "",
        price: ""
      },
      centerDialogVisible2: false,
      authsList: [],
      tableList: [],
      range: 0,
      yestdatyFlag: 0,
      numFlag: 2,
      pPrice: 5,
      loading2: false,
      gname: "",
      cname: "",
      selectDate: "",
      flagDate: "",
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        }
      ]
    };
  },
  methods: {
    // 时间格式化
    // timestamp 中国标准时间
    timestampToTime(timestamp) {
      var date = new Date(timestamp);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      var h = date.getHours();
      var minute = date.getMinutes();
      minute = minute < 10 ? "0" + minute : minute;
      var second = date.getSeconds();
      second = second < 10 ? "0" + second : second;
      let strTime = y + "-" + m + "-" + d;
      return strTime;
    },
    convertStringToDateString(dateString) {
      // 创建Date对象
      let date = new Date(dateString);

      // 获取年、月、日
      let year = date.getFullYear();
      let month = String(date.getMonth() + 1).padStart(2, "0"); // 月份从0开始，所以需要+1
      let day = String(date.getDate()).padStart(2, "0");

      // 组合年月日并返回
      return `${year}-${month}-${day}`;
    },
    clickToast(str) {
      let text1 = "";
      if (str == "1") {
        text1 = "根据你选择的日期，将你输入的价格设置为该商品对应日期的价格";
      } else if (str == "2") {
        text1 = "该商品的近7日行情";
      }
      if (str == "3") {
        text1 = `昨日的定义：若昨日设置过价格，则在昨日基础上进行操作。若昨日没有设置价格，则以此类推，寻找最接近当天的日期为基准价格。`;
      }
      this.$alert(text1, "温馨提示", {
        confirmButtonText: "确定"
      });
    },
    batchUpdatePrice() {
      this.centerDialogVisible2 = true;
    },
    submitGoodsBatch() {
      let pdata = {
        tenantId: this.$USER.tenantId,
        all: true
      };
      if (this.flagDate) {
        pdata.flagDate = this.timestampToTime(this.flagDate);
      }
      if (this.yestdatyFlag == "0") {
        //批量复用昨日的
        pdata.flag = "1";
      } else {
        pdata.flag = this.numFlag;
        pdata.num = this.pPrice;
      }
      if (this.yestdatyFlag != "0" && !this.pPrice) {
        this.$message({
          showClose: true,
          message: "请将信息补充完整",
          type: "warning"
        });
        return;
      }
      // console.log("pdata", pdata);
      // return;
      this.loading2 = true;
      let xhrurl = "/digital/updatePriceBatch";
      this.$api.post(xhrurl, pdata).then(
        res => {
          this.loading2 = false;
          console.log("res", res);
          if (res.data.code == "200") {
            this.$message({
              type: "success",
              message: this.dname + "成功"
            });
            this.centerDialogVisible2 = false;
            this.getData();
          } else {
            this.$message({
              type: "error",
              message: this.dname + "成功"
            });
          }
        },
        err => {
          console.log("err", err);
          this.loading2 = false;
          this.$message({
            type: "error",
            message: err.msg
          });
        }
      );
    },
    getNearPrice(row) {
      let priceList = JSON.parse(row.recyclingPriceList); //获取价格字段
      let objdata = this.$baseFun.getNearNewPrice(priceList, "newPrice");
      return objdata.price;
    },
    getNearPrice2(row) {
      let priceList = JSON.parse(row.recyclingPriceList); //获取价格字段
      let objdata = this.$baseFun.getNearNewPrice(priceList);
      return `<span><span>${
        objdata.date
      } :</span> <span style="font-weight:bold;color:red">￥${
        objdata.price
      }</span></span>`;
    },
    submitAuths() {
      this.submitGoods();
    },
    fileterDateForCreateDate(value) {
      return this.$baseFun.longtimeToStr(value.updateDate, "y-m-d");
    },
    deleteUser(index, row) {
      this.gid = row.id;
      let userEnabled = row.enabled;
      if (userEnabled == "1") {
        userEnabled = 2;
      } else {
        userEnabled = 1;
      }
      let pdata = {
        userName: row.userName,
        enabled: userEnabled
      };
      this.$confirm("将要删除该用户，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$api.post("/users/updateUserInfo", pdata).then(
            res => {
              console.log("res", res);
              if (res.data.code == "200") {
                this.$message({
                  type: "success",
                  message: "操作成功"
                });
                this.getData();
              } else {
                this.$message({
                  type: "error",
                  message: "查询失败"
                });
              }
            },
            err => {
              console.log("err", err);
              this.$message({
                type: "error",
                message: err.msg
              });
            }
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    submitGoods() {
      let pdata = {
        id: this.clickGoodsInfo.id,
        tenantId: this.$USER.tenantId,
        flag: 4,
        price: this.nowPrice,
        selectDate: this.convertStringToDateString(this.selectDate)
      };
      if (!this.nowPrice && !this.selectDate) {
        this.$message({
          showClose: true,
          message: "请将信息补充完整",
          type: "warning"
        });
        return;
      }
      let xhrurl = "/digital/updatePriceBatch";
      this.$api.post(xhrurl, pdata).then(
        res => {
          console.log("res", res);
          if (res.data.code == "200") {
            this.$message({
              type: "success",
              message: this.dname + "成功"
            });
            this.centerDialogVisible = false;
            this.getData();
          } else {
            this.$message({
              type: "error",
              message: this.dname + "成功"
            });
          }
        },
        err => {
          console.log("err", err);
          this.$message({
            type: "error",
            message: err.msg
          });
        }
      );
    },
    onSubmit() {
      this.getData();
    },
    resizeData() {
      Object.assign(this.$data, this.$options.data.call(this));
      this.getData();
      this.selectGoodsBrands();
    },
    updatePrice(index, row) {
      this.dname = "更新商品价格";
      //处理日期
      let datesList = this.$baseFun.getLatestDate(); //获取近七日日期
      let priceList = JSON.parse(row.recyclingPriceList); //获取价格字段
      let tableList = [];
      for (let d = 0; d < datesList.length; d++) {
        let obj = {
          date: datesList[d],
          price: 0
        };
        for (let p = 0; p < priceList.length; p++) {
          if (datesList[d] == priceList[p].date) {
            obj.price = priceList[p].price;
            break;
          }
        }
        tableList.push(obj);
      }
      this.tableList = tableList;
      this.clickGoodsInfo = row;
      this.centerDialogVisible = true;
    },
    handleCurrentChange(val) {
      this.page = val;
      this.loadingTable = true;
      this.getData();
    },
    changeSelect() {
      this.page = 1;
      this.getData();
    },
    getData() {
      let pdata = {
        page: this.page,
        pageSize: this.pageSize,
        tenantId: this.$USER.tenantId,
        goodsName: this.gname,
        bid: this.cname
      };
      this.loadingTable = true;
      this.$api.post("/digital/selectGoods", pdata).then(
        res => {
          console.log("res", res);
          if (res.data.code == "200") {
            this.tableData = res.data.data.list;
            this.total = res.data.data.count;
          } else {
            this.$message({
              type: "error",
              message: "查询失败"
            });
          }
          this.loadingTable = false;
        },
        err => {
          console.log("err", err);
          this.$message({
            type: "error",
            message: err.msg
          });
        }
      );
    },
    selectGoodsBrands() {
      let pdata = {
        category: "2"
      };
      this.loadingTable = true;
      this.$api.post("/digital/selectGoodsBrands", pdata).then(
        res => {
          console.log("res--selectGoodsBrands", res);
          this.options = res.data.data;
        },
        err => {
          console.log("err", err);
          this.$message({
            type: "error",
            message: err.msg
          });
        }
      );
    }
  },
  mounted() {
    this.selectDate = this.$baseFun.longtimeToStr(+new Date());
    this.getData();
    this.selectGoodsBrands();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.voucher-img {
  width: 40px;
  height: 40px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

/deep/ .el-upload {
  border: 1px solid #a6baff;
}

/deep/ .form-goods {
  width: 530px;
}

.voucher-img {
  width: 40px;
  height: 40px;
}

.min-input-width {
  width: 260px;
}

.el-tag + .el-tag {
  margin-left: 10px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}

/deep/ .quanxian_card_checkbox2 {
  color: #ff6000;

  .el-checkbox__input.is-checked + .el-checkbox__label {
    color: #ff6000;
  }
}
.text-price {
  display: flex;
  justify-content: space-between;
  padding: 5px;
}
.price {
  color: #409eff;
}
.warn-color {
  color: #ff6000;
}
</style>
