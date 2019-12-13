import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login/index.vue'),
      meta: {
        noToken: true
      }
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: () => import('@/views/signIn/index.vue'),
      meta: {
        noToken: true
      }
    },
    {
      path: '/layout',
      redirect: '/layout/home',
      name: 'Layout',
      component: () => import('@/views/layout/index.vue'),
      children: [
        {
          path: 'home',
          name: 'Home',
          component: () => import('@/views/chat/home.vue'),
          meta: {
            fixedTabs: true
          }
        },
        {
          path: 'contacts',
          name: 'Contacts',
          component: () => import('@/views/chat/contacts.vue'),
          meta: {
            fixedTabs: true
          }
        },
        {
          path: 'user',
          name: 'User',
          component: () => import('@/views/chat/user.vue'),
          meta: {
            fixedTabs: true
          }
        },
        {
          path: 'singleChat/:id',
          name: 'SingleChat',
          component: () => import('@/views/chat/singleChat.vue')
        },
        {
          path: 'groupChat/:id',
          name: 'GroupChat',
          component: () => import('@/views/chat/groupChat.vue')
        }
      ]
    }
  ]
})
