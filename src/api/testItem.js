import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/testItem/add',
    method: 'post',
    data
  })
}

export function del(id, itemId) {
  return request({
    url: 'api/testItem/del/' + id + '/' + itemId,
    method: 'get'
  })
}

export function edit(data) {
  return request({
    url: 'api/testItem/edit',
    method: 'post',
    data
  })
}

export function query(data) {
  return request({
    url: 'api/testItem/qry',
    method: 'post',
    data
  })
}
