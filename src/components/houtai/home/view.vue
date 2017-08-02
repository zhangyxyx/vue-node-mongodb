<template>
<div class="home">
	<myCommon v-bind:message="commonmsg"></myCommon>
    <!--专属home的菜单 我的关注 前端-->
    <div class="col-sm-9 home-con-menu" style="height:100%">
		<table id="table"></table>
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
	mounted:function(){
		this.table();
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
		},
		table(){
			console.log($('#table'))
			$('#table').bootstrapTable({
				sortName : "",
				sortOrder : "",
				method:'get',
				striped:true,
				pagination:true,
				sidePagination:'server',
				pageNumber:1,
				pageSize:5,
				search:true,
				searchOnEnterKey:true,
				dataType:'json',
				url: '/api/seek/list?',
				maintainSelected:true,
				queryParams : function(params) {
					console.log(params)
					return params;
				},
				onLoadSuccess: function(data){ //加载成功时执行
					console.log("加载成功"+data);
				},
				onLoadError: function(status){ //加载失败时执行
					console.log("加载数据失败"+status);
				},
				responseHandler:function(res){
				//远程数据加载之前,处理程序响应数据格式,对象包含的参数: 我们可以对返回的数据格式进行处理
				//在ajax后我们可以在这里进行一些事件的处理
				console.log(red.data)
				return res.data;
				},

				columns: [{
					field: 'id',
					title: 'Item ID'
				}, {
					field: 'title',
					title: '标题',
					sortable : true,
					formatter:function(value,row){
						console.log(value)
						return value
					}
				}, {
					field: 'user',
					title: '作者',
					sortable : true,
					formatter:function(value,row){
						return value
					}
				}, {
					field: 'sort',
					title: '分类',
					sortable : true,
					formatter:function(value,row){
						return value
					}
				}, {
					field: 'time',
					title: '时间',
					sortable : true,
					formatter:function(value,row){
						return value
					}
				}, {
					field: 'con',
					title: '内容',
					sortable : true,
					formatter:function(value,row){
						return value
					}
				} ]
			});
			
		}
		
	}
}

</script>

<style>


</style>










