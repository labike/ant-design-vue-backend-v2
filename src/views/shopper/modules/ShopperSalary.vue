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
      rowKey="key"
      :columns="columns"
      :data="loadData"
      showPagination="auto"
    >
      <span slot="serial" slot-scope="index">
        {{ index }}
      </span>
      <span slot="reset" slot-scope="index, text">
        {{ text.reset }}
      </span>
      <span slot="up_money" slot-scope="index, text">
        <ellipsis :length="25" tooltip>{{ text.up_money }}</ellipsis>
      </span>
      <span slot="category" slot-scope="index, text">
        <span>{{ text.category }}</span>
      </span>
      <span slot="create_time" slot-scope="index, text">
        {{ text.create_time }}
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
import { shopperSalary } from '@/api/user'

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
  name: 'ShopperSalary',
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
          title: '用户ID',
          dataIndex: 'id'
        },
        {
          title: '余额',
          dataIndex: 'reset',
          scopedSlots: { customRender: 'reset' }
        },
        {
          title: '充值',
          dataIndex: 'up_money',
          scopedSlots: { customRender: 'up_money' }
        },
        {
          title: '类型',
          dataIndex: 'category',
          scopedSlots: { customRender: 'category' }
        },
        {
          title: '时间',
          dataIndex: 'create_time',
          sorter: true
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      // loadData: [],
      loadData: parameter => {
        parameter.user_id = this.$route.query.user_id
        return shopperSalary(Object.assign(parameter, this.queryParam))
          .then(res => {
            return res.data || []
          }).catch(err => {
            return err
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
                disabled: record.no === 'No 2',
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
      // deleteShopper(record.id).then(res => {
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
          user_id: record.id
        }
      })
    },
    // 资金明细
    handleSalaryDetail (record) {
      this.$router.push({
        path: '/shopper/shopper-salary',
        query: {
          user_id: record.id
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
