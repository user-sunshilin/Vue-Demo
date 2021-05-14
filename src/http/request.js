import Axios from 'axios'

// 创建axios实例
const service = Axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 3000
})

// 请求拦截
service.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
}, _error => {
  return Promise.reject('请求出错，请检查')
})

// 响应拦截
service.interceptors.response.use(res => {
  if(res.data.data.code == 10010 || res.data.data.code == 10011)
  {
    // 删除或者不删除token，反正后期都会给覆盖
    this.$router.replace("/login")
  }
  else if(res.data.data.token)
  {
    localStorage.setItem("token",res.data.data.token)
  }
  return res
}, error => {
  return Promise.reject('出错啦', error)
})

export default service