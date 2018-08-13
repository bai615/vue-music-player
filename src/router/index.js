import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import SinglePageMusic from '@/components/SinglePageMusic'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'SinglePageMusic',
      component: SinglePageMusic
    },
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
