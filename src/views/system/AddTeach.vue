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
      <a-textarea
        :auto-size="{ minRows: 4 }"
        v-decorator="['content', { rules: [{ required: true, message: '请输入教程内容' }] }]"
      />
      </a-textarea>
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
        <!-- <a-select-option value="female">
          female
        </a-select-option> -->
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
import { addCourse, courseCate } from '@/api/setting'

export default {
  name: 'AddTeach',
  data () {
    return {
      detail: {},
      cate: [],
      formLayout: 'horizontal',
      form: this.$form.createForm(this, { name: 'coordinated' })
    }
  },
  mounted () {
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
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          addCourse(values).then(res => {
            if (res.code === 1) {
              this.$message.success(res.message)
              this.form.resetFields()
              this.$router.push({
                path: '/system/teach-list'
              })
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
