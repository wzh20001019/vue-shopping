import axios from 'axios'

// import NProgress from 'nprogress'
// import { ToastLoadingStart, ToastLoadingEnd } from './toastLoading'

// axios.defaults.withCredentials = true
// axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
// axios.defaults.headers['token'] = localStorage.getItem('token') || ''
// axios.defaults.headers.post['Content-Type'] = 'application/json'

const request = axios.create({
  baseURL: 'http://backend-api-01.newbee.ltd/api/v1',
  withCredentials: true,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    token: localStorage.getItem('token') || '',

    post: {
      'Content-Type': 'application/json'
    }
  },
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
