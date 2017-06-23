<template>
<div class="main">
    <p>专栏</p>
    <div style="height:60px;margin-bottom:20px;">
    <myCommon v-bind:message="commonmsg"></myCommon>
    </div>
    <div class="top">
        <span :class="{action:ind===index}" v-for="(item,index) in lanMenu" v-on:click="clickMenu(index,item.icon)">{{item.con}}</span>    
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
                {con:'编辑推荐',icon:'bjtj'},
                {con:'全部',icon:'all'},
            ],
            ind:0,
            parentMsg:'android',
            commonmsg:2
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
    color:blue
}
</style>
