import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './cube-ui'
import './svg-icon'
import './permission'
import { nodeApiList } from './request'
import ChatSocket from './assets/js/socket'

// import Cloudinary from 'cloudinary-vue'
// Vue.use(Cloudinary, {
//   configuration: {
//     cloudName: 'zhangli-blog',
//     api_key: '972944844116738',
//     api_secret: 'mNo472jpJGDw2WUKYkwZYj3-tVI'
//   }
// })

// 多域名接口下需要拆分
Vue.prototype.$nodeApi = nodeApiList
// socket.io
Vue.prototype.$chatSocket = new ChatSocket()

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
