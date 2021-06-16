import request from '../utils/request'

export const getGoodData = id => {
  return request({
    method: 'GET',
    url: '/goods/detail/' + id
  })
}
