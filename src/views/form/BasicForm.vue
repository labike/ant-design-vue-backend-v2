<!--
 * @Author: labike
 * @Date: 2020-04-23 09:52:00
 * @LastEditTime: 2020-05-06 16:15:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-admin/src/views/form/BasicForm.vue
 -->
<template>
  <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
    <a-form @submit="handleSubmit" :form="form">
      <a-form-item
        label="工单标题"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-input
          placeholder="请输入工单标题"
          v-decorator="[
            'title',
            {rules: [{ required: true, message: '请输入工单标题' }]}
          ]" />
      </a-form-item>
      <a-form-item
        label="问题描述"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-textarea
          rows="4"
          placeholder="请输入问题描述"
          v-decorator="[
            'description',
            {rules: [{ required: true, message: '请输入问题描述' }]}
          ]" />
      </a-form-item>
      <!-- <a-form-item
        label="机密信息"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-textarea
          rows="4"
          placeholder="请输入机密信息"
          v-decorator="[
            'type',
            {rules: [{ required: true, message: '请输入机密信息' }]}
          ]" />
      </a-form-item> -->
      <!-- <a-form-item
        label="邮箱"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
        :required="false"
      >
        <a-input placeholder="请输入邮箱" />
      </a-form-item> -->
      <!-- <a-form-item
        label="上传附件"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
        :required="false"
      >
        <a-upload
          name="file"
          :multiple="true"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          :headers="headers"
          @change="handleChange"
        >
          <a-button> <a-icon type="upload" />上传附件</a-button>
        </a-upload>
      </a-form-item> -->
      <a-form-item
        :wrapperCol="{ span: 24 }"
        style="text-align: center"
      >
        <a-button htmlType="submit" type="primary">提交</a-button>
        <!-- <a-button style="margin-left: 8px">保存</a-button> -->
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
import { createAssist } from '@/api/assist'

export default {
  name: 'BaseForm',
  data () {
    return {
      description: '请在下面输入需要咨询的问题, 我们将尽快为您解答',
      value: 1,

      // form
      form: this.$form.createForm(this),
      headers: {
        authorization: 'authorization-text'
      }
    }
  },
  methods: {
    // handler
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          // eslint-disable-next-line no-console
          console.log('Received values of form: ', values)
          createAssist({
            title: values.title,
            question: values.description
          }).then(res => {
            if (res.code === 1) {
              this.$message.info('创建成功')
              this.form.resetFields()
            }
          })
        }
      })
    },
    handleChange (info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`)
      }
    }
  }
}
</script>
