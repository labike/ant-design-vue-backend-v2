<template>
  <div class="form-detail">
    <div class="assist-content">
      <p class="assist-wrapper">
        <span class="common">
          <i>工单标题:</i>
          <i>
            {{ title }}
          </i>
        </span>
        <span class="common other">
          <i>创建时间:</i>
          <i>
            {{ assistDetail.create_time }}
          </i>
        </span>
      </p>
      <p class="assist-wrapper second">
        <span class="common">
          <i>工单内容:</i>
          <i>
            {{ assistDetail.question }}
          </i>
        </span>
        <span class="common other">
          <i>工单编号:</i>
          <i>
            {{ id }}
          </i>
        </span>
      </p>
    </div>
    <div class="comment-content">
      <a-list
        v-if="comments.length"
        :dataSource="comments"
        itemLayout="horizontal"
      >
        <a-list-item v-for="item in comments" :key="item.id">
          <a-comment
            :author="item.reply"
            :avatar="item.avatar"
            :content="item.question"
            :datetime="item.update_time"
          >
            <p v-if="item.answer && item.reply">
              {{ item.reply }} 回复 {{ item.answer }}
            </p>
            <!-- <template slot="actions"> -->
            <a-button type="primary" size="small" @click="handleReply(item.id)">回复</a-button>
            <!-- </template> -->
          </a-comment>
        </a-list-item>
      </a-list>
    </div>
    <a-modal
      title="回复"
      :width="640"
      :visible="visible"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
    >
      <a-comment :style="{width: '100%'}">
        <a-avatar
          slot="avatar"
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          alt="图像"
        />
        <div slot="content">
          <a-form-item>
            <a-textarea :rows="4" @change="handleChange" :value="value" :style="{width: '600px'}"></a-textarea>
          </a-form-item>
          <!-- <a-form-item>
            <a-button htmlType="submit" :loading="submitting" @click="handleSubmit" type="primary">
              评论
            </a-button>
          </a-form-item> -->
        </div>
      </a-comment>
      <template slot="footer">
        <a-button key="forward" :loading="confirmLoading" type="primary" @click="handleOk">提交</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script>
import moment from 'moment'
import { assistDetail, replyAssist } from '@/api/assist'
// import CommentModal from './CommentModal'

export default {
  name: 'FormDetail',
  data () {
    return {
      id: '', // 当前工单id
      reply_item_id: '', // 每条回复id
      title: '',
      assistDetail: [],
      // 评论
      visible: false,
      confirmLoading: false,
      comments: [],
      submitting: false,
      value: '',
      moment
    }
  },
  mounted () {
    this.id = this.$route.query.id
    this.title = decodeURIComponent(this.$route.query.title)
    this.getAssistDetail(this.id)
  },
  methods: {
    getAssistDetail (id) {
      assistDetail(id).then(res => {
        if (res.code === 1) {
          this.assistDetail = res.data[0]
          this.comments = res.data
        } else {
          this.assistDetail = []
        }
      })
    },
    handleChange (e) {
      this.value = e.target.value
    },
    handleReply (id) {
      this.visible = true // 点击回复弹出回复框
      this.reply_item_id = id // 保存当前需要回复的问题的id
    },
    // 提交
    handleOk () {
      const params = {
        detail_id: this.reply_item_id, // 当前问题id
        answer: this.value, // 当前回复内容
        id: this.id // 工单id
      }
      if (params.answer) {
        console.log('可以提交')
        this.confirmLoading = true
        replyAssist(params).then(res => {
          console.log(res)
          if (res.code === 1) {
            this.confirmLoading = false
            this.visible = false
            this.$message.success(res.message)
            setTimeout(() => {
              this.getAssistDetail(params.id)
            }, 1000)
          } else {
            this.confirmLoading = false
            this.$message.success(res.message)
          }
        })
      } else {
        this.$message.error('请输入回复内容')
      }
    },
    handleCancel () {
      this.visible = false
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
        display: inline-block;
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
