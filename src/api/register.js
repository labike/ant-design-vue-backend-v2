import { axios } from '@/utils/request'
import api from './index'
import qs from 'qs'

/**
 * register
 */

export function register (params) {
  return axios({
    url: api.Register,
    method: 'post',
    data: qs.stringify(params)
  })
}
