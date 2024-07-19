<template>
  <div class="login-content">
    <div class="login-view">
      <div class="login-left">
        <img src="../../static/image/login-left.png" class="left-img" />
      </div>
      <div class="login-detail">
        <div class="login-title">
          欢迎登录
        </div>
        <el-input
          placeholder="请输入账号"
          v-model="userName"
          clearable
          prefix-icon="el-icon-user"
          class="login-input"
          maxlength="16"
        ></el-input>
        <el-input
          placeholder="请输入密码"
          v-model="userPwd"
          show-password
          prefix-icon="el-icon-lock"
          class="login-input"
          maxlength="16"
          @keyup.enter.native="login"
        ></el-input>
        <el-input
          placeholder="请输入渠道code"
          v-model="code"
          clearable
          prefix-icon="el-icon-position"
          class="login-input"
          maxlength="16"
        ></el-input>
        <el-button
          type="primary"
          :icon="loginicon"
          class="login-bt"
          size="default"
          @click="login"
          >点 击 登 录</el-button
        >
      </div>
    </div>
    <footer></footer>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      msg: "测试",
      userName: "",
      userPwd: "",
      loginType: "login",
      loginicon: "",
      radio: "2",
      code: "GT001"
    };
  },
  methods: {
    changeLoginType(e) {
      this.loginType = e;
    },
    async login() {
      if (this.loginicon == "el-icon-loading") {
        return;
      }
      this.loginicon = "el-icon-loading";
      if (!this.userName || !this.userPwd || !this.code) {
        this.$message({
          type: "warning",
          message: "请补全信息"
        });
        return;
      }
      let pdata = {
        userName: this.userName,
        userPwd: this.userPwd,
        code: this.code
      };
      let backData = await this.$getMenu(pdata);
      console.log("backData", backData);
      if (backData.data.code != "200") {
        this.$message({
          type: "warning",
          message: backData.data.msg
        });
        this.loginicon = "";
        sessionStorage.clear();
        setTimeout(() => {
          location.reload();
        }, 1000);
        return;
      } else {
        if (backData.data.data && backData.data.data.length > 0) {
          this.$message({
            type: "success",
            message: "登陆成功",
            duration: 2000
          });
          setTimeout(() => {
            this.$router.push({
              path: "cosmetics"
            });
          }, 2100);
        } else {
          this.loginicon = "";
          this.$message({
            type: "warning",
            message: "登录失败，请检查账密。"
          });
        }
      }
    }
  },
  mounted() {
    console.log("sessionStorage.getItem", sessionStorage.getItem("userObj"));
    if (sessionStorage.getItem("userObj")) {
      sessionStorage.clear();
      location.reload();
    }
  }
};
</script>

<style scoped lang="scss">
.login-content {
  width: 100%;
  height: 100%;
  text-align: center;
  // background-color: #f0f2f5;
  background-image: url("https://www.taizhou.gov.cn/taiqitong/img/bod.a9b05e84.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;

  .login-view {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

    .login-left {
      width: 400px;
      height: 400px;
      background-color: #d7efff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      opacity: 0.8;

      .left-img {
        width: 100%;
      }
    }

    .login-detail {
      width: 400px;
      height: 400px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      background-color: rgba(255, 255, 255, 0.9);
      padding: 0px 35px 15px 35px;

      .login-title {
        font-size: 29px;
        letter-spacing: 5px;
      }

      .login-header {
        width: 100%;

        img {
          width: 30%;
          float: left;
          margin-left: 8%;
        }

        .login-header-titel {
          font-size: 19px;
          vertical-align: -webkit-baseline-middle;
          letter-spacing: 2px;
          font-weight: bold;
        }
      }
    }
  }
}

.l-left-text {
  font-size: 17px;
  letter-spacing: 2px;
  -webkit-box-reflect: below 0 -webkit-linear-gradient(transparent, transparent
        20%, rgba(255, 255, 255, 0.3));
  color: #74b4f5;
}

/deep/ .el-input__inner {
  // background: rgb(232, 240, 254);
  // border: 1px solid #d9d9d9;
  height: 45px;
}

.login-input,
.login-bt,
.login-title-label,
.login-sesstion {
  margin-top: 25px;
}

.login-title-label {
  padding-bottom: 4%;
}

.login-bt {
  width: 100%;
  font-size: 15px;
}

.login-sesstion {
  width: 100%;
}

.login-sesstion-left {
  float: left;
}

.login-sesstion-right {
  float: right;
}

.login-title-label {
  color: #559cbe;
  letter-spacing: 1px;
}

footer {
  position: fixed;
  bottom: 1%;
  width: 100%;
  color: #fdfdfd;
  letter-spacing: 1px;
  font-size: 13px;
}
</style>
