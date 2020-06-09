<template>
  <div class="main user-layout-register">
    <a-row :gutter="16">
      <a-col :md="24" :lg="16">
        <a-form ref="formRegister" :form="form" id="formRegister">

          <a-form-item
            label="手机号"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input size="large" placeholder="11 位手机号" v-decorator="['phone', {rules: [{ required: true, message: '请输入正确的手机号', pattern: /^1[3456789]\d{9}$/ }, { validator: this.handlePhoneCheck } ], validateTrigger: ['change', 'blur'] }]">
              <a-select slot="addonBefore" size="large" defaultValue="+86">
                <a-select-option value="+86">+86</a-select-option>
                <a-select-option value="+87">+87</a-select-option>
              </a-select>
            </a-input>
          </a-form-item>

          <a-row :gutter="16">
            <a-col class="gutter-row" :span="14" :offset="2">
              <a-form-item
                label="验证码"
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
              >
                <a-input size="large" type="text" placeholder="验证码" v-decorator="['code', {rules: [{ required: true, message: '请输入验证码' }], validateTrigger: 'blur'}]">
                  <a-icon slot="prefix" type="mail" :style="{ color: 'rgba(0,0,0,.25)' }"/>
                </a-input>
              </a-form-item>
            </a-col>
            <a-col class="gutter-row" :span="8">
              <a-button
                class="getCaptcha"
                size="large"
                :disabled="state.smsSendBtn"
                @click.stop.prevent="getCaptcha"
                v-text="!state.smsSendBtn && '获取验证码'||(state.time+' s')"></a-button>
            </a-col>
          </a-row>

          <a-form-item class="sub-btn">
            <a-button
              size="large"
              type="primary"
              htmlType="submit"
              class="register-button"
              :loading="changePhoneBtn"
              @click.stop.prevent="changePhoneSubmit"
              :disabled="changePhoneBtn">提交
            </a-button>
          </a-form-item>

        </a-form>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import Vue from 'vue'
import { mixinDevice } from '@/utils/mixin.js'
import { getSmsCaptcha } from '@/api/login'
import { chanageManage } from '@/api/user'
import store from '@/store'

const levelNames = {
  0: '低',
  1: '低',
  2: '中',
  3: '强'
}
const levelClass = {
  0: 'error',
  1: 'error',
  2: 'warning',
  3: 'success'
}
const levelColor = {
  0: '#ff0000',
  1: '#ff0000',
  2: '#ff7e05',
  3: '#52c41a'
}
export default {
  name: 'Security',
  components: {
  },
  mixins: [mixinDevice],
  data () {
    return {
      labelCol: { lg: { span: 5 }, sm: { span: 5 } },
      wrapperCol: { lg: { span: 19 }, sm: { span: 19 } },
      form: this.$form.createForm(this),

      state: {
        time: 60,
        smsSendBtn: false,
        passwordLevel: 0,
        passwordLevelChecked: false,
        percent: 10,
        progressColor: '#FF0000'
      },
      changePhoneBtn: false,
      info: {}
    }
  },
  mounted () {
    const info = Vue.ls.get('info')
    if (info) {
      this.info = info
    } else {
      this.$message.warning('登录信息过期, 请重新登录')
      this.$router.push({
        path: '/user/login'
      })
    }
  },
  computed: {
    passwordLevelClass () {
      return levelClass[this.state.passwordLevel]
    },
    passwordLevelName () {
      return levelNames[this.state.passwordLevel]
    },
    passwordLevelColor () {
      return levelColor[this.state.passwordLevel]
    }
  },
  methods: {
    /**
     * 密码强度
     */
    handlePasswordLevel (rule, value, callback) {
      let level = 0

      // 判断这个字符串中有没有数字
      if (/[0-9]/.test(value)) {
        level++
      }
      // 判断字符串中有没有字母
      if (/[a-zA-Z]/.test(value)) {
        level++
      }
      // 判断字符串中有没有特殊符号
      if (/[^0-9a-zA-Z_]/.test(value)) {
        level++
      }
      this.state.passwordLevel = level
      this.state.percent = level * 30
      if (level >= 2) {
        if (level >= 3) {
          this.state.percent = 100
        }
        callback()
      } else {
        if (level === 0) {
          this.state.percent = 10
        }
        callback(new Error('密码强度不够'))
      }
    },

    /**
     * 验证密码正确性
     */
    handlePasswordCheck (rule, value, callback) {
      const password = this.form.getFieldValue('password')
      // console.log('value', value)
      if (value === undefined) {
        callback(new Error('请输入密码'))
      }
      if (value && password && value.trim() !== password.trim()) {
        callback(new Error('两次密码不一致'))
      }
      callback()
    },

    /**
     * 验证手机号正确性
     */
    handlePhoneCheck (rule, value, callback) {
      console.log('handlePhoneCheck, rule:', rule)
      console.log('handlePhoneCheck, value', value)
      console.log('handlePhoneCheck, callback', callback)

      callback()
    },

    /**
     * 点击密码框时判断密码强度
     */
    handlePasswordInputClick () {
      if (!this.isMobile()) {
        this.state.passwordLevelChecked = true
        return
      }
      this.state.passwordLevelChecked = false
    },

    /**
     * 表单提交
     */
    changePhoneSubmit () {
      const { form: { validateFields }, state } = this
      validateFields({ force: true }, (err, values) => {
        console.log(values)
        values.id = this.info.id
        values.name = this.info.name
        values.role_id = this.info.role_id
        if (!err) {
          state.passwordLevelChecked = false
          values.name = this.info.name
          chanageManage(values).then(res => {
            if (res.code === 1) {
              this.$message.success('手机号修改成功')
              setTimeout(() => {
                store.dispatch('Logout').then(() => {
                  this.$router.push({
                    path: '/user/login'
                  })
                })
              }, 1000)
            }
          })
        }
      })
    },

    /**
     * 获取手机验证码
     */
    getCaptcha (e) {
      e.preventDefault()
      const { form: { validateFields }, state, $message, $notification } = this

      validateFields(['phone'], { force: true },
        (err, values) => {
          if (!err) {
            state.smsSendBtn = true

            const interval = window.setInterval(() => {
              if (state.time-- <= 0) {
                state.time = 60
                state.smsSendBtn = false
                window.clearInterval(interval)
              }
            }, 1000)

            const hide = $message.loading('验证码发送中..', 0)
            console.log(values)
            const info = Vue.ls.get('info')
            console.log('info is', info)
            if (info.phone !== values.phone) {
              getSmsCaptcha({ phone: values.phone }).then(res => {
                setTimeout(hide, 2500)
                $notification['success']({
                  message: '提示',
                  description: '验证码获取成功，请在十分钟内输入验证码',
                  duration: 8
                })
              }).catch(err => {
                setTimeout(hide, 1)
                clearInterval(interval)
                state.time = 60
                state.smsSendBtn = false
                this.requestFailed(err)
              })
            } else {
              setTimeout(hide, 1)
              this.$message.error('当前手机号已存在, 请更换后尝试')
              clearInterval(interval)
              state.time = 60
              state.smsSendBtn = false
              this.requestFailed(err)
            }
          }
        }
      )
    },

     /**
      * 请求失败处理
      */
    requestFailed (err) {
      this.$notification['error']({
        message: '错误',
        description: ((err.response || {}).data || {}).message || '请求出现错误，请稍后再试',
        duration: 4
      })
      this.changePhoneBtn = false
    }
  },
  watch: {
    'state.passwordLevel' (val) {
      console.log(val)
    }
  }
}
</script>
<style lang="less">
  .user-register {

    &.error {
      color: #ff0000;
    }

    &.warning {
      color: #ff7e05;
    }

    &.success {
      color: #52c41a;
    }

  }

  .user-layout-register {
    .ant-input-group-addon:first-child {
      background-color: #fff;
    }
  }
</style>
<style lang="less" scoped>
  .user-layout-register {

    & > h3 {
      font-size: 16px;
      margin-bottom: 20px;
    }

    .getCaptcha {
      display: block;
      width: 100%;
      height: 40px;
    }

    .sub-btn {
      text-align: center;
    }

    .register-button {
      width: 20%;
    }

    .login {
      float: right;
      line-height: 40px;
    }
  }
</style>
