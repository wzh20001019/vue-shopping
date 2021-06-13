import request from '@/utils/request.js'

export const getCateGory = back => {
  back && back()
  return request({
    method: 'GET',
    url: '/categories'
  })
}
