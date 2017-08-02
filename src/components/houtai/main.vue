<template>
<div style="width:100%;">
    <!--顶部的菜单-->
    <div class="homeTop">
	<div style="width:960px;margin:0 auto;">
		<h2><img src="static/logotop.svg"></h2>
		<span v-for="(item,index) in topMenu" v-on:click="clickTopMenu(index,item.icon)" :class="{active:ind===index}" :key="index">{{item.con}}
        </span>
        <div style="float:left;position:relative;width:240px;margin-left:100px;">
            <input type="text" placeholder="搜索掘金">
            <span class="glyphicon glyphicon-search" aria-hidden="true"  style="position:absolute;top:21px;right:-19px;"></span>
        </div>
        <!--添加 消息 个人-->
        <div class="addMessUser">
            <div><router-link to="/add"><img src="static/add.png"></router-link></div>
            <div><img src="static/ling.png"></div>
            <div style="width:30px;height:30px;border-shadow:50%;"><img src="static/logo.png" style="width:100%"></div>
        </div>
       
	</div>
    </div>
</div>
</template>
<script>
//作为公共的组件 引入到需要的组件中
export default{
    data(){
        return{
            topMenu:[
                {con:'首页',icon:'home'},
                {con:'专栏',icon:'zhuanlan'},
                {con:'收藏集',icon:'collect'},
                {con:'发现',icon:'find'},
            ],
            ind:0,
            mark:'',
        }
    },
    props:["message"],
    mounted:function(){
        this.markshow();
    },
    methods:{
        markshow(){
            console.log(this.message)
            this.ind=this.message
        },
        clickTopMenu(i,icon){
            this.ind=i;
            this.comMessage=icon;
            this.$router.push('/home/'+icon)

        }
    }
}
</script>
