import { axios } from '@/utils/request'
import api from './index'
import qs from 'qs'

/**
 * assist
 */
export function getAssistList (params) {
  return axios({
    url: api.AssistList,
    method: 'get',
    params
  })
}

/**
 * create assist
 */
export function createAssist (params) {
  console.log(params)
  return axios({
    url: api.CreateAssist,
    method: 'post',
    data: qs.stringify(params)
  })
}

/**
 * assist detail
 */
export function assistDetail (params) {
  return axios({
    url: api.DetailAssist + params,
    method: 'get'
  })
}

export function deleteAssist (params) {
  return axios({
    url: api.DetailAssist + params,
    method: 'delete'
  })
}

export function replyAssist (parameter) {
  return axios({
    // + `${params.id}` + `&answer=${params.answer}` + `&detail_id=${params.detail_id}`
    url: api.DetailAssist,
    method: 'put',
    data: qs.stringify(parameter)
  })
}
