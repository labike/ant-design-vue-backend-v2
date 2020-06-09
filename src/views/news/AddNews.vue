<!--
 * @Author: labike
 * @Date: 2020-05-06 17:11:56
 * @LastEditTime: 2020-05-07 17:08:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-admin/src/views/madeSoft/modules/changeSoft.vue
 -->
<template>
  <a-card :style="{backgroundColor: '#fff'}">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <div :style="{width: '720px', margin: '0 auto'}">
          <a-form-item
            label="公告标题"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input v-decorator="['title', {rules: [{required: true}]}]" />
          </a-form-item>
          <a-form-item
            label="公告内容"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-textarea :rows="4" v-decorator="['content', {rules: [{required: true}]}]"></a-textarea>
          </a-form-item>
          <a-form-item
            label="日期[时间]"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-date-picker
              v-decorator="['time', config]"
              show-time
              format="YYYY-MM-DD HH:mm:ss"
            />
          </a-form-item>
          <div :style="{textAlign: 'center'}">
            <a-button key="forward" :loading="confirmLoading" type="primary" @click="handleNext(currentStep)">提交</a-button>
          </div>
        </div>
      </a-form>
    </a-spin>
  </a-card>
</template>

<script>
import Vue from 'vue'
import pick from 'lodash.pick'
import moment from 'moment'
import { addNotice } from '@/api/notices'

export default {
  name: 'AddNews',
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
      author: '',
      order: '1',
      type: '2',
      config: {
        rules: [{ type: 'object', required: true, message: '请选择时间!' }]
      }
    }
  },
  mounted () {
    this.id = Vue.ls.get('info').id
    this.author = Vue.ls.get('info').name
  },
  methods: {
      /**
     * 验证手机号正确性
     */
    handlePhoneCheck (rule, value, callback) {
      console.log('handlePhoneCheck, rule:', rule)
      console.log('handlePhoneCheck, value', value)
      console.log('handlePhoneCheck, callback', callback)

      callback()
    },
    edit (record) {
      console.log('record is', record)
      this.id = record.id
      this.visible = true
      const { form: { setFieldsValue } } = this
      this.$nextTick(() => {
        setFieldsValue({
          'title': record.title,
          'content': record.content,
          'time': moment(record.update_time)
        })
        setFieldsValue(pick(record, []))
      })
    },
    /**
     * nextStep
     */
    handleNext (step) {
      const { form: { validateFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        console.log('errors:', errors, 'val:', values)
        if (!errors) {
          console.log('values:', values)
          values = Object.assign(values, {
            'author': this.author,
            'type': this.type,
            'order': this.order,
            'time': values.time.format('YYYY-MM-DD HH:mm:ss')
          })
          // update request
          addNotice(values).then(res => {
            if (res.code === 1) {
              this.$message.success('添加成功')
              this.form.resetFields()
              setTimeout(() => {
                this.confirmLoading = false
                // this.$emit('ok', values)
                // this.visible = false
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
