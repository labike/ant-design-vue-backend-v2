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
            <a-form-item label="商户编号">
              <a-input v-model="queryParam.id" placeholder=""/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="手机号">
              <a-input v-model="queryParam.phone" placeholder=""/>
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
      <span slot="user_id" slot-scope="index, text">
        {{ text.user_id }}
      </span>
      <span slot="name" slot-scope="index, text">
        <ellipsis :length="25" tooltip>{{ text.user_name }}</ellipsis>
      </span>
      <span slot="description" slot-scope="index, text">
        <ellipsis :length="25" tooltip>{{ text.desc }}</ellipsis>
      </span>
      <span slot="ip" slot-scope="index, text">
        <span>{{ text.login_ip }}</span>
      </span>
      <span slot="status" slot-scope="index, text">
        <span>{{ text.is_success === 0 ? '登陆成功' : '登陆失败' }}</span>
      </span>
      <span slot="create_time" slot-scope="index, text">
        {{ text.create_time }}
      </span>
      <span slot="update_time" slot-scope="index, text">
        {{ text.update_time }}
      </span>
    </s-table>
    <create-form ref="createModal" @ok="handleOk" />
  </a-card>
</template>

<script>
import moment from 'moment'
import { STable, Ellipsis } from '@/components'
import CreateForm from '../../list/modules/CreateForm'
import { getRoleList } from '@/api/manage'
import { adminLoginLog } from '@/api/user'

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
  name: 'AdminLoginLog',
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
          title: '登录日志编号',
          dataIndex: 'id'
        },
        {
          title: '管理员ID',
          dataIndex: 'user_id',
          scopedSlots: { customRender: 'user_id' }
        },
        {
          title: '管理员名称',
          dataIndex: 'name',
          scopedSlots: { customRender: 'name' }
        },
        {
          title: '操作描述',
          dataIndex: 'description',
          scopedSlots: { customRender: 'description' }
        },
        {
          title: '登录IP',
          dataIndex: 'ip',
          scopedSlots: { customRender: 'ip' }
        },
        {
          title: '登录状态',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: '登录时间',
          dataIndex: 'create_time',
          sorter: true
        }
        // {
        //   title: '操作',
        //   dataIndex: 'action',
        //   width: '250px',
        //   scopedSlots: { customRender: 'action' }
        // }
      ],
      // 加载数据方法 必须为 Promise 对象
      // loadData: [],
      loadData: parameter => {
        console.log('loadData.parameter', parameter)
        return adminLoginLog(Object.assign(parameter, this.queryParam))
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
     * detail
     */
    handleDetail (record) {
      // console.log(record.id)
      this.$router.push({
        path: '/shopper/shopper-detail',
        query: {
          id: record.id
        }
      })
    },
    /**
     * edit
     */
    handleEdit (record) {
      this.$refs.modal.edit(record)
    },
    /**
     * delete
     */
    remove (record) {
      // deleteManage(record.id).then(res => {
      //   if (res.code === 1) {
      //     this.$message.success(res.message)
      //     setTimeout(() => {
      //       this.$refs.table.refresh()
      //     }, 1500)
      //   } else {
      //       this.$message.warning(res.message)
      //   }
      // })
    },
    // 登录日志
    handleLoginLog (record) {
      this.$router.push({
        path: '/shopper/shopper-log',
        query: {
          id: record.id
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
