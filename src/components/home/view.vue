<template>
<div class="home">
	<myCommon v-bind:message="commonmsg"></myCommon>
    <!--专属home的菜单 我的关注 前端-->
    <div class="home-con-menu">
		<div style="width:960px;margin:0 auto;">
			<div class="menu-every"v-for='(options,index) in onemenu' v-bind:data-menu="options.change"  :class="options.active" v-on:click="onemenuclick(onemenu[index])" :key="index">
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
					<div class="menu-every" v-for='(options,index) in twomenu' v-bind:data-menu="options.change"  :class="options.active"  v-on:click="twomenuclick(twomenu[index])"  :key="index">
						{{options.text}}
					</div>
				</div>
				<!--精选-->
				<div class="col-sm-12 rightevery article" style="display:block;"><articleview v-if="nowId" v-bind:message="nowId"></articleview></div>
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
				onemenu:[
					{change:'attention',text:'我关注的',active:'active'},
					{change:'web',text:'前端'},
				],
				twomenu:[
					{change:'like',text:'热门',active:'active'},
					{change:'time',text:'最新'},
					{change:'collect',text:'评论'},
				],
				commonmsg:0,
				nowId:{},
		}
	},
	components:{
		"articleview":article,
		"contactview":contact,
		"myCommon":common
	},
	mounted(){
		this.Jumprouting();
	},
	methods:{
		//切换左边的菜单
		clickmenu(menu){
			$(".rightevery").eq(menu).css({display:"block"}).siblings().css({display:"none"})
		},
		//点击菜单跳转
		onemenuclick(mark){
			$('.home-con-menu .menu-every[data-menu='+mark.change+']').addClass('active').siblings().removeClass("active");
			this.Jumprouting();
		},
		twomenuclick(mark){
			$('.topmenuone .menu-every[data-menu='+mark.change+']').addClass('active').siblings().removeClass("active");
			this.Jumprouting();
		},
		//点击菜单的时候跳转路由
		Jumprouting(){
			var one=$(".home-con-menu .active").attr("data-menu");
			var two=$('.topmenuone .active').attr("data-menu");
			var json={
				one:one,
				two:two
			}
			this.$router.push({path:'/home/'+one,query:{two:two}});
			this.nowId=json;
			return json
		},
		
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










