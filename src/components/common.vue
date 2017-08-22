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
                //{con:'标签',icon:'label'},
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
            this.ind=this.message
        },
        clickTopMenu(i,icon){
            this.ind=i;
            this.comMessage=icon;
            this.$router.push('/'+icon)

        }
    }
}
</script>
<style>
/*顶部菜单*/
.homeTop{
	height:60px;
	line-height:60px;
	background:#fff;
}
.homeTop h2{
	float:left;
    margin-right:20px;
    margin-top:8px;
}
.homeTop span{
	width:70px;
	floaT:left;
	text-align:center;
	display:block;
	font-size:17px;
	cursor:pointer;
}
.homeTop span:hover{
	color:#007fff
}
.homeTop .active{
	color:#007fff
}
.homeTop input{
	height:32px;width:240px;line-height:32px;padding:0px 10px;border:1px solid #ccc;color:#71777c;outline:none;
}
.homeTop .login{
	width:50px;
}
.addMessUser {
    height:60px;
    line-height:60px;
}
.addMessUser div{
    float:left;
    width:30px;
    height:30px;
    margin:0px 0px 0px 30px;
    cursor:pointer;
}
.addMessUser img{
    width:100%;
    height:100%;
}
</style>