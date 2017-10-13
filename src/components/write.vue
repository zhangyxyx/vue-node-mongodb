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
                    <div style="text-align:center;margin-top:50px;">
                    <button style="width:102px;height:33px;text-align:center;line-height:33px;border:1px solid #007fff;color:#007fff">确认并发布</button>
                    </div>
                </div>
                <div style="width:40px;height:40px;border-radius:50%;float:right;cursor:pointer;" v-on:click="backHome()">
                    <img src="/static/logo.png" style="width:100%"/>
                </div>
            </div>
        </div>
    </div>
    
    <div id="editor" style="margin-top:20px;">
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
            writesort:false
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
    border:1px solid rgba(204,204,204,.3)
}

#editor{
    margin:auto;
    width:80%;
    height:580px;
}

</style>
