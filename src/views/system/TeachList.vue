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
            <a-form-item label="教程编号">
              <a-input v-model="queryParam.id" placeholder=""/>
            </a-form-item>
          </a-col>
          <a-col :md="!advanced && 8 || 24" :sm="24">
            <span class="table-page-search-submitButtons" :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
              <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
              <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
              <a-button style="margin-left: 8px" @click="addMember">添加教程</a-button>
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
        <ellipsis :length="25" tooltip>{{ text.title }}</ellipsis>
      </span>
      <span slot="img_url" slot-scope="index, text">
        <img :src="text.img_url" alt="" :style="{width: 'auto', height: '80px'}">
      </span>
      <span slot="author" slot-scope="index, text">
        {{ text.author }}
      </span>
      <span slot="img_url" slot-scope="index, text">
        <img :src="text.img_url" alt="">
      </span>
      <span slot="description" slot-scope="index, text">
        <ellipsis :length="25" tooltip>{{ text.content }}</ellipsis>
      </span>
      <span slot="create_time" slot-scope="index, text">
        {{ text.create_time }}
      </span>
      <span slot="update_time" slot-scope="index, text">
        {{ text.update_time }}
      </span>
      <span slot="action" slot-scope="text, record">
        <template>
          <!-- <a @click="handleDetail(record)">详情</a> -->
          <a @click="handleEdit(record)">修改</a>
          <a-divider type="vertical" />
          <!-- <a @click="handleDelete(record)">删除</a> -->
          <a-popconfirm title="是否确认删除" @confirm="remove(record)">
            <a>删除</a>
          </a-popconfirm>
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
import { courseList, deleteCourse } from '@/api/setting'

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
  name: 'TeachList',
  components: {
    STable,
    Ellipsis,
    CreateForm
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
          title: '教程编号',
          dataIndex: 'id'
        },
        {
          title: '教程标题',
          dataIndex: 'name',
          scopedSlots: { customRender: 'name' }
        },
        {
          title: '教程内容',
          dataIndex: 'description',
          scopedSlots: { customRender: 'description' }
        },
        {
          title: '教程作者',
          dataIndex: 'author',
          scopedSlots: { customRender: 'author' }
        },
        {
          title: '封面',
          dataIndex: 'img_url',
          scopedSlots: { customRender: 'img_url' }
        },
        {
          title: '创建时间',
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
        return courseList(Object.assign(parameter, this.queryParam))
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
    // 添加管理员
    addMember () {
      this.$router.push({
        path: '/system/add-teach'
      })
    },
    /**
     * detail
     */
    handleDetail (record) {
      // console.log(record.id)
      this.$router.push({
        path: '/user/manage-detail',
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
        path: '/system/change-teach',
        query: {
          id: record.id
        }
      })
    },
    /**
     * delete
     */
    remove (record) {
      deleteCourse(record.id).then(res => {
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
