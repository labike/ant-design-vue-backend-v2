import { axios } from '@/utils/request'
import api from './index'
import qs from 'qs'

/**
 * menu
 */
export function menuList () {
  return axios({
    url: api.MenuList,
    method: 'get'
  })
}

export function addMenu (params) {
  return axios({
    url: api.AddMenu,
    method: 'post',
    data: qs.stringify(params)
  })
}

export function changeMenu (params) {
  return axios({
    url: api.ChangeMenu,
    method: 'put',
    data: qs.stringify(params)
  })
}

export function deleteMenu (params) {
  return axios({
    url: api.DeleteMenu + params,
    method: 'delete'
  })
}

export function detailMenu (params) {
  return axios({
    url: api.DetailMenu + params,
    method: 'get'
  })
}
