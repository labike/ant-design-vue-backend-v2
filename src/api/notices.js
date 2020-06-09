import api from './index'
import { axios } from '@/utils/request'
import qs from 'qs'

export function getNotices (params) {
  return axios({
    url: api.GetNotices,
    method: 'get',
    params
  })
}

export function noticesDetail (params) {
  return axios({
    url: api.NoticesDetail + params + `?id=${params}`,
    method: 'get'
  })
}

export function changeNotice (params) {
  return axios({
    url: api.ChangeNotice,
    method: 'put',
    data: qs.stringify(params)
  })
}

export function deleteNotice (params) {
  return axios({
    url: api.DeleteNotice + params,
    method: 'delete'
  })
}

export function addNotice (params) {
  return axios({
    url: api.AddNotice,
    method: 'post',
    data: qs.stringify(params)
  })
}
