<!--
 * @Author: labike
 * @Date: 2020-04-29 10:45:09
 * @LastEditTime: 2020-05-09 11:28:33
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
            <a-form-item label="定制编号">
              <a-input v-model="queryParam.id" placeholder=""/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="定制状态">
              <a-select v-model="queryParam.status" placeholder="请选择" default-value="0">
                <a-select-option value="0">申请中</a-select-option>
                <a-select-option value="1">已取消</a-select-option>
                <!-- <a-select-option value="2">运行中</a-select-option> -->
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
      :rowKey="(record) => record.id"
      :columns="columns"
      :data="loadData"
      showPagination="auto"
    >
      <span slot="serial" slot-scope="index">
        {{ index }}
      </span>
      <span slot="description" slot-scope="index, text">
        <ellipsis :length="25" tooltip>{{ text.content }}</ellipsis>
      </span>
      <span slot="status" slot-scope="text">
        <span>{{ text }}</span>
      </span>
      <span slot="create_time" slot-scope="text">
        {{ text.create_time }}
      </span>

      <span slot="action" slot-scope="text, record">
        <template v-if="record.status !== flagStatus.cancle">
          <a @click="handleDetail(record)">详情</a>
          <a-divider type="vertical" />
          <a @click="handleEdit(record)">修改</a>
          <a-divider type="vertical" />
          <a-popconfirm title="是否确认删除" @confirm="remove(record)">
            <!-- <a @click="handleDelete(record)">删除</a> -->
            <a>删除</a>
          </a-popconfirm>
        </template>
        <template v-else>
          <a @click="handleDetail(record)">详情</a>
        </template>
      </span>
    </s-table>
    <create-form ref="createModal" @ok="handleOk" />
    <change-soft ref="modal" @ok="handleOk"/>
  </a-card>
</template>

<script>
import moment from 'moment'
import { STable, Ellipsis } from '@/components'
import CreateForm from '../list/modules/CreateForm'
import ChangeSoft from './modules/ChangeSoft'
import { getRoleList } from '@/api/manage'
import { getSoftList, deleteSoft } from '@/api/soft'

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
  name: 'SoftList',
  components: {
    STable,
    Ellipsis,
    CreateForm,
    ChangeSoft
  },
  data () {
    return {
      flagStatus: {
        cancle: '已取消'
      },
      mdl: {},
      advanced: false,
      // 查询参数
      queryParam: {},
      pageNo: 1,
      pageSize: 10,
      // 表头
      columns: [
        {
          title: '工单编号',
          dataIndex: 'id'
        },
        {
          title: '标题',
          dataIndex: 'description',
          scopedSlots: { customRender: 'description' }
        },
        {
          title: '状态',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: '更新时间',
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
        return getSoftList(Object.assign(parameter, this.queryParam))
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
      optionAlertShow: false
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
    /**
     * 查看详情
     */
    handleDetail (record) {
      this.$router.push({
        path: '/soft/soft-detail',
        query: {
          id: record.id
        }
      })
    },
    /**
     * 修改
     */
    handleEdit (record) {
      this.$refs.modal.edit(record)
    },
    /**
     * 删除
     */
    remove (record) {
      deleteSoft(record.id).then(res => {
        if (res.code === 1) {
          this.$message.success('取消成功')
          // this.$refs.table.refresh()
          setTimeout(() => {
            this.$refs.table.refresh()
          }, 1500)
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
