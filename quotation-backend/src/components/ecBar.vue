<!--
 * @Author: baiyf
 * @Date: 2023-03-28 21:48:35
 * @LastEditTime: 2023-04-12 23:32:48
 * @Description: file content
-->
<template>
    <div class="ec" :id="eid">
    </div>
</template>
  
<script>
export default {
    name: "businessOverview",
    data() {
        return {
            eid: ''
        };
    },
    props: ['id'],
    mounted() {
        this.eid = this.id;
        this.$nextTick(() => {
            this.createEc();
        })
    },
    methods: {
        createEc() {
            let echarts = require('echarts');
            var myChart = echarts.init(document.getElementById(this.eid));
            let xData = ['2023-01', '2023-02', '2023-03', '2023-04', '2023-05', '2023-06', '2023-07', '2023-08', '2023-09', '2023-10', '2023-11', '2023-12'];
            let sData = [15, 20, 36, 10, 10, 20, 36, 10, 40, 42, 50, 38];
            let etype = 'bar';
            let sname = '销量趋势';
            if (this.eid == 'ecline') {
                sData = [9, 18, 32, 15, 20, 21, 36, 5, 60, 58, 44, 48];
                etype = 'line';
                sname = '注册人数趋势';
            }
            var option = {
                title: {
                    text: sname
                },
                tooltip: {
                    show: true
                },
                legend: {
                    data: ['销量']
                },
                xAxis: {
                    data: xData
                },
                yAxis: {},
                series: [
                    {
                        name: sname,
                        type: etype,
                        symbolSize: 2,
                        data: sData
                    }
                ]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        }
    },
};
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.ec {
    width: 100%;
    height: 325px;
}
</style>
  