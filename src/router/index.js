import Vue from 'vue'
import Router from 'vue-router'

import details from '@/components/details'

//home
import home from '@/components/home/view'
import zhuanlan from '@/components/zhuanlan/view'
import common from '@/components/common'
import label from '@/components/label/view'
import find from '@/components/find/view'
import collect from '@/components/collect/view'
import article from '@/components/home/article'
import write from '@/components/write'
import sharelink from '@/components/sharelink'
//管理员的页面
import Login from '@/components/houtai/login/view'
import Hmain from '@/components/houtai/main'
import Hhone from '@/components/houtai/home/view'
import Hcollect from '@/components/houtai/collect/view'
import Hfind from '@/components/houtai/find/view'
import Hzhuanlan from '@/components/houtai/zhuanlan/view'
import add from '@/components/houtai/add/view'


Vue.use(Router)

export default new Router({
  routes: [
    //公共的部分
    {
      path:'/common',
      name:'common',
      component:common
    },
    //添加文章
    {
      path:'/home/write',
      name:'write',
      component:write
    },
    //添加文章
    {
      path:'/home/sharelink',
      name:'sharelink',
      component:sharelink
    },
    //部分组件 
    {
    	path:'/',//首页
    	name:'home',
    	component:home
    },
     {
    	path:'/home/home',//首页
    	name:'home',
    	component:home
    },
    {//首页的我的关注和前端 这两个大类下面有分给三个热门 最新 评论
      path:'/home/:id',
      name:'home',
      component:home
    },
    {//专栏分为几个部分
      path:'/zhuanlan/:id',//专栏
      name:'zhuanlan',
      component:zhuanlan
    },
    //收藏集也分为几个部分
    {
     path:'/collect/:id',//收藏集
     name:'collect',
     component:collect
    },
    //发现也分为几个部分
    {
      path:'/find/:id',//发现
      name:'find',
      component:find
    },
    {
      path:'/label',//标签
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
   
  //管理员的页面路由
  {
    path:'/houtai/login',
    name:'login',
    component:Login
  },
   {
     path:'/houtai/home',
     name:'Hhome',
     component:Hhone
   },
   {
     path:'/houtai/collect',
     name:'Hcollect',
     component:Hcollect
   },
    {
     path:'/houtai/find',
     name:'Hfind',
     component:Hfind
   },
    {
     path:'/houtai/zhuanlan',
     name:'Hhome',
     component:Hzhuanlan
   },
    //详情
    {
     path:'/houtai/add',
     name:'add',
     component:add
   },
  ]
})
