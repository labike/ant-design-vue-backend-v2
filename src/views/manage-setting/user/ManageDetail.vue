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
          <i>管理员ID:</i>
          <i>
            {{ manageDetail.id }}
          </i>
        </p>
        <p class="common">
          <i>管理员名称:</i>
          <i>
            {{ manageDetail.name }}
          </i>
        </p>
      </div>
      <div class="assist-wrapper second">
        <p class="common">
          <i>创建时间:</i>
          <i>
            {{ manageDetail.create_time }}
          </i>
        </p>
        <p class="common">
          <i>更新时间:</i>
          <i>
            {{ manageDetail.update_time }}
          </i>
        </p>
      </div>
      <div class="assist-wrapper second">
        <p class="common">
          <i>管理员角色ID:</i>
          <i>
            {{ manageDetail.role_id }}
          </i>
        </p>
        <p class="common">
          <i>管理员手机号:</i>
          <i>
            {{ manageDetail.phone }}
          </i>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { detailManage } from '@/api/user'

export default {
  name: 'ManageDetail',
  data () {
    return {
      id: '',
      title: '',
      manageDetail: {},
      moment
    }
  },
  mounted () {
    this.id = this.$route.query.id
    this.title = decodeURIComponent(this.$route.query.title)
    this.getManageDetail(this.id)
  },
  methods: {
    getManageDetail (id) {
      detailManage(id).then(res => {
        if (res.code === 1) {
          this.manageDetail = res.data
        } else {
          this.manageDetail = {}
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
