import request from './request'

// import qs from 'qs'
// export function login (obj) {
//   return request({
//     url: 'login',
//     method: 'post',
//     data: qs.stringify(obj)
//   })
// }
// export function getUser (params) {
//   return request({
//     url: 'users',
//     method: 'get',
//     params
//   })
// }
export function login (obj) {
    return request({
      url: '/login.json',
      method: 'get',
    })
}

export function getUserRouteData (obj) {
  return request({
    url: '/userRouteData.json',
    method: 'get',
  })
}

export function getEcharts (obj) {
  return request({
    url: '/getEcharts.json',
    method: 'get',
  })
}