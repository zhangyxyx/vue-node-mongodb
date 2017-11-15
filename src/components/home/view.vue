<!--
这是一开始打开的页面。
-->
<template>
	<div class="home">
		<myCommon v-bind:message="commonmsg"></myCommon>
		<!--专属home的菜单 我的关注 前端-->
		<div class="home-con-menu">
			<div style="width:960px;margin:0 auto;height:46px;">
				<div class="home-con-menu-menu-every" v-for='(options,index) in onemenu' v-bind:data-menu="options.change" :class="options.active" v-on:click="onemenuclick(onemenu[index])" :key="index">
					{{options.text}}
				</div>
			</div>
		</div>
		<div style="width:960px;margin:0px auto;">
			<!--右侧对应的内容-->
			<div style="width:700px;float:left;">
				<div style="height:50px;line-height:50px;background:#fff;margin:20px 0px;">
					<div style="width:50px;float:left;"><img src="/static/logo.png" style="width:100%" /></div>
					<div style="float:left;margin-left:30px;color:#007fff;cursor:pointer;font-size:15px;" v-on:click="write()"><img src="/static/home/write.png" style="width:20px;margin-right:5px;vertical-align:middle">写文章</div>
					<div style="float:left;margin-left:30px;color:#007fff;cursor:pointer;font-size:15px;" v-on:click="sharelink()"><img src="/static/home/link.png" style="width:20px;margin-right:5px;vertical-align:middle">分享链接</div>
					<div style="float:right;font-size:14px;margin:0px 16px;color:#ccc">草稿</div>
				</div>
				<div style="background:#fff;">
					<!--热门 最新 评论-->
					<div class="topmenuone">
						<div class="topmenuone-menu-every" v-for='(options,index) in twomenu' v-bind:data-menu="options.change" :class="options.active" v-on:click="twomenuclick(twomenu[index])" :key="index">
							{{options.text}}
						</div>
					</div>
					<!--精选-->
					<div class="rightevery article">
						<articleview v-bind:message="nowId"></articleview>
					</div>
				</div>
			</div>
			<div style="width:240px;margin-left:20px;margin-top:20px;float:left;">
				<div><img src="/static/home/home_right_1.png" style="width:100%;"></div>
				<div style="margin-top:20px;"><img src="/static/home/home_right_2.png" style="width:100%;"></div>
			</div>
			<!--分页-->

		</div>
	</div>
</template>
<script>
import article from './article.vue'
import contact from './contact.vue'
import common from '../common.vue'
export default {
	data() {
		return {
			onemenu: [
				{ change: 'all', text: '我关注的', active: 'active' },
				{ change: 'web', text: '前端' },
			],
			twomenu: [
				{ change: 'like', text: '热门', active: 'active' },
				{ change: 'time', text: '最新' },
				{ change: 'collect', text: '评论' },
			],
			commonmsg: 0,
			nowId: {},

		}
	},
	components: {
		"articleview": article,
		"contactview": contact,
		"myCommon": common
	},
	mounted() {
		this.Jumprouting();
	},
	methods: {
		//切换左边的菜单
		clickmenu(menu) {
			$(".rightevery").eq(menu).css({ display: "block" }).siblings().css({ display: "none" })
		},
		//点击菜单跳转
		onemenuclick(mark) {
			$('.home-con-menu-menu-every[data-menu=' + mark.change + ']').addClass('active').siblings().removeClass("active");
			this.Jumprouting();
		},
		twomenuclick(mark) {
			$('.topmenuone-menu-every[data-menu=' + mark.change + ']').addClass('active').siblings().removeClass("active");
			this.Jumprouting();
		},
		//点击菜单的时候跳转路由
		Jumprouting() {
			var one = $(".home-con-menu .active").attr("data-menu");
			var two = $('.topmenuone .active').attr("data-menu");
			var json = {
				one: one,
				two: two,
			}
			this.$router.push({ path: '/home/'+one, query: {sort: two } });
			this.nowId = json;
			return json
		},
		//进入到添加文章
		write(){
			this.$router.push('/home/write')
		},
		sharelink(){
			this.$router.push('/home/sharelink')
		}

	}
}

</script>
<style lang="scss" scoped>
@import '../../style/mixin';
/*菜單*/
.home-con-menu {
	@include wh(100%,50px);
	line-height: 50px;
	background: #fff;
	border-top: 1px solid rgba(204,204,204,.3);
	overflow:hidden;
	.home-con-menu-menu-every {
		height: 50px;
		line-height:50px;
		padding:0px 10px;
		float:left;
		cursor:pointer;
		font-size:14px;
		&:hover{
			@include active;
		}
	}
}
.topmenuone {
	width:100%;
	height: auto;
	@include wh(100%,auto);
	padding:17px 20px;
	display:inline-block;
	.topmenuone-menu-every {
		cursor: pointer;
		font-size: 14px;
		text-align: center;
		padding: 0px 8px;
		float: left;
		border-right:1px solid rgba(204,204,204,.3);
		&:hover{
			@include active;
		}
	}
}
.rightevery {
	padding:0px 20px;
	border-top:1px solid rgba(204,204,204,.3)
}
</style>










