<template>
  <a-modal
    title="添加管理员"
    :width="600"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">

        <a-form-item
          label="父级ID"
        >
          <a-input v-decorator="['parent_id', {}]" disabled />
        </a-form-item>

        <a-form-item
          label="管理员名称"
        >
          <a-input v-decorator="['name', {}]" />
        </a-form-item>

        <a-form-item
          label="管理员备注"
        >
          <a-input v-decorator="['remark', {}]" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { addRole } from '@/api/role'

export default {
  name: 'OrgModal',
  data () {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      visible: false,
      confirmLoading: false,
      mdl: {}
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this)
    console.log('form::', this.form)
  },
  created () {

  },
  methods: {
    add (pid) {
      console.log(pid)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue({
          parent_id: pid
        })
      })
      // this.edit({ parent_id: pid })
    },
    close () {
      this.$emit('close')
      this.visible = false
    },
    handleOk () {
      const _this = this
      // 触发表单验证
      this.form.validateFields((err, values) => {
        // 验证表单没错误
        if (!err) {
          values.order = '1'
          console.log('form values', values)

          _this.confirmLoading = true
          addRole(values).then(res => {
            // Do something
            if (res.code === 1) {
              _this.$message.success('保存成功')
              _this.$emit('ok')
            } else {
              _this.message.warning(res.message)
            }
          }).catch(() => {
            // Do something
          }).finally(() => {
            _this.confirmLoading = false
            _this.close()
          })
        }
      })
    },
    handleCancel () {
      this.close()
    }

  }
}
</script>
