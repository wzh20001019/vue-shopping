import request from '@/utils/request'

export const login = params => {
  return request({
    method: 'POST',
    url: '/user/login',
    data: params
  })
}

export const register = params => {
  return request({
    method: 'POST',
    url: '/user/register',
    data: params
  })
}
