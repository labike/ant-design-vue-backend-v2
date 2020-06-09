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
          <a-input v-decorator="['p_id', {}]" disabled />
        </a-form-item>

        <a-form-item
          label="添加二级分类"
        >
          <a-switch @change="onChangeSwitch" />
        </a-form-item>
        <a-form-item
          label="当前分类ID"
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
import { addCategory } from '@/api/category'

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
      p_id: '', // 当前分类父id
      id: '', // 当前分类id
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
      console.log('---', this.open)
      this.id = item.id
      this.edit(item)
    },
    edit (item) {
      this.mdl = Object.assign({}, item)
      console.log(this.mdl)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue({
          // ...item,
          p_id: item.p_id,
          id: item.id,
          name: '添加子分类需要打开上面的开关盒'
        })
      })
    },
    close () {
      this.$emit('close')
      this.visible = false
    },
    addCategorySub (values) {
      addCategory(values).then(res => {
        // Do something
        if (res.code === 1) {
          this.$message.success(res.message)
          this.open = false
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
          // 添加二级分类时将id赋值给p_id
          if (_this.open === true) {
            values.p_id = _this.id
            values.order = '1'
            console.log('form values', values)

            _this.confirmLoading = true
            this.addCategorySub(values)
          } else {
            values.order = '1'
            console.log('form values', values)

            _this.confirmLoading = true
            this.addCategorySub(values)
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
