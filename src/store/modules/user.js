import { nodeApiList } from '@/request'
import { getToken, setToken, removeToken } from '@/assets/js/token'

const user = {
  // namespaced: true,
  state: {
    token: getToken(),
    userInfo: {}
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
      setToken(token)
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    }
  },
  actions: {
    GetUserInfo ({ commit }) {
      return new Promise((resolve) => {
        nodeApiList.user.GetUserInfo().then(res => {
          commit('SET_USERINFO', res.data)
          resolve(res)
        })
      })
    },
    LogIn ({ commit }, { account, password }) {
      return new Promise((resolve) => {
        nodeApiList.user.Login({
          account,
          password
        }).then(res => {
          commit('SET_TOKEN', res.data.jwt_token)
          commit('SET_USERINFO', res.data.user)
          resolve(res)
        })
      })
    },
    LogOut ({ commit }) {
      return new Promise(resolve => {
        // nodeApiList.user.Logout().then(res => {
        commit('SET_TOKEN', '')
        commit('SET_USERINFO', {})
        removeToken()
        resolve()
        // })
      })
    }
  }
}

export default user
