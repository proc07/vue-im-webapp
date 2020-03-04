import axios from 'axios'
import store from '@/store'
import { getToken } from './token'
import { Toast, Dialog } from 'cube-ui'
import router from '@/router'

// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: process.env.VUE_APP_ROUTER_BASE_API,
  timeout: 5000
})

// Alter defaults after instance has been created
instance.defaults.headers.common['Authorization'] = getToken()

// Add a request interceptor
instance.interceptors.request.use(function (config) {
  if (!config.headers.Authorization) {
    config.headers.Authorization = getToken()
  }
  // Do something before request is sent
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
instance.interceptors.response.use(function (response) {
  // Do something with response data
  const res = response.data
  if (res.status === 0) {
    Toast.$create({
      txt: res.message,
      type: 'error',
      time: 3000
    }).show()
    return Promise.reject(res)
  } else if (res.status === -1) {
    Dialog.$create({
      title: '您已被登出，请重新登录',
      icon: 'cubeic-important',
      confirmBtn: {
        text: '重新登录',
        active: true
      },
      type: 'alert',
      onConfirm () {
        store.dispatch('LogOut').then(() => {
          // window.location.reload()
          router.replace('/login')
        })
      }
    }).show()
    return Promise.reject(res)
  } else {
    return res
  }
}, function (error) {
  // Do something with response error
  Toast.$create({
    txt: '网络错误，请重试！',
    type: 'error',
    time: 3000
  }).show()
  console.error(error)
  // return Promise.reject(error)
})

export default instance
