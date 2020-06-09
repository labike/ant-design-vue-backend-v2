<!--
 * @Author: labike
 * @Date: 2020-05-06 17:11:56
 * @LastEditTime: 2020-05-08 15:58:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-admin/src/views/madeSoft/modules/changeSoft.vue
 -->
<template>
  <a-modal
    title="商品详情"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-descriptions :column="1">
        <a-descriptions-item label="商品编号">
          {{ detail.id }}
        </a-descriptions-item>
        <a-descriptions-item label="商品名称">
          {{ detail.name }}
        </a-descriptions-item>
        <a-descriptions-item label="商品详情">
          {{ detail.detail }}
        </a-descriptions-item>
        <a-descriptions-item label="商品价格">
          {{ detail.product_price }}
        </a-descriptions-item>
        <!-- <a-descriptions-item label="商品规格">
          <i v-for="(item, index) in detail.product_specs" :key="index">
            {{ item }}
          </i>
        </a-descriptions-item> -->
      </a-descriptions>

      <!-- <a-form :form="form">
        <div>
          <a-form-item
            label="商品"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-textarea :rows="4" v-decorator="['desc', {rules: [{required: true}]}]"></a-textarea>
          </a-form-item>
        </div>
      </a-form> -->
    </a-spin>
    <template slot="footer">
      <div class="pay-type">
        <a-radio-group v-model="checkVal" @change="onChange">
          <a-radio :value="0">
            余额支付
          </a-radio>
          <a-radio :value="1">
            支付宝支付
          </a-radio>
        </a-radio-group>
      </div>
      <a-button key="forward" :loading="confirmLoading" type="primary" @click="pay">去支付</a-button>
    </template>
  </a-modal>
</template>

<script>
// import pick from 'lodash.pick'
import Vue from 'vue'
import { getProductDetail, pay } from '@/api/order'
import store from '@/store'

export default {
  name: 'AddCart',
  data () {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      },
      visible: false,
      confirmLoading: false,
      currentStep: 0,
      mdl: {},

      form: this.$form.createForm(this),
      id: '',
      detail: {},
      type: '1',
      checkVal: '',
      balance: '0'
    }
  },
  methods: {
    /**
     * @params value支付类型0=余额 1=支付宝
     * @params balance余额
     * @description value=0代表选择余额支付, 立刻获取余额
     */
    onChange (e) {
      console.log('radio checked', e.target.value)
      this.checkVal = e.target.value
      if (this.checkVal === 0) {
        // 获取余额是否足够支付
        store.dispatch('GetInfo').then(res => {
          console.log('res余额:', res)
          if (res.code === 1) {
            this.balance = res.data.balance
          } else {
            this.$message.warning('获取余额失败, 请稍后重试')
          }
        })
      }
    },
    /**
     * @params id
     * @method getProductDetail
     * @description 点击购物车获取商品详情
     */
    edit (record) {
      const id = record.id
      this.visible = true
      getProductDetail(id).then(res => {
        console.log('product detail:', res)
        if (res.code === 1) {
          this.detail = res.data
        } else {
          this.$message.warning('获取商品信息失败, 请重新登录')
        }
      })
    },
    /**
     * @params token, params, checkVal, balance
     * @mthod pay
     * @description 支付之前获取token是否过期
     */
    pay () {
      const token = Vue.ls.get('Access-Token')
      const params = {
        specs_id: this.detail.specs_id,
        type: this.type,
        pay_way: '1'
      }
      if (token) {
        // 支付方式为余额支付并且余额>支付金额
        if (this.checkVal === 0 && this.balance > this.detail.product_price) {
          this.confirmLoading = true
          pay(params).then(res => {
            console.log('res is', res + '余额支付')
          })
        } else if (this.checkVal === 1) {
          // 支付宝支付
          this.confirmLoading = true
          this.$router.push({
            path: '/order/alipay',
            query: {
              specs_id: this.detail.specs_id,
              type: this.type,
              pay_way: '1'
            }
          })
        } else {
          this.$message.warning('余额不足或未选择支付方式')
          return
        }
      } else {
        this.$message.warning('登录失效, 请重新登录后支付')
      }
      // const { form: { validateFields } } = this

      // last step
      this.confirmLoading = true
      // validateFields((errors, values) => {
      //   console.log('errors:', errors, 'val:', values)
      //   if (!errors) {
      //     console.log('values:', values)
      //     values.id = this.id
      //     // update request
      //     // changeSoft({
      //     //   id: values.id,
      //     //   content: values.desc
      //     // }).then(res => {
      //     //   if (res.code === 1) {
      //     //     this.$message.success('修改成功')
      //     //     setTimeout(() => {
      //     //       this.confirmLoading = false
      //     //       this.$emit('ok', values)
      //     //     }, 1500)
      //     //   }
      //     // })
      //   } else {
      //     this.confirmLoading = false
      //   }
      // })
    },
    backward () {
      this.currentStep--
    },
    handleCancel () {
      // clear form & currentStep
      this.visible = false
      this.currentStep = 0
    }
  }
}
</script>

<style lang="less" scoped>
  .pay-type{
    margin: 20px 0;
  }
</style>
