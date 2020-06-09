<!--
 * @Author: labike
 * @Date: 2020-05-06 17:11:56
 * @LastEditTime: 2020-05-07 17:08:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-admin/src/views/madeSoft/modules/changeSoft.vue
 -->
<template>
  <a-modal
    title="添加信息"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <div>
          <a-form-item label="角色ID" has-feedback>
            <a-select
              v-decorator="[
                'role_id',
                { rules: [{ required: true, message: 'Please select your country!' }] },
              ]"
              placeholder="Please select a country"
            >
              <a-select-option :value="item.id" v-for="(item, index) in roleList" :key="index">
                {{ item.id }} - {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item>
            <a-input
              size="large"
              type="text"
              placeholder="管理员名称"
              v-decorator="['name', {rules: [{ required: true, message: '请输入管理员名称' }], validateTrigger: ['change', 'blur']}]"
            ></a-input>
          </a-form-item>
          <a-form-item>
            <a-input size="large" placeholder="11 位手机号" v-decorator="['phone', {rules: [{ required: true, message: '请输入正确的手机号', pattern: /^1[3456789]\d{9}$/ }, { validator: this.handlePhoneCheck } ], validateTrigger: ['change', 'blur'] }]">
              <a-select slot="addonBefore" size="large" defaultValue="+86">
                <a-select-option value="+86">+86</a-select-option>
                <a-select-option value="+87">+87</a-select-option>
              </a-select>
            </a-input>
          </a-form-item>
          <a-form-item label="管理员密码">
            <a-input
              type="password"
              v-decorator="['password', { rules: [{ required: true, message: '请输入密码' }] }]"
            />
          </a-form-item>
          <a-form-item label="确认密码">
            <a-input
              type="password"
              v-decorator="['password_confirm', { rules: [{ required: true, message: '请输入确认密码' }] }]"
            />
          </a-form-item>
        </div>
      </a-form>
    </a-spin>
    <template slot="footer">
      <a-button key="forward" :loading="confirmLoading" type="primary" @click="handleSub">提交</a-button>
    </template>
  </a-modal>
</template>

<script>
// import pick from 'lodash.pick'
import { addManage, selectRole } from '@/api/user'

export default {
  name: 'AddManage',
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
      pageNo: '1',
      pageSize: '10',
      roleList: []
    }
  },
  mounted () {
    this.getRole()
  },
  methods: {
    getRole () {
      selectRole().then(res => {
        this.roleList = res.data
        console.log(this.roleList)
      })
    },
      /**
     * 验证手机号正确性
     */
    handlePhoneCheck (rule, value, callback) {
      console.log('handlePhoneCheck, rule:', rule)
      console.log('handlePhoneCheck, value', value)
      console.log('handlePhoneCheck, callback', callback)

      callback()
    },
    open () {
      this.visible = true
    },
    /**
     * nextStep
     */
    handleSub () {
      const { form: { validateFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        console.log('errors:', errors, 'val:', values)
        if (!errors) {
          // update request
          addManage(values).then(res => {
            if (res.code === 1) {
              this.$message.success('添加成功')
              this.form.resetFields()
              setTimeout(() => {
                this.confirmLoading = false
                this.$emit('ok', values)
                this.visible = false
              }, 1500)
            } else {
              this.$message.info(res.message)
            }
          })
        } else {
          this.confirmLoading = false
        }
      })
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
