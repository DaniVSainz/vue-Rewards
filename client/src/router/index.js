import Vue from 'vue'
import Router from 'vue-router'

import Posts from '@/components/Posts'
import NewPost from '@/components/NewPost'
import EditPost from '@/components/EditPost'
import PrizeDescription from '@/components/PrizeDescription'
import Login from '@/components/Login'
import Register from '@/components/Register'
import EmailVerification from '@/components/EmailVerification'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      name: 'RedirectToPrizes',
      component: Posts
    },
    {
      path: '/posts',
      name: 'Prizes',
      component: Posts
    },
    {
      path: '/posts/new',
      name: 'NewPost',
      component: NewPost
    },
    {
      path: '/posts/:id',
      name: 'EditPost',
      component: EditPost
    },
    {
      path: '/prizes/:id',
      name: 'PrizeDescription',
      component: PrizeDescription
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/emailVerification/:token',
      name: 'EmailVerification',
      component: EmailVerification
    }
  ]
})
