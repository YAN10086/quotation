<template>
  <div class="right-main">
    <div>12321321</div>
    <el-button type="primary" @click="getData">主要按钮</el-button>
  </div>
</template>

<script>
export default {
  name: "baseUpload",
  data() {
    return {
      msg: "开发中>>>"
    };
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
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.right-main {
  div {
    color: red;
  }
}
</style>
