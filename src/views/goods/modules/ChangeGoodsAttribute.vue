<template>
  <a-card :body-style="{padding: '24px 32px', width: '800px', margin: '0 auto'}" :bordered="false" >
    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
      <a-form-item label="属性名称">
        <a-input
          v-decorator="['attr_name', { rules: [{ required: true, message: '请输入属性名称' }] }]"
        />
      </a-form-item>
      <a-form-item label="分类ID" has-feedback>
        <a-select
          v-decorator="[
            'category_id',
            { rules: [{ required: true, message: '请选择一个分类!' }] },
          ]"
          placeholder="请选择一个分类"
        >
          <a-select-option :value="item.id" v-for="(item, index) in categoryList" :key="index">
            {{ item.name }}
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
import { detailGoodsAttribute, changeGoodsAttribute } from '@/api/goods'
import { categoryList } from '@/api/category'

export default {
  name: 'ChangeGoodsAttribute',
  data () {
    return {
      // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      data: {},
      categoryList: [],
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
    this.getGoodsAttributeDetail(this.id)
    this.getCategoryList()
  },
  methods: {
    getCategoryList () {
      const params = {
        pageNo: 1,
        pageSize: 10
      }
      categoryList(params).then(res => {
        if (res.code === 1) {
          this.categoryList = res.data
        }
      })
    },
    getGoodsAttributeDetail (id) {
      console.log(id)
      detailGoodsAttribute(id).then(res => {
        this.data = res.data
        this.returnVal(this.data)
      })
    },
    returnVal (data) {
      console.log(data)
      this.form.setFieldsValue({
        attr_name: data.attr_name,
        category_id: data.category_id
      })
    },
    // 表单提交
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        console.log(values)
        if (!err) {
          values.id = this.id
          values.order = this.order
          changeGoodsAttribute(values).then(res => {
            console.log('res is', res)
            if (res.code === 1) {
              this.$message.success(res.message)
              setTimeout(() => {
                this.$router.push({
                  path: '/goods/goods-attribute'
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
