<template>
<div class="main">
    <div style="height:60px;margin-bottom:20px;">
    <myCommon v-bind:message="commonmsg"></myCommon>
    </div>
    <div class="top">
        <span>全部标签</span>
        <span :class="{action:ind===index}" v-for="(item,index) in labTab" v-on:click="clickMenu(index,item.icon)">{{item.con}}</span>    
        <span>
            <input type="text" placeholder="请输入标签" style="height:30px;padding:0px 10px;">
        </span>
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
            labTab:[
                {con:'最热',icon:'hot'},
                {con:'最新',icon:'new'}
            ],
            ind:0,
            parentMsg:'android',
            commonmsg:4
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
.top{
    height:50px;
    line-height:50px;
    font-size:14px;
    background:#fff;
    border-bottom:1px solid #ccc;
    margin-bottom:20px;
    padding-left:10px;
}
.top span{
    display:block;
    float:left;
    width:60px;
    text-align:center;
}
.top span:hover{
    cursor:pointer
}
.action{
    color:#007fff
}
</style>
