<!--
在线编辑器应该是原创文章那儿也就是专栏的集合 提交成功之后 调整到的是专栏
-->
<template>
<div>
    <div style="height:60px;line-height:60px;border-bottom:1px solid #ccc">
        <div style="float:left;font-size:25px;padding-left:20px;">在线编辑器写文章</div>
        <div style="float:right;margin-left:30px;">
            <div style="position:relative;">
                <span style="cursor:pointer;color:#007fff;margin-right:20px;" v-on:click="showWritesort()">发布</span>
                <div class="write_sort" v-show="writesort">
                    <h5 style="padding-left:20px;margin:20px 0px;font-size:20px;">发布文章</h5>
                    <h5 style="padding-left:20px;margin:20px 0px;font-size:16px;">选择分类</h5>
                    <ul style="padding:0px 9px;overflow:hidden">
                        <li :class="{active:mark===item.icon}" v-for="(item,index) in type" v-on:click="clickType(item.icon)" :key="index">{{item.con}}</li>
                    </ul>
                    <div style="text-align:center;margin-top:50px;">
                    <button v-on:click="add()" style="width:102px;height:33px;text-align:center;line-height:33px;border:1px solid #007fff;color:#007fff">确认并发布</button>
                    </div>
                </div>
                <div style="width:40px;height:40px;border-radius:50%;float:right;cursor:pointer;" v-on:click="backHome()">
                    <img src="/static/logo.png" style="width:100%"/>
                </div>
            </div>
        </div>
    </div>
    <div style="padding:20px;">
        <label>标题：</label>
        <input type="text" name="title" placeholder="请输入标题" style="width:300px;height:40px;padding:0px 10px;border:1px solid #ccc;"/>
    </div>
    <div id="editor" name="con">
        <mavon-editor style="height:100%"></mavon-editor>
    </div>
</div>
</template>

<script>
import {mavonEditor} from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
export default {
    data(){
        return{
            writesort:false,
            mark:'',
            type:[
                {con:'Android',icon:'android'},
                {con:'前端',icon:'web'},
                {con:'iOS',icon:'ios'},
                {con:'产品',icon:'products'},
                {con:'设计',icon:'desgin'},
                {con:'工具资料',icon:'tool'},
                {con:'阅读',icon:'read'},
                {con:'后端',icon:'java'},
                {con:'人工智能',icon:'rgzn'},
            ]
        }
    },
    name:'editor',
    components:{
        mavonEditor
    },
    methods:{
        showWritesort:function(){//点击发布显示隐藏
            this.writesort=this.writesort===false ? true : false;
        },
        backHome:function(){
            this.$router.push('/home/attention?two=like')
        },
        //添加提交 title user time con like collect type
        add:function(){
            let title=$("input[name=title]").val();
            let user='admin1';
            let con=$(".v-show-content").html();
            let like=0;
            let collect=0;
            let type=this.mark;
            var params={
                title:title,
                user:user,
                con:con,
                like:like,
                collect:collect,
                type:type
            };
            this.$http.post('/api/zhuanlan/add',params).then((response)=>{
                if(response&&response.status==200){
                    this.$router.push('/zhuanlan/all')
                }
            })

        },
        
        clickType:function(con){
            this.mark=con;
        }

    }
}
</script>

<style>
.write_sort{
   width:336px;
   height:310px;
   border:1px solid #ccc;
   line-height:0px;
   background:#fff;
   position:absolute;
   top:67px;
   right:42px;
   z-index:1501;
}
.write_sort ul li{
    display:block;
    padding:15px 10px;
    margin:5px;
    float:left;
    border:1px solid rgba(204,204,204,.3);
    cursor:pointer;
}

#editor{
    margin:auto;
    width:80%;
    height:580px;
}

</style>
