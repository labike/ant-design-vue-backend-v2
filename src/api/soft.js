import api from './index'
import { axios } from '@/utils/request'
import qs from 'qs'

export function madeSoft (parameter) {
  return axios({
    url: api.MadeSoft,
    method: 'post',
    data: qs.stringify(parameter)
  })
}

export function getSoftList (params) {
  return axios({
    url: api.GetSoftList,
    method: 'get',
    params
  })
}

export function getSoftDetail (params) {
  return axios({
    url: api.GetSoftDetail + params,
    method: 'get'
  })
}

export function deleteSoft (params) {
  return axios({
    url: api.DeleteSoft + params,
    method: 'delete'
  })
}

export function changeSoft (parameter) {
  return axios({
    // url: api.ChangeSoft + parameter.id + `?content=${parameter.content}`,
    url: api.ChangeSoft,
    method: 'put',
    data: qs.stringify(parameter)
  })
}
