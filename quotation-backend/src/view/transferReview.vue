<!--
 * @Author: baiyf
 * @Date: 2023-03-28 21:48:35
 * @LastEditTime: 2023-10-30 01:44:24
 * @Description: file content
-->
<template>
  <div class="right-main">
    <div class="top-search">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="转赠人QQ">
          <el-input v-model="userName" placeholder="请输入QQ"></el-input>
        </el-form-item>

        <el-form-item class="search-bt-block">
          <el-button type="primary" @click="onSubmit" @keyup.enter="onSubmit"
            >查询</el-button
          >
          <el-button type="primary" @click="resizeData">重置</el-button>
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
          prop="userName"
          label="转赠人QQ"
          width="200"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="touserName"
          label="接受人QQ"
          width="200"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="gName"
          label="商品名称"
          width="200"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column prop="price" label="价格"> </el-table-column>
        <el-table-column prop="coverImg" label="商品封面" width="auto">
          <template slot-scope="scope">
            <img :src="scope.row.coverImg" class="voucher-img" />
          </template>
        </el-table-column>
        <el-table-column
          prop="createDate"
          label="转赠创建时间"
          :formatter="fileterDateForCreateDate"
        >
        </el-table-column>
        <el-table-column prop="trans" label="订单类型" width="140">
          <template slot-scope="scope">
            <el-tag type="info" v-if="scope.row.trans == '2'">待审核 </el-tag>
            <el-tag type="success" v-if="scope.row.trans == '3'">已通过</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" :resizable="false" width="260">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="editOrder(scope.$index, scope.row)"
              class="el-table-column-bt"
              v-if="$baseFun.checkhaveIds(28)"
              type="primary"
              >审核</el-button
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
  </div>
</template>

<script>
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
      userName: "",

      loadingTable: true,
      centerDialogVisible: false
    };
  },
  methods: {
    sizeChange(value) {
      this.page = 1;
      this.pageSize = value;
      this.getData();
    },
    fileterDateForCreateDate(value) {
      return this.$baseFun.longtimeToStr(value.createDate);
    },
    fileterDateForUpdateDate(value) {
      return this.$baseFun.longtimeToStr(value.updateDate);
    },
    onSubmit() {
      this.getData();
    },
    resizeData() {
      Object.assign(this.$data, this.$options.data.call(this));
      this.getData();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.loadingTable = true;
      this.getData();
    },
    editOrder(index, row) {
      if (row.trans == "3") {
        this.$message({
          type: "success",
          message: "已同意该转让，无法再次操作。"
        });
        return;
      }

      this.$confirm("同意转让后，无法撤销, 是否继续?", "提示", {
        confirmButtonText: "同意",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let pdata = {
            id: row.ordersId,
            trans: 3,
            userName: row.touserName
          };
          this.$api.post("/order/updateOrderInfo", pdata).then(
            res => {
              console.log("res", res);
              if (res.data.code == "200") {
                this.$message({
                  type: "success",
                  message: "审核通过"
                });
                this.getData();
              } else {
                this.$message({
                  type: "error",
                  message: "操作失败"
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
    getData() {
      let pdata = {
        page: this.page,
        pageSize: this.pageSize,
        userName: this.userName
      };
      this.loadingTable = true;
      this.$api.post("/transferReview/selectTransferReview", pdata).then(
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
  width: 325px;
  margin: 0 auto;
}

.voucher-img {
  width: 40px;
  height: 40px;
}
</style>
