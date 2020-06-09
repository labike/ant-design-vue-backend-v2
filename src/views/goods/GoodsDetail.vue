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
          <i>商品名称:</i>
          <i>
            {{ goodsDetail.name }}
          </i>
        </p>
        <p class="common">
          <i>商品总价:</i>
          <i>
            {{ goodsDetail.price }}
          </i>
        </p>
      </div>
      <div class="assist-wrapper second">
        <p class="common">
          <i>商品ID:</i>
          <i>
            {{ id }}
          </i>
        </p>
        <p class="common">
          <i>商品主图:</i>
          <img :src="goodsDetail.main_img" :style="{width:' 80px', height: '80px'}" />
        </p>
      </div>
      <div class="assist-wrapper second">
        <p class="common">
          <i>商品附图:</i>
          <img
            :src="item"
            v-for="(item, index) in sub_imgs"
            :key="index"
            :style="{width:' 80px', height: '80px'}"
          />
        </p>
      </div>
      <div class="assist-wrapper second">
        <p class="common">
          <i>创建时间:</i>
          <i>
            {{ goodsDetail.create_time }}
          </i>
        </p>
        <p class="common">
          <i>更新时间:</i>
          <i>
            {{ goodsDetail.update_time }}
          </i>
        </p>
      </div>
      <div class="assist-wrapper second">
        <p class="common">
          <i>商品详情:</i>
          <i>
            {{ goodsDetail.detail }}
          </i>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { goodsDetail } from '@/api/goods'

export default {
  name: 'GoodsDetail',
  data () {
    return {
      id: '',
      title: '',
      goodsDetail: {},
      sub_imgs: [],
      moment
    }
  },
  mounted () {
    this.id = this.$route.query.id
    this.title = decodeURIComponent(this.$route.query.title)
    this.getGoodsDetail(this.id)
  },
  methods: {
    getGoodsDetail (id) {
      goodsDetail(id).then(res => {
        if (res.code === 1) {
          this.goodsDetail = res.data
          this.sub_imgs = res.data.sub_imgs.split(',') || []
          console.log('---', res.data.sub_imgs.split(','))
        } else {
          this.goodsDetail = {}
          this.sub_imgs = []
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
