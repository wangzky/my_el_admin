import request from '@/utils/request'

/* 班级*/
export function getClasss(pid) {
  return request({
    url: 'api/stuMember/getClasss/' + pid,
    method: 'get'
  })
}
/* 年级*/
export function getGrades() {
  return request({
    url: 'api/stuMember/getGrades',
    method: 'get'
  })
}

export function getStuMember(params) {
  return request({
    url: 'api/stuMember',
    method: 'get',
    params
  })
}

export function add(data) {
  return request({
    url: 'api/stuMember',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/stuMember/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/stuMember',
    method: 'put',
    data
  })
}
