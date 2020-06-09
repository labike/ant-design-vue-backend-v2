// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/dashboard/analysis',
    children: [
      // dashboard
      {
        path: 'dashboard',
        name: 'dashboard',
        redirect: '/dashboard/analysis',
        component: RouteView,
        meta: { title: '主页', keepAlive: true, icon: bxAnaalyse, permission: [ 'admin' ] },
        children: [
          {
            path: 'analysis/:pageNo([1-9]\\d*)?',
            name: 'Analysis',
            component: () => import('@/views/dashboard/Analysis'),
            meta: { title: '主页', keepAlive: false, permission: [ 'admin' ] }
          }
        ]
      },

      // shopper
      {
        path: '/shopper',
        redirect: '/shopper/shopper-list',
        component: PageView,
        meta: { title: '商户管理', icon: 'solution', permission: [ 'admin' ] },
        children: [
          {
            path: '/shopper/shopper-log',
            name: 'ShopperLog',
            hidden: true,
            component: () => import('@/views/shopper/ShopperLog'),
            meta: { title: '登录日志', keepAlive: true, permission: [ 'admin' ] }
          },
          {
            path: '/shopper/shopper-list',
            name: 'ShopperList',
            component: () => import('@/views/shopper/ShopperList'),
            meta: { title: '商户列表', keepAlive: true, permission: [ 'admin' ] }
          },
          {
            path: '/shopper/shopper-detail',
            name: 'ShopperDetail',
            hidden: true,
            component: () => import('@/views/shopper/ShopperDetail'),
            meta: { title: '商户信息', keepAlive: true, permission: [ 'admin' ] }
          },
          {
            path: '/shopper/shopper-salary',
            name: 'ShopperSalary',
            hidden: true,
            component: () => import('@/views/shopper/modules/ShopperSalary'),
            meta: { title: '资金明细', keepAlive: true, permission: [ 'admin' ] }
          }
        ]
      },

      // order
      {
        path: '/order',
        redirect: '/order/buy-order',
        component: PageView,
        meta: { title: '订单中心', icon: 'shopping-cart', permission: [ 'admin' ] },
        children: [
          {
            path: '/order/order-list',
            name: 'OrderList',
            component: () => import('@/views/order/OrderList'),
            meta: { title: '订单列表', keepAlive: true, permission: [ 'admin' ] }
          },
          {
            path: '/order/order-detail',
            name: 'OrderDetail',
            hidden: true,
            component: () => import('@/views/order/OrderDetail'),
            meta: { title: '订单详情', keepAlive: true, permission: [ 'admin' ] }
          },
          {
            path: '/order/alipay',
            name: 'AliPay',
            hidden: true,
            component: () => import('@/views/order/modules/AliPay'),
            meta: { title: '支付', keepAlive: true, permission: [ 'admin' ] }
          }
        ]
      },

      // goods
      {
        path: '/goods',
        redirect: '/goods/goods-list',
        component: PageView,
        meta: { title: '商品中心', icon: 'snippets', permission: [ 'admin' ] },
        children: [
          {
            path: '/goods/add-goods',
            name: 'AddGoods',
            component: () => import('@/views/goods/AddGoods'),
            meta: { title: '添加商品', keepAlive: true, permission: [ 'admin' ] }
          },
          {
            path: '/goods/goods-list',
            name: 'GoodsList',
            component: () => import('@/views/goods/GoodsList'),
            meta: { title: '商品列表', keepAlive: true, permission: [ 'admin' ] }
          },
          {
            path: '/goods/goods-specs',
            name: 'GoodsSpecs',
            hidden: true,
            component: () => import('@/views/goods/GoodsSpecs'),
            meta: { title: '商品规格', keepAlive: true, permission: [ 'admin' ] }
          },
          {
            path: '/goods/add-goods-specs',
            name: 'AddGoodsSpecs',
            hidden: true,
            component: () => import('@/views/goods/modules/AddGoodsSpecs'),
            meta: { title: '添加规格', keepAlive: true, permission: [ 'admin' ] }
          },
          {
            path: '/goods/change-goods-specs',
            name: 'ChangeGoodsSpecs',
            hidden: true,
            component: () => import('@/views/goods/modules/ChangeGoodsSpecs'),
            meta: { title: '修改规格', keepAlive: true, permission: [ 'admin' ] }
          },
          {
            path: '/goods/goods-attribute',
            name: 'GoodsAttribute',
            component: () => import('@/views/goods/GoodsAttribute'),
            meta: { title: '商品属性', keepAlive: true, permission: [ 'admin' ] }
          },
          {
            path: '/goods/change-goods-attribute',
            name: 'ChangeGoodsAttribute',
            hidden: true,
            component: () => import('@/views/goods/modules/ChangeGoodsAttribute'),
            meta: { title: '修改属性', keepAlive: true, permission: [ 'admin' ] }
          },
          {
            path: '/goods/add-goods-attribute',
            name: 'AddGoodsAttribute',
            hidden: true,
            component: () => import('@/views/goods/modules/AddGoodsAttribute'),
            meta: { title: '添加属性', keepAlive: true, permission: [ 'admin' ] }
          },
          {
            path: '/goods/attribute-value',
            name: 'AttributeValueList',
            component: () => import('@/views/goods/AttributeValueList'),
            meta: { title: '属性值', keepAlive: true, permission: [ 'admin' ] }
          },
          {
            path: '/goods/change-attribute-value',
            name: 'ChangeAttributeValue',
            hidden: true,
            component: () => import('@/views/goods/modules/ChangeAttributeValue'),
            meta: { title: '修改属性值', keepAlive: true, permission: [ 'admin' ] }
          },
          {
            path: '/goods/add-attribute-value',
            name: 'AddAttributeValue',
            hidden: true,
            component: () => import('@/views/goods/modules/AddAttributeValue'),
            meta: { title: '添加属性值', keepAlive: true, permission: [ 'admin' ] }
          },
          {
            path: '/goods/goods-detail',
            name: 'GoodsDetail',
            hidden: true,
            component: () => import('@/views/goods/GoodsDetail'),
            meta: { title: '商品详情', keepAlive: true, permission: [ 'admin' ] }
          },
          {
            path: '/goods/change-goods',
            name: 'ChangeGoods',
            hidden: true,
            component: () => import('@/views/goods/ChangeGoods'),
            meta: { title: '编辑商品', keepAlive: true, permission: [ 'admin' ] }
          }
        ]
      },

      // category
      {
        path: '/category',
        redirect: '/category/category-list',
        component: PageView,
        meta: { title: '分类中心', icon: 'tags', permission: [ 'admin' ] },
        children: [
          {
            path: '/category/category-list',
            name: 'CategoryList',
            component: () => import('@/views/category/CategoryList'),
            meta: { title: '分类列表', keepAlive: true, permission: [ 'admin' ] }
          }
        //   {
        //     path: '/category/add-category',
        //     name: 'AddCategory',
        //     component: () => import('@/views/category/AddCategory'),
        //     meta: { title: '添加分类', keepAlive: true, permission: [ 'admin' ] }
        //   },
        //   {
        //     path: '/category/category-detail',
        //     name: 'CategoryDetail',
        //     hidden: true,
        //     component: () => import('@/views/category/CategoryDetail'),
        //     meta: { title: '分类详情', keepAlive: true, permission: [ 'admin' ] }
        //   },
        //   {
        //     path: '/category/change-category',
        //     name: 'ChangeCategory',
        //     hidden: true,
        //     component: () => import('@/views/category/ChangeCategory'),
        //     meta: { title: '编辑分类', keepAlive: true, permission: [ 'admin' ] }
        //   }
        ]
      },

      // madeSoft
      {
        path: '/soft',
        redirect: '/soft/soft-list',
        component: PageView,
        meta: { title: '定制服务', icon: 'apartment', permission: [ 'admin' ] },
        children: [
          {
            path: '/soft/made-soft',
            name: 'MadeSoft',
            hidden: true,
            component: () => import('@/views/madeSoft/PushSoft'),
            meta: { title: '创建需求', keepAlive: true, permission: [ 'admin' ] }
          },
          {
            path: '/soft/soft-list',
            name: 'SoftList',
            component: () => import('@/views/madeSoft/SoftList'),
            meta: { title: '定制列表', keepAlive: true, permission: [ 'admin' ] }
          },
          {
            path: '/soft/soft-detail',
            name: 'SoftDetail',
            hidden: true,
            component: () => import('@/views/madeSoft/SoftDetail'),
            meta: { title: '定制详情', keepAlive: true, permission: [ 'admin' ] }
          }
        ]
      },

      // list
      {
        path: '/list',
        name: 'list',
        component: PageView,
        redirect: '/list/table-list',
        hidden: true,
        meta: { title: '列表页', icon: 'table', permission: [ 'table' ] },
        children: [
          {
            path: '/list/table-list/:pageNo([1-9]\\d*)?',
            name: 'TableListWrapper',
            hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
            component: () => import('@/views/list/TableList'),
            meta: { title: '查询表格', keepAlive: true, permission: [ 'table' ] }
          },
          {
            path: '/list/basic-list',
            name: 'BasicList',
            component: () => import('@/views/list/StandardList'),
            meta: { title: '标准列表', keepAlive: true, permission: [ 'table' ] }
          },
          {
            path: '/list/card',
            name: 'CardList',
            component: () => import('@/views/list/CardList'),
            meta: { title: '卡片列表', keepAlive: true, permission: [ 'table' ] }
          },
          {
            path: '/list/search',
            name: 'SearchList',
            component: () => import('@/views/list/search/SearchLayout'),
            redirect: '/list/search/article',
            meta: { title: '搜索列表', keepAlive: true, permission: [ 'table' ] },
            children: [
              {
                path: '/list/search/article',
                name: 'SearchArticles',
                component: () => import('../views/list/search/Article'),
                meta: { title: '搜索列表（文章）', permission: [ 'table' ] }
              },
              {
                path: '/list/search/project',
                name: 'SearchProjects',
                component: () => import('../views/list/search/Projects'),
                meta: { title: '搜索列表（项目）', permission: [ 'table' ] }
              },
              {
                path: '/list/search/application',
                name: 'SearchApplications',
                component: () => import('../views/list/search/Applications'),
                meta: { title: '搜索列表（应用）', permission: [ 'table' ] }
              }
            ]
          }
        ]
      },

      // profile
      {
        path: '/profile',
        name: 'profile',
        component: RouteView,
        redirect: '/profile/basic',
        hidden: true,
        meta: { title: '详情页', icon: 'profile', permission: [ 'profile' ] },
        children: [
          {
            path: '/profile/basic',
            name: 'ProfileBasic',
            component: () => import('@/views/profile/basic/Index'),
            meta: { title: '基础详情页', permission: [ 'profile' ] }
          },
          {
            path: '/profile/advanced',
            name: 'ProfileAdvanced',
            component: () => import('@/views/profile/advanced/Advanced'),
            meta: { title: '高级详情页', permission: [ 'profile' ] }
          }
        ]
      },

      // Exception
      {
        path: '/exception',
        name: 'exception',
        component: RouteView,
        redirect: '/exception/403',
        hidden: true,
        meta: { title: '异常页', icon: 'warning', permission: [ 'exception' ] },
        children: [
          {
            path: '/exception/403',
            name: 'Exception403',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/403'),
            meta: { title: '403', permission: [ 'exception' ] }
          },
          {
            path: '/exception/404',
            name: 'Exception404',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
            meta: { title: '404', permission: [ 'exception' ] }
          },
          {
            path: '/exception/500',
            name: 'Exception500',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/500'),
            meta: { title: '500', permission: [ 'exception' ] }
          }
        ]
      },

      // account
      {
        path: '/account',
        component: RouteView,
        redirect: '/account/settings',
        name: 'account',
        meta: { title: '个人中心', icon: 'user', keepAlive: true, permission: [ 'user' ] },
        children: [
          {
            path: '/account/settings',
            name: 'settings',
            component: () => import('@/views/account/settings/Index'),
            meta: { title: '个人设置', hideHeader: true, permission: [ 'user' ] },
            redirect: '/account/settings/base',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/account/settings/base',
                name: 'BaseSettings',
                component: () => import('@/views/account/settings/BaseSetting'),
                meta: { title: '修改密码', hidden: true, permission: [ 'user' ] }
              },
              {
                path: '/account/settings/security',
                name: 'SecuritySettings',
                component: () => import('@/views/account/settings/Security'),
                meta: { title: '修改手机号', hidden: true, keepAlive: true, permission: [ 'user' ] }
              },
              {
                path: '/account/settings/custom',
                name: 'CustomSettings',
                component: () => import('@/views/account/settings/Custom'),
                meta: { title: '个性化设置', hidden: true, keepAlive: true, permission: [ 'user' ] }
              },
              {
                path: '/account/settings/binding',
                name: 'BindingSettings',
                component: () => import('@/views/account/settings/Binding'),
                meta: { title: '提现设置', hidden: true, keepAlive: true, permission: [ 'user' ] }
              },
              {
                path: '/account/settings/notification',
                name: 'NotificationSettings',
                component: () => import('@/views/account/settings/Notification'),
                meta: { title: '新消息通知', hidden: true, keepAlive: true, permission: [ 'user' ] }
              }
            ]
          }
        ]
      },

      // forms
      {
        path: '/form',
        redirect: '/form/my-form',
        component: PageView,
        meta: { title: '工单', icon: 'form', permission: [ 'form' ] },
        children: [
          {
            path: '/form/my-form',
            name: 'MyForm',
            component: () => import('@/views/form/myForm/MyForm'),
            meta: { title: '我的工单', keepAlive: true, permission: [ 'form' ] }
          },
          {
            path: '/form/form-detail',
            name: 'FormDetail',
            component: () => import('@/views/form/formDetail/FormDetail'),
            hidden: true,
            meta: { title: '工单详情', keepAlive: true, permission: [ 'form' ] }
          }
        ]
      },

      // news
      {
        path: '/news',
        redirect: '/news/news',
        component: PageView,
        meta: { title: '平台公告', icon: 'bell', permission: [ 'admin' ] },
        children: [
          {
            path: '/news/news',
            name: 'News',
            component: () => import('@/views/news/News'),
            meta: { title: '平台公告', keepAlive: true, permission: [ 'admin' ] }
          },
          {
            path: '/news/add-news',
            name: 'AddNews',
            component: () => import('@/views/news/AddNews'),
            meta: { title: '添加公告', keepAlive: true, permission: [ 'admin' ] }
          },
          {
            path: '/news/news-detail',
            name: 'NewsDetail',
            component: () => import('@/views/news/NewsDetail'),
            hidden: true,
            meta: { title: '公告详情', keepAlive: true, permission: [ 'admin' ] }
          }
        ]
      },

      // mangage setting
      {
        path: '/manage-setting',
        name: 'ManageSetting',
        component: PageView,
        meta: { title: '管理员设置', icon: 'slack', permission: [ 'admin' ] },
        redirect: '/manage-setting/user/user-manage',
        children: [
          {
            path: '/manage-setting/user',
            component: RouteView,
            meta: { title: '管理员管理', icon: 'user', permission: [ 'admin' ] },
            redirect: '/manage-setting/user/user-manage',
            children: [
              {
                path: '/manage-setting/user/user-manage',
                name: 'UserManage',
                component: () => import('@/views/manage-setting/user/UserManage'),
                meta: { title: '管理员列表', keepAlive: true }
              },
              {
                path: '/user/manage-detail',
                name: 'ManageDetail',
                hidden: true,
                component: () => import('@/views/manage-setting/user/ManageDetail'),
                meta: { title: '管理员详情', keepAlive: true }
              }
            ]
          },
          {
            path: '/manage-setting/administrator',
            component: RouteView,
            meta: { title: '管理员日志', icon: 'user', permission: [ 'admin' ] },
            redirect: '/manage-setting/administrator/admin-login',
            children: [
              {
                path: '/manage-setting/administrator/admin-login',
                name: 'AdminLoginLog',
                component: () => import('@/views/manage-setting/administrator/AdminLoginLog'),
                meta: { title: '管理员登录日志', keepAlive: true }
              },
              {
                path: '/manage-setting/administrator/admin-control-log',
                name: 'AdminControlLog',
                component: () => import('@/views/manage-setting/administrator/AdminControlLog'),
                meta: { title: '管理员操作日志', keepAlive: true }
              },
              {
                path: '/manage-setting/administrator/admin-control-log-detail',
                name: 'AdminControlLogDetail',
                hidden: true,
                component: () => import('@/views/manage-setting/administrator/AdminControlLogDetail'),
                meta: { title: '管理员操作日志详情', keepAlive: true }
              }
            ]
          },
          {
            path: '/manage-setting/role',
            component: RouteView,
            meta: { title: '角色管理', icon: 'user', permission: [ 'admin' ] },
            redirect: '/manage-setting/role/role',
            children: [
              {
                path: '/manage-setting/role/role',
                name: 'RoleList',
                component: () => import('@/views/manage-setting/role/RoleList'),
                meta: { title: '角色管理', keepAlive: true }
              }
            ]
          }
        ]
      },

      // system base setting
      {
        path: '/system',
        redirect: '/system/base-setting',
        component: PageView,
        meta: { title: '系统配置', icon: 'setting', permission: [ 'admin' ] },
        children: [
          {
            path: '/system/base-setting',
            name: 'BaseSetting',
            component: () => import('@/views/system/BaseSetting'),
            meta: { title: '基本设置', keepAlive: true, permission: [ 'admin' ] }
          },
          {
            path: '/system/sys-code',
            name: 'SysCode',
            component: () => import('@/views/system/SysCode'),
            meta: { title: '短信配置', keepAlive: true, permission: [ 'admin' ] }
          },
          {
            path: '/system/pay-setting',
            name: 'PaySetting',
            component: () => import('@/views/system/PaySetting'),
            meta: { title: '支付配置', keepAlive: true, permission: [ 'admin' ] }
          },
          {
            path: '/system/sliderimg-setting',
            name: 'SliderImg',
            component: () => import('@/views/system/SliderImg'),
            meta: { title: '轮播图配置', keepAlive: true, permission: [ 'admin' ] }
          },
          {
            path: '/system/teach-list',
            name: 'TeachList',
            component: () => import('@/views/system/TeachList'),
            meta: { title: '教程配置', keepAlive: true, permission: [ 'admin' ] }
          },
          {
            path: '/system/change-teach',
            name: 'ChangeTeach',
            hidden: true,
            component: () => import('@/views/system/ChangeTeach'),
            meta: { title: '修改教程', keepAlive: true, permission: [ 'admin' ] }
          },
          {
            path: '/system/add-teach',
            name: 'AddTeach',
            hidden: true,
            component: () => import('@/views/system/AddTeach'),
            meta: { title: '添加教程', keepAlive: true, permission: [ 'admin' ] }
          },
          {
            path: '/system/teach-category',
            name: 'TeachCategory',
            component: () => import('@/views/system/TeachCategory'),
            meta: { title: '教程分类', keepAlive: true, permission: [ 'admin' ] }
          },
          {
            path: '/system/menu',
            name: 'Menu',
            component: () => import('@/views/system/Menu'),
            meta: { title: '菜单', keepAlive: true, permission: [ 'admin' ] }
          }
        ]
      }
    ]
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      },
      {
        path: 'forget-pwd',
        name: 'forgetPwd',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/ForgetPwd')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },
  {
    path: '/test',
    component: BlankLayout,
    redirect: '/test/home',
    children: [
      {
        path: 'home',
        name: 'TestHome',
        component: () => import('@/views/Home')
      }
    ]
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }

]
