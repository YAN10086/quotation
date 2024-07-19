<template>
    <div class="right-main">
        <!-- <div class="top-menu">{{ routerInfo }}</div> -->
        <div class="right-content">
            <div class="right-content-bg">
                <div class="right-content-left">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>个人主页</span>
                        </div>
                        <div class="text item">
                            <!-- <img src="../../../../static/image/userLogo.jpg"> -->
                            <p>登陆者名称</p>
                            <p>登陆者账号类型 <span style="color:#ff6000">{{ $store.state.userType }}</span></p>
                        </div>
                        <div class="text item skill">
                            <i class="el-icon-s-cooperation"> 上海惠诚科教器械股份有限公司</i>
                            <i class="el-icon-s-promotion"> 上海市闵行区紫秀路100号</i>
                            <br>
                            <i class="el-icon-news"> 我的标签</i>
                            <div>
                                <el-tag>标签一</el-tag>
                                <el-tag type="success">标签二</el-tag>
                                <el-tag type="info">标签三</el-tag>
                                <el-tag type="warning">标签四</el-tag>
                                <el-tag type="danger">标签五</el-tag>
                            </div>
                            <br>
                            <i class="el-icon-edit-outline"> 我的技能</i>
                            <br>
                            <div class="block">
                                <span class="demonstration">Java</span>
                                <el-slider v-model="value1"></el-slider>
                            </div>
                            <div class="block">
                                <span class="demonstration">Erget</span>
                                <el-slider v-model="value2"></el-slider>
                            </div>
                            <div class="block">
                                <span class="demonstration">React / Vue </span>
                                <el-slider v-model="value3"></el-slider>
                            </div>
                        </div>
                        <div class="text item skill">
                            <div>
                                <i class="el-icon-s-flag"> 我的签名</i>
                            </div>
                            <p>
                                车道山前必有路，车道山前必有路，车道山前必有路。
                            </p>
                        </div>
                    </el-card>
                </div>
                <div class="right-content-right">
                    <el-tabs v-model="activeName" @tab-click="handleClick" class="right-content-right-tabs">
                        <el-tab-pane label="我的时间轴" name="first">
                            <el-timeline>
                                <el-timeline-item timestamp="2020/06/12" placement="top">
                                    <el-card>
                                        <h4>更新 状态 三年</h4>
                                        <p>提交于 2020/06/12 20:46</p>
                                    </el-card>
                                </el-timeline-item>
                                <el-timeline-item timestamp="2019/06/12" placement="top">
                                    <el-card>
                                        <h4>更新 状态 二年</h4>
                                        <p>我 提交于 2019/06/12 20:46</p>
                                    </el-card>
                                </el-timeline-item>
                                <el-timeline-item timestamp="2018/06/12" placement="top">
                                    <el-card>
                                        <h4>更新 我在惠诚 状态 一年</h4>
                                        <p>我 提交于 2018/06/12 20:46</p>
                                    </el-card>
                                </el-timeline-item>
                                <el-timeline-item timestamp="2017/06/12" placement="top">
                                    <el-card>
                                        <h4>在 上海惠诚</h4>
                                        <p>我 记录于 2017/06/12 20:46</p>
                                    </el-card>
                                </el-timeline-item>
                                <el-timeline-item timestamp="2020/06/12" placement="top">
                                    <el-card>
                                        <h4>更新 状态 三年</h4>
                                        <p>提交于 2020/06/12 20:46</p>
                                    </el-card>
                                </el-timeline-item>
                                <el-timeline-item timestamp="2019/06/12" placement="top">
                                    <el-card>
                                        <h4>更新 状态 二年</h4>
                                        <p>我 提交于 2019/06/12 20:46</p>
                                    </el-card>
                                </el-timeline-item>
                                <el-timeline-item timestamp="2018/06/12" placement="top">
                                    <el-card>
                                        <h4>更新 我在惠诚 状态 一年</h4>
                                        <p>我 提交于 2018/06/12 20:46</p>
                                    </el-card>
                                </el-timeline-item>
                                <el-timeline-item timestamp="2017/06/12" placement="top">
                                    <el-card>
                                        <h4>在 上海惠诚</h4>
                                        <p>我 记录于 2017/06/12 20:46</p>
                                    </el-card>
                                </el-timeline-item>
                                <el-timeline-item timestamp="2020/06/12" placement="top">
                                    <el-card>
                                        <h4>更新 状态 三年</h4>
                                        <p>提交于 2020/06/12 20:46</p>
                                    </el-card>
                                </el-timeline-item>
                                <el-timeline-item timestamp="2019/06/12" placement="top">
                                    <el-card>
                                        <h4>更新 状态 二年</h4>
                                        <p>我 提交于 2019/06/12 20:46</p>
                                    </el-card>
                                </el-timeline-item>
                                <el-timeline-item timestamp="2018/06/12" placement="top">
                                    <el-card>
                                        <h4>更新 我在惠诚 状态 一年</h4>
                                        <p>我 提交于 2018/06/12 20:46</p>
                                    </el-card>
                                </el-timeline-item>
                                <el-timeline-item timestamp="2017/06/12" placement="top">
                                    <el-card>
                                        <h4>在 上海惠诚</h4>
                                        <p>我 记录于 2017/06/12 20:46</p>
                                    </el-card>
                                </el-timeline-item>
                            </el-timeline>
                        </el-tab-pane>
                        <el-tab-pane label="我参与的产品开发" name="second">
                            <el-row>
                                <el-col :span="8" :offset="0">
                                    <el-card :body-style="{ padding: '0px' }">
                                        <img src="//nwzimg.wezhan.cn/contents/sitefiles2019/10097787/images/2140808.png"
                                            class="image">
                                        <div class="el-tab-pane-info">
                                            <span>SaaS智能心理云平台</span>
                                            <div class="bottom clearfix">
                                                <div class="description">
                                                    Psy-Cloud智能心理SaaS云平台的技术架构是基于SaaS云架构模式开发，使用单位无需安装客户端，无需IT投入，只需一部手机或一台电脑，即可轻轻松松跨平台使用。
                                                </div>
                                            </div>
                                        </div>
                                    </el-card>
                                </el-col>
                                <el-col :span="8" :offset="2">
                                    <el-card :body-style="{ padding: '0px' }">
                                        <img src="//nwzimg.wezhan.cn/contents/sitefiles2019/10097787/images/6969946.jpg"
                                            class="image">
                                        <div class="el-tab-pane-info">
                                            <span>手机网络沉迷解决方案</span>
                                            <div class="bottom clearfix">
                                                <div class="description">手机网络沉迷解决方案。</div>

                                            </div>
                                        </div>
                                    </el-card>
                                </el-col>
                                <el-col :span="8" :offset="2">
                                    <el-card :body-style="{ padding: '0px' }">
                                        <img src="//nwzimg.wezhan.cn/contents/sitefiles2019/10097787/images/6133042.jpg"
                                            class="image">
                                        <div class="el-tab-pane-info">
                                            <span>睡眠问题解决方案</span>
                                            <div class="bottom clearfix">
                                                <div class="description">睡眠问题解决方案。</div>

                                            </div>
                                        </div>
                                    </el-card>
                                </el-col>
                            </el-row>
                            <br>
                            <el-row>
                                <el-col :span="8" :offset="0">
                                    <el-card :body-style="{ padding: '0px' }">
                                        <img src="//nwzimg.wezhan.cn/contents/sitefiles2019/10097787/images/1624040.png"
                                            class="image">
                                        <div class="el-tab-pane-info">
                                            <span>惠诚心悦App</span>
                                            <div class="bottom clearfix">
                                                <div class="description">
                                                    本系统简称“心悦”，它以模拟标准化的心理咨询流程为核心，涵盖测评、训练、指导、互动、咨询等全方位的服务内容，为每一位用户提供定制化的心理服务。
                                                </div>

                                            </div>
                                        </div>
                                    </el-card>
                                </el-col>
                                <el-col :span="8" :offset="2">
                                    <el-card :body-style="{ padding: '0px' }">
                                        <img src="//nwzimg.wezhan.cn/contents/sitefiles2019/10097787/images/6969944.jpg"
                                            class="image">
                                        <div class="el-tab-pane-info">
                                            <span>AI预警干预解决方案</span>
                                            <div class="bottom clearfix">
                                                <div class="description">
                                                    该AI危机干预模块是SaaS云平台原有危机干预的整合升级，比同类产品筛查精准率更高，可提供线上和线下的一体化解决方案。</div>

                                            </div>
                                        </div>
                                    </el-card>
                                </el-col>
                                <el-col :span="8" :offset="2">
                                    <el-card :body-style="{ padding: '0px' }">
                                        <img src="//nwzimg.wezhan.cn/contents/sitefiles2019/10097787/images/6977170.jpg"
                                            class="image">
                                        <div class="el-tab-pane-info">
                                            <span>e+可穿戴设备</span>
                                            <div class="bottom clearfix">
                                                <div class="description">该方案是一个以睡眠为核心，从睡眠检测、智能助眠到个性服务的一个一体化解决方案。</div>

                                            </div>
                                        </div>
                                    </el-card>
                                </el-col>
                            </el-row>
                        </el-tab-pane>
                        <el-tab-pane label="我的吐槽" name="third">我的吐槽 $@@#!$%^&*(())!@##$#@$!!!</el-tab-pane>
                        <el-tab-pane label="最近关注什么" name="fourth">最近关注什么 React</el-tab-pane>
                    </el-tabs>
                </div>
            </div>
        </div>
    </div>
</div></template>

<script>
export default {
    name: 'HelloWorld',
    data() {
        return {
            msg: 'Welcome to Your Vue.js App',
            routerInfo: "",
            activeName: 'first',
            value1: 35,
            value2: 20,
            value3: 75,
        }
    },
    methods: {
        handleClick(tab, event) {

        }
    },
    mounted() {
      
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.right-content-bg {
    background: #e9eef3;
    display: flex;
}

.right-content-left {
    width: 25%;
    display: inline-block;
    background: #ffffff;
    border-radius: 5px;
}

.right-content-right {
    width: 72%;
    margin-left: 3%;
    display: inline-block;
    vertical-align: top;
    background: #ffffff;
    padding-left: 2%;
    border-radius: 5px;
}

.right-content-right-tabs {
    margin-bottom: 20px;
}

.text {
}

.description {
    color: #999999;
    margin-top: 8px;
    line-height: 20px;
}

.item {
    margin-bottom: 18px;
    text-align: center;
    width: 100%;

    img {
        width: 40%;
        border-radius: 50% 50%;
    }
}

.skill {
    text-align: left;

    p {
        color: red;
        //   white-space: nowrap; /*不换行*/
        word-break: break-word;
        color: #999999;
    }

    .el-icon-s-cooperation {
        margin-bottom: 10px;
        color: #999999;
    }

    .el-icon-news {
        margin-bottom: 10px;
        //   color: #999999;
    }

    .el-icon-s-promotion {
        margin-bottom: 35px;
        color: #999999;
    }

    .el-icon-edit-outline {
        margin-bottom: 15px;
    }
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}

.box-card {
    width: 100%;
}

/deep/ .el-tabs__content {
    width: 98% !important;
}

.el-col-8 {
    width: 31% !important;
}

.el-col-offset-2 {
    margin-left: 3% !important;
}

.el-card__body {
    .image {
        width: 100%;
        height: 110px;
    }
}

.el-tab-pane-info {
    padding: 14px;
    height: 135px;
    // overflow-y: scroll;
}

</style>
