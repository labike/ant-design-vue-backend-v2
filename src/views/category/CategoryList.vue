<template>
  <a-card :bordered="false">
    <a-row :gutter="8">
      <a-col :span="10">
        <s-tree
          :dataSource="orgTree"
          :openKeys.sync="openKeys"
          :search="true"
          @click="handleClick"
          @add="handleAdd"
          @edit="handleEdit"
          @delete="showDeleteConfirm"
          @titleClick="handleTitleClick"></s-tree>
      </a-col>
    </a-row>
    <org-modal ref="modal" @ok="handleSaveOk" @close="handleSaveClose" />
    <!--修改弹出框-->
    <div>
      <a-modal
        title="修改分类名"
        :visible="visible"
        :confirm-loading="confirmLoading"
        @ok="handleOk"
        @cancel="handleCancel"
      >
        <p>父类ID: {{ parentId }}</p>
        <p>ID: {{ nowId }}</p>
        <a-input type="text" v-model="ModalText"></a-input>
      </a-modal>
    </div>
  </a-card>
</template>

<script>
import STree from '@/components/Tree/Tree'
import OrgModal from './modules/OrgModal'
import { categoryList, deleteCategory, changeCategory } from '@/api/category'

export default {
  name: 'CategoryList',
  components: {
    STree,
    OrgModal
  },
  data () {
    return {
      openKeys: ['key-01'],

      // 查询参数
      queryParam: {},
      orgTree: [],
      visible: false,
      // 分类名
      ModalText: '', // 修改的分类名
      confirmLoading: false, // 按钮加载
      nowId: '', // 当前修改的分类ID
      parentId: '' // 当前修改的分类的父级ID
    }
  },
  created () {
    this.getTreeData()
  },
  methods: {
    // 获取分类数据
    getTreeData () {
      categoryList({ pageNo: 1 }).then(res => {
        this.orgTree = res.data
      })
    },
    handleClick (e) {
      this.queryParam = {
        key: e.key
      }
      // this.$refs.table.refresh(true)
    },
    // 添加新分类时点击+选中某一项的提示
    handleAdd (item) {
      console.log('this is add', item)
      this.$message.info(`提示：你选择了 ${item.p_id} - ${item.name} `)
      this.$refs.modal.add(item)
      // console.log('this.$refs 1', this.$refs)
    },
    // 修改
    handleEdit (item) {
      this.showModal(item)
    },
    showModal (item) {
      this.visible = true
      this.nowId = item.id
      this.parentId = item.p_id
      this.ModalText = item.name
    },
    // 修改后点击确定按钮
    handleOk (e) {
      console.log(e.target)
      const params = {
        p_id: this.parentId,
        id: this.nowId,
        name: this.ModalText,
        order: 2
      }
      console.log(params)
      this.confirmLoading = true
      changeCategory(params).then(res => {
        if (res.code === 1) {
          this.visible = false
          this.confirmLoading = false
          this.$message.success(res.message)
          this.getTreeData()
        } else {
          this.$message.success(res.message)
        }
      })
    },
    handleCancel (e) {
      console.log('Clicked cancel button')
      this.visible = false
    },
    // 点击删除某一个分类
    showDeleteConfirm (item) {
      const _this = this
      this.$confirm({
        title: '确定要删除该分类吗?',
        content: '删除后不可恢复',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk () {
          console.log(item.id)
          deleteCategory(item.id).then(res => {
            if (res.code === 1) {
              _this.$message.success(res.message)
              _this.getTreeData()
            } else {
              _this.$message.success(res.message)
            }
          })
          console.log('OK')
        },
        onCancel () {
          console.log('Cancel')
        }
      })
    },
    handleTitleClick (item) {
      console.log('handleTitleClick', item)
    },
    titleClick (e) {
      console.log('titleClick', e)
    },
    // 添加完成后点击确定调用
    handleSaveOk () {
      this.getTreeData()
    },
    handleSaveClose () {

    }
  }
}
</script>

<style lang="less">
  .custom-tree {

    /deep/ .ant-menu-item-group-title {
      position: relative;
      &:hover {
        .btn {
          display: block;
        }
      }
    }

    /deep/ .ant-menu-item {
      &:hover {
        .btn {
          display: block;
        }
      }
    }

    /deep/ .btn {
      display: none;
      position: absolute;
      top: 0;
      right: 10px;
      width: 20px;
      height: 40px;
      line-height: 40px;
      // z-index: 1050;

      &:hover {
        transform: scale(1.2);
        transition: 0.5s all;
      }
    }
  }
</style>
