<template>
  <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
    <a-form-item label="教程标题">
      <a-input
        v-decorator="['title', { rules: [{ required: true, message: '请输入教程标题' }] }]"
      />
    </a-form-item>
    <a-form-item label="教程副标题">
      <a-input
        v-decorator="['sub_title', { rules: [{ required: true, message: '请输入教程副标题' }] }]"
      />
    </a-form-item>
    <a-form-item label="教程内容">
      <a-input
        v-decorator="['content', { rules: [{ required: true, message: '请输入教程内容' }] }]"
      />
    </a-form-item>
    <a-form-item label="教程作者">
      <a-input
        v-decorator="['author', { rules: [{ required: true, message: '请输入教程作者' }] }]"
      />
    </a-form-item>
    <a-form-item label="封面">
      <a-input
        v-decorator="['img_url', { rules: [{ required: false, message: '' }] }]"
      />
    </a-form-item>
    <a-form-item label="教程分类">
      <a-select
        v-decorator="[
          'type',
          { rules: [{ required: true, message: '请选择教程分类!' }] },
        ]"
        placeholder="选择教程分类"
        @change="handleSelectChange"
      >
        <a-select-option :value="item.id" v-for="item in cate" :key="item.id">
          {{ item.id }} - {{ item.name }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
      <a-button type="primary" html-type="submit">
        提交
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import { detailCourse, changeCourse, courseCate } from '@/api/setting'

export default {
  name: 'ChangeTeach',
  data () {
    return {
      id: '',
      detail: {},
      cate: [],
      formLayout: 'horizontal',
      form: this.$form.createForm(this, { name: 'coordinated' })
    }
  },
  mounted () {
    this.id = this.$route.query.id
    this.getCourseDetail(this.id)
    this.getCourseCate()
  },
  methods: {
    getCourseCate () {
      courseCate().then(res => {
        if (res.code === 1) {
          this.cate = res.data
        } else {
          this.cate = []
        }
      })
    },
    getCourseDetail (id) {
      detailCourse(id).then(res => {
        if (res.code === 1) {
          this.detail = res.data
          this.form.setFieldsValue({
            title: this.detail.title,
            sub_title: this.detail.sub_title,
            content: this.detail.content,
            author: this.detail.author,
            img_url: this.detail.img_url,
            type: this.detail.type
          })
        }
      })
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          console.log(values)
          values.id = this.id
          changeCourse(values).then(res => {
            if (res.code === 1) {
              this.$message.success(res.message)
              this.form.resetFields()
            } else {
              this.$message.success(res.message)
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
