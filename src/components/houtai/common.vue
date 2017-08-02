<template>
<div class="col-sm-2">
    <!--顶部的菜单-->
    <div >
	<div class="hmenu">
		<h2><img src="static/logotop.svg"></h2>
		<span v-for="(item,index) in topMenu" v-on:click="clickTopMenu(index,item.icon)" :class="{active:ind===index}" :key="index">{{item.con}}
        </span>   
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
            console.log(this.message)
            this.ind=this.message
        },
        clickTopMenu(i,icon){
            this.ind=i;
            this.comMessage=icon;
            this.$router.push('/houtai/'+icon)

        }
    }
}
</script>
<style>
/*顶部菜单*/
.hmenu{
	background:#fff;
    padding-top:20px;
}
.hmenu h2{
    text-align:center;
    margin-top:0px;
}
.hmenu span{
    height:60px;
    line-height:60px;
	text-align:center;
	display:block;
	font-size:17px;
	cursor:pointer;
    
}
.homeTop span:hover{
	color:blue
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