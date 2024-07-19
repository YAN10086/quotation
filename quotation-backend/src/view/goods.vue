<!--
 * @Author: baiyf
 * @Date: 2023-03-28 21:48:35
 * @LastEditTime: 2023-11-04 21:29:02
 * @Description: file content
-->
<template>
  <div class="right-main">
    <div class="top-search">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="商品名称">
          <el-input v-model="gName" placeholder="请输入内容"></el-input>
        </el-form-item>

        <el-form-item class="search-bt-block">
          <el-button type="primary" @click="onSubmit" @keyup.enter="onSubmit"
            >查询</el-button
          >
          <el-button type="primary" @click="resizeData">重置</el-button>
          <el-button
            type="primary"
            @click="addGoods"
            v-if="$baseFun.checkhaveIds(25)"
            >添加商品</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="main-table">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        stripe
        v-loading="loadingTable"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
      >
        <el-table-column
          prop="gName"
          label="商品名称"
          width="200"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column prop="price" label="价格"> </el-table-column>
        <el-table-column
          prop="gExplain"
          width="200"
          label="商品说明"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="auth"
          width="120"
          label="画师"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column prop="delivery" width="100" label="是否参与折扣">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.delivery == '1'"
              >参与</el-tag
            >
            <el-tag type="warning" v-else>不参与</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="num" label="库存"> </el-table-column>
        <el-table-column
          prop="endDate"
          width="120"
          label="停止销售日期"
          :formatter="formatterDate"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          width="180"
          label="发货链接"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column prop="coverImg" label="商品封面" width="auto">
          <template slot-scope="scope">
            <img :src="scope.row.coverImg" class="voucher-img" />
          </template>
        </el-table-column>
        <el-table-column
          prop="createDate"
          label="商品创建时间"
          :formatter="fileterDateForCreateDate"
        >
        </el-table-column>
        <el-table-column
          prop="updateDate"
          label="商品更新时间"
          :formatter="fileterDateForUpdateDate"
        >
        </el-table-column>
        <el-table-column label="操作" :resizable="false" width="260">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="editOrder(scope.$index, scope.row)"
              class="el-table-column-bt"
              v-if="$baseFun.checkhaveIds(26)"
              type="primary"
              >编辑商品</el-button
            >
            <el-button
              size="mini"
              @click="delGoods(scope.$index, scope.row)"
              class="el-table-column-bt"
              v-if="$baseFun.checkhaveIds(27)"
              type="danger"
              >删除商品</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        @size-change="sizeChange"
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
      :title="dname + '商品'"
      :visible.sync="centerDialogVisible"
      width="720px"
      center
    >
      <el-form ref="form" :model="form" label-width="100px" class="form-goods">
        <el-form-item label="商品名称*">
          <el-input v-model="form.gName" class="min-input-width"></el-input>
        </el-form-item>
        <el-form-item label="画师名称*">
          <!-- <el-input v-model="form.auth" class="min-input-width"></el-input> -->
          <el-select
            v-model="form.auth"
            placeholder="请选择"
            @change="changeOp"
          >
            <el-option
              v-for="item in options2"
              :key="item.id"
              :label="item.pid + '@@' + item.userName"
              :value="item.pid + '@@' + item.userName"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="库存数量*">
          <el-input-number
            v-model="form.num"
            :min="0"
            label="描述文字"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="商品价格*">
          <el-input-number
            v-model="form.price"
            :min="0"
            label="描述文字"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="参与折扣*">
          <el-radio v-model="form.delivery" label="1">参与</el-radio>
          <el-radio v-model="form.delivery" label="2">不参与</el-radio>
        </el-form-item>
        <el-form-item label="商品标签*">
          <el-tag
            :key="tag"
            v-for="tag in form.dynamicTags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
          >
            {{ tag }}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            maxlength="6"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          </el-input>
          <el-button
            v-else
            class="button-new-tag"
            size="small"
            @click="showInput"
            >+ 追加标签</el-button
          >
        </el-form-item>
        <el-form-item label="截止日期*">
          <el-date-picker
            v-model="form.endDate"
            type="datetime"
            placeholder="选择截止日期"
            class="min-input-width"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="发货地址*">
          <el-input type="textarea" v-model="form.address" :rows="4"></el-input>
        </el-form-item>
        <el-form-item label="商品说明*">
          <el-input
            type="textarea"
            v-model="form.gExplain"
            :rows="4"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品封面*">
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
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitGoods">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 这种是错误的！！！
// import qiniu from 'qiniu-js';

// 这才是对的！
import * as qiniu from "qiniu-js";

export default {
  name: "goods",
  data() {
    return {
      tableData: [],
      page: 1,
      pageSize: 10,
      currentPage: 1,
      total: 0,
      options: [
        {
          value: "1",
          label: "未发货"
        },
        {
          value: "2",
          label: "已发货"
        }
      ],
      options2: [],
      gName: "",
      formInline: {
        user: "",
        region: ""
      },
      loadingTable: true,
      centerDialogVisible: false,
      form: {
        gName: "",
        auth: "",
        authName: "",
        price: "",
        num: 1,
        delivery: "1",
        endDate: "",
        address: "",
        gExplain: "",
        dynamicTags: ["热度商品"]
      },
      imageUrl: "",
      base64Str: "",
      dname: "",
      gid: "",
      inputVisible: false,
      inputValue: ""
    };
  },
  methods: {
    changeOp(e) {
      console.log("e", e);
      if (e) {
        let str = e.split("@@");
        this.form.authName = str[1];
        this.form.auth = str[0];
      }
      console.log("e", this.form);
    },
    getUserList() {
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
            this.centerDialogVisible = true;
            this.options2 = res.data.data.list;
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
    sizeChange(value) {
      this.page = 1;
      this.pageSize = value;
      this.getData();
    },
    handleClose(tag) {
      this.form.dynamicTags.splice(this.form.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      if (this.form.dynamicTags.length == "3") {
        this.$message({
          message: "单个商品最多设置3个标签",
          type: "warning"
        });
        return;
      }
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.form.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    formatterDate(row, column, cellValue, index) {
      if (row.endDate) {
        return this.$baseFun.longtimeToStr(row.endDate);
      } else {
        return "";
      }
    },
    fileterDateForCreateDate(value) {
      return this.$baseFun.longtimeToStr(value.startDate);
    },
    fileterDateForUpdateDate(value) {
      return this.$baseFun.longtimeToStr(value.updateDate);
    },
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
    submitGoods() {
      let xhrurl = "/goods/addGoods";
      let endDate = new Date(this.form.endDate);
      let pdata = {
        gName: this.form.gName,
        auth: this.form.auth,
        authName: this.form.authName,
        price: this.form.price,
        num: this.form.num,
        delivery: this.form.delivery,
        endDate: endDate.getTime(),
        address: this.form.address,
        gExplain: this.form.gExplain,
        coverImg: this.base64Str
      };
      console.log(pdata);
      // return;
      let dynamicTags;
      if (this.form.dynamicTags && this.form.dynamicTags.length > 0) {
        dynamicTags = this.form.dynamicTags.join("@");
        pdata.tags = dynamicTags;
      }
      let boolData = true;
      for (let keys in pdata) {
        if (!pdata[keys]) {
          if (pdata[keys] != "0") {
            boolData = false;
            break;
          }
        }
      }
      if (!boolData) {
        this.$message({
          showClose: true,
          message: "请将商品信息补充完整",
          type: "warning"
        });
        return;
      }
      // return;
      if (this.gid) {
        xhrurl = "/goods/updateGoodsInfo";
        pdata.id = this.gid;
      } else {
        pdata.merchantId = "1";
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
    },
    delGoods(index, row) {
      let that = this;
      let pdata = {
        enabled: 0,
        id: row.id
      };
      this.$confirm("将要删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          that.$api.post("/goods/updateGoodsInfo", pdata).then(
            res => {
              console.log("res", res);
              if (res.data.code == "200") {
                that.$message({
                  type: "success",
                  message: "删除成功"
                });
                that.getData();
              } else {
                that.$message({
                  type: "error",
                  message: "删除失败"
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
            message: "已取消删除"
          });
        });
    },
    addGoods() {
      this.dname = "添加";
      this.gid = null;
      this.form = {
        gName: "",
        auth: "",
        authName: "",
        price: "",
        num: 1,
        delivery: "1",
        endDate: "",
        address: "",
        gExplain: "",
        dynamicTags: ["热度商品"]
      };
      this.getUserList();
      this.centerDialogVisible = true;
    },
    editOrder(index, row) {
      this.dname = "编辑";
      let objData = {
        gName: row.gName,
        gExplain: row.gExplain,
        num: row.num,
        price: row.price,
        auth: row.auth,
        authName: row.authName,
        delivery: row.delivery,
        endDate: this.$baseFun.longtimeToStr(row.endDate),
        address: row.address
      };
      if (row.tags) {
        objData.dynamicTags = row.tags.split("@");
      }
      this.form = objData;
      this.imageUrl = row.coverImg;
      this.base64Str = row.coverImg;
      this.gid = row.id;
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
        pageSize: this.pageSize,
        gName: this.gName
      };
      if (this.$USER.userType == "3") {
        pdata.authName = this.$USER.userName;
      }
      this.loadingTable = true;
      this.$api.post("/goods/selectGoods", pdata).then(
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
    }
  },
  mounted() {
    this.getData();
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
</style>
