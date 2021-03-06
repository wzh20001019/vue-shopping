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

export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/user/info'
  })
}

export const editUserInfo = params => {
  return request({
    method: 'PUT',
    url: '/user/info',
    data: params
  })
}

export const logout = () => {
  return request({
    method: 'POST',
    url: '/user/logout'
  })
}
