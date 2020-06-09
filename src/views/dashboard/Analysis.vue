<template>
  <div class="page-header-index-wide">
    <a-row :gutter="24">
      <a-col :sm="24" :md="12" :xl="8" :style="{ marginBottom: '24px' }">
        <chart-card :loading="loading" title="商户数" :total="usersNum">
          <a-tooltip title="商户数" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <mini-bar width="100%" />
          </div>
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="8" :style="{ marginBottom: '24px' }">
        <chart-card :loading="loading" title="订单总计" :total="orderNum | NumberFormat">
          <a-tooltip title="订单总计" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <mini-area />
          </div>
          <!-- <template slot="footer">日访问量<span> {{ '1234' | NumberFormat }}</span></template> -->
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="8" :style="{ marginBottom: '24px' }">
        <chart-card :loading="loading" title="交易统计" :total="6560 | NumberFormat">
          <a-tooltip title="交易统计" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <mini-bar />
          </div>
          <!-- <template slot="footer">转化率 <span>60%</span></template> -->
        </chart-card>
      </a-col>
    </a-row>

    <a-card :loading="loading" :bordered="false" :body-style="{padding: '0'}">
      <div class="salesCard">
        <a-tabs default-active-key="1" size="large" :tab-bar-style="{marginBottom: '24px', paddingLeft: '16px'}">
          <div class="extra-wrapper" slot="tabBarExtraContent">
            <div class="extra-item">
              <a @click="clickTime('days')">今日</a>
              <a @click="clickTime('week')">本周</a>
              <a @click="clickTime('month')">本月</a>
              <a @click="clickTime('year')">本年</a>
            </div>
            <a-range-picker :style="{width: '256px'}" />
          </div>
          <a-tab-pane loading="true" tab="交易图" key="1">
            <a-row>
              <a-col :xl="16" :lg="12" :md="12" :sm="24" :xs="24">
                <bar :data="barData" title="订单趋势图" :scale="barDataScale" />
              </a-col>
              <a-col :xl="8" :lg="12" :md="12" :sm="24" :xs="24">
                <rank-list title="最新订单记录" :list="newsData"/>
              </a-col>
            </a-row>
          </a-tab-pane>
        </a-tabs>
      </div>
    </a-card>
  </div>
</template>

<script>
import Vue from 'vue'
import { ChartCard, MiniArea, MiniBar, MiniProgress, RankList, Bar, Trend, NumberInfo, MiniSmoothArea } from '@/components'
import { mixinDevice } from '@/utils/mixin'
import { usersNum, orderNum, newOrders } from '@/api/user'
import { orderChart } from '@/api/order'

const barDataScale = [
  {
    dataKey: 'x',
    alias: '时间'
  },
  {
    dataKey: 'y',
    alias: '订单数量',
    min: 0
  }
]

export default {
  name: 'Analysis',
  mixins: [mixinDevice],
  components: {
    ChartCard,
    MiniArea,
    MiniBar,
    MiniProgress,
    RankList,
    Bar,
    Trend,
    NumberInfo,
    MiniSmoothArea
  },
  data () {
    return {
      loading: true,
      // rankList,
      barDataScale,

      // 销售额
      barData: [],

      // 账户信息
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      level: '商户',
      info: {},
      usersNum: '',
      orderNum: '',
      // 公告
      newsData: [],
      loadingNews: false,
      loadingMore: false,
      showLoadingMore: true,
      busy: false,
      time: 'month'
    }
  },
  created () {
    setTimeout(() => {
      this.loading = !this.loading
      const info = Vue.ls.get('info')
      if (info) {
        this.info = info
      } else {
        this.$message.warning('用户信息过期, 请重新登录')
        this.$router.push({
          path: '/user/login'
        })
      }
      console.log(info)
    }, 1000)
  },
  mounted () {
    this.getUserNum()
    this.getOrderNum()
    this.getNewOrders()
    this.getOrderChart()
  },
  methods: {
    // 点击已何种方式显示数据 天, 周, 月, 年
    clickTime (type) {
      this.time = type
      this.getOrderChart()
    },
    // 获取用户数量
    getUserNum () {
      usersNum().then(res => {
        if (res.code === 1) {
          this.usersNum = res.data.total
        } else {
          this.usersNum = 0
        }
      })
    },
    // 获取订单数量
    getOrderNum () {
      orderNum().then(res => {
        if (res.code === 1) {
          this.orderNum = res.data.num
        } else {
          this.orderNum = 0
        }
      })
    },
    // 获取订单趋势图
    getOrderChart () {
      const params = {
        time: this.time
      }
      orderChart(params).then(res => {
        if (res.code === 1) {
          // this.barData = res.data
          for (let i = 0; i < res.data.length; i++) {
            this.barData.push({
              x: res.data[i]['day'],
              y: res.data[i]['orderNum']
            })
            // console.log(this.barData)
          }
        } else {
          this.barData = []
          return res
        }
      })
    },
    // 完善资料
    overInfo () {
      this.$router.push({
        path: '/account/settings'
      })
    },
    // 修改密码
    changePwd () {
      this.$router.push({
        path: '/account/settings'
      })
    },
    // 充值
    pushMoney () {
      this.$router.push({
        path: '/dashboard/PushMoney'
      })
    },
    // 申请发票
    applyTicket () {
      this.$message.info('稍后开通')
    },
    // 咨询客服
    askServicer () {
      this.$message.info('稍后开通')
    },
    // 工单
    lookForm () {
      this.$router.push({
        path: '/form/my-form'
      })
    },
    getNewOrders () {
      newOrders().then(res => {
        if (res.code === 1) {
          this.newsData = res.data
        }
      })
    },
    onLoadMore () {
      this.loadingMore = true
      this.getData(res => {
        this.newsData = this.newsData.concat(res.results)
        this.loadingMore = false
        this.$nextTick(() => {
          window.dispatchEvent(new Event('resize'))
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .ant-card-bordered{
    border: none;
  }
  .ant-card-bordered /deep/ .ant-card-body{
    padding: 0;
  }
  .extra-wrapper {
    line-height: 55px;
    padding-right: 24px;

    .extra-item {
      display: inline-block;
      margin-right: 24px;

      a {
        margin-left: 24px;
      }
    }
  }

  .antd-pro-pages-dashboard-analysis-twoColLayout {
    position: relative;
    display: flex;
    display: block;
    flex-flow: row wrap;
  }

  .antd-pro-pages-dashboard-analysis-salesCard {
    height: calc(100% - 24px);
    /deep/ .ant-card-head {
      position: relative;
    }
  }

  .dashboard-analysis-iconGroup {
    i {
      margin-left: 16px;
      color: rgba(0,0,0,.45);
      cursor: pointer;
      transition: color .32s;
      color: black;
    }
  }
  .analysis-salesTypeRadio {
    position: absolute;
    right: 54px;
    bottom: 12px;
  }
  .change-pwd-btn{
    margin-left: 15px;
  }
  .total-money{
    color: #ed2565;
    font-size: 18px
  }
  .money-desc{
    font-size: 12px;
  }
  .inline-receive-money{
    background-color: #790bb7;
    color: #fff;
  }
  .apply-ticket{
    background-color: #17a267;
    color: #fff;
  }
  .demo-infinite-container {
    border: 1px solid #e8e8e8;
    border-radius: 4px;
    overflow: auto;
    padding: 8px 24px;
    height: 300px;
  }
  .demo-loading-container {
    position: absolute;
    bottom: 40px;
    width: 100%;
    text-align: center;
  }
</style>
