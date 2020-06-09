<!--
 * @Author: your name
 * @Date: 2020-05-08 14:02:00
 * @LastEditTime: 2020-05-11 16:09:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-admin/src/views/order/modules/AliPay.vue
 -->
<template>
  <div class="ali-pay">
    <div v-if="loading" class="loading">
      <a-spin />
    </div>
    <div class="form" v-html="content"></div>
  </div>
</template>

<script>
import { pay } from '@/api/order'

export default {
  name: 'AliPay',
  data () {
    return {
      loading: true,
      specs_id: this.$route.query.specs_id,
      type: this.$route.query.type,
      pay_way: this.$route.query.pay_way,
      total_price: this.$route.query.total_price,
      content: ''
    }
  },
  mounted () {
    this.paySubmit()
  },
  methods: {
    paySubmit () {
      const params = {
        specs_id: this.specs_id,
        type: this.type,
        pay_way: this.pay_way
      }
      pay(params).then(res => {
        this.content = decodeURIComponent(res)
        setTimeout(() => {
          document.forms[0].submit()
        }, 100)
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .loading{
    width: 100%;
    text-align: center;
  }
</style>
