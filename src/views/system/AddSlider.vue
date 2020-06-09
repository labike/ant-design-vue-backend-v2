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
    title="添加轮播图"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <div>
          <a-form-item label="轮播图标题">
            <a-input
              :value="title"
              @change="changeTitle"
            />
          </a-form-item>
          <a-form-item label="链接跳转URL">
            <a-input
              :value="linkUrl"
              @change="changeLinkUrl"
            />
          </a-form-item>
          <a-form-item>
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
        </div>
      </a-form>
    </a-spin>
    <template slot="footer">
      <a-button key="forward" :loading="confirmLoading" type="primary" @click="handleSub">提交</a-button>
    </template>
  </a-modal>
</template>

<script>
import Vue from 'vue'
import { addSlider } from '@/api/setting'
// import pick from 'lodash.pick'

export default {
  name: 'AddSlider',
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
      // id: '',
      // pageNo: '1',
      // pageSize: '10',
      // roleList: [],
      // 图片
      loading: false,
      imageUrl: '',
      title: '',
      linkUrl: '',
      action: 'http://www.dkstu.cn/admin/imgUpload',
      headers: {}
    }
  },
  mounted () {
    this.headers = {
      'Authorization': 'Bearer ' + Vue.ls.get('Access-Token')
    }
  },
  methods: {
    open () {
      this.visible = true
    },
    changeTitle (e) {
      this.title = e.target.value
    },
    changeLinkUrl (e) {
      this.linkUrl = e.target.value
    },
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
          this.$message.warning(res.message)
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
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('图片大小不超过 2MB!')
      }
      return isJpgOrPng && isLt2M
    },
    handleSub () {
      const params = {
        title: this.title,
        img_url: this.imageUrl,
        link_url: this.linkUrl || ''
      }
      if (params.title && params.img_url) {
        addSlider(params).then(res => {
          if (res.code === 1) {
            this.$message.success(res.message)
            this.visible = false
            this.$emit('ok')
          } else {
            this.$message.warning(res.message)
          }
        })
      } else {
        this.$message.error('请输入标题或上传图片后提交')
      }
      console.log(this.imageUrl, this.title)
    },
    handleCancel () {
      // clear form & currentStep
      this.visible = false
      this.currentStep = 0
    }
  }
}
</script>
