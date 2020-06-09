<!--
 * @Author: labike
 * @Date: 2020-04-23 09:52:00
 * @LastEditTime: 2020-05-06 17:37:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-admin/src/views/form/BasicForm.vue
 -->
<template>
  <div class="form-detail">
    <div class="assist-content">
      <div class="assist-wrapper">
        <p class="common">
          <i>定制标题:</i>
          <i>
            暂无标题
          </i>
        </p>
        <p class="common">
          <i>创建时间:</i>
          <i>
            {{ softDetail.create_time }}
          </i>
        </p>
      </div>
      <div class="assist-wrapper second">
        <p class="common">
          <i>定制需求:</i>
          <i>
            {{ softDetail.content }}
          </i>
        </p>
        <p class="common">
          <i>定制编号:</i>
          <i>
            {{ id }}
          </i>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { getSoftDetail } from '@/api/soft'

export default {
  name: 'SoftDetail',
  data () {
    return {
      id: '',
      title: '',
      softDetail: {},
      moment
    }
  },
  mounted () {
    this.id = this.$route.query.id
    this.title = decodeURIComponent(this.$route.query.title)
    this.getSoftDetail(this.id)
  },
  methods: {
    getSoftDetail (id) {
      getSoftDetail(id).then(res => {
        if (res.code === 1) {
          this.softDetail = res.data
        } else {
          this.softDetail = {}
        }
      })
    },
    handleSubmit () {
      if (!this.value) {
        return
      }

      this.submitting = true

      setTimeout(() => {
        this.submitting = false
        this.comments = [
          {
            author: 'Han Solo',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: this.value,
            datetime: moment().fromNow()
          },
          ...this.comments
        ]
        this.value = ''
      }, 1000)
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
