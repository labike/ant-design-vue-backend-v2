<template>
  <div>
    <a-form-model
      :model="form.item"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      class="form-content"
    >
      <a-form-model-item
        :label="item.title"
        v-for="item in form"
        :key="item.id"
        class="item-form"
      >
        <a-input v-model="item.content" class="item-input" />
        <a-popconfirm
          title="确定删除该项吗"
          ok-text="Yes"
          cancel-text="No"
          @confirm="confirm(item.id)"
          @cancel="cancel"
        >
          <a-icon
            v-if="form.length > 1"
            class="dynamic-delete-button"
            type="minus-circle-o"
            :disabled="form.length === 1"
            :style="{marginLeft: '10px'}"
          />
        </a-popconfirm>
      </a-form-model-item>
      <a-form-model-item label="新增字段" class="item-form defined" :wrapper-col="{ span: 13 }">
        <a-input type="text" placeholder="字段名, eg: web_info" v-model="field" class="item-form-input" @change="changeField" />
        <a-input type="text" placeholder="名称, eg: 亿梦" v-model="title" class="item-form-input" @change="changeTitle" />
        <a-input type="text" placeholder="内容, eg: 亿梦" v-model="content" class="item-form-input" @change="changeContent" />
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }" class="item-form">
        <a-button type="primary" @click="onSubmit">
          修改提交
        </a-button>
        <a-button style="margin-left: 10px;" @click="addFormItem" :disabled="disabled">
          新增提交
        </a-button>
      </a-form-model-item>
    </a-form-model>
    <div>
      <a-modal v-model="visible" title="提示" @ok="handleOk">
        <p>可直接在输入框内编辑内容点击<i :style="{color: 'red', fontStyle: 'normal'}">修改提交</i>进行提交, 新增完成后点击<i :style="{color: 'red',fontStyle: 'normal'}">"新增提交"</i>按钮提交即可</p>
      </a-modal>
    </div>
  </div>
</template>

<script>
import { webInfo, changeWebInfo, addWebInfo, deleteWebInfo } from '@/api/website'

export default {
  name: 'WebInfo', // 网站基本设置
  data () {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      visible: true,
      disabled: true,
      form: [],
      // 新增字段
      field: '',
      title: '',
      content: ''
    }
  },
  // 监听输入框有值时取消按钮禁用, 防止滥用提交
  watch: {
    field () {
      if (this.field) {
        this.disabled = false
      } else {
        this.disabled = true
      }
    },
    title () {
      if (this.title) {
        this.disabled = false
      } else {
        this.disabled = true
      }
    },
    content () {
      if (this.content) {
        this.disabled = false
      } else {
        this.disabled = true
      }
    }
  },
  mounted () {
    this.getWebInfo()
  },
  methods: {
    changeField (e) {
      this.field = e.target.value
    },
    changeTitle (e) {
      this.title = e.target.value
    },
    changeContent (e) {
      this.content = e.target.value
    },
    handleOk (e) {
      console.log(e)
      this.visible = false
    },
    getWebInfo () {
      webInfo().then(res => {
         if (res.code === 1) {
           this.form = res.data
         } else {
           this.$message.warning(res.message)
         }
        // this.returnVal(this.data)
      })
    },
    // 新增
    addFormItem () {
      // 提交之前判断新增项是否填写完整
      if (this.field && this.title && this.content) {
        const dynamicVal = {
          field: this.field,
          title: this.title,
          content: this.content
        }
        console.log(dynamicVal)
        addWebInfo(dynamicVal).then(res => {
          console.log(res)
          if (res.code === 1) {
            this.field = ''
            this.title = ''
            this.content = ''
            this.getWebInfo()
          } else {
            this.$message.warning(res.message)
            return res.message
          }
        })
      } else {
        this.$message.error('请补充完整新增内容')
      }
    },
    confirm (id) {
      console.log(id)
      // this.$message.success('Click on Yes')
      deleteWebInfo(id).then(res => {
        if (res.code === 1) {
          this.$message.success(res.message)
          this.getWebInfo()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    cancel (e) {
      console.log(e)
    },
    onSubmit () {
      console.log(this.form)
      changeWebInfo(this.form).then(res => {
        if (res.code === 1) {
          this.$message.success(res.message)
          this.getWebInfo()
        } else {
          this.$message.error(res.message)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .form-content{
    width: 100%;
    padding: 30px 0;
    background-color: #fff;
    position: relative;
    .item-form{
      width: 60%;
      margin: 20px auto 0 auto;
      .item-input{
        max-width: 500px;
      }
      .item-form-input{
        width: 30%;
        margin-right: 15px;
      }
    }
    &.defined{
      color: #F70968;
    }
  }
</style>
