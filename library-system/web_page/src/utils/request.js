import axios from 'axios'

const request = axios.create({
  baseURL: 'http://localhost:3000/'
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  try {
    var user = JSON.parse(window.localStorage.getItem('user'))
  } catch (err) {
    return config
  }
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

export default request
