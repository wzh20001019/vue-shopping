import request from '@/utils/request'

export const createOrder = params => {
  return request({
    method: 'POST',
    url: '/saveOrder',
    data: params
  })
}

export const getOrderList = params => {
  return request.get('/order', { params })
}

export const payOrder = params => {
  return request.get('/paySuccess', { params })
}
