import axios from 'axios'

// import NProgress from 'nprogress'
// import { ToastLoadingStart, ToastLoadingEnd } from './toastLoading'

const request = axios.create({
  baseURL: 'http://backend-api-01.newbee.ltd/api/v1',
  timeout: 5000
})

// 请求拦截
request.interceptors.request.use(
  config => {
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// 响应拦截
request.interceptors.response.use(
  results => {
    return results
  },
  err => {
    return Promise.reject(err)
  }
)

// 共享request实例
export default request
