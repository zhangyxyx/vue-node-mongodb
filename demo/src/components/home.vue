<template>
<div class="row">
    <!--左侧菜单-->
    <div class="col-md-4 home-con-menu">
      <div class="row">
      	<div class="col-md-12 menu-every" v-for='(options,index) in options' v-on:click="clickmenu(options.change)">{{options.text}}</div>
       
      </div>
    </div>
    <!--右侧对应的内容-->
    <div class="col-md-8  home-con-right" >
		<div class="col-md-12" v-for='(sum,index) in sums'>
			<span>标题：{{sum.title}}</span>
			<span>分类：{{sum.sort}}</span>
			<span>时间：{{sum.time}}</span>
			<span>内容：{{sum.con}}</span>
		</div>
	</div>
</div>
</template>
<script>
export default {
	data() {
		return{
			options:[
				{change:'jieshao',text:'介绍'},
				{change:'suibi',text:'随笔'},
				{change:'wenzhang',text:'文章'},
				{change:'rchang',text:'日常'},
				{change:'lianxi',text:'联系'}
			]	
		}
	},
	computed:{
		sums(){
			console.log(this.$http.get());
			this.$http.get('/api/home/getAccount').then((response)=>{
				console.log(response)
				let params={
					title:this.title,
					time:this.time,
					sort:this.sort,
					con:this.con
				};
				return this.$http.post('/api/home/createAccount',params)
			})
			.then((response)=>{
				console.log(response);
			})
			.catch((reject)=>{
				console.log(reject)
			})
			
		},
		
	}
}
</script>











