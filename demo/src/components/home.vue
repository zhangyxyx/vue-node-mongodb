<template>
<div class="row">
    <!--左侧菜单-->
    <div class="col-sm-2 home-con-menu">
      <div class="row">
      	<div class="col-md-12 menu-every" v-for='(options,index) in options' v-on:click="clickmenu(options.change)">{{options.text}}</div>
       
      </div>
    </div>
    <!--右侧对应的内容-->
	<div class="col-sm-8">
		<div class="row">
			<div class="col-sm-12  home-con-right" v-for="(item,index) in homelists">
					<div>{{item}}</div>
					<span>标题：{{item.title}}</span>
					<span>分类：{{item.sort}}</span>
					<span>时间：{{item.time}}</span>
					<span>内容：{{item.con}}</span>
    		</div>
		</div>
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
export default {
	data() {
		return{
			options:
				[
				{change:'jieshao',text:'介绍'},
				{change:'suibi',text:'随笔'},
				{change:'wenzhang',text:'文章'},
				{change:'rchang',text:'日常'},
				{change:'lianxi',text:'联系'}
				]
			,
			list:{
				title:'',
				time:'',
				sort:'',
				con:''
			},	
			homelists:[]
		}
	},
	mounted:function () {
        //类似于jquery中的ready方法
        this.sums();
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
		sums(){
			var _this=this;
			this.$http.get('/api/list/showlist').then((response)=>{
				var string=response.bodyText.substring(1,response.bodyText.length-1);
				var string2=string.replace(/},/g,"};");
				var array=[];
				array.push(string2.split(';'))
				console.log(typeof array);
				_this.homelists=array;
				return _this.homelists;
			})
		}
	}
	
}

</script>











