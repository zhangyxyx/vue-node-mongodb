<!--
这是一开始打开的页面。
-->
<template>
	<div class="home">
		<myCommon v-bind:message="commonmsg"></myCommon>
		<!--专属home的菜单 我的关注 前端-->
		<div class="home-con-menu">
			<div style="width:960px;margin:0px auto;height:46px;">
				<div class="home-con-menu-menu-every" v-for='(options,index) in onemenu' :class="{active:onemenuactive===options.change}" v-on:click="onemenuclick(options.change)" :key="index">
					{{options.text}}
				</div>
			</div>
		</div>
		<div style="width:960px;margin:20px auto;">
			<!--右侧对应的内容-->
			<div class="content-left" style="width:700px;float:left;">
				<div style="background:#fff;">
					<!--热门 最新 评论-->
					<div class="topmenuone">
						<div class="topmenuone-menu-every-left">
							<div class="topmenuone-menu-every" v-for='(options,index) in twomenu' v-bind:data-menu="options.change" :class="{active:twomenuactive===options.change}" v-on:click="twomenuclick(options.change)" :key="index">
								{{options.text}}
							</div>
						</div>
						<div class="topmenuone-menu-every-right">
							<div class="topmenuone-menu-every" v-for='(options,index) in threemenu' v-bind:data-menu="options.change" :class="{active:threemenuactive===options.change}" v-on:click="threemenuclick(options.change)" :key="index">
								{{options.text}}
							</div>
						</div>
					</div>
					<!--精选-->
					<div class="rightevery article">
						<articleview v-bind:message="nowId"></articleview>
					</div>
				</div>
			</div>
			<div class="content-right">
				<div><img src="/static/home/home_right_1.png" style="width:100%;"></div>
				<div style="margin-top:20px;"><img src="/static/home/home_right_2.png" style="width:100%;"></div>
			</div>
		</div>
	</div>
</template>
<script>
import article from './article.vue'
import common from '../common.vue'
export default {
	data() {
		return {
			onemenu: [
				{text:'全部',change:'all'},
                {text:'Android',change:'android'},
                {text:'前端',change:'web'},
                {text:'iOS',change:'ios'},
                {text:'产品',change:'products'},
                {text:'设计',change:'desgin'},
                {text:'工具资料',change:'tool'},
                {text:'阅读',change:'read'},
                {text:'后端',change:'java'},
                {text:'人工智能',change:'rgzn'},
			],
			twomenu: [
				{ change: 'like', text: '热门'},
				{ change: 'time', text: '最新' },
				{ change: 'collect', text: '评论' },
			],
			threemenu: [
				{text:'本日最热',change:'dayhot'},
				{text:'本周最热',change:'weekhot'},
				{text:'本月最热',change:'monthhot'},
			],
			commonmsg: 3,
			nowId: {},
			onemenuactive:this.$route.params.id||'all',//一级菜单
			twomenuactive:this.$route.query.sort||'like',//二级菜单 左边
			threemenuactive:this.$route.query.type||'dayhot'//二级菜单 右边
		}
	},
	components: {
		"articleview": article,
		"myCommon": common
	},
	mounted() {
		this.Jumprouting();
	},
	methods: {
		//点击菜单跳转
		onemenuclick(mark) {
			this.onemenuactive=mark;
			this.Jumprouting();
		},
		twomenuclick(mark) {
			this.twomenuactive=mark;
			this.Jumprouting();
		},
		threemenuclick(mark) {
			this.threemenuactive=mark;
			this.Jumprouting();
		},
		//点击菜单的时候跳转路由
		Jumprouting() {
			var one = this.onemenuactive;
			var two = this.twomenuactive;
			var three = this.threemenuactive;
			var json = {
				one: one,
				two: two,
				three:three
			}
			this.$router.push({ path: '/find/'+one, query: {sort: two,type:three } });
			this.nowId = json;
			return json
		},
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
	padding:10px 0px;
	display:inline-block;
	.topmenuone-menu-every-left{
		@include left;
		margin-left:20px;
	}
	.topmenuone-menu-every-right{
		@include right;
		margin-right:20px
	}
	.topmenuone-menu-every {
		@include right;
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
/*右边图片*/
.content-right{
	width:240px;
	margin-left:20px;
	@include left
}
</style>










