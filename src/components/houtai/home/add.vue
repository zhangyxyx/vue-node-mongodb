<template>
<div class="home">
	<myCommon v-bind:message="commonmsg"></myCommon>
    <!--专属home的菜单 我的关注 前端-->
    <div class="col-sm-9 home-con-menu">
		<form>
            <div class="form-group">
                <label for="exampleInputEmail1">文章标题</label>
                <input type="title" class="form-control" id="exampleInputEmail1" placeholder="请输入标题">
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">文章分类</label>
                <input type="sort" class="form-control" id="exampleInputPassword1" placeholder="请输入分类">
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">文章内容</label>
                <input type="sort" class="form-control" id="exampleInputPassword1" placeholder="请输入内容">
            </div>
            <div class="form-group">
                <label for="exampleInputFile">文章图片</label>
                <input type="file" id="exampleInputFile">
            </div>
			<button type="button" class="btn btn-primary">提交</button>
           
        </form>
    </div>
</div>
</template>
<script>
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
<style lang="scss">
@import '../../../style/mixin';
/*菜單*/
.home-con-menu{
	height:100%;
	background:#fff;
	border-top:1px solid #ccc;
	.active{
		@include active;
	}
}
.menu-every{
	cursor:pointer;
	font-size:15px;
	text-align:center;
	padding:0px 8px;
	float:left;
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










