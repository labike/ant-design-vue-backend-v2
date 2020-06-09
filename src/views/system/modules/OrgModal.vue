<template>
  <a-modal
    title="添加分类"
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
          label="添加子菜单"
        >
          <a-switch @change="onChangeSwitch" />
        </a-form-item>
        <a-form-item
          label="当前菜单ID"
          :style="{display: 'none'}"
        >
          <a-input v-decorator="['id', {}]" disabled />
        </a-form-item>

        <a-form-item
          label="分类名称"
        >
          <a-input v-decorator="['name', {}]" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { addMenu } from '@/api/menu'

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
      mdl: {},
      parent_id: '', // 当前菜单父id
      id: '', // 当前菜单id
      open: false
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this)
    console.log('form::', this.form)
  },
  methods: {
    onChangeSwitch (checked) {
      this.open = checked
      console.log(this.open)
    },
    add (item) {
      this.id = item.id
      console.log(item)
      this.edit(item)
    },
    edit (record) {
      console.log('record is', record)
      this.mdl = Object.assign({}, record)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue({
          // ...record,
          parent_id: record.parent_id,
          id: record.id,
          name: '添加子菜单需要打开上面的开关盒'
        })
      })
    },
    close () {
      this.$emit('close')
      this.visible = false
    },
    addMenuSub (values) {
      addMenu(values).then(res => {
        if (res.code === 1) {
          this.$message.success(res.message)
          this.$emit('ok')
        } else {
          this.message.warning(res.message)
        }
      }).catch(() => {
        // Do something
      }).finally(() => {
        this.confirmLoading = false
        this.close()
      })
    },
    handleOk () {
      const _this = this
      this.form.validateFields((err, values) => {
        if (!err) {
          if (_this.open === true) {
            values.parent_id = _this.id
            _this.confirmLoading = true
            this.addMenuSub(values)
            _this.open = false
          } else {
            values.order = '1'
            console.log('form values', values)

            _this.confirmLoading = true
            this.addMenuSub(values)
          }
        }
      })
    },
    handleCancel () {
      this.close()
    }

  }
}
</script>
