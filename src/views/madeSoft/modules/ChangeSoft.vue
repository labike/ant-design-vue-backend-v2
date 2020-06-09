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
    title="修改定制需求"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <!-- step1 -->
        <div>
          <a-form-item
            label="需求描述"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-textarea :rows="4" v-decorator="['desc', {rules: [{required: true}]}]"></a-textarea>
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
import pick from 'lodash.pick'
import { changeSoft } from '@/api/soft'

export default {
  name: 'ChangeSoft',
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
      id: ''
    }
  },
  methods: {
    edit (record) {
      // console.log('record is', record)
      this.id = record.id
      this.visible = true
      const { form: { setFieldsValue } } = this
      this.$nextTick(() => {
        setFieldsValue({
          'desc': record.content
        })
        setFieldsValue(pick(record, []))
      })
    },
    /**
     * nextStep
     */
    handleSub () {
      const { form: { validateFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          console.log('values:', values)
          values.id = this.id
          // update request
          changeSoft({
            id: values.id,
            content: values.desc
          }).then(res => {
            if (res.code === 1) {
              this.$message.success('修改成功')
              setTimeout(() => {
                this.confirmLoading = false
                this.$emit('ok', values)
              }, 1500)
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
