<!--
 * @Author: baiyf
 * @Date: 2023-04-14 00:49:07
 * @LastEditTime: 2023-06-07 21:45:31
 * @Description: file content
-->
<template>
  <div class="add-order">
    <div>
      <div class="top-search">
        <el-form :inline="true" class="demo-form-inline" label-width="80px">
          <el-form-item label="选择商品*">
            <el-select v-model="sgoodsId" placeholder="请选择商品" @change="(v) => changeOp(v)">
              <el-option v-for="sitem in options" :key="sitem.id" :label="sitem.gname" :value="sitem.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="剩余库存*">
            <el-input v-model="gnum" disabled placeholder="请输入QQ"></el-input>
          </el-form-item>
        </el-form>
        <div class="t-tips">每次最多10个订单，同时提交过程中请耐心等待，不要离开当前页面。</div>
      </div>
    </div>
    <div class="main-from" v-for="(item, index) in oList" :key="index">
      <el-form label-width="80px" class="form-goods">
        <el-form-item label="QQ*">
          <el-input v-model="item.userName" placeholder="请输入QQ"></el-input>
        </el-form-item>
        <!-- <el-form-item label="商品*">
          <el-select v-model="item.goodsId" placeholder="请选择商品" @change="(v) => changeOp(v, index)">
            <el-option v-for="sitem in options" :key="sitem.id" :label="sitem.gname" :value="sitem.id">
            </el-option>
          </el-select>
        </el-form-item> -->
        <!-- <el-form-item label="购买数量*">
          <el-input-number v-model="item.count" :min="1" label="购买数量"></el-input-number>
        </el-form-item> -->
        <el-form-item label="订单价格*">
          <el-input-number v-model="item.favorablePrice" :precision="2" :step="1" :min="0" label="订单价格"></el-input-number>
        </el-form-item>
        <el-form-item label="商家备注">
          <el-input v-model="item.rejectInfo" placeholder="请输入商家备注"></el-input>
        </el-form-item>
        <el-form-item label="客户备注">
          <el-input v-model="item.remarks" placeholder="请输入客户备注"></el-input>
        </el-form-item>

        <!-- <el-form-item label="发货地址*">
          <el-input v-model="item.shippingAddress" placeholder="请输入发货地址"></el-input>
        </el-form-item>
        <el-form-item label="订单凭证*">
          <el-upload class="avatar-uploader" action="" :auto-upload="false" :show-file-list="false"
            :on-change="(file, fileList) => changeFile(file, fileList, index)">
            <img v-if="item.voucher" :src="item.voucher" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item> -->
      </el-form>
      <div class="child-bt">
        <el-button type="danger" @click="delChild(index)" v-if="index != '0'">删除该订单</el-button>
        <el-button type="primary" @click="addChild" v-if="index == oList.length - 1">追加订单</el-button>
      </div>
    </div>
    <div class="child-bt zj-bt">
      <el-button type="primary" @click="addOrder" size="medium">提交订单</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "addOrder",
  data() {
    return {
      v: '',
      imageUrl: '',
      sgoodsId: '',
      gnum: 0,
      options: [],
      oList: [
      ],
      cData: {
        goodsId: '',
        userName: '',
        orderType: 2,
        price: '',
        favorablePrice: '',
        remarks: '',
        count: 1,
        status: 2,
        voucher: '',
        shippingAddress: '',
        rejectInfo: '',
        merchantId: 1,
        updateDate: '',
        createDate: '',
      }
    }
  },
  methods: {
    changeFile(file, fileList, index) {
      console.log("file, fileList", file, fileList, index);
      if (file.size / 1024 > 1500) {
        this.$message.error('所选图片不能大于1.5M，请重新选择');
        return;
      }
      let copyOList = JSON.parse(JSON.stringify(this.oList));
      this.$baseFun.uploadImgToBase64(file.raw).then((resInfo) => {
        console.log(resInfo.result);
        this.imageUrl = resInfo.result;
        if ((resInfo.result.length / 1024) < 15) {
          console.log('原始图片不需要压缩')
          copyOList[index].voucher = resInfo.result;
          this.oList = copyOList;
        } else {
          this.$baseFun.compressImg(resInfo.result, 1).then((newBase64) => {
            // this.base64Str = newBase64;
            copyOList[index].voucher = newBase64
            this.oList = copyOList;
          });
        }
      })
    },
    changeOp(v) {
      this.sgoodsId = v;
      for (let p = 0; p < this.options.length; p++) {
        if (this.options[p].id == v) {
          this.gnum = this.options[p].num;
          break;
        }
      }
      let copyCdata = JSON.parse(JSON.stringify(this.cData));
      copyCdata.goodsId = v;
      this.cData = copyCdata;

      this.oList = [];
      this.addChild();
    },
    updateGoods() {
      let pdata = {
        num: this.gnum * 1 - this.oList.length * 1,
        id: this.sgoodsId
      }
      this.$api.post("/goods/updateGoodsInfo", pdata).then(
        res => {
          console.log("res", res);
          if (res.data.code == "200") {
            this.$message({
              type: "success",
              message: "订单录入成功"
            });
          } else {
            this.$message({
              type: "error",
              message: "订单录入失败！"
            });
          }
        },
        err => {
          console.log("err", err);
        }
      );
    },
    addOrder() {
      console.log(this.oList);
      let boolFlag = true;
      for (let i = 0; i < this.oList.length; i++) {
        if (!this.oList[i].goodsId || !this.oList[i].userName) {
          boolFlag = false;
          break;
        }
      }
      if (!boolFlag) {
        this.$message({
          type: "warning",
          message: "带*选项为必填项，请输入！"
        });
        return;
      }
      let pdata = {

      }
      this.$api.post("/goods/selectAllGoods", pdata).then(
        res => {
          console.log("res--selectAllGoods", res);
          let tnum = 0;
          if (res.data.code == "200") {
            let rdata = res.data.data;
            for (let k = 0; k < rdata.length; k++) {
              if (rdata[k].id == this.sgoodsId) {
                tnum = rdata[k].num;
                this.gnum = tnum;
                break;
              }
            }
            if (tnum < this.oList.length) {
              this.$message({
                type: "warning",
                message: "库存不足，请调整订单条数"
              });
              return;
            } else {
              //发起请求
              this.$api.post("/order/addOrderForAdmin", this.oList).then(
                res => {
                  console.log("res", res);
                  if (res.data.code == "200") {
                    this.updateGoods();
                    // this.$message({
                    //   type: "success",
                    //   message: "订单录入成功"
                    // });
                    setTimeout(() => {
                      location.reload();
                    }, 3000);
                  } else {
                    this.$message({
                      type: "error",
                      message: "订单录入失败！"
                    });
                  }
                },
                err => {
                  console.log("err", err);
                }
              );
            }
          } else {
            this.$message({
              type: "warning",
              message: "库存不足，请调整订单条数"
            });
          }
        },
        err => {
          console.log("err", err);
        }
      );
      return;
      this.$api.post("/order/addOrderForAdmin", this.oList).then(
        res => {
          console.log("res", res);
          if (res.data.code == "200") {
            this.$message({
              type: "success",
              message: "订单录入成功"
            });
            setTimeout(() => {
              location.reload();
            }, 2000);
          } else {
            this.$message({
              type: "error",
              message: "订单录入失败！"
            });
          }
        },
        err => {
          console.log("err", err);
        }
      );
    },
    selectAllGoods() {
      this.$api.post("/goods/selectAllGoods").then(
        res => {
          console.log("res", res);
          if (res.data.code == "200") {
            let rdata = res.data.data;
            if (rdata.length == "0") {
              return;
            }
            this.options = rdata;
            this.sgoodsId = rdata[0].id;
            this.gnum = rdata[0].num;
            let copyCdata = JSON.parse(JSON.stringify(this.cData));
            copyCdata.goodsId = rdata[0].id;
            this.cData = copyCdata;
            this.addChild();
          } else {
            this.$message({
              type: "error",
              message: "商品信息拉取失败"
            });
          }
        },
        err => {
          this.$message({
            type: "error",
            message: res.data.msg
          });
          console.log("err", err);
        }
      );
    },
    addChild() {
      if (this.oList.length > 10) {
        this.$message({
          type: "warning",
          message: "一次最多录入10个订单"
        });
        return;
      }
      if (this.oList.length >= this.gnum * 1) {
        this.$message({
          type: "warning",
          message: "库存不足，请调整订单条数"
        });
        return;
      }
      let copyOList = JSON.parse(JSON.stringify(this.oList));
      copyOList.push(JSON.parse(JSON.stringify(this.cData)));
      this.oList = copyOList;
    },
    delChild(index) {
      let copyOList = JSON.parse(JSON.stringify(this.oList));
      copyOList.splice(index, 1);
      this.oList = copyOList;
    },

  },
  mounted() {
    this.selectAllGoods();
  }
};
</script>

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
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 80px;
  height: 80px;
  line-height: 80px;
  text-align: center;
}

.avatar {
  width: 80px;
  height: 80px;
  display: block;
}

/deep/ .el-upload {
  border: 1px solid #a6baff;
}

.main-from {
  border: 1px solid #dddddd;
  padding: 15px;
  background: #fff;
  border-radius: 10px;
  margin-top: 10px;
}

.form-goods {
  display: flex;
  flex-wrap: wrap;
}

.el-form-item {
  width: 32%;
  max-width: 300px;
}

.el-select {
  width: 90%;
  max-width: 240px;
}

.el-input {
  width: 90%;
  max-width: 240px;
}

.child-bt {
  text-align: right;
}

.zj-bt {
  margin-top: 10px;
  padding-right: 15px;
  text-align: center;
}

.top-search {
  position: relative;
}

.t-tips {
  position: absolute;
  right: 10px;
  top: 21px;
  font-size: 14px;
  color: #c3c3c3;
}
</style>
