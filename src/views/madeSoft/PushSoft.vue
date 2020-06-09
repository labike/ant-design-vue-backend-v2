<!--
 * @Author: labike
 * @Date: 2020-04-23 09:52:00
 * @LastEditTime: 2020-05-06 16:43:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-admin/src/views/form/BasicForm.vue
 -->
<template>
  <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
    <a-form @submit="handleSubmit" :form="form">
      <a-form-item
        label="需求描述"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-textarea
          rows="4"
          placeholder="请输入需求描述"
          v-decorator="[
            'description',
            {rules: [{ required: true, message: '请输入需求描述' }]}
          ]" />
      </a-form-item>
      <a-form-item
        :wrapperCol="{ span: 24 }"
        style="text-align: center"
      >
        <a-button htmlType="submit" type="primary">提交</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
import { madeSoft } from '@/api/soft'

export default {
  name: 'PushSoft',
  data () {
    return {
      description: '请在下面输入需要定制的需求, 我们将尽快为您服务',
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
          madeSoft({
            content: values.description
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
