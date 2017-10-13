<template>
    <div>
        <myCommon></myCommon>
        <div style="background:#fff;border-top:1px solid rgba(204,204,204,.3);height:46px;line-height:46px;">
            <div class="commonWM" style="color:#999">分享指南</div>
        </div>
        <div class="commonWM">
            <h2 style="font-size:25px;font-weight:800">分享</h2>
            <!--添加的-->
            <div style="overflow:auto">
                <div class="addcon">
                    <input type="text" v-model="list.title" placeholder="分享链接" /> </br>
                    <input type="text" v-model="list.user" placeholder="标题" /> </br>
                    <input type="text" v-model="list.sort" placeholder="描述" /></br>
                </div>
                <div class="addfile">
                    <label class="custom-file-upload">
                    <input type="file" 
                            accept="image/png,image/jpg,image/jpeg,image/gif" 
                            name="myupload" id="uploadInput" >
                    </label>
                    
                </div>
            </div>
            <div class="sharelinksort">
                <label style="float:left;line-heihgt:40px;">分类：</label>
                <ul style="float:left;">
                        <li>Android</li>
                        <li>前端</li>
                        <li>iOS</li>
                        <li>产品</li>
                        <li>设计</li>
                        <li>工具资源</li>
                        <li>阅读</li>
                        <li>后端</li>
                        <li>人工智能</li>
                    </ul>
            </div>
            <label class="custom-file-submit">
                    <button v-on:click="uploadImage()" v-bind:name="list.filepath">提交文件</button>
            </label> 
        </div>
        <div class="commonWM">
            <button style="width:629px;height:33px;background:#0371df;line-height:33px;text-align:center;color:#fff" @click="addlist">发布</button>
        </div>
    </div>
</template>
<script>
import common from './common.vue'

export default {
    data() {
        return {
            list: {
                title: '',
                sort: '',
                con: '',
                img: '',
                filepath:'',
            },
        }
    },
    components: {
        'myCommon': common,
    },
    methods: {
        uploadImage(){
            var formData = new FormData();
            var myfile = document.getElementById('uploadInput').files[0];
            formData.append('fabricImage', myfile);
            this.$http.post('/api/files/upload', formData).then(response=>{
                console.log('succeed'); 
                this.list.filepath=response.body
                console.log(result)  
            }).catch(err=>{
                console.log(err)
            });
        },
        addlist(){
            var params={
                title:this.list.title,
                user:this.list.user,
                sort:this.list.sort,
                con:this.list.con,
                file:this.list.filepath, 
            }
            console.log(params)
            this.$http.post('/api/list/addlist',params).then(response=>{
                
            })
        }
        
    }
}
</script>
<style>
.addcon {
    float:left;
    width:65%;
    margin-right:5%
}
.addcon input {
    width:100%;
    height: 48px;
    line-height: 48px;
    padding: 0px 10px;
    border: 1px solid rgba(204,204,204,.3);
    margin: 10px 0px;
}
.addfile{
    floaT:left;
}
.sharelinksort{
    width:100%;
    overflow:hidden;
}
.sharelinksort ul{
    margin-bottom:0px;
    padding-left:0px;
}
.sharelinksort li{
    padding:4px 10px;
    margin:0px 10px;
    float: left;display:block;
    border:1px solid rgba(204,204,204,.3);
    background:#fff;
    font-size:12px;
}
</style>
