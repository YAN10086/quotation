<!--
 * @Author: baiyf
 * @Date: 2023-03-28 21:48:35
 * @LastEditTime: 2023-10-30 01:41:33
 * @Description: file content
-->
<template>
  <div class="right-main">
    <div class="top-search">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="QQ">
          <el-input v-model="userName" placeholder="请输入QQ"></el-input>
        </el-form-item>
        <el-form-item label="平台">
          <el-input v-model="platform" placeholder="请输入平台名称"></el-input>
        </el-form-item>
        <el-form-item label="平台ID">
          <el-input v-model="pid" placeholder="请输入平台ID"></el-input>
        </el-form-item>
        <el-form-item label="当前状态">
          <el-select v-model="status" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
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
            @click="centerDialogVisible3 = true"
            v-if="$baseFun.checkhaveIds(15)"
            >添加用户</el-button
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
        <el-table-column prop="merchantId" label="所属商家" width="auto">
          <template slot-scope="scope">
            云月素材
          </template>
        </el-table-column>
        <el-table-column
          prop="userName"
          label="QQ"
          width="auto"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="platform"
          label="平台"
          width="auto"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="pid"
          label="平台ID"
          width="auto"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="total_price"
          label="累计消费金额"
          width="140"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <el-tag> ￥{{ loadPrice(scope.row.total_price) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="enabled"
          width="140"
          label="当前状态"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.enabled == '1'">可用</el-tag>
            <el-tag type="warning" v-else>不可用</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="createDate"
          label="注册时间"
          :formatter="fileterDateForCreateDate"
        >
        </el-table-column>
        <el-table-column label="操作" :resizable="false" width="430">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="selectUserOrder(scope.$index, scope.row)"
              class="el-table-column-bt"
              type="primary"
              v-if="$baseFun.checkhaveIds(16)"
              >消费记录</el-button
            >
            <el-button
              size="mini"
              @click="editUser(scope.$index, scope.row)"
              class="el-table-column-bt"
              type="primary"
              v-if="$baseFun.checkhaveIds(17)"
              >编辑资料</el-button
            >
            <el-button
              size="mini"
              @click="getPwd(scope.$index, scope.row)"
              class="el-table-column-bt"
              type="warning"
              v-if="$baseFun.checkhaveIds(18)"
              >查看密码</el-button
            >
            <el-button
              size="mini"
              @click="changeUser(scope.$index, scope.row)"
              class="el-table-column-bt"
              v-if="scope.row.enabled == '1' && $baseFun.checkhaveIds(19)"
              type="danger"
              >冻结用户</el-button
            >
            <el-button
              size="mini"
              @click="changeUser(scope.$index, scope.row)"
              class="el-table-column-bt"
              v-else
              type="success"
              >恢复用户</el-button
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
      title="编辑资料"
      :visible.sync="centerDialogVisible2"
      width="720px"
      center
    >
      <el-form label-width="100px" class="form-goods">
        <el-form-item label="QQ">
          <el-input
            v-model="clickUser.userName"
            class="min-input-width"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="常用平台">
          <el-input
            v-model="clickUser.platform"
            class="min-input-width"
          ></el-input>
        </el-form-item>
        <el-form-item label="平台ID">
          <el-input v-model="clickUser.pid" class="min-input-width"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="submitGoods">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="添加用户"
      :visible.sync="centerDialogVisible3"
      width="460px"
      center
    >
      <el-form label-width="100px" class="form-goods">
        <el-form-item label="用户名">
          <el-input v-model="form.userName" class="min-input-width"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.userPwd" class="min-input-width"></el-input>
        </el-form-item>
        <el-form-item label="平台">
          <el-input v-model="form.platform" class="min-input-width"></el-input>
        </el-form-item>
        <el-form-item label="平台昵称">
          <el-input v-model="form.pid" class="min-input-width"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible3 = false">取 消</el-button>
        <el-button type="primary" @click="submitGoods3">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="消费记录"
      :visible.sync="centerDialogVisible"
      width="85%"
      center
    >
      <div class="main-table">
        <el-table
          :data="tableData_order"
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
          <el-table-column prop="userName" label="用户名"> </el-table-column>
          <el-table-column prop="price" label="原价">
            <template slot-scope="scope">
              <el-tag> ￥{{ loadPrice(scope.row.price) }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="favorablePrice" label="实际支付价格">
            <template slot-scope="scope">
              <el-tag> ￥{{ loadPrice(scope.row.favorablePrice) }}</el-tag>
            </template>
          </el-table-column>

          <el-table-column prop="count" label="订单数量"> </el-table-column>
          <el-table-column prop="status" label="订单状态">
            <template slot-scope="scope">
              <el-tag type="success" v-if="scope.row.status == '2'"
                >已发货</el-tag
              >
              <el-tag type="warning" v-else>未发货</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="remarks" label="订单备注"> </el-table-column>
          <el-table-column prop="voucher" label="付款凭证" width="auto">
            <template slot-scope="scope">
              <img
                :src="scope.row.voucher"
                class="voucher-img"
                v-if="scope.row.voucher"
              />
              <div v-else>未上传凭证！</div>
            </template>
          </el-table-column>

          <el-table-column prop="rejectInfo" label="商家备注" width="200">
          </el-table-column>
          <el-table-column prop="orderType" label="订单类型" width="140">
            <template slot-scope="scope">
              <el-tag type="" v-if="scope.row.orderType == '1'"
                >用户上传</el-tag
              >
              <el-tag type="success" v-if="scope.row.orderType == '2'"
                >商家手动录入
              </el-tag>
              <el-tag type="info" v-if="scope.row.orderType == '3'"
                >商家导入</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="updateDate"
            label="订单更新时间"
            :formatter="fileterDateForUpdateDateOrder"
          >
          </el-table-column>
          <el-table-column
            prop="createDate"
            label="订单创建时间"
            :formatter="fileterDateForCreateDateOrder"
          >
          </el-table-column>
        </el-table>
        <el-pagination
          @current-change="handleCurrentChangeOrder"
          :current-page="currentPage_order"
          :page-sizes="[10]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total_order"
          class="el-page"
        >
        </el-pagination>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "vip",
  data() {
    return {
      tableData: [],
      tableData_order: [],
      page: 1,
      pageSize: 10,
      page_order: 1,
      pageSize_order: 10,
      currentPage: 1,
      currentPage_order: 1,
      total: 0,
      total_order: 0,
      options: [
        {
          value: "1",
          label: "可用"
        },
        {
          value: "2",
          label: "不可用"
        }
      ],
      userName: "",
      platform: "",
      pid: "",
      formInline: {
        user: "",
        region: ""
      },
      loadingTable: true,
      status: "",
      clickUserName: "",
      centerDialogVisible: false,
      centerDialogVisible2: false,
      centerDialogVisible3: false,
      clickUser: "",
      form: {
        userName: "",
        userPwd: "",
        platform: "",
        pid: ""
      }
    };
  },
  methods: {
    loadPrice(total_price) {
      if (total_price) {
        return (total_price * 1).toFixed(2);
      } else {
        return 0.0;
      }
    },
    fileterDateForCreateDateOrder(value) {
      return this.$baseFun.longtimeToStr(value.createDate);
    },
    fileterDateForUpdateDateOrder(value) {
      return this.$baseFun.longtimeToStr(value.updateDate);
    },
    fileterDateForCreateDate(value) {
      return this.$baseFun.longtimeToStr(value.createDate);
    },
    onSubmit() {
      this.getData();
    },
    resizeData() {
      Object.assign(this.$data, this.$options.data.call(this));
      this.getData();
    },
    sizeChange(value) {
      this.page = 1;
      this.pageSize = value;
      this.getData();
    },
    getPwd(index, row) {
      let str = `用户${row.userName}的密码为：${row.userPwd}，请妥善保管。`;
      this.$alert(str, "查看密码", {
        confirmButtonText: "确定",
        callback: action => {}
      });
    },
    changeUser(index, row) {
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

      this.$confirm(
        "将要使该用户变为" +
          (userEnabled == "1" ? "可用状态" : "不可用状态（限制用户登录）") +
          "，是否继续？",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.$api.post("/users/updateUserInfo", pdata).then(
            res => {
              console.log("res", res);
              if (res.data.code == "200") {
                this.$message({
                  type: "success",
                  message: "修改成功"
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
    handleCurrentChange(val) {
      this.page = val;
      this.loadingTable = true;
      this.getData();
    },
    handleCurrentChangeOrder(val) {
      this.page_order = val;
      this.loadingTable = true;
      this.getOrder();
    },
    editUser(index, row) {
      this.clickUser = JSON.parse(JSON.stringify(row));
      this.centerDialogVisible2 = true;
    },
    selectUserOrder(index, row) {
      this.clickUserName = row.userName;
      this.centerDialogVisible = true;
      this.getOrder();
    },
    submitGoods() {
      let pdata = {
        userName: this.clickUser.userName,
        platform: this.clickUser.platform,
        pid: this.clickUser.pid
      };
      this.$api.post("/users/updateUserInfo", pdata).then(
        res => {
          console.log("res", res);
          if (res.data.code == "200") {
            this.$message({
              type: "success",
              message: "编辑成功"
            });
            this.centerDialogVisible2 = false;
            this.getData();
          } else {
            this.$message({
              type: "error",
              message: "编辑失败"
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
    submitGoods3() {
      // `(userName,userPwd,userType,verifyAnswers,createDate,enabled,merchantId,platform,pid) `;
      let pdata = {
        userName: this.form.userName,
        userPwd: this.form.userPwd,
        userType: "1",
        verifyAnswers: "YYSC",
        platform: this.form.platform,
        pid: this.form.pid
      };
      if (
        !this.form.userName ||
        !this.form.userPwd ||
        !this.form.platform ||
        !this.form.pid
      ) {
        this.$message({
          type: "warning",
          message: "请将信息补充完整"
        });
        return;
      }
      this.$api.post("/users/registerUser", pdata).then(
        res => {
          console.log("res", res);
          if (res.data.code == "200") {
            this.$message({
              type: "success",
              message: "编辑成功"
            });
            this.centerDialogVisible3 = false;
            this.getData();
          } else {
            this.$message({
              type: "error",
              message: "失败"
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
    getOrder() {
      let pdata = {
        page: this.page_order,
        pageSize: this.pageSize_order,
        userName: this.clickUserName
      };
      this.loadingTable = true;
      this.$api.post("/order/selectOrder", pdata).then(
        res => {
          console.log("res", res);
          if (res.data.code == "200") {
            this.tableData_order = res.data.data.list;
            this.total_order = res.data.data.count;
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

    getData() {
      let pdata = {
        page: this.page,
        pageSize: this.pageSize,
        userName: this.userName,
        platform: this.platform,
        pid: this.pid,
        userType: 1,
        enabled: this.status
      };
      this.loadingTable = true;
      this.$api.post("/users/listUser", pdata).then(
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

/deep/ .el-dialog__body {
  padding-top: 0px;
}
</style>
