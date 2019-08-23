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
      component: () => import('./views/Login.vue')
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: () => import('./views/SignIn.vue')
    },
    {
      path: '/layout',
      redirect: '/layout/home',
      name: 'Layout',
      component: () => import('./views/Layout.vue'),
      children: [
        {
          path: 'home',
          name: 'Home',
          component: () => import('./views/Home.vue'),
          meta: {
            fixedTabs: true
          }
        },
        {
          path: 'contacts',
          name: 'Contacts',
          component: () => import('./views/Contacts.vue'),
          meta: {
            fixedTabs: true
          }
        },
        {
          path: 'user',
          name: 'User',
          component: () => import('./views/User.vue'),
          meta: {
            fixedTabs: true
          }
        },
        {
          path: 'chat/:id',
          name: 'Chat',
          component: () => import('./views/Chat.vue')
        },
        {
          path: 'chatGroup/:id',
          name: '',
          component: () => import('./views/ChatGroup.vue')
        }
      ]
    }
  ]
})
