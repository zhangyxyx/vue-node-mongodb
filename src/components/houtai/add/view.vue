<template>
    <div class="container">
		<div class="col-sm-10" style="background:#fff;">
			<h4>添加信息</h4>
			<form>
				<div class="form-group">
					<label>标题</label>
					<input type="text" class="form-control" placeholder="请输入标题" name="title">
				</div>
				<div class="form-group">
					<label>作者</label>
					<input type="text" class="form-control" placeholder="请输入作者" name="name">
				</div>
				<div class="form-group">
					<label>分类</label>
					<input type="text" class="form-control" placeholder="请输入类别" name="sort">
				</div>
				<div class="form-group">
					<label>内容</label>
					<input type="text" class="form-control" placeholder="请输入内容" name="con">
				</div>
				<button type="back" class="btn btn-primary"v-on:click="addData()">提交</button>
				<button type="back" class="btn btn-primary">返回</button>
			</form>
		</div>
    </div>
</template>

<script>
import common from '../hcommon.vue'
export default {
	methods:{
		addData(){
			var date=new Date();
			var mydate=date.getFullYear()+"/"+date.getMonth()+"/"+date.getDate()+"/"+date.getHours()+"/"+date.getMinutes(); 
			var params={
				title:$("input[name=title]").val(),
				name:$("input[name=name]").val(),
				time:mydate,
				sort:$("input[name=sort]").val(),
				con:$("input[name=con]").val(),
			}
			if(params.title&&params.name&&params.time&&params.sort&&params.con){
				this.$http.post('/api/seek/add',params).then((response)=>{
					this.$router.push('/houtai/home')
				})
			}else{

			}
		}
	}
}
</script>

<style>
.submit{
	width:50px;
	height:30px;
	text-align:center;
	line-height:30px;
	border:1px solid #ccc;
	background:#efefef;
	display:block;	
	float:left;	
	margin-right:20px;
	cursor:pointer;		
}
</style>
