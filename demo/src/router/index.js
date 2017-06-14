import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import home from '@/components/home'
import details from '@/components/details'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
    	path:'/home',
    	name:'home',
    	component:home
    },
    {
      path:'/details',
      name:'details',
      component:details
    }
   
  ]
})
