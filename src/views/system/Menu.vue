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
      <a-col :span="14">
        <p>当前选择的菜单Id是: {{ this.nowId }} 菜单名是: {{ this.ModalText }}</p>
        <!-- <p>当前管理员的权限: {{ this.role_access }}</p> -->
        <a-divider>菜单详情</a-divider>
        <p>菜单ID: {{ detailMenu.id }}</p>
        <p>菜单名称: {{ detailMenu.name }}</p>
        <p>菜单父级ID: {{ detailMenu.parent_id }}</p>
        <p v-if="detailMenu.type === 0">菜单所属: 后台菜单</p>
        <p v-else-if="detailMenu.type === 1">菜单所属: 官网菜单</p>
        <p v-else>菜单所属: 商户中心菜单</p>
        <p>菜单创建时间: {{ detailMenu.create_time }}</p>
        <p>菜单更新时间: {{ detailMenu.update_time }}</p>
      </a-col>
    </a-row>
    <org-modal ref="modal" @ok="handleSaveOk" @close="handleSaveClose" />
    <!--修改弹出框-->
    <div>
      <a-modal
        title="修改菜单名"
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
    <div>
      <a-modal v-model="tipsVisible" title="提示" @ok="handleTipsOk">
        <p>查看菜单详情请点击左侧菜单<i :style="{color: 'red', fontStyle: 'normal'}">编辑</i>后查看</p>
      </a-modal>
    </div>
  </a-card>
</template>

<script>
import STree from '@/components/Tree/Tree'
import OrgModal from './modules/OrgModal'
// import { getOrgTree } from '@/api/manage'
import { menuList, deleteMenu, changeMenu, detailMenu } from '@/api/menu'

export default {
  name: 'Menu',
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
      tipsVisible: true,
      // 分类名
      ModalText: '', // 修改的分类名
      confirmLoading: false, // 按钮加载
      nowId: '', // 当前修改的分类ID
      parentId: '', // 当前修改的分类的父级ID
      detailMenu: [] // 当前选中菜单的详情
    }
  },
  created () {
    this.getTreeData()
  },
  methods: {
    handleTipsOk (e) {
      console.log(e)
      this.tipsVisible = false
    },
    // 获取分类数据
    getTreeData () {
      menuList({ pageNo: 1 }).then(res => {
        this.orgTree = res.data
        // console.log(res.data)
      })
    },
    handleClick (e) {
      // console.log('handleClick', e)
      this.queryParam = {
        key: e.key
      }
      // this.$refs.table.refresh(true)
    },
    // 添加新分类时点击+选中某一项的提示
    handleAdd (item) {
      // console.log('this is add', item)
      this.$message.info(`提示：你选择了 ${item.parent_id} - ${item.name} `)
      this.$refs.modal.add(item)
      // console.log('this.$refs 1', this.$refs)
    },
    // 修改
    handleEdit (item) {
      this.showModal(item)
      this.getMenuDetail(item.id)
    },
    showModal (item) {
      this.visible = true
      this.nowId = item.id
      this.parentId = item.parent_id
      this.ModalText = item.name
    },
    getMenuDetail (id) {
      detailMenu(id).then(res => {
        if (res.code === 1) {
          this.detailMenu = res.data
        } else {
          this.detailMenu = []
        }
      })
    },
    // 修改后点击确定按钮
    handleOk (e) {
      // this.ModalText = 'The modal will be closed after two seconds'
      console.log(e.target)
      const params = {
        parent_id: this.parentId,
        id: this.nowId,
        name: this.ModalText,
        order: 2
      }
      console.log(params)
      this.confirmLoading = true
      changeMenu(params).then(res => {
        if (res.code === 1) {
          this.visible = false
          this.confirmLoading = false
          this.$message.success(res.message)
          this.handleSaveOk()
        } else {
          this.$message.success(res.message)
        }
      })
      // setTimeout(() => {
      //   this.visible = false
      //   this.confirmLoading = false
      // }, 2000)
    },
    handleCancel (e) {
      console.log('Clicked cancel button')
      this.visible = false
    },
    // 点击删除某一个分类
    showDeleteConfirm (item) {
      const _this = this
      this.$confirm({
        title: '确定要删除该菜单吗?',
        content: '删除后不可恢复',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk () {
          console.log(item.id)
          deleteMenu(item.id).then(res => {
            if (res.code === 1) {
              _this.$message.success(res.message)
              _this.handleSaveOk()
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
