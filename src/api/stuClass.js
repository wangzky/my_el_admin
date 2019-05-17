import request from '@/utils/request'

export function getDepts(params) {
  return request({
    url: 'api/stuClass',
    method: 'get',
    params
  })
}

export function add(data) {
  return request({
    url: 'api/stuClass',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/stuClass/del/' + id,
    method: 'get'
  })
}

export function edit(data) {
  return request({
    url: 'api/stuClass',
    method: 'put',
    data
  })
}

export function getStuClasssById(id) {
  return request({
    url: 'api/stuClass/getStuClasss/' + id,
    method: 'get'
  })
}
