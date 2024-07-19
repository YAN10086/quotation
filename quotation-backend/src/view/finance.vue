<!--
 * @Author: baiyf
 * @Date: 2023-03-28 21:48:35
 * @LastEditTime: 2023-11-01 11:05:11
 * @Description: file content
-->
<template>
  <div class="right-main">
    <div class="top-search">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="选择月份">
          <div class="block">
            <el-date-picker
              @change="changeDate"
              v-model="finishDate"
              value-format="yyyy-MM"
              type="month"
              placeholder="请选择"
            >
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="选择画师">
          <el-select v-model="userName" placeholder="请选择" @change="changeOp">
            <el-option
              v-for="item in options2"
              :key="item.id"
              :label="item.pid + '@@' + item.userName"
              :value="item.pid + '@@' + item.userName"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="search-bt-block">
          <el-button type="primary" @click="onSubmit" @keyup.enter="onSubmit"
            >查询</el-button
          >
          <el-button type="primary" @click="resizeData">重置</el-button>
          <el-button
            type="primary"
            @click="addFinance"
            v-if="$baseFun.checkhaveIds(29)"
            >添加结算单</el-button
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
          prop="finishDate"
          label="结算月份"
          width="200"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="allPrice"
          label="结算总额"
          width="auto"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="userName"
          label="结算账户"
          width="auto"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column label="操作" :resizable="false" width="260">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="showOrders(scope.$index, scope.row)"
              class="el-table-column-bt"
              type="primary"
              v-if="$baseFun.checkhaveIds(30)"
              >查看销售记录</el-button
            >
            <el-button
              size="mini"
              @click="showPz(scope.$index, scope.row)"
              class="el-table-column-bt"
              type="primary"
              v-if="$baseFun.checkhaveIds(31)"
              >查看结款凭证</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
      :title="finishDate + '月销售详情'"
      :visible.sync="centerDialogVisibleOrder"
      width="920px"
      center
      class="orderlist"
    >
      <div style="display:flex;justify-content:space-between;color:#409EFF">
        <div>画师：{{ this.userName }}</div>
        <div>共计：{{ tableDataOrder.length }}份</div>
        <div>原价合计：￥{{ goodsPrice }}</div>
        <div>实际支付：￥{{ favorablePrice }}</div>
      </div>
      <el-table
        :data="tableDataOrder"
        border
        style="width: 100%;margin-top: 10px;"
        stripe
        v-loading="loadingTable2"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
      >
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column
          prop="gName"
          label="商品名称"
          width="200"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="goodsPrice"
          label="原价"
          width="auto"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="favorablePrice"
          label="实际支付价格"
          width="auto"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="createDate"
          label="下单日期"
          :formatter="fileterDateForCreateDate"
          width="auto"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
      </el-table>
    </el-dialog>

    <el-dialog
      title="凭证信息"
      :visible.sync="centerDialogVisiblePz"
      width="500px"
      center
      class="pzblock"
    >
      <el-image
        v-if="voucherImg"
        class="voucher-img"
        :src="voucherImg"
        :preview-src-list="[voucherImg]"
        preview="true"
      >
      </el-image>

      <div class="v-tips">* 点击图片可放大</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisiblePz = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisiblePz = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <el-dialog
      title="添加结算凭证"
      :visible.sync="centerDialogVisible3"
      width="920px"
      center
      class="orderlist"
    >
      <div style="display:flex;justify-content:space-between;color:#409EFF">
        <div>画师：{{ this.userName }}</div>
        <div>共计：{{ tableDataOrder.length }}份</div>
        <div>原价合计：￥{{ goodsPrice }}</div>
        <div>实际支付：￥{{ favorablePrice }}</div>
      </div>
      <div class="list2">
        <el-table
          :data="tableDataOrder"
          border
          style="width: 100%;margin-top: 10px;"
          stripe
          v-loading="loadingTable2"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
        >
          <el-table-column type="index" width="50"> </el-table-column>
          <el-table-column
            prop="gName"
            label="商品名称"
            width="200"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="goodsPrice"
            label="原价"
            width="auto"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="favorablePrice"
            label="实际支付价格"
            width="auto"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="createDate"
            label="下单日期"
            :formatter="fileterDateForCreateDate"
            width="auto"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
        </el-table>
      </div>
      <div style="margin-top:10px">
        <h4>上传凭证:</h4>
        <div>
          <el-upload
            class="avatar-uploader"
            action=""
            :auto-upload="false"
            :show-file-list="false"
            :on-change="changeFile"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible3 = false">取 消</el-button>
        <el-button type="primary" @click="submitPz">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as qiniu from "qiniu-js";
export default {
  name: "finance",
  data() {
    return {
      menus: [],
      buttons: [],
      userName: "",
      options2: [],
      tableData: [],
      tableDataOrder: [],
      page: 1,
      pageSize: 10000,
      currentPage: 1,
      total: 0,
      loadingTable: true,
      loadingTable2: true,
      centerDialogVisible: false,
      dname: "",
      finishDate: "",
      form: {
        name: "",
        content: "",
        price: ""
      },
      centerDialogVisibleOrder: false,
      centerDialogVisiblePz: false,
      centerDialogVisible3: false,
      authsList: [],
      goodsPrice: 0,
      favorablePrice: 0,
      voucherImg: "",
      imageUrl: "",
      base64Str: ""
    };
  },
  methods: {
    changeFile(file, fileList) {
      console.log(file, fileList);
      let xhrurl = "/upload/getTk";
      let uploadInfo = file.raw;
      this.$api.post(xhrurl, {}).then(
        res => {
          console.log("res", res);
          if (res.data.code == "200") {
            let ttoken = res.data.data;
            let fileName =
              "goods-cover/" + this.$USER.userName + "-" + +new Date();
            const observer = {
              next: res => {
                // 上传成功后
                this.base64Str = this.$coverImg + fileName;
                this.imageUrl = this.base64Str;
                console.log("next: 666666666666666666", res, this.base64Str);
              },
              error(err) {
                // 失败
                console.log(err);
                this.$message({
                  message: "上传失败，请联系开发商。",
                  type: "warning"
                });
              },
              complete(res) {
                console.log("complete: ", res);
              }
            };
            const options = {
              quality: 0.8,
              noCompressIfLarger: true
              // maxWidth: 1000,
              // maxHeight: 618
            };
            qiniu.compressImage(uploadInfo, options).then(data => {
              const observable = qiniu.upload(
                data.dist,
                fileName,
                ttoken,
                {},
                {}
              );
              // 2. observable.subscribe 触发上传，之后的回调方法都在 observer 对象中，对应着：成功、失败、完成方法
              observable.subscribe(observer); // 上传开始
            });
          } else {
            this.$message({
              type: "error",
              message: "tk获取失败"
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
    fileterDateForCreateDate(value) {
      return this.$baseFun.longtimeToStr(value.createDate);
    },
    changeOp(e) {
      let str = e.split("@@");
      console.log(str);
      this.userName = str[1];
      this.getData();
    },
    changeDate(e) {
      this.getData();
    },
    showPz(index, row) {
      this.centerDialogVisiblePz = true;
      this.voucherImg = row.finishVoucher;
    },
    addFinance() {
      if (!this.finishDate) {
        this.$message({
          type: "warning",
          message: "请先选择一个月份"
        });
        return;
      }
      if (this.tableData.length > 0) {
        this.$message({
          type: "warning",
          message: "该用户本月已结算！"
        });
        return;
      }
      this.showOrders("centerDialogVisibleOrder");
    },
    getUserList(str) {
      let pdata = {
        userType: 3,
        enabled: 1,
        page: 1,
        pageSize: 1000
      };
      this.$api.post("/adminUsers/listUser", pdata).then(
        res => {
          console.log("/adminUsers/listUser", res);
          if (res.data.code == "200") {
            if (this.$USER.userType == "3") {
              this.options2 = [
                {
                  userName: this.$USER.userName,
                  pid: this.$USER.pid
                }
              ];
            } else {
              this.options2 = res.data.data.list;
            }
            if (!str) {
              // this.finishDate  = this.$baseFun.longtimeToStr(+new Date(), "y-m");
              if (this.$USER.userType != "3") {
                this.userName = this.options2[0].userName;
              } else {
                this.userName = this.$USER.userName;
              }
            }
            this.getData();
          } else {
            this.$message({
              type: "error",
              message: "查询失败"
            });
          }
        },
        err => {
          this.$message({
            type: "error",
            message: err.msg
          });
        }
      );
    },
    showOrders(index, row) {
      // let strDate = this.finishDate;
      console.log(index, row);
      let strDate;
      if (index == "centerDialogVisibleOrder") {
        strDate = this.finishDate;
      } else {
        strDate = row.finishDate;
      }
      console.log(
        this.$baseFun.currentTime(strDate.substr(5)),
        this.$baseFun.getLastDayOfNaturalMonth(strDate.substr(5) * 1 + 1)
      );
      let pdata = {
        sDate: this.$baseFun.currentTime(strDate.substr(5)),
        eDate: this.$baseFun.getLastDayOfNaturalMonth(
          strDate.substr(5) * 1 + 1
        ),
        authName: this.userName,
        page: 1,
        pageSize: 1000
      };
      this.goodsPrice = 0;
      this.favorablePrice = 0;
      this.tableDataOrder = [];
      this.loadingTable2 = true;
      if (index == "centerDialogVisibleOrder") {
        this.centerDialogVisible3 = true;
      } else {
        this.centerDialogVisibleOrder = true;
      }
      this.$api.post("/order/selectFinance", pdata).then(
        res => {
          console.log("/order/selectFinance", res);
          if (res.data.code == "200") {
            this.tableDataOrder = res.data.data;
            for (let k = 0; k < res.data.data.length; k++) {
              this.goodsPrice += res.data.data[k].goodsPrice * 1;
              this.favorablePrice += res.data.data[k].favorablePrice * 1;
            }
          } else {
            this.$message({
              type: "error",
              message: "查询失败"
            });
          }

          this.loadingTable2 = false;
        },
        err => {
          this.$message({
            type: "error",
            message: err.msg
          });
          this.loadingTable2 = false;
        }
      );
    },
    submitPz() {
      let xhrurl = "/finance/addFinance";
      let pdata = {
        allPirce: this.favorablePrice,
        adminUser: this.$USER.userName,
        userName: this.userName,
        merchantId: 1,
        finishDate: this.finishDate,
        finishVoucher: this.imageUrl
      };
      if (!this.imageUrl) {
        this.$message({
          showClose: true,
          message: "请上传凭证",
          type: "warning"
        });
        return;
      }
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
          this.centerDialogVisible3 = false;
        },
        err => {
          console.log("err", err);
          this.$message({
            type: "error",
            message: err.msg
          });
          this.centerDialogVisible3 = false;
        }
      );
      this.gid = "";
    },
    onSubmit() {
      this.getUserList("search");
    },
    resizeData() {
      Object.assign(this.$data, this.$options.data.call(this));
      this.getUserList();
    },
    addVip() {
      this.dname = "添加";
      this.centerDialogVisible = true;
    },
    handleCurrentChange(val) {
      this.page = val;
      this.loadingTable = true;
      this.getData();
    },
    getData() {
      let pdata = {
        page: this.page,
        userName: this.userName,
        pageSize: this.pageSize,
        finishDate: this.finishDate
      };
      this.loadingTable = true;
      this.$api.post("/finance/selectFinance", pdata).then(
        res => {
          console.log("res", res);
          if (res.data.code == "200") {
            this.tableData = res.data.data;
            this.total = res.data.length;
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
    }
  },
  mounted() {
    this.getUserList();
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
  margin: 0 auto;
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
/deep/ .orderlist .el-dialog__body {
  height: 600px;
  overflow: scroll;
}
.voucher-img {
  width: auto;
  height: 400px;
}

/deep/ .pzblock .el-dialog__body {
  text-align: center;
}
.list2 {
  height: 400px;
  overflow-y: scroll;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
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
</style>
