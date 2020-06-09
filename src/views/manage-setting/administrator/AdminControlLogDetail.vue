<!--
 * @Author: labike
 * @Date: 2020-04-23 09:52:00
 * @LastEditTime: 2020-05-07 14:56:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-admin/src/views/form/BasicForm.vue
 -->
<template>
  <div class="form-detail">
    <div class="assist-content">
      <div class="assist-wrapper">
        <p class="common">
          <i>操作描述:</i>
          <i>
            {{ logDetail.desc }}
          </i>
        </p>
        <p class="common">
          <i>操作日志编号:</i>
          <i>
            {{ logDetail.id }}
          </i>
        </p>
      </div>
      <div class="assist-wrapper second">
        <p class="common">
          <i>登录IP:</i>
          <i>
            {{ logDetail.login_ip }}
          </i>
        </p>
        <p class="common">
          <i>管理员ID:</i>
          <i>
            {{ logDetail.user_id }}
          </i>
        </p>
      </div>
      <div class="assist-wrapper second">
        <p class="common">
          <i>管理员名称:</i>
          <i>
            {{ logDetail.user_name }}
          </i>
        </p>
      </div>
      <div class="assist-wrapper second">
        <p class="common">
          <i>登录时间:</i>
          <i>
            {{ logDetail.create_time }}
          </i>
        </p>
      </div>
      <div class="assist-wrapper second">
        <p class="common">
          <i>操作详情:</i>
          <span>
            <i>id: {{ JSON.parse(logDetail.mark)['id'] }}</i>
            <i>分类ID: {{ JSON.parse(logDetail.mark)['category_id'] }}</i>
            <i>操作名称: {{ JSON.parse(logDetail.mark)['attr_name'] }}</i>
            <i>操作时间: {{ JSON.parse(logDetail.mark)['update_time'] }}</i>
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { detailLog } from '@/api/user'

export default {
  name: 'AdminControlLogDetail',
  data () {
    return {
      id: '',
      title: '',
      goodsDetail: {},
      sub_imgs: [],
      moment,
      logDetail: {}
    }
  },
  mounted () {
    this.id = this.$route.query.id
    this.title = decodeURIComponent(this.$route.query.title)
    this.getLogDetail()
  },
  methods: {
    getLogDetail () {
      detailLog(this.id).then(res => {
        if (res.code === 1) {
          this.logDetail = res.data
        } else {
          this.logDetail = {}
        }
      })
    },
    handleChange (e) {
      this.value = e.target.value
    }
  }
}
</script>

<style lang="less" scoped>
  .assist-content{
    font-size: 13px;
    width: 100%;
    padding: 15px 0 15px 15px;
    background-color: #fff;
    .assist-wrapper{
      margin: 0px;
      .common{
        width: 350px;
        margin-left: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-word;
        i{
          margin-left: 15px;
          font-style: normal;
        }
      }
      .other{
        margin-left: 50px;
      }
    }
    .second{
      margin-top: 10px;
    }
  }
</style>
