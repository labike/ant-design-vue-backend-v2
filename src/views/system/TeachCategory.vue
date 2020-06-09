<template>
  <a-card>
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
              <a-button style="margin-left: 8px" @click="handleAdd">添加教程分类</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <a-table :rowKey="record => record.id" :columns="columns" :data-source="data" ref="table">
      <a slot="name" slot-scope="text">{{ text }}</a>
      <template slot="operation" slot-scope="text, record">
        <!-- <a @click="handleDetail(record)">详情</a> -->
        <a @click="handleEdit(record)">修改</a>
        <a-divider type="vertical" />
        <!-- <a @click="handleDelete(record)">删除</a> -->
        <a-popconfirm title="是否确认删除" @confirm="remove(record)">
          <a>删除</a>
        </a-popconfirm>
      </template>
    </a-table>
    <add-course-cate ref="addCategoryModal" @ok="handleOk" />
    <change-course-cate ref="changeCategoryModal" @ok="handleOk" />
  </a-card>
</template>
<script>
import { courseCate, deleteCourseCate } from '@/api/setting'
import AddCourseCate from './modules/AddCourseCate'
import ChangeCourseCate from './modules/ChangeCourseCate'

const columns = [
  {
    title: '教程分类ID',
    dataIndex: 'id',
    key: 'id',
    scopedSlots: { customRender: 'id' }
  },
  {
    title: '教程分类名',
    dataIndex: 'name',
    key: 'name',
    scopedSlots: { customRender: 'name' }
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
  name: 'TeachCategory',
  components: {
    AddCourseCate,
    ChangeCourseCate
  },
  data () {
    return {
      advanced: false,
      data: [],
      columns,
      queryParam: {
        id: ''
      }
    }
  },
  mounted () {
    this.getTeachCourseCate()
  },
  methods: {
    getTeachCourseCate () {
      courseCate().then(res => {
        if (res.code === 1) {
          this.data = res.data
        } else {
          this.data = []
        }
      })
    },
    handleEdit (record) {
      this.$refs.changeCategoryModal.edit(record)
    },
    handleAdd (record) {
      this.$refs.addCategoryModal.open(record)
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
    remove (record) {
      deleteCourseCate(record.id).then(res => {
        if (res.code === 1) {
          this.$message.success(res.message)
          setTimeout(() => {
            this.$refs.table.refresh()
          }, 1500)
        } else {
            this.$message.warning(res.message)
        }
      })
    }
  }
}
</script>
