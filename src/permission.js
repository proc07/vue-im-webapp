import router from './router'
import store from './store'
import { getToken } from './assets/js/token'

const CHAT_PAGES = {
  SingleChat: true,
  GroupChat: true
}

router.beforeEach((to, from, next) => {
  if (getToken()) {
    const { userInfo } = store.getters
    if (!userInfo.id) {
      // 获取用户信息
      store.dispatch('GetUserInfo').then(res => {
        console.log(res)
      })
    }

    // 检测是否进入聊天对话界面
    const roomId = CHAT_PAGES[to.name] ? to.params.id : null
    store.commit('SET_CUR_CHAT_ROOM', roomId)

    if (to.meta.noToken) {
      // token 存在，不能进入登录和注册页面
      next('/layout/home')
    } else {
      next()
    }
  } else {
    if (to.meta.noToken) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})
