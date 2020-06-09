<!--
 * @Author: your name
 * @Date: 2020-05-07 09:05:46
 * @LastEditTime: 2020-05-08 09:18:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-admin/src/views/order/Buy.vue
 -->
<template>
  <div style="background-color: #ececec; padding: 20px;">
    <a-row :gutter="16">
      <a-col :span="6" v-for="(item, index) in product" :key="index">
        <a-card hoverable class="card-item">
          <img
            slot="cover"
            alt="example"
            :src="main_img"
          />
          <template slot="actions" class="ant-card-actions">
            <a-icon key="setting" type="eye" />
            <!-- <a-icon key="edit" type="edit" /> -->
            <a-icon key="ellipsis" type="shopping-cart" @click="handleEdit(item)"/>
          </template>
          <a-card-meta :title="item.name" :description="item.sub_title">
          </a-card-meta>
        </a-card>
      </a-col>
    </a-row>
    <div
      v-if="showLoadingMore"
      slot="loadMore"
      :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }"
    >
      <a-spin v-if="loadingMore" />
      <a-button v-else @click="onLoadMore">
        loading more
      </a-button>
    </div>
    <add-cart ref="modal" @ok="handleOk"/>
  </div>
</template>

<script>
import { getProduct } from '@/api/order'
import AddCart from './modules/AddCart'

export default {
  name: 'BuyOrder',
  components: {
    AddCart
  },
  data () {
    return {
      loadingMore: false,
      showLoadingMore: false,
      // pagination
      pageNo: 1,
      pageSize: 10,
      main_img: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
      product: []
    }
  },
  mounted () {
    this.getProductList()
    this.showLoadingMore = true
  },
  methods: {
    getProductList () {
      const params = {
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }
      getProduct(params).then(res => {
        console.log(res)
        // const { data } = res.data
        // if (data.length > 0) {
        //   this.product.push(...data)
        // }
        if (res.data && res.data.data && res.data.data.length > 0) {
          this.product.push(...res.data.data)
          this.$message.success('数据加载完成')
          this.loadingMore = false
        } else {
          this.$message.success('没有更多数据了')
          this.loadingMore = false
        }
        // this.product = res.data.data
      })
    },
    onLoadMore () {
      this.loadingMore = true
      this.pageNo++
      this.getProductList()

      // this.getProduct(res => {
      //   this.product = this.product.concat(res.data.data)
      //   this.loadingMore = false
      //   this.$nextTick(() => {
      //     window.dispatchEvent(new Event('resize'))
      //   })
      // })
    },
    handleEdit (record) {
      this.$refs.modal.edit(record)
    },
    handleOk () {
      return ''
    }
  }
}
</script>

<style lang="less" scoped>
  .card-item{
    margin-top: 15px;
  }
</style>
