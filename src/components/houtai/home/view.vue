<template>
<div class="home">
	<myCommon v-bind:message="commonmsg"></myCommon>
    <!--专属home的菜单 我的关注 前端-->
    <div class="col-sm-9 home-con-menu" style="height:100%">
		<h3>首页当前的全部信息</h3>
		<button type="button" class="btn btn-primary" v-on:click="addData()">添加</button>
		<button type="button" class="btn btn-primary" v-on:click="removeDate()">删除</button>
		<router-link to="/home/home"><button type="button" class="btn btn-primary" >返回前台页面</button></router-link>
		<div id="table"></div>
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
		addData(){
			this.$router.push('/houtai/add')
		},
		removeDate(){
			var _this=this;
			var sum=$("tr").length;
			var collId=new Array();
			$("tr").each(function(i){
				if($("tr").eq(i).attr("class")=='selected'){
					collId.push($("tr").eq(i).attr('id'));
				}
			})
			//id集合
			var params={
				id:collId
			}
			this.$http.post('/api/seek/remove',params).then((response)=>{
				$("#table").bootstrapTable('refresh', this.table());
			})
		},
		//初始化表格
		table(){
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
				idField:"_id",//标志选项的id
				dataType:'json',
				url: '/api/seek/list?',
				maintainSelected:true,
				queryParams : function(params) {
					return params;
				},
				responseHandler:function(res){
				return res.body;
				},
				columns: [{
					field: 'checkStatus',
					checkbox: true, 
				},{
					field: 'id',
					visible:'false'
				}, {
					field: 'title',
					title: '标题',
					sortable : true,
					formatter:function(value,row){
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

<style lang="scss">
@import "../../../style/mixin";
.home-con-menu{
	background:#fff;
}
.active{color:#007fff}

</style>










