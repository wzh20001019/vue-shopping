import axios from 'axios'
import { Toast } from 'vant'
import router from '@/router'
// import store from '../store/index'

// import NProgress from 'nprogress'
// import { ToastLoadingStart, ToastLoadingEnd } from './toastLoading'

axios.defaults.withCredentials = true
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.token = localStorage.getItem('token') || ''
axios.defaults.headers.post['Content-Type'] = 'application/json'

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
  res => {
    if (typeof res.data !== 'object') {
      Toast.fail('服务端异常！')
      return Promise.reject(res)
    }
    if (res.data.resultCode !== 200) {
      if (res.data.message) Toast.fail(res.data.message)

      if (res.data.resultCode === 416) {
        router.push({ path: '/login' })
      }
      return Promise.reject(res.data)
    }

    return res
  },
  err => {
    return Promise.reject(err)
  }
)

// 共享request实例
export default request
