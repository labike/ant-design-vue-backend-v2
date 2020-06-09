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
    title="添加教程分类"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <div>
          <a-form-item>
            <a-input
              size="large"
              type="text"
              placeholder="教程分类名称"
              v-decorator="['name', {rules: [{ required: true, message: '请输入教程分类名称' }], validateTrigger: ['change', 'blur']}]"
            ></a-input>
          </a-form-item>
        </div>
      </a-form>
    </a-spin>
    <template slot="footer">
      <a-button key="forward" :loading="confirmLoading" type="primary" @click="handleNext(currentStep)">提交</a-button>
    </template>
  </a-modal>
</template>

<script>
// import pick from 'lodash.pick'
import { addCourseCate, courseCate } from '@/api/setting'

export default {
  name: 'AddCourseCate',
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
      courseCateList: []
    }
  },
  mounted () {
    this.getCopurseCate()
  },
  methods: {
    getCopurseCate () {
      courseCate().then(res => {
        this.courseCateList = res.data
        console.log(this.courseCateList)
      })
    },
    open (record) {
      console.log('record is', record)
      // this.id = record.id
      this.visible = true
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
          values.id = this.id
          // update request
          addCourseCate(values).then(res => {
            if (res.code === 1) {
              this.$message.success(res.message)
              this.form.resetFields()
              setTimeout(() => {
                this.confirmLoading = false
                this.$emit('ok', values)
                this.visible = false
              }, 1500)
            } else {
              this.$message.success(res.message)
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
