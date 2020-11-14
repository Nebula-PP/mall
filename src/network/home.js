import {request} from './request'

//home页面的网络请求
export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

//home页面商品数据的网络请求
export function getHomeGoodsdata(type,page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}