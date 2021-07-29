import request from '@/utils/request'

export const addAddress = params => {
  return request({
    method: 'POST',
    url: '/address',
    data: params
  })
}

export const EditAddress = params => {
  return request({
    method: 'PUT',
    url: '/address',
    data: params
  })
}

export const DeleteAddress = id => {
  return request({
    method: 'DELETE',
    url: `/address/${id}`
  })
}

export const getAddress = id => {
  return request({
    method: 'GET',
    url: `/address/${id}`
  })
}

export const getDefaultAddress = () => {
  return request({
    method: 'GET',
    url: '/address/default'
  })
}

export const getAddressList = () => {
  return request({
    method: 'GET',
    url: '/address',
    data: {
      pageNumber: 1,
      pageSize: 1000
    }
  })
}
