<template>
  <div>
    <a-form :form="form" style="max-width: 500px; margin: 40px 0 0;">
      <a-form-item
        label="收款账户"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input-group
          style="display: inline-block; vertical-align: middle"
          :compact="true"
        >
          <a-select defaultValue="alipay" style="width: 100px">
            <a-select-option value="alipay">支付宝</a-select-option>
            <a-select-option value="wexinpay">微信</a-select-option>
          </a-select>
          <a-input
            :style="{width: 'calc(100% - 100px)'}"
            v-decorator="['payType', { initialValue: 'admin@qq.com', rules: [{required: true, message: '收款账户必须填写'}]}]"
          />
        </a-input-group>
      </a-form-item>
      <a-form-item
        label="收款人姓名"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input v-decorator="['name', { initialValue: '', rules: [{required: true, message: '收款人名称必须核对'}] }]"/>
      </a-form-item>
      <a-form-item
        label="转账金额"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input prefix="￥" v-decorator="['momey', { initialValue: '', rules: [{required: true, message: '转账金额必须填写'}] }]"/>
      </a-form-item>
      <!--:wrapperCol="{span: 19, offset: 5}"-->
      <a-form-item class="sub-btn">
        <a-button class="account-money" size="large" type="primary" @click="handlePullMoney">提交</a-button>
      </a-form-item>
    </a-form>
    <a-divider />
  </div>
</template>

<script>
export default {
  name: 'Pull',
  data () {
    return {
      labelCol: { lg: { span: 5 }, sm: { span: 5 } },
      wrapperCol: { lg: { span: 19 }, sm: { span: 19 } },
      form: this.$form.createForm(this)
    }
  },
  methods: {
    handlePullMoney () {
      const { form: { validateFields } } = this
      // 先校验，通过表单校验后，才进入下一步
      validateFields((err, values) => {
        if (!err) {
          console.log(values)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.step-form-style-desc {
  padding: 0 56px;
  color: rgba(0,0,0,.45);

  h3 {
    margin: 0 0 12px;
    color: rgba(0,0,0,.45);
    font-size: 16px;
    line-height: 32px;
  }

  h4 {
    margin: 0 0 4px;
    color: rgba(0,0,0,.45);
    font-size: 14px;
    line-height: 22px;
  }

  p {
    margin-top: 0;
    margin-bottom: 12px;
    line-height: 22px;
  }
}

.sub-btn {
  text-align: center;
  .account-money {
    width: 20%;
  }
}
</style>
