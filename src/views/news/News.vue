<!--
 * @Author: labike
 * @Date: 2020-04-29 10:45:09
 * @LastEditTime: 2020-05-06 16:12:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-admin/src/views/form/myForm/MyForm.vue
 -->
<template>
  <a-card :bordered="false">
    <s-table
      ref="table"
      size="default"
      rowKey="key"
      :columns="columns"
      :data="loadData"
      showPagination="auto"
    >
      <span slot="serial" slot-scope="index">
        {{ index }}
      </span>
      <span slot="news-title" slot-scope="index, text">
        <ellipsis :length="25" tooltip>{{ text.title }}</ellipsis>
      </span>
      <span slot="description" slot-scope="index, text">
        <ellipsis :length="25" tooltip>{{ text.content }}</ellipsis>
      </span>
      <span slot="author" slot-scope="index, text">
        <span>{{ text.author }}</span>
      </span>
      <span slot="create_time" slot-scope="text">
        {{ text.create_time }}
      </span>
      <span slot="update_time" slot-scope="text">
        {{ text.update_time }}
      </span>
      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="handleDetail(record)">详情</a>
          <a-divider type="vertical" />
          <a @click="handleAddNews">添加</a>
          <a-divider type="vertical" />
          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical" />
          <a-popconfirm title="是否确认删除" @confirm="remove(record)">
            <a>删除</a>
          </a-popconfirm>
        </template>
      </span>
    </s-table>
    <create-form ref="createModal" @ok="handleOk" />
    <change-news ref="modal" @ok="handleOk"/>
    <!-- <step-by-step-modal ref="modal" @ok="handleOk"/> -->
  </a-card>
</template>

<script>
import moment from 'moment'
import { STable, Ellipsis } from '@/components'
import CreateForm from '../list/modules/CreateForm'
import ChangeNews from './modules/ChangeNews'
import { getRoleList } from '@/api/manage'
import { getNotices, deleteNotice } from '@/api/notices'

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
  name: 'News',
  components: {
    STable,
    Ellipsis,
    CreateForm,
    ChangeNews
  },
  data () {
    return {
      mdl: {},
      advanced: false,
      // 查询参数
      queryParam: {},
      pageNo: 1,
      pageSize: 10,
      // 表头
      columns: [
        {
          title: '公告编号',
          dataIndex: 'id'
        },
        {
          title: '公告标题',
          dataIndex: 'news-title',
          scopedSlots: { customRender: 'news-title' }
        },
        {
          title: '公告内容',
          dataIndex: 'description',
          scopedSlots: { customRender: 'description' }
        },
        {
          title: '发布者',
          dataIndex: 'author',
          scopedSlots: { customRender: 'author' }
        },
        {
          title: '发布时间',
          dataIndex: 'create_time',
          sorter: true
        },
        {
          title: '更新时间',
          dataIndex: 'update_time',
          sorter: true
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '250px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      // loadData: [],
      loadData: parameter => {
        console.log('loadData.parameter', parameter)
        return getNotices(Object.assign(parameter, this.queryParam))
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
    handleDetail (record) {
      console.log(record.id)
      // this.$refs.modal.edit(record)
      // this.$router.push({
      //   path: '/form/form-detail',
      //   query: {
      //     title: record.title,
      //     id: record.id
      //   }
      // })
      this.$router.push({
        path: '/news/news-detail',
        query: {
          title: encodeURIComponent(record.title),
          id: record.id
        }
      })
    },
    handleAddNews (record) {
      this.$router.push({
        path: '/news/add-news'
      })
    },
    handleEdit (record) {
      this.$refs.modal.edit(record)
    },
    remove (record) {
      deleteNotice(record.id).then(res => {
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
    // handleSub (record) {
    //   if (record.status !== 0) {
    //     this.$message.info(`${record.no} 订阅成功`)
    //   } else {
    //     this.$message.error(`${record.no} 订阅失败，规则已关闭`)
    //   }
    // },
    handleOk () {
      this.$refs.table.refresh()
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    // toggleAdvanced () {
    //   this.advanced = !this.advanced
    // },
    resetSearchForm () {
      this.queryParam = {
        date: moment(new Date())
      }
    }
  }
}
</script>
