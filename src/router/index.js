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
      component: () => import('@/views/layout.vue'),
      children: [
        {
          path: 'home',
          name: 'Home',
          component: () => import('@/views/tabs/home.vue'),
          meta: {
            fixedTabs: true
          }
        },
        {
          path: 'contacts',
          name: 'Contacts',
          component: () => import('@/views/tabs/contacts.vue'),
          meta: {
            fixedTabs: true
          }
        },
        {
          path: 'me',
          name: 'Me',
          component: () => import('@/views/tabs/me.vue'),
          meta: {
            fixedTabs: true
          }
        },
        {
          path: '/single-chat/:id',
          name: 'SingleChat',
          component: () => import('@/views/chat/single.vue')
        },
        {
          path: '/group-chat/:id',
          name: 'GroupChat',
          component: () => import('@/views/chat/group.vue')
        },
        {
          path: '/user-details/:id',
          name: 'UserDetails',
          component: () => import('@/views/user/details.vue')
        },
        {
          path: '/system-notify',
          name: 'SystemNotify',
          component: () => import('@/views/chat/system.vue')
        },
        {
          path: '/create-group',
          name: 'CreateGroup',
          component: () => import('@/views/user/create-group.vue')
        }
      ]
    }
  ]
})
