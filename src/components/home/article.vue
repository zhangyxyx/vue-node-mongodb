<!--说明
1.对应后台是list模型，模型里面放置的是我的关注和前端的东西 list是全部的内容。
所以如果需要调用前端的东西就直接用sort参数来从数据库中获取
2.在首页中还有热门 最新 评价几个选项这就需要在后台区分开
-->
<template>
<div class="row">
    <!-- <div class="col-sm-12 top">
        <input class="serchtext" type="text" placeholder="输入你要查找的内容" >
        <span class="search" v-on:click="search()">搜索</span>
    </div> -->
    <!--内容-->
    <div class="col-sm-12  home-con-right" v-for="(item,index) in homelists" :key="index">
            <div class="row">
                <div class="col-sm-12">
                    <span class="articleuser" >{{item.user}}</span>
                    <span class="articletime" >{{item.time}}</span>
                    <span class="articlesort" >{{item.sort}}</span>
                </div>
                <div class="col-sm-12">
                    <router-link :to="{name:'details',params:{id:item._id}}"><h2>{{item.title}}</h2></router-link>
                    <!--<span class="articleremove" v-on:click="clickremove(homelists[index])">x</span>-->
                </div>
            </div>
    </div>
    {{message}}
    <!--分页-->
    <!-- <div class="fenye">
        <span style="height:20px;border:1px solid #000;cursur:pointer">上一页</span>
        <div class="page" v-for="(item,index) in sumpage" :key="index">
            <span :class="{'pageactive':ind===index}" v-on:click="clickpage(item,index)">{{index+1}}</span>
        </div>
        <span style="height:20px;border:1px solid #000;cursor:pointer">下一页</span>
    </div> -->
</div>
</template>
<script>
import Vue from 'vue'
export default {
    data(){
        return {
            homelists:[] ,
            sumpage:[],
            ind:'', 
        }
       
    },
    props:['message'],
    mounted:function () {
        //类似于jquery中的ready方法
        this.sums();
    },
    methods:{ 
        //渲染数据
        showlist(params){
            var _this=this;
             _this.sumpage=[];
            this.$http.post('/api/list/showlist',params).then((response)=>{
                //列表数据
                var result=response.body 
                console.log(result)
                //列表数据
                //var result=JSON.parse(response.bodyText).data;
                //数据的总数量
                var sum=JSON.parse(response.bodyText).sum;
                //渲染出页码
                $(".fenye .page").empty();
                
                for(var i=0;i<Math.ceil(sum/params.limit);i++){
                    _this.sumpage.push(i);
                }
                //将结果赋值给需要循环
				_this.homelists=result;
				return _this.homelists;
			});
        },
        //渲染列表
        sums(){
			var _this=this;
            var params={
                page:0,
                limit:5,
                oneSort:this.message.one,
                twoSort:this.message.two
            };
			this.showlist(params);
		},
       
        //查找内容
        search(){
            var value=$(".serchtext").val();
            //点击的是第几页
            var params={
                page:0,
                limit:5,
                title:value
            };
            this.showlist(params);
        },
        //点击分页
        clickpage(index){
            var _this=this;
            var value=$("input").val();
            this.ind=index;
            //点击的是第几页
            var params={
                page:index,
                limit:5,
                title:value
            };
            this.showlist(params);
        },
         //删除数据
        clickremove(i){
            alert("删除成功！");
            var obj=i._id;
            var params={
                "_id":obj
            };
			this.$http.post('/api/list/removelist',params);
            this.sums();
        },
       

    }
}
</script>
<style>
/*搜索*/
.pageactive{
    background:#000;
    color:#fff;
}
.top{
    height:60px;
}
.top .serchtext{
    height:40px;
    margin-top:10px;
    padding:0px 10px;
    border:1px solid #ccc;
    font-size:12px;
    width:300px;
    float:left;
}
.top .search{
    width:60px;
    height:40px;
    margin-top:10px;
    background:#efefef;
    border:1px solid #ccc;
    line-height:40px;
    text-align:center;
    font-size:16px;
    display:block;
    cursor:pointer;
    float:left;
}
.top .search:hover{
    color:#fff;
    background:#afb5b5
}
/*每個數據*/
.home-con-right{
    height:117px;
    border-top:1px solid #ccc;
    cursor:pointer
}
.home-con-right a{
text-decoration:none;
}
.home-con-right h2{
    margin-top:10px;
    font-size:14px;
    color:#000;
    font-weight:bold;
    
}
.home-con-right .articleremove{
    display:block;
    width:15px;
    height:15px;
    text-align:center;
    line-height:12px;
    border:1px solid #ccc;
    background:#fff;
    color:#999;
    position:absolute;
    top:20px;
    right:20px;
    cursor:pointer;
}
.articleuser,.articletime,.articlesort{
    color:#999;
    font-size:15px;
    margin:10px 10px 10px 0px;
    display:block; 
    float:left;
}
/*分頁*/
.page span{
    width:20px;
    height:20px;
    line-height:20px;
    text-align:center;
    border:1px solid #000;
    displaY:block;
    floaT:left;
    cursor:pointer;
    margin:5px}
.page span:hover{
    background:#000;
    color:#fff}

</style>