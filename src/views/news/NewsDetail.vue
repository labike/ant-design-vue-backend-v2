<template>
  <div class="form-detail">
    <div class="assist-content">
      <div class="assist-wrapper">
        <p class="common">
          <i>公告标题:</i>
          <i>
            {{ title }}
          </i>
        </p>
        <p class="common">
          <i>创建时间:</i>
          <i>
            {{ noticesDetail.create_time }}
          </i>
        </p>
      </div>
      <div class="assist-wrapper second">
        <p class="common">
          <i>公告内容:</i>
          <i>
            {{ noticesDetail.content }}
          </i>
        </p>
        <p class="common">
          <i>公告编号:</i>
          <i>
            {{ id }}
          </i>
        </p>
      </div>
      <div class="assist-wrapper second">
        <p class="common">
          <i>发布者:</i>
          <i>
            {{ noticesDetail.author }}
          </i>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { noticesDetail } from '@/api/notices'

export default {
  name: 'NewsDetail',
  data () {
    return {
      id: '',
      title: '',
      noticesDetail: [],
      moment
    }
  },
  mounted () {
    this.id = this.$route.query.id
    this.title = decodeURIComponent(this.$route.query.title)
    this.getNoticesDetail(this.id)
  },
  methods: {
    getNoticesDetail (id) {
      noticesDetail(id).then(res => {
        if (res.code === 1) {
          this.noticesDetail = res.data
        } else {
          this.noticesDetail = []
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
