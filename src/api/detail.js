import request from '../utils/request'

export const getGoodData = id => {
  return request({
    method: 'GET',
    url: '/goods/detail/' + id
  })
}

export const addCart = params => {
  return request({
    method: 'POST',
    url: '/shop-cart',
    data: params
  })
}
