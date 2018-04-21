import Vue from 'vue'
import Router from 'vue-router'

import Posts from '@/components/Posts'
import NewPost from '@/components/NewPost'
import EditPost from '@/components/EditPost'
import PrizeDescription from '@/components/PrizeDescription'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      name: 'Prizes',
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
    }
  ]
})
