import api from './index'
import { axios } from '@/utils/request'
// import qs from 'qs'

export function getOrderList (params) {
  return axios({
    url: api.OrderList,
    method: 'get',
    params
  })
}

export function orderDetail (params) {
  return axios({
    url: api.OrderDetail + params,
    method: 'get'
  })
}

export function deleteOrder (params) {
  return axios({
    url: api.DeleteOrder + params,
    method: 'delete'
  })
}

export function getProduct (params) {
  return axios({
    url: api.GetProduct,
    method: 'get',
    params
  })
}

export function getProductDetail (params) {
  return axios({
    url: api.ProductDetail + `${params}`,
    method: 'get'
  })
}

export function pay (params) {
  return axios({
    url: api.Pay,
    method: 'get',
    params
  })
}

export function orderChart (params) {
  return axios({
    url: api.OrderChart,
    method: 'get',
    params
  })
}
