import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import details from '@/components/details'
import addData from '@/components/addData'
//home
import home from '@/components/home/view'
import zhuanlan from '@/components/zhuanlan/view'
import common from '@/components/common'
import label from '@/components/label/view'
import find from '@/components/find/view'
import collect from '@/components/collect/view'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    //公共的部分
    {
      path:'/common',
      name:'common',
      component:common
    },
    //添加文章
    {
      path:'/add',
      name:'add',
      component:addData
    },
    //部分组件 
    {
    	path:'/home/home',//首页
    	name:'home',
    	component:home
    },
    {//首页的我的关注和前端 这两个大类下面有分给三个热门 最新 评论
      path:'/home/hn/:id',
      name:'ho',
      component:home
    },
    {
     path:'/home/zhuanlan',//专栏
     name:'zhuanlan',
     component:zhuanlan
    },
    
    {
     path:'/home/collect',//收藏集
     name:'collect',
     component:collect
    },
    {
      path:'/home/find',//发现
      name:'find',
      component:find
    },
    {
      path:'/home/label',//标签
      name:'label',
      component:label
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
