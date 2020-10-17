import {request} from './request'

//home页面的网络请求
export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}