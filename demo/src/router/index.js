import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import home from '@/components/home'
import details from '@/components/details'
import addData from '@/components/addData'
import zhuanlan from '@/components/zhuanlan/view'
import common from '@/components/common'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path:'/common',
      name:'common',
      component:common
    },
    {
     path:'/zhuanlan',
     name:'zhuanlan',
     component:zhuanlan
    },
    {
    	path:'/home',
    	name:'home',
    	component:home
    },
    {
      path:'/details/:id',
      name:'details',
      component:details
    },
   {
     path:'/addData',
     name:'addData',
     component:addData
   },
 
   
  ]
})
