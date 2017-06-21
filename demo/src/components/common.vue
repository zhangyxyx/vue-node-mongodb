<template>
<div>
    <!--顶部的菜单-->
	<div class="col-sm-12 homeTop">
		<h2>掘金</h2>
		<span v-for="(item,index) in topMenu" v-on:click="clickTopMenu(index,item.icon)" :class="{active:ind===index}">{{item.con}}
        </span>
		<input type="text" style="float:left;margin-top:10px" placeholder="请输入">
		<span class="login" v-for="(item,index) in login" v-bind:data-index="item.icon">{{item.con}}</span>
	</div>
    <!--下面的内容-->
    <div class="main">
        <router-view></router-view>
    </div>
</div>
</template>
<script>


export default{
    data(){
        return{
            topMenu:[
                {con:'首页',icon:'home'},
                {con:'专栏',icon:'zhuanlan'},
                {con:'收藏集',icon:'collect'},
                {con:'发现',icon:'find'},
                {con:'标签',icon:'label'},
            ],
            login:[
                {con:'登录',icon:'login'},
                {con:'注册',icon:'register'}
            ],
            ind:0,
        }
    },

    methods:{
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
	margin-bottom:20px
}
.homeTop h2{
	float:left;
	margin-top:14px;
}
.homeTop span{
	width:70px;
	floaT:left;
	text-align:center;
	display:block;
	font-size:20px;
	margin-left:20px;
	cursor:pointer;
}
.homeTop span:hover{
	color:blue
}
.homeTop .active{
	color:blue;
}
.homeTop input{
	width:300px;
	height:40px;
	padding:0px 10px;
	margin-left:50px;
	margin-right:100px
}
.homeTop .login{
	width:50px;
}
.home{border:1px solid #fff;}
</style>