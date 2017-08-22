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
                <!-- <button @click="addlist">给列表添加信息</button> -->
            </div>
            <!--图片操作-->
            <div class="col-sm-4">
                <img id="changeimg" src="" style="width:300px;height:300px">
                <!-- <div class="img">
                    <form id="form1" enctype="multipart/form-data" method="post" action="">
                            <input type="file" :accpet="accpets" id="fileToUpload" @change="upload">
                    </form>
                </div> -->
            </div>
            <vue-file-upload url='/api/file/upload' ref="vueFileUploader"
  v-bind:filters = "filters"
  v-bind:events = 'cbEvents'
  v-bind:request-options = "reqopts"
  v-on:onAdd = "onAddItem"></vue-file-upload>
            <table>
                <thead>
                     <tr>
                         <td>name</td>
                         <td>size</td>
                         <td>progress</td>
                         <td>status</td>
                         <td>action</td>
                     </tr>
                </thead>
                <tbody>
                    <tr v-for="(file,index) in files" :key="index">
                        <td v-text='file.name'></td>
                        <td v-text='file.size'></td>
                        <td v-text='file.progress'></td>
                        <td v-text='onStatus(file)'></td>
                        <td>
                            <button type='button' @click="uploadItem(file)">上传</button>
                            <button type='button' @click="uploadAll">上传所有文件</button>
                            <button type='button' @click="clearAll">清空上传列表</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import common from './common.vue'
import VueFileUpload from 'vue-file-upload'
export default {
    data() {
        return {
            list: {
                title: '',
                sort: '',
                con: '',
                img: ''
            },
            accpets: {
                type: String,
                default: 'image/jpeg,image/jpg,image/png,image/gif'
            },
            flag: [String, Number],
            maxSize: {
                type: Number,
                default: 0
            },
            commonmsg: 5,
            files:[],
            //文件过滤器，只能上传图片
            filters:[
                {
                name:"imageFilter",
                fn(file){
                    var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
                    return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
                }
                }
            ],
            //回调函数绑定
            cbEvents:{
                onCompleteUpload:(file,response,status,header)=>{
                console.log(file);
                console.log("finish upload;")
                }
            },
            //xhr请求附带参数
            reqopts:{
                formData:{
                tokens:'tttttttttttttt'
                },
                responseType:'json',
                withCredentials:false
            }
        }
    },
    components: {
        'myCommon': common,
        VueFileUpload
    },
    methods: {
        onStatus(file){
            if(file.isSuccess){
                return "上传成功";
            }else if(file.isError){
                return "上传失败";
            }else if(file.isUploading){
                return "正在上传";
            }else{
                return "待上传";
            }
            },
            onAddItem(files){
                console.log(files);
                this.files = files;
            },
            uploadItem(file){
            //单个文件上传
            file.upload();
            },
            uploadAll(){
            //上传所有文件
            this.$refs.vueFileUploader.uploadAll();
            },
            clearAll(){
            //清空所有文件
            this.$refs.vueFileUploader.clearAll();
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
