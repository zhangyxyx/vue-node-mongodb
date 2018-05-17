<template>
<div>   
    <myCommon v-bind:onemessage="commonmsg"></myCommon>
    <div class="feidian" style="width:960px;margin:20px auto;">
        <div class="feidian_left" style="width:70%">
            <textarea style="width:100%;height:100px;" placeholder="发布沸点内容"></textarea>
            <div class="Issue">
                <span style="float:left">图片</span>
                <span style="float:left">链接</span>
                <span style="float:left">话题</span>
                <span style="" class="clickIssue">发布</span>
            </div>
            <div class="feidian_tab">
                <span v-on:click='clickTab(1)'>推荐</span>
                <span  v-on:click='clickTab(2)'>动态</span>
            </div>
            <div class="feidian_con">
                <myArticle v-bind:message='nowId'></myArticle>
            </div>
        </div>
       
    </div>
</div>
</template>

<script>
import common from '../common.vue'
import article from './article.vue'
export default {
    data(){
        return{
            commonmsg:1,
            nowId:{},
            tabMark:this.$router.params||'groom'
        }
    },
    components:{
        "myCommon":common,
        "myArticle":article
    },
    mounted() {
		this.Jumprouting();
	},
    methods:{
        clickTab:function(a){
            console.log(a)
            var mark='';
            if(a==='1'){
                mark='groom'
            }else if(a==='2'){
                mark='trends'
                this.tabMark=mark;
                //this.Jumprouting();
            }
            
        },
        Jumprouting:function(){
            var json = {
				tabMark:this.tabMark
			}
			this.$router.push({ path: '/feidian/'+this.tabMark });
			this.nowId = this.tabMark;
			return json
        }
    }
}
</script>

<style>
textarea{
    font-size:15px;padding:10px;box-sizing:border-box;outline:none;border:1px solid #dedede;
}

.Issue{
    width:100%;height:49px;border:1px solid #dedede;padding:5px 10px;box-sizing:border-box
}
.Issue span{
    width:72px;height:36px;line-height:36px;text-align:center;color:#007fff;font-size:15px;
}
.Issue .clickIssue{
    width:72px;height:36px;background:#007fff;opacity: 0.5;
    color:#fff;text-align:center;line-height:36px;font-size:15px;border-radius:3px;
    float:right
}
.feidian_tab{
    width:100%;height:50px;border:1px solid #e9e9e9;font-size:18px;text-align:center;line-height:50px;margin-top:20px;
}
.feidian_con{
    width:100%;border:1px solid #e9e9e9;
}
</style>
