import request from '@/utils/request'

export const getAddress = id => {
  return request({
    method: 'GET',
    url: '/address/' + id
  })
}
export const getDefaultAddress = () => {
  return request({
    method: 'GET',
    url: '/address/default'
  })
}
