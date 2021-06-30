import request from '../utils/request'

export const getCart = () => {
  return request({
    method: 'GET',
    url: '/shop-cart'
  })
}

export const modifyCart = params => {
  return request({
    method: 'PUT',
    url: '/shop-cart',
    data: params
  })
}

export const deleteCart = id => {
  return request({
    method: 'delete',
    url: '/shop-cart/' + id
  })
}
