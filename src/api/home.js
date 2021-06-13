import request from '@/utils/request'

export const getHomeData = () => {
  return request({
    method: 'GET',
    url: '/index-infos'
  })
}
