<!--
 * @Author: labike
 * @Date: 2020-05-11 15:06:09
 * @LastEditTime: 2020-05-11 16:10:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-admin2/src/views/dashboard/PushMoney.vue
 -->

<template>
  <div class="push-money">
    <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
      <div>
        <span>充值金额: </span>
        <a-input
          id="inputNumber"
          v-model="totalMoney"
          :min="1"
          @change="onChange"
        />
      </div>
      <div class="push-btn">
        <a-button type="primary" @click="push">充值</a-button>
      </div>
    </a-card>
  </div>
</template>

<script>
// import { pay } from '@/api/order'

export default {
  name: 'PushMoney',
  data () {
    return {
      totalMoney: ''
    }
  },
  methods: {
    onChange (e) {
      this.totalMoney = e.target.value
    },
    push () {
      this.$router.push({
        path: '/dashboard/pushPay',
        query: {
          type: '0',
          pay_way: '1',
          total_price: this.totalMoney
        }
      })
      // const params = {
      //   type: '0',
      //   pay_way: '1',
      //   total_price: this.totalMoney
      // }
      // if (this.totalMoney && this.totalMoney > 0) {
      //   pay(params).then(res => {
      //     console.log(res)
      //     this.content = decodeURIComponent(res)
      //     setTimeout(() => {
      //       document.forms[0].submit()
      //     }, 100)
      //   })
      // } else {
      //   this.$message.warning('请输入正确的充值金额')
      // }
    }
  }
}
</script>

<style lang="less" scoped>
  .push-money{
    text-align: center;
    #inputNumber{
      max-width: 300px;
      margin-left: 15px;
    }
    .push-btn{
      margin-top: 15px;
    }
  }
</style>
