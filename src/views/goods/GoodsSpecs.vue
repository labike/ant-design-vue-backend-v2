<template>
  <a-card>
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="规格编号">
              <a-input v-model="queryParam.id" placeholder=""/>
            </a-form-item>
          </a-col>
          <a-col :md="!advanced && 8 || 24" :sm="24">
            <span class="table-page-search-submitButtons" :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
              <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
              <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
              <a-button style="margin-left: 8px" @click="handleAdd">添加规格</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <a-table :columns="columns" :data-source="data" ref="table">
      <a slot="name" slot-scope="text">{{ text }}</a>
      <!-- <a slot="is_default" slot-scope="is_default">{{ is_default === 1 ? '默认' : '' }}</a> -->
      <template slot="operation" slot-scope="text, record">
        <!-- <a @click="handleDetail(record)">详情</a> -->
        <a @click="handleEdit(record)">修改</a>
        <a-divider type="vertical" />
        <a v-if="record.is_default === 1" :style="{color: 'rgb(156, 154, 154)'}">默认</a>
        <a @click="handleDefault(record)" v-else>设置默认</a>
        <a-divider type="vertical" />
        <!-- <a @click="handleDelete(record)">删除</a> -->
        <a-popconfirm title="是否确认删除" @confirm="remove(record)">
          <a>删除</a>
        </a-popconfirm>
      </template>
    </a-table>
  </a-card>
</template>
<script>
import { goodsSpecs, deleteGoodsSpecs, changeGoodsSpecs } from '@/api/goods'

const columns = [
  {
    title: '规格ID',
    dataIndex: 'id',
    key: 'id',
    scopedSlots: { customRender: 'id' }
  },
  {
    title: '商品价格',
    dataIndex: 'product_price',
    key: 'product_price',
    scopedSlots: { customRender: 'product_price' }
  },
  {
    title: '商品规格',
    dataIndex: 'product_specs',
    key: 'product_specs',
    scopedSlots: { customRender: 'product_specs' }
  },
  {
    title: '创建时间',
    dataIndex: 'create_time',
    key: 'create_time',
    scopedSlots: { customRender: 'create_time' }
  },
  {
    title: '更新时间',
    dataIndex: 'update_time',
    key: 'update_time',
    scopedSlots: { customRender: 'update_time' }
  },
  {
    title: '操作',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' }
  }
]

export default {
  name: 'GoodsSpecs',
  components: {},
  data () {
    return {
      advanced: false,
      data: [],
      columns,
      pageNo: '1',
      pageSize: '10',
      id: '', // 当前商品ID
      category_id: '', // 当前商品的分类ID
      queryParam: {
        id: ''
      }
    }
  },
  mounted () {
    this.id = this.$route.query.id
    this.category_id = this.$route.query.category_id
    this.getGoodsSpecs()
  },
  methods: {
    getGoodsSpecs () {
      const params = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        product_id: this.id
      }
      goodsSpecs(params).then(res => {
        if (res.code === 1) {
          console.log(res)
          this.data = res.data.data
        } else {
          this.data = []
        }
      })
    },
    handleEdit (record) {
      this.$router.push({
        path: '/goods/change-goods-specs',
        query: {
          id: this.id,
          category_id: this.category_id,
          specs_id: record.id
        }
      })
    },
    handleAdd (id) {
      console.log(this.$route.query.id)
      this.$router.push({
        path: '/goods/add-goods-specs',
        query: {
          id: this.id,
          category_id: this.category_id
        }
      })
    },
    handleOk () {
      this.$notification.open({
        message: '请刷新当前页面',
        description:
          '刷新当前页面后可查看新添加分类或修改后的分类',
        onClick: () => {
          console.log('关闭')
        }
      })
    },
    // 设置默认
    handleDefault (record) {
      const params = {
        product_id: this.id,
        id: record.id,
        is_default: '1'
      }
      changeGoodsSpecs(params).then(res => {
        if (res.code === 1) {
          this.$notification.open({
            message: res.message,
            description:
              '刷新当前页面后可查看设置是否成功',
            onClick: () => {
              console.log('关闭')
            }
          })
        }
      })
    },
    remove (record) {
      console.log(record.id)
      deleteGoodsSpecs(record.id).then(res => {
        if (res.code === 1) {
          this.$notification.open({
            message: '请刷新当前页面',
            description:
              '刷新当前页面后可查看新添加分类或修改后的分类',
            onClick: () => {
              console.log('关闭')
            }
          })
        } else {
            this.$message.warning(res.message)
        }
      })
    }
  }
}
</script>
