<!--
 * @Author: baiyf
 * @Date: 2023-03-28 21:48:35
 * @LastEditTime: 2023-10-30 01:40:31
 * @Description: file content
-->
<template>
  <div class="right-main">
    <div class="main-table">
      <el-button type="primary" @click="addVip" v-if="$baseFun.checkhaveIds(12)"
        >添加ViP权益</el-button
      >
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
          prop="name"
          label="等级名称"
          width="200"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column prop="price" label="满足消费金额" width="120">
          <template slot-scope="scope">
            ￥{{ scope.row.price }}
          </template>
        </el-table-column>
        <el-table-column prop="discount" label="享受折扣" width="100">
        </el-table-column>
        <el-table-column
          prop="content"
          label="会员权益简介"
          width="auto"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column label="操作" :resizable="false" width="260">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="editOrder(scope.$index, scope.row)"
              class="el-table-column-bt"
              v-if="$baseFun.checkhaveIds(12)"
              type="primary"
              >编辑权益</el-button
            >
            <el-button
              size="mini"
              @click="delGoods(scope.$index, scope.row)"
              class="el-table-column-bt"
              v-if="$baseFun.checkhaveIds(13)"
              type="danger"
              >删除权益</el-button
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
      :title="dname + '权益'"
      :visible.sync="centerDialogVisible"
      width="720px"
      center
    >
      <el-form ref="form" :model="form" label-width="100px" class="form-goods">
        <el-form-item label="权益名称*">
          <el-input v-model="form.name" class="min-input-width"></el-input>
        </el-form-item>
        <el-form-item label="消费金额*">
          <el-input v-model="form.price" class="min-input-width"></el-input>
        </el-form-item>
        <el-form-item label="消费折扣*">
          <el-input-number
            v-model="form.discount"
            :min="0.1"
            :max="1"
            label="描述文字"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="权益简介*">
          <el-input type="textarea" v-model="form.content" :rows="7"></el-input>
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
export default {
  name: "vipCenter",
  data() {
    return {
      tableData: [],
      page: 1,
      pageSize: 10,
      currentPage: 1,
      total: 0,
      loadingTable: true,
      centerDialogVisible: false,
      dname: "",
      form: {
        name: "",
        content: "",
        price: ""
      }
    };
  },
  methods: {
    submitGoods() {
      let xhrurl = "/vipCenter/addVip";
      let pdata = {
        name: this.form.name,
        content: this.form.content,
        price: this.form.price,
        discount: this.form.discount
      };
      let boolData = true;
      for (let keys in pdata) {
        if (!pdata[keys]) {
          boolData = false;
          break;
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
        xhrurl = "/vipCenter/updateVip";
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
          that.$api.post("/vipCenter/updateVip", pdata).then(
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
    addVip() {
      this.dname = "添加";
      this.centerDialogVisible = true;
    },
    editOrder(index, row) {
      this.dname = "编辑";
      let objData = {
        name: row.name,
        content: row.content,
        price: row.price,
        discount: row.discount,
        id: row.id
      };
      this.form = objData;
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
        pageSize: this.pageSize
      };
      this.loadingTable = true;
      this.$api.post("/vipCenter/selectVips", pdata).then(
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
