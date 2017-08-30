<template>
    <div>
        <myCommon></myCommon>
        <div style="background:#fff;border-top:1px solid #ccc;height:46px;line-height:46px;">
            <div class="commonWM" style="color:#999">分享指南</div>
        </div>
        <div class="commonWM">
            <h2 style="font-size:20px;font-weight:800">推荐文章到掘金</h2>
            <p>感谢分享，文章的审核时间为1-2个工作日</p>
            <!--添加的-->
            <div class="addcon col-sm-8">
                <label>标题</label>&nbsp;<input type="text" v-model="list.title" placeholder="标题" /> </br>
                <label>用户</label>&nbsp;<input type="text" v-model="list.user" placeholder="用户" /> </br>
                <label>分类</label>&nbsp;<input type="text" v-model="list.sort" placeholder="分类" /></br>
                <label>内容</label>&nbsp;<input type="text" v-model="list.con" placeholder="内容" /> </br>
                </br> 
            </div>
            <label class="custom-file-upload">
            <input type="file" 
                    accept="image/png,image/jpg,image/jpeg,image/gif" 
                    name="myupload" id="uploadInput" >
            </label>
            <label class="custom-file-submit">
            <button v-on:click="uploadImage()" v-bind:name="list.filepath">提交文件</button>
            </label> 
            <button @click="addlist">给列表添加信息</button>
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
.addcon input {
    width: 400px;
    height: 48px;
    line-height: 48px;
    padding: 0px 10px;
    border: 1px solid #ccc;
    margin: 10px 0px;
}
</style>
