import { axios } from '@/utils/request'
import api from './index'
import qs from 'qs'

/**
 * category
 */
export function categoryList (params) {
  return axios({
    url: api.CategoryList,
    method: 'get',
    params
  })
}

export function addCategory (params) {
  return axios({
    url: api.AddCategory,
    method: 'post',
    data: qs.stringify(params)
  })
}

export function changeCategory (params) {
  return axios({
    url: api.ChangeCategory,
    method: 'put',
    data: qs.stringify(params)
  })
}

export function categoryDetail (params) {
  return axios({
    url: api.CategoryDetail + params,
    method: 'get'
  })
}

export function deleteCategory (params) {
  return axios({
    url: api.DeleteCategory + params,
    method: 'delete'
  })
}
