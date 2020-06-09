import api from './index'
import { axios } from '@/utils/request'
import qs from 'qs'

export function getRole () {
  return axios({
    url: api.Role,
    method: 'get'
  })
}

export function addRole (params) {
  return axios({
    url: api.AddRole,
    method: 'post',
    data: qs.stringify(params)
  })
}

export function deleteRole (params) {
  return axios({
    url: api.deleteRole + params,
    method: 'delete'
  })
}

export function changeRole (params) {
  return axios({
    url: api.ChangeRole,
    method: 'put',
    data: qs.stringify(params)
  })
}

export function roleAccess (params) {
  return axios({
    url: api.RoleAccess,
    method: 'get',
    params
  })
}

export function pushAccess (params) {
  return axios({
    url: api.PushAccess,
    method: 'post',
    data: qs.stringify(params)
  })
}

export function deleteHasRole (params) {
  return axios({
    url: api.DeleteHasRole,
    method: 'post',
    data: qs.stringify(params)
  })
}
