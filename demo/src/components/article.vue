<template>
<div class="row">
    <div class="col-sm-12 top">
        <input class="serchtext" type="text" placeholder="输入你要查找的内容" >
        <span class="search" v-on:click="search()">搜索</span>
    </div>
   
    <div class="col-sm-12  home-con-right" v-for="(item,index) in homelists">
           
            <div class="row">
                 <div class="col-sm-12"><router-link :to="{name:'details',params:{id:item._id}}"><h2>{{item.title.substring(0,10)}}</h2></router-link><span class="articleremove" v-on:click="clickremove(homelists[index])">x</span></div>
                <div class="col-sm-3"><span class="articlesort" >{{item.sort}}</span></div>
                <div class="col-sm-3"><span class="articletime" >{{item.time}}</span></div>
                <div class="col-sm-12"><span class="articlesort" >{{item.con.substring(0,100)}}</span></div>
            </div>
            
    </div>
    <!--分页-->
    <div class="fenye">
        <div class="page" v-for="(item,index) in sumpage">
            <span v-on:click="clickpage(index)">{{index+1}}</span>
        </div>
    </div>
    <!--添加的-->
	<div class="col-sm-12">
		<label>标题：</label><input type="text" v-model="list.title"/>	</br>	
		<label>分类：</label><input type="text" v-model="list.sort"/>	</br>	
		<label>内容：</label><input type="text" v-model="list.con"/></br>
       
		<button @click="addlist">给列表添加信息</button>
	</div> 
   <!--图片操作-->
   <div style="margin-top:30px;">
        <div class="img">
            <form id="form1" enctype="multipart/form-data" method="post" action=""> 
                <input type="file" :accpet="accpets" id="fileToUpload" @change="upload">
                <button @click="upload">上传</button>
            </form>
        </div>
        <img id="changeimg" src="" style="width:300px;height:300px">
        <button @click="showfile">显示</button>
   </div>
</div>
</template>
<script>
export default {
    data(){
        return {
            homelists:[] ,
            sumpage:[],
            list:{
                title:'',
                sort:'',
                con:'',
                img:''
            },
            accpets:{
                type:String,
                default:'image/jpeg,image/jpg,image/png,image/gif'
            }	,
            flag:[String,Number],
            maxSize:{
                type:Number,
                default:0
            }
        }
       
    },
    mounted:function () {
        //类似于jquery中的ready方法
        this.sums();
    },
   
    methods:{
        //上传图片
        upload () {
            var _this=this;
                //获取数据
                var files = document.getElementById('fileToUpload').files;
                var file = event.target.files[0];
                //转成base64
                var img='';
                var reader=new FileReader();
               
                reader.onload=function(e){
                    document.getElementById("changeimg").src=e.target.result//预先显示图片   
                    //上传的过程
                    var params={
                            img:this.result
                    }
                    _this.$http.post('/api/file/addfile',params).then((response)=>{
                        console.log(response)  
                    }) 
                }
                reader.readAsDataURL(file);

                //直接用formData
                var formData = new FormData(file);
                formData.append('file',file);
                
            }, 
        //显示图片
        showfile(){
            this.$http.get('/api/file/showfile').then((response)=>{
                console.log(response)
            })
        },
        
        //渲染数据
        showlist(params){
            var _this=this;
             _this.sumpage=[];
            this.$http.post('/api/list/showlist',params).then((response)=>{
                //列表数据
                var result=JSON.parse(response.bodyText).data;
                //数据的总数量
                var sum=JSON.parse(response.bodyText).sum;
                //渲染出页码
                $(".fenye").empty();
                
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
                limit:5
            };
			this.showlist(params);
		},
        //添加列表
		addlist(){
            //设置一下时间
            var year=new Date().getFullYear();
            var month=new Date().getMonth();//月
            var date=new Date().getDate();//日
            var hour=new Date().getHours();//小时
            var min=new Date().getMinutes();//分钟
            var sec=new Date().getSeconds();//秒
            var time=year+"/"+(month+1)+"/"+date+"/"+hour+":"+min+":"+sec;
            //图片
            var imgfile=e.target.files[0];
            var fromData=new FormData();
            fromData.append('file',imgfile);

			let params = { 
                title : this.list.title,
                time : time,
				sort:this.list.sort,
				con:this.list.con,
                img:fromData
            };
            console.log(params)
			// this.$http.post('/api/list/addlist',params);
            // this.sums();
		},
        //查找内容
        search(){
            var value=$(".serchtext").val();
            console.log(value);
            //点击的是第几页
            var params={
                page:0,
                limit:5,
                title:value
            };
            this.showlist(params);
        },
        //点击分页
        clickpage(i){
            var _this=this;
            var value=$("input").val();
            //点击的是第几页
            var params={
                page:i,
                limit:5,
                title:value
            };
            this.showlist(params);
        },
         //删除数据
        clickremove(i){
            alert("删除成功！");
            var obj=i._id;
            console.log(i);
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
    height:150px;
    border:1px solid #99cccc;
    padding:10px;
    cursor:pointer
}
.home-con-right:hover{
    background:#99CC99
}
.home-con-right h2{
    margin-top:10px;
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
.home-con-right .articleremove:hover{
    background:#999;
    color:#fff;
}
.home-con-right .articlesort{
    margin-top:20px;
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