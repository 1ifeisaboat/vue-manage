<template>
  <el-row class="home" :gutter="20">
      <el-col :span="8" style="margin-top:20px">
        <el-card shadow="hover">
          <div class="user">
            <img :src="userImg">
            <div class="userInfo">
              <p class="name">Admin</p>
              <p class="access">超级管理员</p>
            </div>
          </div>
          <div class="login-info">
            <p>上次登录时间：<span>2022.1.1</span></p>
            <p>上次登录地点：<span>海南</span></p>
          </div>
        </el-card>
        <el-card style="margin-top:20px; height:460px" shadow="always">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column
              v-for="(val, key) in tableLabel"
              :key="key"
              :prop="key"
              :label="val"
            >
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="16" style="margin-top:20px">
        <div class="num">
          <el-card v-for="item in countData" :key="item.name" :body-style="{display:'flex', padding:0}" shadow="always">
            <i class="icon" :class="`el-icon-${item.icon}`" :style="{background:item.color}"></i>
            <div class="detail">
              <p class="value">￥{{item.value}}</p>
              <p class="txt">{{item.name}}</p>
            </div>
          </el-card>
        </div>
        <el-card style="height:280px; margin:20px 0" shadow="always">
          <!-- <div style="height:280px;" ref="echarts"></div> -->
          <echarts :chartData="echartData.order" style="height:280px;"/>
        </el-card>
        <div class="graph">
          <el-card style="height:280px" shadow="always">
            <!-- <div style="height:240px" ref="userEcharts"></div> -->
            <echarts :chartData="echartData.user" style="height:260px;"/>
          </el-card>
          <el-card style="height:280px" shadow="always">
            <!-- <div style="height:240px" ref="videoEcharts"></div> -->
            <echarts :chartData="echartData.video" :isAxisChart="false" style="height:260px;"/>
          </el-card>
        </div>
      </el-col>
  </el-row>
</template>

<script>
import { getData } from '../../api/data'
// import * as echarts from 'echarts'
import Echarts from '../../components/ECharts.vue'
export default {
  name:'home',
  components:{Echarts},
  data() {
    return {
      userImg:require('../../assets/image/user.png'),
      tableData: [
        {
          name:'oppo',
          todayBuy:100,
          monthBuy:300,
          totalBuy:800
        },
        {
          name:'vivo',
          todayBuy:100,
          monthBuy:300,
          totalBuy:800
        },
        {
          name:'Apple',
          todayBuy:100,
          monthBuy:300,
          totalBuy:800
        },
        {
          name:'XiaoMi',
          todayBuy:100,
          monthBuy:300,
          totalBuy:800
        },
        {
          name:'MeiZu',
          todayBuy:100,
          monthBuy:300,
          totalBuy:800
        },
      ],
      tableLabel:{
        name:'品牌',
        todayBuy:'今日购买',
        monthBuy:'月度购买',
        totalBuy:'总购买'
      },
      countData: [
        {
          name:'今日支付订单',
          value:1234,
          icon:'success',
          color:'#2ec7c9'
        },
        {
          name:'今日收藏订单',
          value:210,
          icon:'star-on',
          color:'#ffb980'
        },
        {
          name:'今日未支付订单',
          value:1234,
          icon:'s-goods',
          color:'#5ab1ef'
        },
        {
          name:'本月支付订单',
          value:1234,
          icon:'success',
          color:'#2ec7c9'
        },
        {
          name:'本月收藏订单',
          value:210,
          icon:'star-on',
          color:'#ffb980'
        },
        {
          name:'本月未支付订单',
          value:1234,
          icon:'s-goods',
          color:'#5ab1ef'
        },
      ],
      echartData:{
        order:{
          xAxis:[],
          series:[]
        },
        user:{
          xAxis:[],
          series:[]
        },
        video:{
          series:[]
        }
      }
    }
  },
  mounted() {
    getData().then(res=>{
      const {code, data} = res.data
      if(code === 20000) {
        this.tableData = data.tableData
        const order = data.orderData
        const xData = order.date
        const keyArray = Object.keys(order.data[0])
        const series = []
        keyArray.forEach(key => {
          series.push({
            name:key,
            data:order.data.map(item => item[key]),
            type:'line'
          })
        })

        // 折线图
        //#region 
        /* const option = {
          xAxis: {
            data:xData
          },
          yAxis: {},
          legend: {
            data:keyArray
          },
          series
        }
        const E = echarts.init(this.$refs.echarts)
        E.setOption(option) */
        //#endregion
        this.echartData.order.xData = xData
        this.echartData.order.series = series
        
        // 用户图
        // #region
        /* const userOption = {
          legend: {
            // 图例文字颜色
            textStyle: {
              color: '#333'
            }
          },
          grid: {
            left: '20%'
          },
          // 提示框
          tooltip: {
            trigger:'axis'
          },
          xAxis: {
            type: 'category', // 类目轴
            data: data.userData.map(item => item.date),
            axisLine: {
              lineStyle: {
                color: '#17b3a3'
              }
            },
            axisLabel: {
              interval: 0,
              color: '#333'
            }
          },
          yAxis :[
            {
              type: 'value',
              axisLine: {
                lineStyle: {
                  color: '#17b3a3'
                }
              }
            }
          ],
          color: ['#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80', '#8d98b3'],
          series: [
            {
              name:'新增用户',
              data:data.userData.map(item=>item.new),
              type:'bar'
            },
            {
              name:'活跃用户',
              data:data.userData.map(item=>item.active),
              type:'bar'
            },
          ]
        } 
        const U = echarts.init(this.$refs.userEcharts)
        U.setOption(userOption) */
        // #endregion
        this.echartData.user.xData = data.userData.map(item => item.date)
        this.echartData.user.series = [
            {
              name:'新增用户',
              data:data.userData.map(item=>item.new),
              type:'bar'
            },
            {
              name:'活跃用户',
              data:data.userData.map(item=>item.active),
              type:'bar'
            },
        ]

        // 饼图
        //#region 
        /* const videoOption = {
          tooltip:{
            trigger:'item'
          },
          color:[
            '#0f78f4',
            '#dd536b',
            '#9462e5',
            '#a6a6a6',
            '#e1bb22',
            '#39c362',
            '#3ed1cf'
          ],
          series:[
            {
              data:data.videoData,
              type:'pie'
            }
          ]
        }
        const V = echarts.init(this.$refs.videoEcharts)
        V.setOption(videoOption) */
        //#endregion
        this.echartData.video.series = [
            {
              data:data.videoData,
              type:'pie'
            }
        ] 
      }
    })
  },
}
</script>

<style lang="less" scoped>
  .home{
    p{
      font-size: 14px;
      line-height: 14px;
      color: rgb(100, 100, 100);
    }
    .user{
      border-bottom: 1px solid rgb(100, 100, 100);
      display: flex;
      align-items: center;
      img{
        border-radius: 50%;
        margin: 20px;
        background-color: rgba(0, 0, 255, 0.5);
        vertical-align: middle;
      }
      .userInfo{
        display: inline-block;
        .name{
          color: #000;
          font-size: 36px;
        }
      }
    }
    .login-info{
      margin-top: 40px;
      span{
        margin-left: 40px;
      }
    }
    .num{
      display: flex;
      justify-content: space-between;
      flex-flow: row wrap;
      font-size: 36px;
      .icon{
        color: #fff;
        width: 90px;
        height: 90px;
        display: flex;
        align-items: center;
        justify-content: space-around;
      }
      .detail{
        width: 250px;
        .value{
          font-size: 24px;
          color: #000;
        }
        .txt,
        .value{
          text-align: center;
        }
      }
    }
    .graph{
      display: flex;
      justify-content: space-between;
      .el-card{
        flex-basis: 520px;
      }
    }
  }
</style>