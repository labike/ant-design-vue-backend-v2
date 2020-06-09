import { axios } from '@/utils/request'
import api from './index'
import qs from 'qs'

/**
 * assist
 */
export function goodsList (params) {
  return axios({
    url: api.ProductList,
    method: 'get',
    params
  })
}

export function goodsDetail (params) {
    return axios({
        url: api.ProductDetail + params,
        method: 'get'
    })
}

export function addGoods (params) {
    return axios({
        url: api.ProductDetail,
        method: 'post',
        data: qs.stringify(params)
    })
}

export function deleteGoods (params) {
    return axios({
        url: api.DeleteProduct + params,
        method: 'delete'
    })
}

export function changeGoods (params) {
    return axios({
        url: api.ChangeProduct,
        method: 'put',
        data: qs.stringify(params)
    })
}

// 属性
export function goodsAttribute (params) {
    return axios({
        url: api.AttributeList,
        method: 'get',
        params
    })
}

export function addGoodsAttribute (params) {
    return axios({
        url: api.AddAttribute,
        method: 'post',
        data: qs.stringify(params)
    })
}

export function changeGoodsAttribute (params) {
    return axios({
        url: api.ChangeAttribute,
        method: 'put',
        data: qs.stringify(params)
    })
}

export function deleteGoodsAttribute (params) {
    return axios({
        url: api.DeleteAttribute + params,
        method: 'delete'
    })
}

export function detailGoodsAttribute (params) {
    return axios({
        url: api.DetailAttribute + params,
        method: 'get'
    })
}

// 属性值列表
export function attributeValList (params) {
    return axios({
        url: api.AttributeValList,
        method: 'get',
        params
    })
}

export function addAttributeValue (params) {
    return axios({
        url: api.AddAttributeValue,
        method: 'post',
        data: qs.stringify(params)
    })
}

export function changeAttributeValue (params) {
    return axios({
        url: api.ChangeAttributeValue,
        method: 'put',
        data: qs.stringify(params)
    })
}

export function deleteAttributeValue (params) {
    return axios({
        url: api.DeleteAttributeValue + params,
        method: 'delete'
    })
}

export function detailAttributeValue (params) {
    return axios({
        url: api.DetailAttributeValue + params,
        method: 'get'
    })
}

// 规格
export function goodsSpecs (params) {
    return axios({
        url: api.GoodsSpces,
        method: 'get',
        params
    })
}

export function addGoodsSpecs (params) {
    return axios({
        url: api.AddGoodsSpecs,
        method: 'post',
        data: qs.stringify(params)
    })
}

export function changeGoodsSpecs (params) {
    return axios({
        url: api.ChangeGoodsSpecs,
        method: 'put',
        data: qs.stringify(params)
    })
}

export function deleteGoodsSpecs (params) {
    return axios({
        url: api.DeleteGoodsSpecs + params,
        method: 'delete'
    })
}

export function detailGoodsSpecs (params) {
    return axios({
        url: api.DetailGoodsSpecs + params,
        method: 'get'
    })
}
