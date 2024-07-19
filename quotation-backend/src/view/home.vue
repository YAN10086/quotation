<template>
  <div id="app">
    <el-container class="menu">
      <el-header class="header">
        <div class="header-left">
          <i class="el-icon-s-grid menumedia" @click="changeMenu"></i>
        </div>
        <div class="header-right">
          报价亿点通
        </div>
        <div class="header-right">
          <div class="header-right-all">
            <div class="user-info">
              {{ $USER.userType == "2" ? "管理员" : "画师" }} -
              {{ $USER.userName }}
              <el-button
                type="primary"
                @click="push"
                stripe
                style="color:#FFC107"
                >推送价格更新</el-button
              >
            </div>
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                <img
                  src="../../static/image/userLogo.jpg"
                  class="header-right-logo"
                />
              </span>
              <el-dropdown-menu slot="dropdown" class="el-dropdown-menu-ul">
                <el-dropdown-item icon="el-icon-aim" @click.native="testReq"
                  >清理缓存</el-dropdown-item
                >
                <el-dropdown-item
                  icon="el-icon-switch-button"
                  @click.native="signOut"
                  >退出登陆</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </el-header>
      <el-container>
        <el-aside>
          <el-row class="tac">
            <!--强行加入动画过度隐藏效果-->
            <transition name="el-fade-in">
              <el-menu
                :default-active="$route.path"
                class="el-menu-vertical-demo"
                unique-opened
                router
                @open="handleOpen"
                v-if="!isCollapse"
                @close="handleClose"
                :collapse="isCollapse"
                :class="{ isCollapseFalseStyle: isCollapse != true }"
              >
                <template
                  v-for="(item, index) in $router.options.routes"
                  v-if="!item.hidden"
                >
                  <!--没有子项的菜单 单个的用el-menu-item-->
                  <el-menu-item
                    v-if="item.leaf"
                    :index="item.children[0].path"
                    :key="item.children[0].path"
                  >
                    <i :class="item.iconCls"></i>
                    <span slot="title"> {{ item.name }}</span>
                  </el-menu-item>

                  <!--leaf 有子项的菜单 用el-submenu标签   查看权限中是否有登录单位的类型-->
                  <el-submenu :index="index + ''" v-else>
                    <!--大菜单标题-->
                    <template slot="title">
                      <i :class="item.iconCls"></i>
                      <span slot="title">{{ item.name }}</span>
                    </template>
                    <!--小菜单-->
                    <el-menu-item
                      v-for="child in item.children"
                      :index="child.path"
                      :key="child.path"
                      >{{ child.name }}</el-menu-item
                    >
                  </el-submenu>
                </template>
              </el-menu>
            </transition>
          </el-row>
        </el-aside>
        <el-main class="main-view">
          <!-- <keep-alive> -->
          <router-view> </router-view>
          <!-- </keep-alive> -->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      isCollapse: false, //false为出现 true为隐藏
      userType: "", //登陆人员类型
      dialogVisible: false
    };
  },
  methods: {
    addInfo() {
      let strDate = this.$baseFun.longtimeToStr(+new Date(), "y-m-d");
      let pData = {
        userName: this.$USER.userName,
        tenantId: this.$USER.tenantId,
        strDate: strDate
      };
      this.$api.post("/subscribe/addSubscribe", pData).then(
        res => {
          console.log("res", res);
        },
        err => {
          console.log("err", err);
        }
      );
    },
    toPush() {
      this.$confirm(
        "将向小程序端订阅价格更新的用户推送价格更新提醒, 是否继续?（推送机制为：1次/天）。注：只执行推送操作，不保证送达率。",
        "提示",
        {
          confirmButtonText: "推送",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          let pData = {
            tenantId: this.$USER.tenantId,
            tenantName: this.$USER.tenantName
          };
          this.$api.post("/users/pushToUser", pData).then(
            res => {
              console.log("res", res);
              this.$message({
                type: "success",
                message: "已推送!"
              });
              this.addInfo();
              // if (res.data.code == "200") {
              //   //插入推送日志
              //   this.addInfo();
              // }
            },
            err => {
              console.log("err", err);
            }
          );
        })
        .catch(() => {});
    },
    push() {
      let strDate = this.$baseFun.longtimeToStr(+new Date(), "y-m-d");
      let pData = {
        tenantId: this.$USER.tenantId,
        strDate: strDate,
        page: 1,
        pageSize: 10
      };
      this.$api.post("/subscribe/selectSubscribe", pData).then(
        res => {
          console.log("res", res);
          if (res.data.code == "200") {
            //插入推送日志
            if (res.data.data && res.data.data.list.length > 0) {
              this.$message({
                type: "warning",
                message: `${strDate}已推送，请明日再试。`
              });
              return;
            } else {
              this.toPush();
            }
          }
        },
        err => {
          console.log("err", err);
        }
      );
    },
    handleOpen(key, keyPath) {
      //菜单伸展回调
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      //菜单关闭回调
      // console.log(key, keyPath);
    },
    handleCloseDialog(done) {
      //点击dialog右上角的叉号的回调
      this.dialogVisible = false;
    },
    changeMenu() {
      //切换菜单
      if (this.isCollapse) {
        this.isCollapse = false;
      } else {
        this.isCollapse = true;
      }
    },

    gotoUserPage() {
      this.$router.push("/userPage");
    },
    testReq() {
      this.$message({
        type: "success",
        message: "缓存清理成功"
      });
    },
    signOut() {
      this.$confirm("确定要退出吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        customClass: "messageBox-customClass"
      })
        .then(() => {
          this.$router.push({
            name: "login",
            params: { flag: "logout" }
          });
        })
        .catch(() => {});
    }
  },
  computed: {
    // ...mapGetters(["getMyName"])  //测试vuex计算属性
  },
  mounted() {}
};
</script>

<style scoped lang="scss">
.menu {
  width: 100%;
  height: 100%;
}

.div-logo {
  width: 100%;
  height: 135px;

  img {
    width: 45%;
  }
}

.el-header {
  font-size: 24px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  line-height: 60px;
  background: #409eff;
}

.header-right {
  letter-spacing: 6px;
  font-size: 28px;
  color: #fff;
}

.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;

  width: 100%;
}

.el-aside {
  background-color: #fff;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.main-view {
  background-color: #e9eef3;
  color: #333;
  width: 100%;
  height: calc(100vh - 60px);
}

body > .el-container {
  margin-bottom: 40px;
}

.el-submenu {
  text-align: left;
}

.el-menu-item {
  text-align: left;
}

.el-aside {
  width: auto !important;
}

.isCollapseFalseStyle {
  width: 200px !important;
}

.header-right {
  .header-right-logo {
    width: 30px;
    border-radius: 50%;
    display: inline-block;
  }
}

.el-dropdown {
  height: 30px;
}
.user-info {
  position: absolute;
  right: 70px;
  font-size: 15px;
  letter-spacing: 0px;
}
</style>
