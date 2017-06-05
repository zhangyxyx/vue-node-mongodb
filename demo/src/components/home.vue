<template>
<div class="row">
    <!--左侧菜单-->
    <div class="col-sm-2 home-con-menu">
      <div class="row">
      	<div class="col-md-12 menu-every" v-for='(options,index) in options' v-on:click="clickmenu(options.change)">{{options.text}}</div>
       
      </div>
    </div>
    <!--右侧对应的内容-->
	<div class="col-sm-10">
		<articleview></articleview>
	</div>
    <!--添加的-->
	<div class="col-sm-12">
		<label>标题：</label><input type="text" v-model="list.title"/>	
		<label>时间：</label><input type="text" v-model="list.time"/>	
		<label>分类：</label><input type="text" v-model="list.sort"/>	
		<label>内容：</label><input type="text" v-model="list.con"/>	
		<button @click="addlist">给列表添加信息</button>
	</div> 
</div>
</template>
<script>
import article from './article.vue'
export default {
	data() {
		return{
			options:
				[
				{change:'jieshao',text:'介绍'},
				{change:'suibi',text:'随笔/文章'},
				{change:'rchang',text:'日常'},
				{change:'lianxi',text:'联系'}
				]	,
				 list:{
                title:'',
                time:'',
                sort:'',
                con:''
            },			
		}
	},
	components:{
		"articleview":article
	},
	
	methods:{
		//添加列表
		addlist(){
			let params = { 
                title : this.list.title,
                time : this.list.time,
				sort:this.list.sort,
				con:this.list.con
            };
			return this.$http.post('/api/list/addlist',params);
		},
		
	}
	
}

</script>











