<template>
<div class="main">
    <myCommon v-bind:message="commonmsg"></myCommon>
    <div class="collecttop">
        <div class="commonWM">
            <span :class="{action:ind===index}" v-for="(item,index) in lanMenu" v-on:click="clickMenu(index,item.icon)" :key="index">{{item.con}}</span>    
        </div>
    </div> 
    <div style="height:46px;background:#fff;line-height:46px;border-top:1px solid #ccc;">
        <div class="commonWM">
            <div class="topTwo">
                <span :class="{action:ind===index}" v-for="(item,index) in labSort" v-on:click="clickMenu(index,item.icon)" :key="index">{{item.con}}</span>    
            </div>
            <div class="topTwo">
                <span :class="{action:ind===index}" v-for="(item,index) in labTab" v-on:click="clickMenu(index,item.icon)" :key="index">{{item.con}}</span>    
            </div> 
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
                {con:'编辑推荐',icon:'bjtj'},
                {con:'全部',icon:'all'},
            ],
            labSort:[
                {con:'最新',icon:'new'},
                {con:'最热',icon:'hot'}
            ],
            labTab:[
                {con:'全部',icon:'all'},
                {con:'ios',icon:'ios'},
                {con:'android',icon:'android'},
                {con:'前端',icon:'web'},
                {con:'设计',icon:'desgin'},
                {con:'产品',icon:'product'},
                {con:'后端',icon:'java'},
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
.collecttop{
    height:46px;
    line-height:46px;
    font-size:14px;
    background:#fff;
    border-top:1px solid #ccc;
}
.collecttop span{
    display:block;
    float:left;
    width:60px;
    text-align:center;
}
.collecttop span:hover{
    cursor:pointer
}
.action{
    color:blue
}
.topTwo{
    floaT:left;
}
.topTwo span{
    height:60px;
    padding:10px;
    cursor:pointer;
}
</style>
