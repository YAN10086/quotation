
<template>
    <div class="videoMain">
        <div class="top-main">
            <div class="top-menus">
                <span v-for="(item, index) in topMenus">{{ item }}</span>
            </div>
        </div>
        <div class="center-main">
            <div class="block">
                <el-carousel height="270px">
                    <el-carousel-item v-for="item in listImgs" :key="item">
                        <img :src="item" class="list-img">
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div class="menu-view">
                <div class="menu-detail">
                    <div class="menu-block" v-for="(item, index) in 3">
                        <div class="menu-title">
                            <div class="f-menu">
                                <span class="f-hr"></span>
                                <span class="f-text">品牌精选</span>
                            </div>
                        </div>
                        <div class="videos-detail">
                            <div class="videos-preview" v-for="(item, index) in 6">
                                <div class="v-img-block">
                                    <img class="video-pre-img"
                                        src="https://d.ifengimg.com/w198_h112_q90/x0.ifengimg.com/ucms/2023_10/09AEE0FE5E5C0F8A6EBEFDC84E5609294FA682E3_size167_w975_h549.jpg" />
                                    <div class="play-icon-block">
                                        <i class="el-icon-video-play play-icon"></i>&nbsp;
                                        <div>966.3万</div>
                                    </div>
                                </div>

                                <div class="video-text">超级乘客携手沃尔沃S90对话港区人大代表霍启刚</div>
                                <div class="video-time">03-10 07:29</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="menu-right">
                    <div class="menu-title">
                        <div class="f-menu">
                            <span class="f-hr"></span>
                            <span class="f-text">品牌联盟</span>
                        </div>
                    </div>
                    <div class="videos-detail v-r-detail">
                        <div class="videos-preview r-cus-img" v-for="(item, index) in 6">
                            <div class="v-img-block">
                                <img class="video-pre-img"
                                    src="https://d.ifengimg.com/w198_h112_q90/x0.ifengimg.com/ucms/2022_49/7B712895D474760ACCB7C00433BDC95875925E52_size15_w300_h168.jpg" />
                                <div class="play-icon-block">
                                    <i class="el-icon-video-play play-icon"></i>&nbsp;
                                    <div>966.3万</div>
                                </div>
                            </div>
                            <div class="video-text">航天新势力|从市场端思维出发去造商业火箭</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    name: "baseUpload",
    data() {
        return {
            topMenus: ['首页', '人物', '娱乐', '艺术', '体育', '综艺', '旅游', '生活', '科技', '电影'],
            listImgs: ['https://img0.baidu.com/it/u=3122906915,485829348&fm=253&fmt=auto&app=138&f=JPEG?w=1711&h=500',
                'https://img2.baidu.com/it/u=612518610,176987526&fm=253&fmt=auto&app=138&f=JPEG?w=1745&h=500',
                'https://img1.baidu.com/it/u=3603872572,180212088&fm=253&fmt=auto&app=138&f=PNG?w=1920&h=400',
                'https://img0.baidu.com/it/u=372335990,2041772342&fm=253&fmt=auto&app=138&f=JPEG?w=1600&h=500',
            ],

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
    mounted() { }
};
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.videoMain {}

.top-main {
    width: 100%;
    position: relative;
    background-color: #f54343;
    color: #fff;
}

.top-menus {
    width: 1000px;
    margin: 0 auto;
    height: 33px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}

.top-menus span {
    cursor: pointer;
    width: 10%;
    height: 33px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.top-menus span:active {
    color: #f54343;
    background: #f2f2f2;
}

.center-main {
    width: 1000px;
    margin: 0 auto;
    padding-top: 20px;
}

.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}

.list-img {
    height: 100%;
    width: 100%;
}

.menu-view {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}

.menu-title {
    background-color: #f7f7f7;
    height: 42px;
    position: relative;
    width: 100%;
    line-height: 42px;
    margin-top: 10px;
}

.f-menu {
    display: flex;
    align-items: center;
    margin-left: 10px;
}

.f-hr {
    height: 23px;
    background-color: red;
    width: 5px;

}

.f-text {
    font-size: 20px;
    font-weight: 700;
    margin-left: 7px;
}

.menu-right {
    width: 300px;
}

.videos-detail {
    display: flex;
    flex-wrap: wrap;
    width: 650px;
}

.videos-preview {
    width: 33.33%;
    padding: 0px 15px;
    margin-top: 15px;
}

.v-img-block {
    position: relative;
}

.video-pre-img {
    width: 100%;
    border-radius: 5px;
    cursor: pointer;
}

.play-icon-block {
    display: flex;
    position: absolute;
    bottom: 10px;
    left: 8px;
    align-items: center;
    font-size: 12px;
    color: #fff;
}

.video-text {
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    color: #222;
    display: -webkit-box;
    font-size: 12px;
    height: 44px;
    line-height: 24px;
    margin-top: 5px;
    overflow: hidden;
    text-decoration: none;
    text-overflow: ellipsis;
    width: 100%;
}

.video-time {
    width: 100%;
    text-align: right;
    color: #999;
    font-size: 12px;
    margin-top: 0px;
}

.v-r-detail {
    flex-direction: column !important;
    width: 100%;
}

.r-cus-img {
    width: 100% !important;
    padding: 0px !important;
}
</style>
  