import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import user from './modules/user'
import data from './modules/data'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    user,
    data
  },
  getters
})
