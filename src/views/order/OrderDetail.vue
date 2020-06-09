<!--
 * @Author: labike
 * @Date: 2020-04-23 09:52:00
 * @LastEditTime: 2020-05-07 14:56:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-admin/src/views/form/BasicForm.vue
 -->
<template>
  <div class="form-detail">
    <div class="assist-content">
      <div class="assist-wrapper">
        <p class="common">
          <i>订单名称:</i>
          <i>
            {{ orderDetail.type }}
          </i>
        </p>
        <p class="common">
          <i>创建时间:</i>
          <i>
            {{ orderDetail.create_time }}
          </i>
        </p>
      </div>
      <div class="assist-wrapper second">
        <p class="common">
          <i>订单状态:</i>
          <i>
            {{ orderDetail.order_status }}
          </i>
        </p>
        <p class="common">
          <i>定制编号:</i>
          <i>
            {{ id }}
          </i>
        </p>
      </div>
      <div class="assist-wrapper second">
        <p class="common">
          <i>商品总价:</i>
          <i>
            {{ orderDetail.total_price }}
          </i>
        </p>
        <p class="common">
          <i>订单ID:</i>
          <i>
            {{ id }}
          </i>
        </p>
      </div>
      <div class="assist-wrapper second">
        <p class="common">
          <i>实付金额:</i>
          <i>
            {{ orderDetail.order_amount_total }}
          </i>
        </p>
      </div>
      <div class="assist-wrapper second">
        <p class="common">
          <i>支付方式:</i>
          <i>
            {{ orderDetail.pay_way }}
          </i>
        </p>
        <p class="common">
          <i>交易编号:</i>
          <i>
            {{ orderDetail.out_trade_no }}
          </i>
        </p>
      </div>
      <div class="assist-wrapper second">
        <p class="common">
          <i>订单详情:</i>
          <span>
            <i v-for="item in JSON.parse(orderDetail.order_detail)" :key="item.id">
              <b>{{ item }}</b>
            </i>
          </span>
        </p>
        <p class="common">
          <i>支付时间:</i>
          <i>
            {{ orderDetail.pay_time }}
          </i>
        </p>
      </div>
      <div class="assist-wrapper second">
        <p class="common">
          <i>商户ID:</i>
          <i>
            {{ orderDetail.user_id }}
          </i>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { orderDetail } from '@/api/order'

export default {
  name: 'OrderDetail',
  data () {
    return {
      id: '',
      title: '',
      orderDetail: {},
      moment
    }
  },
  mounted () {
    this.id = this.$route.query.id
    this.title = decodeURIComponent(this.$route.query.title)
    this.getOrderDetail(this.id)
  },
  methods: {
    getOrderDetail (id) {
      orderDetail(id).then(res => {
        if (res.code === 1) {
          this.orderDetail = res.data
        } else {
          this.orderDetail = {}
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .assist-content{
    font-size: 13px;
    width: 100%;
    padding: 15px 0 15px 15px;
    background-color: #fff;
    .assist-wrapper{
      margin: 0px;
      .common{
        margin-left: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-word;
        i{
          margin-left: 15px;
          font-style: normal;
        }
      }
      .other{
        margin-left: 50px;
      }
    }
    .second{
      margin-top: 10px;
    }
  }
</style>
