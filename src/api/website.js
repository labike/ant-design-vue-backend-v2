import { axios } from '@/utils/request'
import api from './index'
import qs from 'qs'

/**
 * assist
 */
export function webInfo (params) {
  return axios({
    url: api.WebInfo,
    method: 'get',
    params
  })
}

export function webDetail () {
  return axios({
    url: api.WebDetail + '1',
    method: 'get'
  })
}

export function changeWebInfo (params) {
  return axios({
    url: api.ChangeWebInfo,
    method: 'put',
    data: qs.stringify(params)
  })
}

export function addWebInfo (params) {
  return axios({
    url: api.AddWebInfo,
    method: 'post',
    data: qs.stringify(params)
  })
}

export function deleteWebInfo (params) {
  return axios({
    url: api.DeleteWebInfo + params,
    method: 'delete'
  })
}
