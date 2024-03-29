<template>
  <div class="account-settings-info-view">
    <a-row :gutter="16">
      <a-col :md="24" :lg="16">
        <a-form ref="formRegister" :form="form" id="formRegister" layout="vertical">
          <a-form-item
            label="旧密码"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input
              type="password"
              autocomplete="false"
              placeholder="请输入旧密码"
              v-decorator="['old_password', {rules: [{ required: true, message: '至少6位密码，区分大小写'}], validateTrigger: ['change', 'blur']}]"
            ></a-input>
          </a-form-item>

          <a-popover
            placement="rightTop"
            :trigger="['focus']"
            :getPopupContainer="(trigger) => trigger.parentElement"
            v-model="state.passwordLevelChecked">
            <template slot="content">
              <div :style="{ width: '240px' }" >
                <div :class="['user-register', passwordLevelClass]">强度：<span>{{ passwordLevelName }}</span></div>
                <a-progress :percent="state.percent" :showInfo="false" :strokeColor=" passwordLevelColor " />
                <div style="margin-top: 10px;">
                  <span>请至少输入 6 个字符。请不要使用容易被猜到的密码。</span>
                </div>
              </div>
            </template>
            <a-form-item
              label="新密码"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
            >
              <a-input
                type="password"
                @click="handlePasswordInputClick"
                autocomplete="false"
                placeholder="至少6位密码，区分大小写"
                v-decorator="['password', {rules: [{ required: true, message: '至少6位密码，区分大小写'}, { validator: this.handlePasswordLevel }], validateTrigger: ['change', 'blur']}]"
              ></a-input>
            </a-form-item>
          </a-popover>

          <a-form-item
            label="确认密码"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input
              type="password"
              autocomplete="false"
              placeholder="确认密码"
              v-decorator="['password_confirm', {rules: [{ required: true, message: '至少6位密码，区分大小写' }, { validator: this.handlePasswordCheck }], validateTrigger: ['change', 'blur']}]"
            ></a-input>
          </a-form-item>

          <a-form-item class="change-pwd-btn">
            <a-button
              size="large"
              type="primary"
              htmlType="submit"
              class="register-button"
              :loading="changePwdBtn"
              @click.stop.prevent="changePwdSubmit"
              :disabled="changePwdBtn">提交
            </a-button>
            <!-- <router-link class="login" :to="{ name: 'login' }">使用已有账户登录</router-link> -->
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
import { changePwd } from '@/api/user'
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
  name: 'ChangePwd',
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
      changePwdBtn: false,
      userId: Vue.ls.get('info').id
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
     * 验证两次输入密码正确性
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
    changePwdSubmit () {
      const { form: { validateFields }, state } = this
      validateFields({ force: true }, (err, values) => {
        console.log(values)
        values.id = this.userId
        if (!err) {
          state.passwordLevelChecked = false
          changePwd(values).then(res => {
            console.log(res)
            values.type = '1'
            if (res.code === 1) {
              this.$message.success('密码修改成功')
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

            getSmsCaptcha({ phone: values.phone }).then(res => {
              setTimeout(hide, 2500)
              $notification['success']({
                message: '提示',
                description: '验证码获取成功，您的验证码为：' + res.result.captcha,
                duration: 8
              })
            }).catch(err => {
              setTimeout(hide, 1)
              clearInterval(interval)
              state.time = 60
              state.smsSendBtn = false
              this.requestFailed(err)
            })
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
      this.changePwdBtn = false
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
  .change-pwd-btn {
    text-align: center;
    .register-button {
      width: 20%;
    }
  }
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

    .register-btn {
      width: 100%;
    }

    .login {
      float: right;
      line-height: 40px;
    }
  }
</style>
