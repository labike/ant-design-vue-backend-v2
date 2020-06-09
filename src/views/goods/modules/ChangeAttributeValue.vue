<template>
  <a-card :body-style="{padding: '24px 32px', width: '800px', margin: '0 auto'}" :bordered="false" >
    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
      <a-form-item label="属性值名称">
        <a-input
          v-decorator="['attr_value', { rules: [{ required: true, message: '请输入属性值名称' }] }]"
        />
      </a-form-item>
      <a-form-item label="sku_key_id" has-feedback>
        <a-select
          v-decorator="[
            'sku_key_id',
            { rules: [{ required: true, message: '请选择一个分类!' }] },
          ]"
          placeholder="请选择一个分类"
        >
          <a-select-option :value="item.id" v-for="(item, index) in attributeValList" :key="index">
            {{ item.id }} - {{ item.attr_name }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
        <a-button type="primary" html-type="submit">
          提交
        </a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
import Vue from 'vue'
import {
  detailAttributeValue,
  changeAttributeValue,
  goodsAttribute
} from '@/api/goods'

export default {
  name: 'ChangeAttributeValue',
  data () {
    return {
      // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      data: {},
      attributeValList: [],
      order: '1',
      id: '', // 当前商品ID
      formLayout: 'horizontal',
      form: this.$form.createForm(this, { name: 'coordinated' })
    }
  },
  mounted () {
    this.id = this.$route.query.id
    this.headers = {
      'Authorization': 'Bearer ' + Vue.ls.get('Access-Token')
    }
    console.log(this.headers)
    this.getAttributeValueDetail(this.id)
    this.getAttributeList()
  },
  methods: {
    getAttributeList () {
      const params = {
        pageNo: 1,
        pageSize: 10,
        select: '1'
      }
      goodsAttribute(params).then(res => {
        if (res.code === 1) {
          this.attributeValList = res.data.data
        } else {
          this.attributeValList = []
        }
      })
    },
    getAttributeValueDetail (id) {
      console.log(id)
      detailAttributeValue(id).then(res => {
        this.data = res.data
        this.returnVal(this.data)
      })
    },
    returnVal (data) {
      console.log(data)
      this.form.setFieldsValue({
        attr_value: data.attr_value,
        sku_key_id: data.sku_key_id
      })
    },
    // 表单提交
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        console.log(values)
        if (!err) {
          values.id = this.id
          changeAttributeValue(values).then(res => {
            console.log('res is', res)
            if (res.code === 1) {
              this.$message.success(res.message)
              setTimeout(() => {
                this.$router.push({
                  path: '/goods/attribute-value'
                })
              }, 1500)
            } else {
              this.$message.warning(res.message)
            }
          })
        }
      })
    },
    handleSelectChange (value) {
      console.log(value)
      this.form.setFieldsValue({
        note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .input-text{
    display: block;
    margin: 24px 0;
  }
  /* tile uploaded pictures */
  .upload-list-inline .ant-upload-list-item {
    float: left;
    width: 200px;
    margin-right: 8px;
  }
  .upload-list-inline .ant-upload-animate-enter {
    animation-name: uploadAnimateInlineIn;
  }
  .upload-list-inline .ant-upload-animate-leave {
    animation-name: uploadAnimateInlineOut;
  }

</style>
