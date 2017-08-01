<template>
<div class="home">
	<myCommon v-bind:message="commonmsg"></myCommon>
    <!--专属home的菜单 我的关注 前端-->
    <div class="home-con-menu">
		<div style="width:960px;margin:0 auto;">
			<div class="menu-every" v-for='(options,index) in leftMenu' v-bind:data-menu="options.change" v-on:click="onemenu(leftMenu[index])" :key="index">
				{{options.text}}
			</div>
		</div>
    </div>
	<div style="width:960px;margin:20px auto;">
		<!--右侧对应的内容-->
		<div class="row">
			<div class="col-sm-9" style="background:#fff;">
				<!--热门 最新 评论-->
				<div class="topmenuone">
					<div class="menu-every" v-for='(options,index) in topMenuOne' v-bind:data-menu="options.change"  v-on:click="twomenu(topMenuOne[index])"  :key="index">
						{{options.text}}
					</div>
				</div>
				<!--精选-->
				<div class="col-sm-12 rightevery article" style="display:block;"><articleview></articleview></div>
			</div>
			<div class="col-sm-3">
				<img src="static/home_img1.png" style="width:100%;">
			</div>
			<!--分页-->
		</div>
	</div>
</div>
</template>
<script>
import article from './article.vue'
import contact from './contact.vue'
import common from '../common.vue'
export default {
	data() {
		return{
				leftMenu:[
					{change:'attention',text:'我关注的'},
					{change:'web',text:'前端'},
				],
				topMenuOne:[
					{change:'hot',text:'热门'},
					{change:'new',text:'最新'},
					{change:'comment',text:'评论'},
				],
				commonmsg:0		
		}
	},
	components:{
		"articleview":article,
		"contactview":contact,
		"myCommon":common
	},

	methods:{
		//切换左边的菜单
		clickmenu(menu){
			$(".rightevery").eq(menu).css({display:"block"}).siblings().css({display:"none"})
		},
		//点击菜单跳转
		onemenu(mark){
			$('.home-con-menu .menu-every[data-menu='+mark.change+']').addClass('active').siblings().removeClass("active");
			this.$router.push({name:'ho',params:{id:mark.change}})
		},
		twomenu(mark){
			$('.topmenuone .menu-every[data-menu='+mark.change+']').addClass('active').siblings().removeClass("active");
			this.$router.push({name:'ho',params:{id:mark.change}})
		}
		
	}
}

</script>
<style>

/*菜單*/
.home-con-menu{
	height:46px;
	line-height:46px;
	background:#fff;
	border-top:1px solid #ccc;
}
.menu-every{
	cursor:pointer;
	font-size:15px;
	text-align:center;
	padding:0px 8px;
	float:left;
}
.home-con-menu .active{
	color:#007fff
}
.topmenuone .active{
	color:#007fff
}
.rightevery{display:none}
.topmenuone{
	height:46px;
	line-height:46px;

}
</style>










