<template>
<div class="row">
    <div class="col-sm-12  home-con-right" v-for="(item,index) in homelists">
            <div class="row" style="padding:10px 0px">
                <div class="col-sm-12"><h2>{{item.title}}</h2><span class="articleremove" v-on:click="remove(homelists[index])">x</span></div>
                <div class="col-sm-3"><span class="articlesort" style="height:30px;display:block;line-height:30px;">{{item.sort}}</span></div>
                <div class="col-sm-3"><span class="articletime" style="height:30px;display:block;line-height:30px;">{{item.time}}</span></div>
                <div class="col-sm-12"><span class="articlesort" >{{item.con}}</span></div>
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
    data(){
        return {
            homelists:[] ,
            list:{
                title:'',
                time:'',
                sort:'',
                con:''
            },	
        }
       
    },
    mounted:function () {
        //类似于jquery中的ready方法
        this.sums();
    },
    methods:{
        //渲染列表
        sums(){
			var _this=this;
			this.$http.get('/api/list/showlist').then((response)=>{
				//这是一个将数组字符串转化为数组json形式的过程
				var string=response.bodyText.substring(1,response.bodyText.length-1);
				var string2=string.replace(/},/g,"};");
				var array=[];
				array.push(string2.split(';'))			
				var array2=[];
				for(var i=0;i<array[0].length;i++){
					array2.push(JSON.parse(array[0][i]))
				}
				//将结果赋值给需要循环
				_this.homelists=array2;
				return _this.homelists;
			})
		},
        //删除数据
        remove(i){
            var obj=i._id;
            console.log(i);
            var params={
                "_id":obj
            }
			this.$http.post('/api/list/removelist',params);
            this.sums();
        },
        //添加列表
		addlist(){
			let params = { 
                title : this.list.title,
                time : this.list.time,
				sort:this.list.sort,
				con:this.list.con
            };
			this.$http.post('/api/list/addlist',params);
            this.sums();
		},

    }
}
</script>
<style>
.articleremove{width:20px;height:20px;line-height:20px;cursor:pointer;display:block;border:1px solid #000;}
</style>