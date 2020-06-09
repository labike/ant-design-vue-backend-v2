<!--
 * @Author: labike
 * @Date: 2020-04-29 10:45:09
 * @LastEditTime: 2020-05-09 11:47:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-admin/src/views/form/myForm/MyForm.vue
 -->
<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="订单编号">
              <a-input v-model="queryParam.id" placeholder=""/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="订单状态">
              <a-select v-model="queryParam.status" placeholder="请选择" default-value="0">
                <a-select-option value="0">已付款</a-select-option>
                <a-select-option value="1">已取消</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :md="!advanced && 8 || 24" :sm="24">
            <span class="table-page-search-submitButtons" :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
              <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
              <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <s-table
      ref="table"
      size="default"
      :rowKey="record => record.id"
      :columns="columns"
      :data="loadData"
      showPagination="auto"
    >
      <span slot="serial" slot-scope="index">
        {{ index }}
      </span>
      <span slot="name" slot-scope="index, text">
        {{ text.name }}
      </span>
      <span slot="img" slot-scope="index, text">
        <img :src="text.main_img" :style="{width: 'auto', height: '50px'}" />
      </span>
      <span slot="description" slot-scope="index, text">
        <ellipsis :length="25" tooltip>{{ text.detail }}</ellipsis>
      </span>
      <span slot="money" slot-scope="index, text">
        ￥{{ text.price ? text.price : '0' }}
      </span>
      <span slot="pay_way" slot-scope="index, text">
        {{ text.pay_way }}
      </span>
      <span
        slot="create_time"
        slot-scope="index, text"
      >
        {{ text.order_status === this.over ? text.pay_time : text.create_time }}
      </span>
      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="handleDetail(record)">详情</a>
          <a-divider type="vertical" />
          <a @click="handleEdit(record)">修改</a>
          <a-divider type="vertical" />
          <a-popconfirm title="是否确认删除" @confirm="remove(record)">
            <a>删除</a>
          </a-popconfirm>
          <a @click="handleUp(record)" :style="{display: 'inline-block', marginTop: '10px'}">上架</a>
          <a-divider type="vertical" />
          <a @click="handleDown(record)" :style="{display: 'inline-block', marginTop: '10px'}">下架</a>
          <a-divider type="vertical" />
          <a @click="handleSpecs(record)">规格</a>
        </template>
      </span>
    </s-table>
    <create-form ref="createModal" @ok="handleOk" />
  </a-card>
</template>

<script>
import moment from 'moment'
import { STable, Ellipsis } from '@/components'
import CreateForm from '../list/modules/CreateForm'
import { getRoleList } from '@/api/manage'
import { goodsList, deleteGoods } from '@/api/goods'

const statusMap = {
  0: {
    status: 'default',
    text: '关闭'
  },
  1: {
    status: 'processing',
    text: '进行中'
  }
}

export default {
  name: 'GoodsList',
  components: {
    STable,
    Ellipsis,
    CreateForm
  },
  data () {
    return {
      mdl: {},
      // 支付状态
      over: '已付款',
      advanced: false,
      // 查询参数
      queryParam: {},
      pageNo: 1,
      pageSize: 10,
      // 表头
      columns: [
        {
          title: '商品ID',
          dataIndex: 'id'
        },
        {
          title: '商品名称',
          dataIndex: 'name',
          scopedSlots: { customRender: 'name' }
        },
        {
          title: '商品图',
          dataIndex: 'img',
          scopedSlots: { customRender: 'img' }
        },
        {
          title: '商品描述',
          dataIndex: 'description',
          scopedSlots: { customRender: 'description' }
        },
        {
          title: '商品价格',
          dataIndex: 'money',
          scopedSlots: { customRender: 'money' }
        },
        {
          title: '创建/支付时间',
          dataIndex: 'create_time',
          sorter: true
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '150px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      // loadData: [],
      loadData: parameter => {
        console.log('loadData.parameter', parameter)
        return goodsList(Object.assign(parameter, this.queryParam))
          .then(res => {
            return res.data
          })
      },
      selectedRowKeys: [],
      selectedRows: [],
      // custom table alert & rowSelection
      options: {
        alert: { show: true, clear: () => { this.selectedRowKeys = [] } },
        rowSelection: {
          selectedRowKeys: this.selectedRowKeys,
          onChange: this.onSelectChange
        }
      },
      optionAlertShow: false,
      // 规格
      goodsSpecs: []
    }
  },
  filters: {
    statusFilter (type) {
      return statusMap[type].text
    },
    statusTypeFilter (type) {
      return statusMap[type].status
    }
  },
  created () {
    this.tableOption()
    getRoleList({ t: new Date() })
  },
  methods: {
    tableOption () {
      if (!this.optionAlertShow) {
        this.options = {
          alert: { show: true, clear: () => { this.selectedRowKeys = [] } },
          rowSelection: {
            selectedRowKeys: this.selectedRowKeys,
            onChange: this.onSelectChange,
            getCheckboxProps: record => ({
              props: {
                disabled: record.no === 'No 2', // Column configuration not to be checked
                name: record.no
              }
            })
          }
        }
        this.optionAlertShow = true
      } else {
        this.options = {
          alert: false,
          rowSelection: null
        }
        this.optionAlertShow = false
      }
    },
    // 规格
    handleSpecs (record) {
      this.$router.push({
        path: '/goods/goods-specs',
        query: {
          id: record.id,
          category_id: record.category_id
        }
      })
    },
    /**
     * detail
     */
    handleDetail (record) {
      // console.log(record.id)
      this.$router.push({
        path: '/goods/goods-detail',
        query: {
          id: record.id
        }
      })
    },
    /**
     * edit
     */
    handleEdit (record) {
      this.$router.push({
        path: '/goods/change-goods',
        query: {
          id: record.id
        }
      })
      // this.$refs.modal.edit(record)
    },
    /**
     * delete
     */
    remove (record) {
      deleteGoods(record.id).then(res => {
        if (res.code === 1) {
          this.$message.success(res.message)
          setTimeout(() => {
            this.$refs.table.refresh()
          }, 1500)
        } else {
            this.$message.warning(res.message)
        }
      })
    },
    handleOk () {
      this.$refs.table.refresh()
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    resetSearchForm () {
      this.queryParam = {
        date: moment(new Date())
      }
    }
  }
}
</script>
