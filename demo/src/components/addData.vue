<template>
<div class="row">
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
                 
                </form>
            </div>
            <img id="changeimg" src="" style="width:300px;height:300px">
           
    </div>
</div>
</template>
<script>
export default{
    data(){
        return{
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
            },
        }
    },
    methods:{
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
            // var imgfile=e.target.files[0];
            // var fromData=new FormData();
            // fromData.append('file',imgfile);

			let params = { 
                title : this.list.title,
                time : time,
				sort:this.list.sort,
				con:this.list.con,
            };
            console.log(params)
			this.$http.post('/api/list/addlist',params);
		},
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
    }
}
</script>