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
        <p>当前选择的用户Id是: {{ this.nowId }} 用户名是: {{ this.ModalText }}</p>
        <!-- <p>当前管理员的权限: {{ this.role_access }}</p> -->
        <a-divider>已拥有权限</a-divider>
        <a-checkbox-group @change="onChange" :style="{padding: '20px 0 50px 0', width: '100%'}">
          <a-row>
            <a-col :span="20">
              <a-checkbox
                :value="item.id"
                v-for="item in role_access"
                :key="item.id"
              >
                {{ item.name }}
              </a-checkbox>
            </a-col>
            <a-button
              v-if="this.role_access.length > 0"
              type="primary"
              @click="removehasAccess"
              :style="{marginTop: '55px', position: 'absolute',transform: 'translateX(-50%)',left: '50%'}"
            >移除</a-button>
          </a-row>
        </a-checkbox-group>
        <!-- <a-checkbox @change="onChange" v-for="item in role_access" :key="item.id">
          {{ item.name }}
        </a-checkbox> -->
        <a-divider>所有权限</a-divider>
        <!-- <a-checkbox @change="onChange" v-for="item in no_have_access" :key="item.id">
          {{ item.name }}
        </a-checkbox> -->
        <a-checkbox-group @change="onChangeNoHaveAccess" :style="{padding: '20px 0 50px 0'}">
          <a-row>
            <a-col :span="20">
              <a-checkbox :value="item.id" v-for="item in no_have_access" :key="item.id">
                {{ item.name }}
              </a-checkbox>
            </a-col>
          </a-row>
          <a-button
            v-if="no_have_access.length > 0"
            type="primary"
            @click="accessSub"
            :style="{marginTop: '25px', position: 'absolute',transform: 'translateX(-50%)',left: '50%'}"
          >提交</a-button>
        </a-checkbox-group>
      </a-col>
    </a-row>
    <org-modal ref="modal" @ok="handleSaveOk" @close="handleSaveClose" />
    <!--修改弹出框-->
    <div>
      <a-modal
        title="修改管理员信息"
        :visible="visible"
        :confirm-loading="confirmLoading"
        @ok="handleOk"
        @cancel="handleCancel"
      >
        <a-spin :spinning="confirmLoading">
          <a-form>

            <a-form-item
              label="父级ID"
            >
              <a-input v-model="parentId" disabled />
            </a-form-item>

            <a-form-item
              label="管理员ID"
            >
              <a-input v-model="nowId" disabled />
            </a-form-item>

            <a-form-item
              label="管理员名称"
            >
              <a-input v-model="ModalText" />
            </a-form-item>

            <a-form-item
              label="管理员备注"
            >
              <a-input v-model="remark" />
            </a-form-item>
          </a-form>
        </a-spin>
      </a-modal>
    </div>
  </a-card>
</template>

<script>
import STree from '@/components/Tree/Tree'
import OrgModal from './modules/OrgModal'
import { getRole, deleteRole, changeRole, roleAccess, pushAccess, deleteHasRole } from '@/api/role'
import { menuList } from '@/api/menu'

export default {
  name: 'RoleList',
  components: {
    STree,
    OrgModal
  },
  data () {
    return {
      openKeys: ['key-01'],

      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },

      // 查询参数
      queryParam: {},
      orgTree: [],
      visible: false,
      // 分类名
      ModalText: '', // 修改的分类名
      confirmLoading: false, // 按钮加载
      nowId: '', // 当前修改的分类ID
      parentId: '',
      remark: '', // 当前修改的分类的父级ID
      role_access: [], // 已拥有权限
      no_have_access: [], // 所有权限
      checked_access: '' // 从所有权限中选中的权限存放的位置
    }
  },
  created () {
    this.getTreeData()
  },
  methods: {
    // 获取分类数据
    getTreeData () {
      getRole({ pageNo: 1 }).then(res => {
        this.orgTree = res.data
        // console.log(res.data)
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
      // console.log('this is add', item)
      // this.$message.info(`提示：你选择了 ${item.parent_id} - ${item.name} `)
      if (item.parent_id === 0) {
        this.$message.error('无法添加超级管理员')
      } else {
        this.$refs.modal.add(item.parent_id)
      }
      // console.log('this.$refs 1', this.$refs)
    },
    // 修改
    handleEdit (item) {
      const params = {
        id: item.id
      }
      if (item.parent_id === 0) {
        this.$message.error('无法修改超级管理员信息')
      } else {
        this.showModal(item)
        // 获取已拥有权限
        roleAccess(params).then(res => {
          if (res.code === 1) {
            this.role_access = res.data.menu
          } else {
            this.$message.error(res.message)
            this.role_access = []
          }
        })
        // 获取所有权限
        menuList().then(res => {
          if (res.code === 1) {
            this.no_have_access = res.data
          } else {
            this.$message.error(res.message)
          }
        })
      }
      // this.showModal(item)
    },
    showModal (item) {
      this.visible = true
      this.nowId = item.id
      this.parentId = item.parent_id
      this.ModalText = item.name
      this.remark = item.remark
    },
    // 修改后点击确定按钮
    handleOk (e) {
      console.log(e.target)
      const params = {
        parent_id: this.parentId,
        id: this.nowId,
        name: this.ModalText,
        remark: this.remark
      }
      console.log(params)
      this.confirmLoading = true
      changeRole(params).then(res => {
        if (res.code === 1) {
          this.visible = false
          this.confirmLoading = false
          this.$message.success(res.message)
          this.getTreeData()
        } else {
          this.$message.error(res.message)
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
      if (item.parent_id === 0) {
        this.$message.error('无法删除超级管理员')
        this.visible = false
      } else {
        this.$confirm({
          title: '确定要删除该管理员吗?',
          content: '删除后不可恢复',
          okText: '确定',
          okType: 'danger',
          cancelText: '取消',
          onOk () {
            console.log(item.id)
            deleteRole(item.id).then(res => {
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
      }
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
    // 从已有权限中获取选中的然后移除
    onChange (checkedValues) {
      this.checked_access = checkedValues.toString()
      console.log(this.checked_access)
    },
    // 移除已有权限中的权限
    removehasAccess () {
      const params = {
        role_id: this.nowId,
        menu_id: this.checked_access
      }
      console.log(params)
      deleteHasRole(params).then(res => {
        if (res.code === 1) {
          this.$message.success(res.message)
          this.getTreeData()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 从全部权限中添加的存放到checked_access
    onChangeNoHaveAccess (checkedValues) {
      this.checked_access = checkedValues.toString()
      console.log('checked = ', checkedValues)
    },
    // 添加权限提交
    accessSub () {
      const params = {
        role_id: this.nowId,
        menu_id: this.checked_access
      }
      if (this.checked_access.length === 0) {
        this.$message.error('提交内容不能为空')
      } else {
        pushAccess(params).then(res => {
          if (res.code === 1) {
            this.$message.success(res.message)
            this.getTreeData()
          } else {
            this.$message.error(res.message)
          }
        })
      }
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
