<template>
<div class="main">
    <myCommon v-bind:message="commonmsg"></myCommon>
    <div class="findTop">
        <ul>
            <li :class="{action:ind===index}" v-for="(item,index) in lanMenu" v-on:click="clickMenu(index,item.icon)" :key="index">{{item.con}}</li>    
        </ul>
    </div>  
    
    <div class="con">
        <div class="commonWM" style="margin-top:20px;"><router v-bind:message="parentMsg"></router></div>
    </div> 
</div> 
</template>
<script>
import routerView from './routerView.vue'
import common from '../common.vue'
export default{
    data(){
        return{
            lanMenu:[
                {con:'全部',icon:'all'},
                {con:'Android',icon:'android'},
                {con:'前端',icon:'web'},
                {con:'iOS',icon:'ios'},
                {con:'后端',icon:'java'},
                {con:'设计',icon:'desgin'},
                {con:'产品',icon:'products'},
                {con:'工具资料',icon:'tool'},
                {con:'阅读',icon:'read'},
                {con:'人工智能',icon:'rgzn'},
            ],
            ind:0,
            parentMsg:'android',
            commonmsg:3
        }
    },
    components:{
       "router":routerView,
       "myCommon":common
    },
    methods:{
        clickMenu(index,con){
            //改变默认的ind 改变选中的背景颜色
            this.ind=index;
            //父组件传值给子组件
           this.parentMsg=con;
        }
    }
}
</script>
<style>
/*顶部菜单*/
.findTop{
    height:50px;
    font-size:14px;
    background:#fff;
    border-top:1px solid rgba(204,204,204,.3);
}
.findTop ul{
    width:960px;
    height:50px;
    margin:0 auto;
}
.findTop li{
    display: block;
    padding:15px 20px 0px 0px;
    display:block;
    float:left;
    color:#909090;
    cursor:pointer;
}
.findTop li:hover{
    cursor:pointer
}
.findTop .action{
    color:#007fff
}

</style>
