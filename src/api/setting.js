import { axios } from '@/utils/request'
import api from './index'
import qs from 'qs'

/**
 * category
 */
export function sysCode (params) {
  return axios({
    url: api.SysCode,
    method: 'get',
    params
  })
}

export function addConfig (params) {
  return axios({
    url: api.AddConfig,
    method: 'post',
    data: qs.stringify(params)
  })
}

export function changeConfig (params) {
  return axios({
    url: api.ChangeConfig,
    method: 'put',
    data: qs.stringify(params)
  })
}

export function dedtailConfig (params) {
  return axios({
    url: api.DetailManage,
    method: 'get',
    params
  })
}

export function deleteConfig (params) {
  return axios({
    url: api.DeleteConfig + params,
    method: 'delete'
  })
}

// slider
export function sliderImg (params) {
  return axios({
    url: api.SliderImg,
    method: 'get',
    params
  })
}

export function addSlider (params) {
  return axios({
    url: api.AddAd,
    method: 'post',
    data: qs.stringify(params)
  })
}

export function changeSlider (params) {
  return axios({
    url: api.ChangeAd,
    method: 'put',
    data: qs.stringify(params)
  })
}

export function deleteSlider (params) {
  return axios({
    url: api.DeleteAd + params,
    method: 'delete'
  })
}

// course
export function courseList (params) {
  return axios({
    url: api.CourseList,
    method: 'get',
    params
  })
}

export function addCourse (params) {
  return axios({
    url: api.AddCourse,
    method: 'post',
    data: qs.stringify(params)
  })
}

export function changeCourse (params) {
  return axios({
    url: api.ChangeCourse,
    method: 'put',
    data: qs.stringify(params)
  })
}

export function deleteCourse (params) {
  return axios({
    url: api.DeleteCourse + params,
    method: 'delete'
  })
}

export function detailCourse (params) {
  return axios({
    url: api.DetailCourse + params,
    method: 'get'
  })
}

// 教程分类
export function courseCate (params) {
  return axios({
    url: api.CourseCate,
    method: 'get'
  })
}

export function addCourseCate (params) {
  return axios({
    url: api.AddCourseCate,
    method: 'post',
    data: qs.stringify(params)
  })
}

export function changeCourseCate (params) {
  return axios({
    url: api.ChangeCourseCate,
    method: 'put',
    data: qs.stringify(params)
  })
}

export function deleteCourseCate (params) {
  return axios({
    url: api.DeleteCourseCate + params,
    method: 'delete'
  })
}
