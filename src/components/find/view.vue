<template>
<div class="main">
    <myCommon v-bind:message="commonmsg"></myCommon>
    <div class="findtop">
        <div class="commonWM">
        <span :class="{action:ind===index}" v-for="(item,index) in lanMenu" v-on:click="clickMenu(index,item.icon)" :key="index">{{item.con}}</span>    
        </div>
    </div>  
    <div class="con">
        <router v-bind:message="parentMsg"></router>
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
                {con:'Android',icon:'android'},
                {con:'前端',icon:'web'},
                {con:'iOS',icon:'ios'},
                {con:'后端',icon:'java'},
                {con:'设计',icon:'desgin'},
                {con:'产品',icon:'products'},
                {con:'工具资料',icon:'tool'},
                {con:'阅读',icon:'read'},
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
.findtop{
    height:50px;
    line-height:50px;
    font-size:14px;
    background:#fff;
    border-top:1px solid #ccc;
}
.findtop span{
    display:block;
    float:left;
    width:60px;
    text-align:center;
}
.findtop span:hover{
    cursor:pointer
}
.action{
    color:blue
}
</style>
