import api from './index'
import { axios } from '@/utils/request'
import qs from 'qs'

/**
 * user center api
 */
export function changePwd (parameter) {
  return axios({
    url: api.UpdatePwd,
    method: 'put',
    data: qs.stringify(parameter)
  })
}

export function changePhone (parameter) {
  return axios({
    url: api.UpdatePhone,
    method: 'put',
    data: qs.stringify(parameter)
  })
}

export function usersNum () {
  return axios({
    url: api.GetUsersNum,
    method: 'get'
  })
}

export function orderNum () {
  return axios({
    url: api.GetOrderNum,
    method: 'get'
  })
}

export function userTrend (parameter) {
  return axios({
    url: api.GetUserTrend,
    method: 'get',
    parameter
  })
}

// shopper
export function shopperList (params) {
  return axios({
    url: api.ShopperList,
    method: 'get',
    params
  })
}

export function shopperDetail (parameter) {
  return axios({
    url: api.ShopperDetail + parameter,
    method: 'get'
  })
}

export function changeUserInfo (parameter) {
  return axios({
    url: api.ChangeUserInfo,
    method: 'put',
    data: qs.stringify(parameter)
  })
}

// 删除会员
export function deleteShopper (parameter) {
  return axios({
    url: api.DeleteShopper + parameter,
    method: 'delete'
  })
}

// 商户登录日志
export function loginLog (params) {
  return axios({
    url: api.LoginLog,
    method: 'get',
    params
  })
}

// 管理员列表
export function manageUser (params) {
  return axios({
    url: api.ManageUser,
    method: 'get',
    params
  })
}

export function addManage (params) {
  return axios({
    url: api.AddManage,
    method: 'post',
    data: qs.stringify(params)
  })
}

export function chanageManage (params) {
  return axios({
    url: api.ChanageManage,
    method: 'put',
    data: qs.stringify(params)
  })
}

export function detailManage (params) {
  return axios({
    url: api.DetailManage + params,
    method: 'get'
  })
}

export function deleteManage (params) {
  return axios({
    url: api.DeleteManage + params,
    method: 'delete'
  })
}

// 角色
export function getRole (params) {
  return axios({
    url: api.Role,
    method: 'get',
    params
  })
}

export function selectRole () {
  return axios({
    url: api.RoleList,
    method: 'get'
  })
}

// 管理员登录日志
export function adminLoginLog (params) {
  return axios({
    url: api.AdminLoginLog,
    method: 'get',
    params
  })
}

// 管理员操作日志
export function adminControlLog (params) {
  return axios({
    url: api.AdminControlLog,
    method: 'get',
    params
  })
}

// 操作日志详情
export function detailLog (params) {
  return axios({
    url: api.DetailLog + params,
    method: 'get'
  })
}

// 商户资金明细
export function shopperSalary (params) {
  return axios({
    url: api.ShopperSalary,
    method: 'get',
    params
  })
}

export function changeManagePwd (params) {
  return axios({
    url: api.changeManagePwd,
    method: 'put',
    data: qs.stringify(params)
  })
}

// 最近订单记录
export function newOrders () {
  return axios({
    url: api.NewOrder,
    method: 'get'
  })
}
