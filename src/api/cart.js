import request from '../utils/request'

export const getCart = () => {
  return request({
    method: 'GET',
    url: '/shop-cart'
  })
}
