<template>
  <a-card :body-style="{padding: '24px 32px', width: '800px', margin: '0 auto'}" :bordered="false" >
    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
      <a-form-item label="商品名称">
        <a-input
          v-decorator="['name', { rules: [{ required: true, message: '请输入商品名称' }] }]"
        />
      </a-form-item>
      <a-form-item label="商品子标题">
        <a-input
          v-decorator="['sub_title', { rules: [{ required: true, message: '请输入商品子标题' }] }]"
        />
      </a-form-item>
      <a-form-item label="商品详情">
        <a-textarea
          placeholder="请输入商品详情"
          v-decorator="['detail', { rules: [{ required: true, message: '请输入商品详情' }] }]"
          :auto-size="{ minRows: 2, maxRows: 100 }"
        />
      </a-form-item>
      <a-form-item label="价格">
        <a-input
          v-decorator="['price', { rules: [{ required: true, message: '请输入价格' }] }]"
        />
      </a-form-item>
      <div :style="{marginLeft: '100px'}">
        <span :style="{float: 'left'}">商品分类</span>
        <a-tree
          :style="{float: 'left',marginLeft: '50px'}"
          checkable
          :tree-data="categoryList"
          :replace-fields="replaceFields"
          @select="onSelect"
          @check="onCheck"
          :checkStrictly="checkStrictly"
        />
      </div>
      <!--主图-->
      <a-form-item label="主图" :style="{clear: 'both', marginTop: '20px'}">
        <a-upload
          name="avatar"
          list-type="picture-card"
          class="avatar-uploader"
          :action="action"
          :headers="headers"
          :show-upload-list="false"
          :before-upload="beforeUpload"
          @change="handleChange"
        >
          <img v-if="imageUrl" :src="imageUrl" alt="主图" :style="{width: '86px', height: '86px'}"/>
          <div v-else>
            <a-icon :type="loading ? 'loading' : 'plus'" />
            <div class="ant-upload-text">
              Upload
            </div>
          </div>
        </a-upload>
      </a-form-item>
      <a-form-item label="附图">
        <a-upload
          :action="action"
          list-type="picture-card"
          :file-list="fileList"
          :headers="headers"
          @preview="handlePreview"
          @change="handleSubChange"
        >
          <div v-if="fileList.length < 8">
            <a-icon type="plus" />
            <div class="ant-upload-text">
              Upload
            </div>
          </div>
        </a-upload>
        <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
          <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
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

import { addGoods } from '@/api/goods'
import { categoryList } from '@/api/category'

function getBase64 (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

export default {
  name: 'AddGoods',
  data () {
    return {
      data: {},
      formLayout: 'horizontal',
      form: this.$form.createForm(this, { name: 'coordinated' }),
      // 附图列表
      fileList: [],
      previewVisible: false,
      previewImage: '',
      // 主图
      loading: false,
      imageUrl: '',
      action: 'http://www.dkstu.cn/admin/imgUpload',
      headers: {},
      // 商品分类
      checkStrictly: true,
      categoryList: [],
      cateTagId: '', // 选择的分类
      replaceFields: {
        children: 'tree',
        title: 'name',
        key: 'id'
      }
    }
  },
  created () {
    this.getCategoryList()
  },
  mounted () {
    this.id = this.$route.query.id
    this.headers = {
      'Authorization': 'Bearer ' + Vue.ls.get('Access-Token')
    }
  },
  watch: {
    value (value) {
      console.log(value)
    }
  },
  methods: {
    onSelect (selectedKeys, info) {
      console.log('selected', selectedKeys, info)
    },
    onCheck (checkedKeys, info) {
      this.cateTagId = checkedKeys.checked[0]
    },
    getCategoryList () {
      categoryList({ pageNo: 1 }).then(res => {
        if (res.code === 1) {
          this.categoryList = res.data
          console.log(this.categoryList)
        } else {
          this.categoryList = []
        }
      })
    },
    returnVal (data) {
      console.log(data)
      this.form.setFieldsValue({
        name: data.name,
        sub_title: data.sub_title,
        detail: data.detail
      })
    },
    // 主图上传
    handleChange (info) {
      if (info.file.status === 'uploading') {
        this.loading = true
        return
      }
      const res = info.file.response
      console.log(res)
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        if (res.code === 1) {
          this.$message.success(res.message)
          this.imageUrl = res.data[0]
        } else {
          this.$message.error(res.message)
        }
        // getBase64(info.file.originFileObj, imageUrl => {
        //   this.imageUrl = imageUrl
        //   this.loading = false
        // })
      }
    },
    // 主图上传前处理
    beforeUpload (file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        this.$message.error('上传图片格式错误!')
      }
      const isLt4M = file.size / 1024 / 1024 / 1024 / 1024 < 4
      if (!isLt4M) {
        this.$message.error('图片大小不超过 4MB!')
      }
      return isJpgOrPng && isLt4M
    },
    // 附图上传(多张)
    handleCancel () {
      this.previewVisible = false
    },
    // 附图预览
    async handlePreview (file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj)
      }
      this.previewImage = file.url || file.preview
      this.previewVisible = true
    },
    handleSubChange ({ fileList }) {
      this.fileList = fileList
    },
    // 表单提交
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!this.cateTagId) {
          this.$message.error('请选择分类')
          return
        } else {
          values = Object.assign(values, {
            category_id: this.cateTagId,
            main_img: this.imageUrl,
            sub_imgs: this.fileList.map(item => item.response.data[0]).toString()
          })
        }
        console.log(values)
        if (!err) {
          addGoods(values).then(res => {
            console.log('res is', res)
            if (res.code === 1) {
              this.$message.success(res.message)
              this.form.setFieldsValue()
              setTimeout(() => {
                this.$router.push({
                  path: '/goods/goods-list'
                })
              }, 1500)
            } else {
              this.$message.warning(res.message)
            }
          })
          console.log('Received values of form: ', values)
        }
      })
    },
    handleChangeCate (value) {
      console.log(`selected ${value}`)
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
