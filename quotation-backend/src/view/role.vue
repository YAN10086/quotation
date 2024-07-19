<!--
 * @Author: baiyf
 * @Date: 2023-03-28 21:48:35
 * @LastEditTime: 2023-10-30 02:00:13
 * @Description: file content
-->
<template>
  <div class="right-main">
    <div class="main-table">
      <!-- <el-button type="primary" @click="addVip">添加角色</el-button> -->
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
          prop="roleName"
          label="角色名称"
          width="200"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="roleExplain"
          label="角色备注"
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
              type="primary"
              v-if="$baseFun.checkhaveIds(10)"
              :disabled="scope.row.id == '2'"
              >编辑角色</el-button
            >
            <el-button
              size="mini"
              @click="editAuth(scope.$index, scope.row)"
              class="el-table-column-bt"
              v-if="$baseFun.checkhaveIds(11)"
              :disabled="scope.row.id == '2'"
              type="primary"
              >分配权限</el-button
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
      :title="dname + '角色'"
      :visible.sync="centerDialogVisible"
      width="720px"
      center
    >
      <el-form ref="form" :model="form" label-width="100px" class="form-goods">
        <el-form-item label="角色名称*">
          <el-input v-model="form.name" class="min-input-width"></el-input>
        </el-form-item>
        <el-form-item label="角色备注*">
          <el-input type="textarea" v-model="form.content" :rows="7"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitGoods">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="分配权限"
      :visible.sync="centerDialogVisible2"
      width="1080px"
      center
    >
      <!-- {{ menus }} \ {{ buttons }} -->
      <el-alert title="蓝色为菜单权限 | 橙色为按钮权限" type="warning">
      </el-alert>
      <el-card
        v-for="(item, index) in authsList"
        :key="item.id"
        class="quanxian_card"
      >
        <div slot="header">
          <el-checkbox-group class="checkbox_group" v-model="menus">
            <el-checkbox class="quanxian_card_checkbox" :label="item.id">{{
              item.authName
            }}</el-checkbox>
          </el-checkbox-group>
        </div>

        <!-- <el-checkbox-group v-model="checkList">

        </el-checkbox-group>
        <div v-for="(child, cindex) in item.childsBts" :key="child.id"> {{ child.authName }}</div> -->
        <el-checkbox-group class="checkbox_group" v-model="buttons">
          <el-checkbox
            class="quanxian_card_checkbox2"
            v-for="(child, cindex) in item.childsBts"
            :key="child.id"
            :label="child.id"
          >
            {{ child.authName }}
          </el-checkbox>
        </el-checkbox-group>
      </el-card>

      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="submitAuths">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "role",
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
      form: {
        name: "",
        content: "",
        price: ""
      },
      centerDialogVisible2: false,
      authsList: []
    };
  },
  methods: {
    submitAuths() {
      this.submitGoods();
    },
    editAuth(index, row) {
      this.gid = row.id;
      console.log("row", row);
      if (row.buttons) {
        this.buttons = row.buttons.split("@").map(Number);
      } else {
        this.buttons = [];
      }
      if (row.menus) {
        this.menus = row.menus.split("@").map(Number);
      } else {
        this.menus = [];
      }
      let menus = [];
      this.$api.post("/auths/selectAuths", {}).then(
        res => {
          console.log("res", res);
          if (res.data.code == "200") {
            // authsList
            let list = res.data.data.list;
            for (let p = 0; p < list.length; p++) {
              if (!list[p].parentId) {
                //菜单
                menus.push(list[p]);
              }
            }

            for (let p = 0; p < menus.length; p++) {
              let childs = [];
              for (let p2 = 0; p2 < list.length; p2++) {
                if (menus[p].id == list[p2].parentId) {
                  childs.push(list[p2]);
                }
              }
              menus[p].childsBts = childs;
            }
            console.log("menusmenus", menus);
            this.authsList = menus;
            this.centerDialogVisible2 = true;
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
    },
    submitGoods() {
      let xhrurl = "/roles/addRoles";
      let pdata = {
        roleName: this.form.name,
        roleExplain: this.form.content,
        price: this.form.price
      };
      if (this.gid) {
        xhrurl = "/roles/updateRolesInfo";
        pdata.id = this.gid;

        if (this.menus.length > 0) {
          let strcheckAll = this.menus.join("@");
          pdata.menus = strcheckAll;
        }
        if (this.buttons.length > 0) {
          let strcheckedPermissions = this.buttons.join("@");
          pdata.buttons = strcheckedPermissions;
        }
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
          } else {
            this.$message({
              type: "error",
              message: this.dname + "成功"
            });
          }
          this.centerDialogVisible2 = false;
          this.gid = "";

          setTimeout(() => {
            this.getData();
          }, 2000);
        },
        err => {
          console.log("err", err);
          this.$message({
            type: "error",
            message: err.msg
          });
          this.centerDialogVisible2 = false;
          this.gid = "";
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
    addVip() {
      this.dname = "添加";
      this.centerDialogVisible = true;
    },
    editOrder(index, row) {
      this.dname = "编辑";
      let objData = {
        name: row.roleName,
        content: row.roleExplain,
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
      this.$api.post("/roles/selectRoles", pdata).then(
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

/deep/ .quanxian_card_checkbox2 {
  color: #ff6000;

  .el-checkbox__input.is-checked + .el-checkbox__label {
    color: #ff6000;
  }
}
</style>
