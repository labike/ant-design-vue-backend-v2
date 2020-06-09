<template>
  <div>
    <a-form-model
      :model="form.item"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      class="form-content"
    >
      <a-form-model-item
        :label="item.remark"
        v-for="item in form"
        :key="item.id"
        :data-key="item.key"
        class="item-form"
      >
        <!-- <a-input v-model="item.value" class="item-input" /> -->
        <a-textarea
          v-model="item.value"
          class="item-input"
          :auto-size="{ minRows: 2, maxRows: 6 }"
        />
        <a-popconfirm
          title="确定删除该项吗?"
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
      <a-form-model-item label="新增字段" class="item-form defined" :wrapper-col="{ span: 13}">
        <a-input type="text" placeholder="key, eg: ali_key" v-model="payKey" class="item-form-input" @change="changePayKey" />
        <a-input type="text" placeholder="value, eg: 22342r5234223#@$T4t" v-model="value" class="item-form-input" @change="changePayVal" />
        <a-input type="text" placeholder="remark, eg: 支付宝账号ID" v-model="remark" class="item-form-input" @change="changePayRemark" />
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
import { sysCode, addConfig, changeConfig, deleteConfig } from '@/api/setting'

export default {
  name: 'PaySetting',
  data () {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      visible: true,
      form: [],
      disabled: true,
      signs: 'alipay',
      title: '支付宝支付配置',
      payKey: '',
      value: '',
      remark: ''
    }
  },
  mounted () {
    this.getPaySet()
  },
  watch: {
    payKey () {
      if (this.payKey) {
        this.disabled = false
      } else {
        this.disabled = true
      }
    },
    value () {
      if (this.value) {
        this.disabled = false
      } else {
        this.disabled = true
      }
    },
    remark () {
      if (this.remark) {
        this.disabled = false
      } else {
        this.disabled = true
      }
    }
  },
  methods: {
    changePayKey (e) {
      this.payKey = e.target.value
    },
    changePayVal (e) {
      this.value = e.target.value
    },
    changePayRemark (e) {
      this.remark = e.target.value
    },
    handleOk (e) {
      console.log(e)
      this.visible = false
    },
    getPaySet () {
      const params = {
        signs: this.signs
      }
      sysCode(params).then(res => {
        if (res.code === 1) {
          this.form = res.data
        } else {
          this.$message.warning(res.message)
        }
        // this.returnVal(this.data)
      })
    },
    addFormItem () {
      if (this.payKey && this.value && this.remark) {
        const dynamicVal = {
          title: this.title,
          signs: this.signs,
          key: this.payKey,
          value: this.value,
          remark: this.remark
        }
        addConfig(dynamicVal).then(res => {
          console.log(res)
          if (res.code === 1) {
            this.payKey = ''
            this.value = ''
            this.remark = ''
            this.$message.success(res.message)
            this.getPaySet()
          } else {
            this.$message.warning(res.message)
            return res.message
          }
        })
      } else {

      }
    },
    confirm (id) {
      console.log(id)
      // this.$message.success('Click on Yes')
      deleteConfig(id).then(res => {
        if (res.code === 1) {
          this.$message.success(res.message)
          this.getSysCode()
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
      changeConfig(this.form).then(res => {
        if (res.code === 1) {
          this.$message.success(res.message)
          this.getSysCode()
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
  }
</style>
